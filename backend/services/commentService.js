import {
  addCommentDB,
  deleteCommentDB,
  editCommentDB,
  getAllCommentsDB,
  getBlogByIdDB,
  getCommentByIdDB,
  getCommentByUserDB,
  getCommentsForBlogDB,
} from "../lib/db.js";

export const getAllCommentService = async () => {
  try {
    const comments = await getAllCommentsDB();
    if (!comments) {
      return { success: false, code: 404, message: "Comments not found" };
    }
    return { success: true, comments };
  } catch (error) {}
};

export const postCommentService = async (blogId, userId, content) => {
  try {
    const blog = await getBlogByIdDB(blogId);
    if (!blog) {
      return { success: false, code: 404, message: "Blog not found" };
    }
    const comment = await addCommentDB(blogId, userId, content);
    if (!comment) {
      return { success: false, code: 404, message: "Blog not found" };
    }
    return { success: true, comment };
  } catch (error) {
    console.error("Post Comment service: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getAllCommentsForBlogService = async (blogId) => {
  try {
    const comments = await getCommentsForBlogDB(blogId);
    if (!comments) {
      return { success: false, code: 404, message: "Comments not found" };
    }
    return { success: true, comments };
  } catch (error) {
    console.error("Get All Comment for Blog Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getCommentByIdService = async (id) => {
  try {
    const comment = await getCommentByIdDB(id);
    if (!comment) {
      return { success: false, code: 404, message: "Comment not found" };
    }
    return { success: true, comment };
  } catch (error) {
    console.error("Get Comment By Id Service Error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const getCommentsByUserService = async (userId) => {
  try {
    const comments = await getCommentByUserDB(userId);
    if (!comments) {
      return {
        success: false,
        code: 404,
        message: "Comments by user not found.",
      };
    }
    return { success: true, comments };
  } catch (error) {
    console.error("Get Comment By User Service error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const deteleCommentService = async (commentId) => {
  try {
    const deletedComment = await deleteCommentDB(commentId);
    if (!deletedComment) {
      return { success: false, code: 404, message: "Comment not found." };
    }
    return { success: true, deletedComment };
  } catch (error) {
    console.error("Delete Comment Service error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const editCommentService = async (commentId, content) => {
  try {
    const editedComment = await editCommentDB(commentId, content);
    if (!editedComment) {
      return { success: false, code: 404, message: "Comment not found." };
    }
    return { success: true, editedComment };
  } catch (error) {
    console.error("Edit Comment Service error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};
