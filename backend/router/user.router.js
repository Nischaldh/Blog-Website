import Router from "koa-router";
import { getUser, updateProfile, updateProfilePic } from "../controller/user.controller.js";

const userRouter = new Router({prefix:'/user'});


userRouter.get("/:id",getUser);

userRouter.patch('/updateProfile',updateProfile);

userRouter.put("/updatePic", updateProfilePic);


export default userRouter;