/**
 * @desc 函数防抖
 * @param func 函数
 * @param wait 延迟执行毫秒数
 * @param immediate true 表立即执行，false 表非立即执行
 */
export function debounce(
  func: () => void,
  wait = 1000,
  immediate = true
): () => void {
  let timeout: number | undefined;

  // TS2683: 'this' implicitly has type 'any' because it does not have a type annotation.
  return function (this: any, ...args: any) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;

    if (timeout) clearTimeout(timeout);
    if (immediate) {
      const callNow = !timeout;
      timeout = setTimeout(() => {
        timeout = undefined;
      }, wait);
      if (callNow) func.apply(context, args);
    } else {
      timeout = setTimeout(function () {
        func.apply(context, args);
      }, wait);
    }
  };
}

/**
 * 函数节流
 * @param func    {Function}   实际要执行的函数
 * @param wait    {Number}     执行间隔，单位是毫秒（ms），默认1000ms
 * @param wait    {Object}     leading 前置执行
 * @return        {Function}   返回一个“节流”函数
 */

export function throttle(
  func: (params?: any) => any,
  wait = 1000,
  leading = true
): () => any {
  // 利用闭包保存定时器和上次执行时间
  let timer: number | undefined;
  let previous: number; // 上次执行时间
  return function (this: any, ...args: any) {
    // 保存函数调用时的上下文和参数，传递给 fn
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const context = this;
    const now = +new Date();
    if (previous && now < previous + wait) {
      // fix await兼容
      if (leading) return Promise.reject();
      // 周期之中
      clearTimeout(timer);
      timer = setTimeout(function () {
        previous = now;
        return func.apply(context, args);
      }, wait);
    } else {
      previous = now;
      return func.apply(context, args);
    }
  };
}
