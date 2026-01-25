import Router from 'koa-router';
import { comment, deleteBlog, editBlog, getAllBlog, getBlog, getBlogBySlug, getComments, postBlog } from '../controller/blog.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';


const publicRouter = new Router({prefix:"/public/blogs"});


publicRouter.get("/", getAllBlog)
publicRouter.get("/:slug",getBlogBySlug )

const blogRouter = new Router({prefix:"/blogs"});

blogRouter.use(authMiddleware);
blogRouter.get("/:id",getBlog)
blogRouter.post("/",postBlog);
blogRouter.patch('/:id',editBlog);
blogRouter.delete("/:id",deleteBlog)
blogRouter.post("/:id/comment",comment)
blogRouter.get("/:id/comment",getComments)



export { blogRouter, publicRouter };