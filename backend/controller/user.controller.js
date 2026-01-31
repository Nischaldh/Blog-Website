import { emailValidation, passwordValidation } from "../lib/validation.js";
import { getBlogsByUserService } from "../services/blogService.js";
import {
  getUserService,
  updateProfilePicService,
  updateProfileService,
} from "../services/userService.js";

export const updateProfile = async (ctx) => {
  const userId = ctx.state.user.id;
  const { name, email, currentPassword, newPassword } = ctx.request.body;
  if (!currentPassword) {
    ctx.throw(400, "Current password is required");
  }
  if (email) {
    const validateEmail = emailValidation(email);
    if (!validateEmail.success) {
      ctx.throw(validateEmail.code, validateEmail.message);
    }
  }
  if (newPassword) {
    const validatePassword = passwordValidation(newPassword);
    if (!validatePassword.success) {
      ctx.throw(validatePassword.code, validatePassword.message);
    }
  }
  const response = await updateProfileService(
    userId,
    name,
    email,
    currentPassword,
    newPassword,
  );

  if (!response.success) {
    ctx.throw(response.code, response.message);
  }

  ctx.status = 200;
  ctx.body = {
    message: "Profile updated successfully",
    user: response.user,
  };
};

export const updateProfilePic = async (ctx) => {
  const userId = ctx.state.user.id;
  const file = ctx.file;

  const result = await updateProfilePicService(userId, file);

  if (!result.success) {
    ctx.throw(result.code, result.message);
  }

  ctx.status = 200;
  ctx.body = {
    message: "Profile picture updated successfully",
    user: result.data,
  };
};

export const getUser = async (ctx) => {
  const userId = ctx.params.id;

  if (!userId) {
    ctx.throw(400, "User id is required");
  }
 
  const response = await getUserService(userId);

  if (!response.success) {
    ctx.throw(response.code, response.message);
  }
  ctx.status = 200;
  ctx.body = {
    message: "User fetched successfully",
    user: response.user,
    success:true,
  };
};


export const getBlogsByUser = async(ctx)=>{
  const userId = ctx.state.user.id;
  
  const response = await getBlogsByUserService(userId);
  if(!response.success){
    ctx.throw(response.code,response.message);
  }

  ctx.status = 200;
  ctx.body = {
    message : "Blogs by user fetched successfully",
    blogs : response.blogs,
    success:true
  };  
}