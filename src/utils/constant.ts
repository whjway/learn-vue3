/**
 * 接口响应成功时候的code码列表
 * @type {array}
 * @example SUCCESS_CODES=[1]
 */
export const SUCCESS_CODES = [200, 1];
/**
 * 接口token失效
 */
export const TOKEN_FAILED_CODE = [401];
/**
 * 微信code失效
 */
export const WEIXIN_FAILED_CODE = [400163];

/**
 * 常见的正则表达式
 * @type {{phone: RegExp, idCard: RegExp, sms: RegExp}}
 * @example
 * idCard: /^(\d{15}$|^\d{18}$|^\d{17}(\\d|X|x))$/,
 * phone: /^1(3|4|5|6|7|8|9)\d{9}$/,
 * sms: /^\d{4}$/
 */
export const regular = {
  idCard: /^(\d{15}$|^\d{18}$|^\d{17}(\\d|X|x))$/,
  phone: /^1(3|4|5|6|7|8|9)\d{9}$/,
  sms: /^\d{4}$/,
  name: /^[\u4E00-\u9FA5A-Za-z]+$/
};

export const APPID = "wx5f0d0568a7cde5fb";
