import KoaRouter, { IMiddleware } from "koa-router";
import { checkAdmin, checkSession } from "server/utils/middleware";
import { successMessage } from "server/utils/utils";

const router = new KoaRouter({ prefix: "/api" });

const SERVER_ROUTER: Array<{
  path: string | RegExp | string[] | RegExp[];
  method?: "get" | "post";
  required?: string[]; // 必填参数
  handle: IMiddleware | IMiddleware[];
  session?: boolean; // 是否需要session认证
  admin?: boolean; // 只有admin用户才可以访问
}> = [
  {
    path: "/hello",
    method: "get",
    async handle(ctx) {
      ctx.body = successMessage(null, "success");
    },
    // session: true,
  },
];

SERVER_ROUTER.forEach((config) => {
  const middlewares = Array.isArray(config.handle)
    ? config.handle
    : [config.handle];

  if (config.admin) {
    middlewares.unshift(checkAdmin);
  }
  if (config.session) {
    middlewares.unshift(checkSession);
  }

  router[config.method || "get"](config.path, ...middlewares);
});

export default router;
