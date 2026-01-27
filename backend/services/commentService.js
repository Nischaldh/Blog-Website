import { AppDataSource } from "../config/type-orm.js";
// import {
//   addCommentDB,
//   deleteCommentDB,
//   editCommentDB,
//   getAllCommentsDB,
//   getBlogByIdDB,
//   getCommentByIdDB,
//   getCommentByUserDB,
//   getCommentsForBlogDB,
// } from "../lib/db.js";
import { Blog } from "../models/Blog.entity.js";
import { Comment } from "../models/Comment.entity.js";

const commentRepo = AppDataSource.getRepository(Comment);
const blogRepo = AppDataSource.getRepository(Blog);

export const getAllCommentService = async () => {
  try {
    // const comments = await getAllCommentsDB();
    const comments = await commentRepo.find({
      where: {  is_deleted: false },
      relations: ["user"],
      order: { created_at: "ASC" },
    });

    if (!comments.length) {
      return { success: false, code: 404, message: "Comments not found" };
    }
    return { success: true, comments };
  } catch (error) {
    console.log(`Error: ${error.message}`);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};

export const postCommentService = async (blogId, userId, content) => {
  try {
    // const blog = await getBlogByIdDB(blogId);
    const blog = await blogRepo.findOneBy({ id: blogId });
    if (!blog) {
      return { success: false, code: 404, message: "Blog not found" };
    }
    // const comment = await addCommentDB(blogId, userId, content);
    const comment = commentRepo.create({
      content,
      blog: { id: blogId },
      user: { id: userId },
    });
    await commentRepo.save(comment);

    // if (!comment) {
    //   return { success: false, code: 404, message: "Blog not found" };
    // }
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
    // const comments = await getCommentsForBlogDB(blogId);
    const comments = await commentRepo.find({
      where: { blog: { id: blogId }, is_deleted: false },
      relations: ["user"],
      order: { created_at: "ASC" },
    });

    if (!comments.length) {
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
    // const comment = await getCommentByIdDB(id);

    const comment = await commentRepo.findOne({
      where: { id, is_deleted: false },
      relations: ["user"],
    });
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
    // const comments = await getCommentByUserDB(userId);

     const comments = await commentRepo.find({
      where: {
        user: { id: userId },
        is_deleted: false,
      },
      relations: ["user", "blog"],
      order: { created_at: "ASC" },
    });
    if (!comments.length) {
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
    // const deletedComment = await deleteCommentDB(commentId);
    // if (!deletedComment) {
    //   return { success: false, code: 404, message: "Comment not found." };
    // }
    // return { success: true, deletedComment };
    const comment = await commentRepo.findOneBy({ id: commentId });
    if (!comment) {
      return { success: false, code: 404, message: "Comment not found" };
    }

    comment.is_deleted = true;
    await commentRepo.save(comment);

    return { success: true, deletedComment: comment };
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
    // const editedComment = await editCommentDB(commentId, content);

    // if (!editedComment) {
    //   return { success: false, code: 404, message: "Comment not found." };
    // }
    const comment = await commentRepo.findOne({
      where: { id: commentId, is_deleted: false },
    });

    if (!comment) {
      return { success: false, code: 404, message: "Comment not found." };
    }

    comment.content = content;
    await commentRepo.save(comment);

    return { success: true, editedComment: comment };
    // return { success: true, editedComment };
  } catch (error) {
    console.error("Edit Comment Service error: ", error);
    return {
      success: false,
      code: 500,
      message: "Internal Server Error",
    };
  }
};
