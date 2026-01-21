export const getAllBlog = async(ctx)=>{
    ctx.body = "Get all blog"
}


export const postBlog = async(ctx)=>{

    ctx.body = "Post a blog"

}

export const getBlog = async (ctx)=>{
    const id = ctx.params.id;
    ctx.body = `Blog ${id}`
}