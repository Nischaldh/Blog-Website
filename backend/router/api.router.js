import authRouter from "./auth.router.js";
import {blogRouter, publicRouter} from "./blog.router.js";
import Router from "koa-router";
import userRouter from "./user.router.js";

const apiRouter = new Router({ prefix: "/api" });


apiRouter.use(publicRouter.routes(), publicRouter.allowedMethods());

// auth router
apiRouter.use(authRouter.routes(), authRouter.allowedMethods());

// user router 
apiRouter.use(userRouter.routes(), userRouter.allowedMethods());

// blog router
apiRouter.use(blogRouter.routes(), blogRouter.allowedMethods());

export default apiRouter;
