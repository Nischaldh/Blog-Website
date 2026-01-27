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
// publicCommentRouter.get("/blog/:blogId", getAllCommentForBlog);
publicCommentRouter.get("/:id", getCommentById);

const commentRouter = new Router({prefix:"/comments"});

commentRouter.use(authMiddleware);
// commentRouter.get("/user",getCommentsByUser);
commentRouter.post("/",postComment);
commentRouter.delete("/:id",deleteComment);
commentRouter.patch("/:id",editComment);

export {publicCommentRouter, commentRouter};
