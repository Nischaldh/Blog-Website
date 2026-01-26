import {
  deteleCommentService,
  editCommentService,
  getAllCommentService,
  getAllCommentsForBlogService,
  getCommentByIdService,
  getCommentsByUserService,
  postCommentService,
} from "../services/commentService.js";

export const getAllComment = async (ctx) => {
  const response = await getAllCommentService();
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    comments: response.comments,
  };
};

export const getAllCommentForBlog = async (ctx) => {
  const blogId = ctx.params.blogId;
  const response = await getAllCommentsForBlogService(blogId);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    comments: response.comments,
  };
};

export const getCommentById = async (ctx) => {
  const commentId = ctx.params.id;
  const response = await getCommentByIdService(commentId);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    comment: response.comment,
  };
};

export const getCommentsByUser = async (ctx) => {
  const userId = ctx.state.user.id;
  const response = await getCommentsByUserService(userId);
  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    comments: response.comments,
  };
  // const userId = ctx.state.user.id;
  // ctx.body = "User Id is "+ userId;
};

export const postComment = async (ctx) => {
  const { content } = ctx.request.body;
  const blogId = ctx.params.blogId;
  const userId = ctx.state.user.id;
  if (!blogId || !content) {
    ctx.throw(400, "Blog ID and content are required");
  }
  const response = await postCommentService(blogId, userId, content);
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

export const deleteComment = async (ctx) => {
  const commentId = ctx.params.id;
  const userId = ctx.state.user.id;
  const respone = await getCommentByIdService(commentId);
  if (!respone.success) {
    ctx.throw(respone.code, respone.message);
  }
  const commentUserId = respone.comment.user_id;
  if (commentUserId !== userId) {
    ctx.throw(403, "Unauthorized to delete this comment.");
  }
  const deleteResponse = await deteleCommentService(commentId);
  if (!deleteResponse.success) {
    ctx.throw(deleteResponse.code, deleteResponse.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Comment deleted successfully.",
  };
};

export const editComment = async (ctx) => {
  const commentId = ctx.params.id;
  const { content } = ctx.request.body;
  const userId = ctx.state.user.id;
  if (!content) {
    ctx.throw(400, "Content is required to edit comment.");
  }
  const respone = await getCommentByIdService(commentId);
  if (!respone.success) {
    ctx.throw(respone.code, respone.message);
  }
  const commentUserId = respone.comment.user_id;
  if (commentUserId !== userId) {
    ctx.throw(403, "Unauthorized to delete this comment.");
  }
  const editedComment = await editCommentService(commentId, content);
  if (!editedComment.success) {
    ctx.throw(editedComment.code, editedComment.message);
  }
  ctx.status = 200;
  ctx.body = {
    success: true,
    message: "Comment edited successfully.",
    comment: editedComment.editedComment,
  };
};
