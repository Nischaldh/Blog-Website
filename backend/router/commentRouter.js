import Router from "koa-router";
import {
    deleteComment,
  editComment,
  getAllComment,
  getAllCommentForBlog,
  getCommentById,
  getCommentsByUser,
  postComment,
} from "../controller/comment.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const publicCommentRouter = new Router({ prefix: "/public/comments" });

publicCommentRouter.get("/",getAllComment)
publicCommentRouter.get("/blog/:blogId", getAllCommentForBlog);

const commentRouter = new Router({prefix:"/comment"});

commentRouter.get("/:id", getCommentById);
commentRouter.use(authMiddleware);
commentRouter.get("/user/user",getCommentsByUser);
commentRouter.post("/:blogId",postComment);
commentRouter.delete("/:id",deleteComment);
commentRouter.patch("/:id",editComment);

export {publicCommentRouter, commentRouter};
