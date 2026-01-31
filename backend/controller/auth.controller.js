import { logInValidation, signUpValidation } from "../lib/validation.js";
import { getMeService, logInService, signUpServive } from "../services/authService.js";

export const login = async(ctx)=>{
    const {email, password} = ctx.request.body;
    const validationResult = logInValidation(email, password);
    if(!validationResult.success){
        ctx.throw(validationResult.code,validationResult.message);
    }
    const response = await logInService(email , password);
    if(!response.success){
        ctx.throw(response.code, response.message)
    };
    ctx.status= 200;
    ctx.body = {
        message:"Login Successful",
        user: response.user,
        token: response.token,
        success:true
    }
}


export const signup = async(ctx)=>{
    const {name, email , password} = ctx.request.body;
    const validationResult = signUpValidation(name,email,password);
    if(!validationResult.success){
        ctx.throw(validationResult.code,validationResult.message);
    }
    const response = await signUpServive(name,email,password);
    if(!response.success){
        ctx.throw(response.code, response.message)
    };
    ctx.status = 201;
    ctx.body = {
        message:"User created successfully,",
        user:response.user,
        token: response.token,
        success:true
    }
}

export const getMe = async(ctx)=>{
    const id = ctx.state.user.id;
    const response = await getMeService(id);
    if(!response.success){
        ctx.throw(response.code, response.message)

    }
    ctx.status = 200;
    ctx.body ={
        message:"User fetched Successful",
        success:true,
        user: response.user
    }
}