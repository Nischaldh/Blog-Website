import {
  addBlogTagsDB,
  addCommentDB,
  clearBlogTagsDB,
  createBlogDB,
  deleteBlogDB,
  getAllBlogDB,
  getBlogByIdDB,
  getBlogBySlugDB,
  getBlogsByTitleDB,
  getCommentsForBlogDB,
  getTagsForBlogDB,
  updateBlogDB,
  getOrCreateTagDB,
} from "../lib/db.js";
import generateSlug from "../lib/slugify.js";

export const getAllBlogService = async () => {
  try {
    const blogs = await getAllBlogDB();
    console.log(blogs)
    if (blogs.length === 0) {
      return { code: 404, success: false, message: "There are no blogs" };
    }
    return { success: true, blogs };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogByIdService = async (blogId) => {
  try {
    const blog = await getBlogByIdDB(blogId);
    if (!blog) {
      return { success: false, code: 404, message: "Blog not found" };
    }
    const blogTags = await getTagsForBlogDB(blog.id);
    const comments = await getCommentsForBlogDB(blog.id);
    return {
      success: true,
      blog: { ...blog, tags: blogTags, comments },
    };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogBySlugService = async (slug) => {
  try {
    const blog = await getBlogBySlugDB(slug);
    if (!blog) {
      return { code: 404, success: false, message: "Blog not Found" };
    }
    const blogTags = await getTagsForBlogDB(blog.id);
    const comments = await getCommentsForBlogDB(blog.id);

    return { success: true, blog: { ...blog, tags: blogTags, comments } };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getBlogByTitleService = async (title) => {
  try {
    const blogs = await getBlogsByTitleDB(title);
    if (!blogs) {
      return { code: 404, success: false, message: "Blog not Found" };
    }
    return { success: true, blogs };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const postBlogService = async (blogData) => {
  try {
    const { title, content, authorId, status, tags = [] } = blogData;
    const slug = await generateSlug(title);
    const postBlogData = {
      title,
      slug,
      content,
      authorId,
      status,
    };
    const blog = await createBlogDB(postBlogData);

    if (tags.length > 0) {
      const tagIds = [];
      for (const tagName of tags) {
        const tag = await getOrCreateTagDB(tagName);
        tagIds.push(tag.id);
      }
      await addBlogTagsDB(blog.id, tagIds);
    }
    const blogTags = await getTagsForBlogDB(blog.id);

    return { success: true, blog: { ...blog, tags: blogTags } };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const updateBlogService = async (blogId, blogData) => {
  try {
    const { title, content, status, tags } = blogData;
    const updated = await updateBlogDB(blogId, title, content, status);
    if (!updated) {
      return { success: false, code: 404, message: "Blog not found" };
    }
    if (tags !== undefined) {
      await clearBlogTagsDB(blogId);
      if (tags.length > 0) {
        const tagIds = [];
        for (const tagName of tags) {
          const tag = await getOrCreateTagDB(tagName);
          tagIds.push(tag.id);
        }
        await addBlogTagsDB(blogId, tagIds);
      }
    }

    const updatedTags = await getTagsForBlogDB(blogId);
    if (!updatedTags) {
      return { success: false, code: 404, message: "Tags not found" };
    }
    return { success: true, blog: { ...updated, tags: updatedTags } };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const deleteBlogService = async (blogId) => {
  try {
    const deleted = await deleteBlogDB(blogId);
    if (!deleted) {
      return { success: false, code: 404, message: "Blog not found" };
    }
    return { success: true, blog: deleted };
  } catch (error) {
    console.error("Get All Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

