import authRouter from "./auth.router.js";
import {blogRouter, publicRouter} from "./blog.router.js";
import Router from "koa-router";
import userRouter from "./user.router.js";
import { commentRouter, publicCommentRouter } from "./commentRouter.js";

const apiRouter = new Router({ prefix: "/api" });

// public routers
apiRouter.use(publicRouter.routes(), publicRouter.allowedMethods());
apiRouter.use(publicCommentRouter.routes(), publicCommentRouter.allowedMethods());

// auth router
apiRouter.use(authRouter.routes(), authRouter.allowedMethods());

// user router 
apiRouter.use(userRouter.routes(), userRouter.allowedMethods());

// blog router
apiRouter.use(blogRouter.routes(), blogRouter.allowedMethods());

// comment router
apiRouter.use(commentRouter.routes(), commentRouter.allowedMethods())

export default apiRouter;
