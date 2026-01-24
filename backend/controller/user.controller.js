export const updateProfile = async (ctx)=>{
    ctx.body = "update profile route called";
}

export const updateProfilePic = async (ctx)=>{
    ctx.body = "update profile pic route called"
}


export const getUser = async(ctx)=>{
    const id = ctx.pramas.id;
    ctx.body=`get user profile route ${id}`
}