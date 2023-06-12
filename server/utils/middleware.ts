import { Middleware } from "koa";
import { errorMessage } from "./utils";

/**
 * 检查是否有session、登录中间件
 * @param ctx
 * @param next
 */
export const checkSession: Middleware = async (ctx, next) => {
  if (ctx.session?.user_info) {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = errorMessage(null, "操作未登录");
  }
};

/**
 * 检查是否是管理员
 * @param ctx 
 * @param next 
 */
export const checkAdmin: Middleware = async (ctx, next) => {
  if (ctx.session?.user_info?.admin === 1 /** admin ID */) {
    await next();
  } else {
    ctx.status = 403;
    ctx.body = errorMessage(null, "没有权限");
  }
};
