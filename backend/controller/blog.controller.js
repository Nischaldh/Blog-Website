import { normalizeTags } from "../lib/lib.js";
import {
  commentBlogService,
  deleteBlogService,
  getAllBlogService,
  getBlogByIdService,
  getBlogBySlugService,
  getCommentsBlogService,
  postBlogService,
  updateBlogService,
} from "../services/blogService.js";

export const getAllBlog = async (ctx) => {
  const response = await getAllBlogService();
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = { success: true, blogs: response.blogs };
};

export const getBlog = async (ctx) => {
  const id = ctx.params.id;
  const userId = ctx.state.user.id;
  const response = await getBlogByIdService(id);
  if (userId !== response.blog.author_id) {
    ctx.throw(401, "Unauthorized.");
  }
  ctx.status = 200;
  ctx.body = { success: true, blog: response.blog };
};

export const getBlogBySlug = async (ctx) => {
  const slug = ctx.params.slug;
  const response = await getBlogBySlugService(slug);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = { success: true, blog: response.blog };
};

export const postBlog = async (ctx) => {
  const { title, content, status, tags } = ctx.request.body;
  const authorId = ctx.state.user.id;
  if (!title || !content) {
    ctx.throw(400, "Title and content are required");
  }
  const tagsArray = normalizeTags(tags);
  const blogData = {
    title,
    content,
    authorId,
    status: status || "DRAFT",
    tags: tagsArray,
  };
  const response = await postBlogService(blogData);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 201;
  ctx.body = {
    success: true,
    message: "Blog created successfully",
    blog: response.blog,
  };
};

export const editBlog = async (ctx) => {
  const blogId = ctx.params.id;
  const userId = ctx.state.user.id;
  const data = await getBlogByIdService(blogId);
  if (userId !== data.blog.author_id) {
    ctx.throw(401, "Unauthorized.");
  }
  const { title, content, status, tags } = ctx.request.body;
  const newTitle = title ? title : data.blog.title;
  const newContent = content ? content : data.blog.content;
  const newStatus = status ? status : data.blog.status;
  const blogData = {
    title: newTitle,
    content: newContent,
    status: newStatus,
  };
  if (tags !== undefined) {
    blogData.tags = normalizeTags(tags);
  }

  const response = await updateBlogService(blogId, blogData);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Blog updated successfully",
    blog: response.blog,
  };
};

export const deleteBlog = async (ctx) => {
  const blogId = ctx.params.id;
  const userId = ctx.state.user.id;
  const data = await getBlogByIdService(blogId);
  if (userId !== data.blog.author_id) {
    ctx.throw(401, "Unauthorized.");
  }
  const response = await deleteBlogService(blogId);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Blog deleted successfully",
    blog: response.blog,
  };
};

export const comment = async (ctx) => {
  const { content } = ctx.request.body;
  const blogId = ctx.params.id;
  const userId = ctx.state.user.id;
  if (!blogId || !content) {
    ctx.throw(400, "Blog ID and content are required");
  }
  const response = await commentBlogService(blogId, userId, content);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 201;
  ctx.body = {
    success: true,
    message: "Comment added successfully",
    comment: response.comment,
  };
};

export const getComments = async (ctx) => {
  const blogId = ctx.params.blogId;
  const response = await getCommentsBlogService(blogId);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    comments: response.comments,
  };
};
