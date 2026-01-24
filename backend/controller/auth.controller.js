import { signUpValidation } from "../lib/validation.js";
import { signUpServive } from "../services/authService.js";

export const login = async(ctx)=>{
    ctx.body = "login route called";
}


export const signup = async(ctx)=>{
    const {name, email , password} = ctx.request.body;
    const validationResult = signUpValidation(name,email,password);
    if(!validationResult.success){
        ctx.throw(validationResult.code,validationResult.message)
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
    }

}

