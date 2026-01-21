export const notFound = async (ctx) => {
  ctx.status = 404;
  ctx.body = {
    success: false,
    message: `Route ${ctx.method} ${ctx.url} not found`,
  };
};