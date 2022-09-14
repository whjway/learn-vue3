// window 挂载参数
interface Window {
  pageUrl?: string;
  // [wx: string]: any;
}

declare type Recordable<T = any> = Record<string, T>;

// 跳转地址
type Link = string | undefined;

interface CardItem {
  picture: Link;
  title: string;
  producerPic: Link;
  producer: string;
  authorPic: Link;
  author: string;
  [propName: string]: any;
}
interface BannerItem {
  id: number;
  url: string;
  picture: Link;
}

declare interface MeItem {
  id: number;
  icon: string;
  title: string;
  type: string;
  isLogin: boolean;
}

declare interface AirdropDetails {
  id: number;
  picture: Link;
  title: string;
  producer: string;
  plateformName: string;
  requirements: number;
  description: string;
  descPicture: Link;
  dropStartTime: string;
  dropEndTime: string;
  jumpUrl: string;
  subscribe: number | string;
}

declare interface PlatformDetails {
  id: number;
  logo: Link;
  pname: string;
  likes: string | number;
  likeFlag: number;
  description: string;
  uplink: Link;
  secondaryMarket: string;
  picture: Link;
  url: string;
  jumpUrl: string;
}

declare interface NumberMap {
  [propName: number]: string;
}

declare interface LoginForm {
  mobile: string;
  captcha: string;
  sms: string;
  randomCode: string;
}

declare interface CheckForm {
  (isCheckCaptcha: boolean): boolean;
}

declare interface Fn<T = any, R = T> {
  (...arg: T[]): R;
}

declare interface PromiseFn<T = any, R = T> {
  (...arg: T[]): Promise<R>;
}
