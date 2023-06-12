/**
 * 类型判断
 * @param item 被检测变量
 * @param target 期待的变量类型
 * @returns boolean
 */
export function typeOf(item: any, target?: any): boolean | any {
  const type = Object.prototype.toString.call(item).slice(8, -1).toLowerCase();
  if (target === undefined) {
    return type;
  }
  return type === target;
}

/**
 * 错误响应
 */
export function errorMessage(data: any = null, message = "error") {
  return { status: 0, data, message };
}

/**
 * 正确响应
 */
export function successMessage(data: any = {}, message = "success") {
  return { status: 1, data, message };
}
