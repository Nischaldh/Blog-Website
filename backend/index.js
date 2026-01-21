import koa from "koa";

const app = new koa();
const PORT = 3000;

app.use(async (ctx) => {
  ctx.body = "Hello World";
});

app.listen(PORT, () => {
  console.log(`Server running in Port ${PORT}`);
});
