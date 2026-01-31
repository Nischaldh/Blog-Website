import api from "@/lib/api";

// Public APIs
export const getAllBlogsService = async () => {
  try {
    const res = await api.get("/public/blogs");
    return res.data;
  } catch (error) {
    console.error("Get all blogs error:", error);
    return { success: false, message: error.message };
  }
};

export const getBlogBySlugService = async (slug) => {
  try {
    const res = await api.get(`/public/blogs/${slug}`);
    return res.data;
  } catch (error) {
    console.error("Get blog by slug error:", error);
    return { success: false, message: error.message };
  }
};

export const getBlogsFromTagsService = async (tags) => {
  try {
    const res = await api.get(`/public/blogs/tag?tag=${tags.join(",")}`);
    return res.data;
  } catch (error) {
    console.error("Get blogs from tags error:", error);
    return { success: false, message: error.message };
  }
};

export const getAllCommentsForBlogService = async (blogId) => {
  try {
    const res = await api.get(`/public/blogs/${blogId}/comments`);
    return res.data;
  } catch (error) {
    console.error("Get comments for blog error:", error);
    return { success: false, message: error.message };
  }
};

// Authenticated APIs
export const createBlogService = async (formData) => {
  try {
    const res = await api.post("/blogs", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Create blog error:", error);
    return { success: false, message: error.message };
  }
};

export const editBlogService = async (id, formData) => {
  try {
    const res = await api.patch(`/blogs/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    return res.data;
  } catch (error) {
    console.error("Edit blog error:", error);
    return { success: false, message: error.message };
  }
};

export const deleteBlogService = async (id) => {
  try {
    const res = await api.delete(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete blog error:", error);
    return { success: false, message: error.message };
  }
};

export const getBlogByIdService = async (id) => {
  try {
    const res = await api.get(`/blogs/${id}`);
    return res.data;
  } catch (error) {
    console.error("Get blog by ID error:", error);
    return { success: false, message: error.message };
  }
};