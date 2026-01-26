import { normalizeTags } from "../lib/lib.js";
import {
  deleteBlogService,
  getAllBlogService,
  getBlogByIdService,
  getBlogBySlugService,
  getBlogByTitleService,
  getBlogsFromTagsService,
  postBlogService,
  updateBlogService,
} from "../services/blogService.js";

export const getAllBlog = async (ctx) => {
  const {title} = ctx.query;
  if(title){
    const response = await getBlogByTitleService(title);
    if (!response.success) {
      ctx.throw(response.code, response.message);
    }
    ctx.status = 200;
    ctx.body = { success: true, blog: response.blogs };
    return;
  }
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
  const files = ctx.files;

  if (!files?.primaryImage) {
    ctx.throw(400, "Primary image is required");
  }

  const primaryImage = files.primaryImage[0].path;
  const secondaryImage1 = files.secondaryImage1?.[0]?.path || null;
  const secondaryImage2 = files.secondaryImage2?.[0]?.path || null;

  const tagsArray = normalizeTags(tags);

  if(tagsArray.length===0){
    ctx.throw(400, "At least one tag is required");
  }
  const blogData = {
    title,
    content,
    authorId,
    status: status || "DRAFT",
    primaryImage,
    secondaryImage1,
    secondaryImage2,
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

// export const getBlogByTitle = async (ctx) => {
//   const { title } = ctx.query;
//   console.log(title);
//   if (!title) {
//     ctx.throw(400, "Title query is required");
//   }

//   const response = await getBlogByTitleService(title);
//   if (!response.success) {
//     ctx.throw(response.code, response.message);
//   }
//   ctx.status = 200;
//   ctx.body = { success: true, blog: response.blogs };
// };

export const getBlogsFromTags = async (ctx) => {
  const { tag } = ctx.query;

  if (!tag) {
    ctx.throw(400, "Please Provide a Tag.");
  }
  const firtLetter = tag.charAt(0).toUpperCase();
  const restLetters = tag.slice(1).toLowerCase();
  const formattedTag = firtLetter + restLetters;
  const response = await getBlogsFromTagsService(formattedTag);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    blogs: response.blogs,
  };
}