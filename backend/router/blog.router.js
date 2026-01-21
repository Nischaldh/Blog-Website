import Router from 'koa-router';
import { getAllblog, getBlog, postBlog } from '../controller/blog.controller.js';


const blogRouter = new Router({prefix:"/blogs"});


blogRouter.get("/",getAllblog)

blogRouter.post("/",postBlog)

blogRouter.get("/:id",getBlog)


export default blogRouter;