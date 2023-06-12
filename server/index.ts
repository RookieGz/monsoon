import koa from "koa";
import koaBody from "koa-body";
import Next from "next";
import path from "path";

import router from "./router";

(async () => {
  const IS_PRODUCTION = process.env.NODE_ENV == "production";
  const server = new koa();

  // next app
  const nextApp = Next({
    dev: !IS_PRODUCTION,
    dir: path.resolve(__dirname, "../client"), // next根目录
  });
  const nextHandle = nextApp.getRequestHandler();
  await nextApp.prepare();
  // next app end

  server.use(koaBody());
  server.use(router.routes());

  // 所有不以/api开头的路由都会落入到next的路由
  server.use(async (ctx) => {
    await nextHandle(ctx.req, ctx.res);
  });

  server.listen(6001, () => {
    console.log("Koa server 已启动:", "http://localhost:6001");
  });
  server.on("error", (e) => {
    console.log("Koa server 错误:", e);
  });
})();
