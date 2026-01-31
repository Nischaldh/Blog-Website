import Router from "koa-router";
import { getMe, login, signup } from "../controller/auth.controller.js";
import { authMiddleware } from "../middleware/auth.middleware.js";


const authRouter = new Router({prefix:"/auth"});



authRouter.post("/login",login);

authRouter.post("/signup", signup);

authRouter.get("/me",authMiddleware,getMe);


export default authRouter;