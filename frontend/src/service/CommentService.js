import api from "@/lib/api";


// Public APIs
export const getAllCommentsService = async () => {
  try {
    const res = await api.get("/public/comments");
    return res.data;
  } catch (error) {
    console.error("Get all comments error:", error);
    return { success: false, message: error.message };
  }
};

export const getCommentByIdService = async (id) => {
  try {
    const res = await api.get(`/public/comments/${id}`);
    return res.data;
  } catch (error) {
    console.error("Get comment by ID error:", error);
    return { success: false, message: error.message };
  }
};

export const getCommentsForBlogService = async (blogId) => {
  try {
    const res = await api.get(`/public/blogs/${blogId}/comments`);
    return res.data;
  } catch (error) {
    console.error("Get comments for blog error:", error);
    return { success: false, message: error.message };
  }
};

// Authenticated APIs
export const getCommentsByUserService = async () => {
  try {
    const res = await api.get("/comments");
    return res.data;
  } catch (error) {
    console.error("Get comments by user error:", error);
    return { success: false, message: error.message };
  }
};

export const postCommentService = async (blogId, content) => {
  try {
    const res = await api.post("/comments", { blogId, content });
    return res.data;
  } catch (error) {
    console.error("Post comment error:", error);
    return { success: false, message: error.message };
  }
};

export const editCommentService = async (id, content) => {
  try {
    const res = await api.patch(`/comments/${id}`, { content });
    return res.data;
  } catch (error) {
    console.error("Edit comment error:", error);
    return { success: false, message: error.message };
  }
};

export const deleteCommentService = async (id) => {
  try {
    const res = await api.delete(`/comments/${id}`);
    return res.data;
  } catch (error) {
    console.error("Delete comment error:", error);
    return { success: false, message: error.message };
  }
};
