export const UA = window.navigator.userAgent;

const _lowerCaseUA = UA.toLowerCase();

export const isMobile = /AppleWebKit.*Mobile.*/i.test(_lowerCaseUA);

export const isAndroid = /android/.test(_lowerCaseUA);

export const isIOS = /\(i[^;]+;( U;)? CPU.+Mac OS X|iphone|ipad|ipod/i.test(
  _lowerCaseUA
);

/**
 * 是否微信,排除企业微信
 */
export const isWeixin =
  /MicroMessenger/i.test(_lowerCaseUA) && !/wxwork/i.test(_lowerCaseUA);

export const isQQ = /\sQQ/i.test(_lowerCaseUA);

export default {
  UA,
  isMobile,
  isAndroid,
  isIOS,
  isWeixin,
  isQQ
};
