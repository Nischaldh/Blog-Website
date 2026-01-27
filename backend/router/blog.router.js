import Router from "koa-router";
import {
  deleteBlog,
  editBlog,
  getAllBlog,
  getBlog,
  getBlogBySlug,
  // getBlogByTitle,
  getBlogsFromTags,
  postBlog,
} from "../controller/blog.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";
import { uploadBlogImages } from "../middleware/uploadBlogImage.js";
import { getAllCommentForBlog } from "../controller/comment.controller.js";

const publicRouter = new Router({ prefix: "/public/blogs" });

publicRouter.get("/", getAllBlog);
publicRouter.get("/tag",getBlogsFromTags)
publicRouter.get("/:blogId/comments", getAllCommentForBlog);
publicRouter.get("/:slug", getBlogBySlug);

const blogRouter = new Router({ prefix: "/blogs" });


blogRouter.use(authMiddleware);
blogRouter.get("/:id", getBlog);
blogRouter.post(
  "/",
  uploadBlogImages.fields([
    { name: "primaryImage", maxCount: 1 },
    { name: "secondaryImage1", maxCount: 1 },
    { name: "secondaryImage2", maxCount: 1 },
  ]),
  postBlog,
);
blogRouter.patch("/:id", editBlog);
blogRouter.delete("/:id", deleteBlog);

export { blogRouter, publicRouter };
