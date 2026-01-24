import Router from 'koa-router';
import { getAllBlog, getBlog, postBlog } from '../controller/blog.controller.js';


const blogRouter = new Router({prefix:"/blogs"});


blogRouter.get("/", getAllBlog)

blogRouter.post("/",postBlog)

blogRouter.get("/:id",getBlog)


export default blogRouter;