import blogRouter from "./blog.router.js";
import Router from "koa-router";

const apiRouter = new Router({ prefix: "/api" });


// blog router
apiRouter.use(blogRouter.routes(), blogRouter.allowedMethods());

export default apiRouter;
