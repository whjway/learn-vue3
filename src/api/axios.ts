import axios, {
  AxiosResponse,
  AxiosRequestConfig,
  AxiosRequestHeaders
} from "axios";
import {
  SUCCESS_CODES,
  TOKEN_FAILED_CODE,
  WEIXIN_FAILED_CODE
} from "@/utils/constant";
import { Toast } from "vant";

const DEFAULT_ERROR_TIPS = "服务器开小差啦，请稍后再试";

/**
 * 拓展config
 * disableErrorTips 接口异常时,不展示默认toast弹窗
 */

const config: WakAxiosRequestConfig = {
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 20 * 1000
};

const instance = axios.create(config);

instance.interceptors.request.use(
  (config: WakAxiosRequestConfig) => {
    const userStore = useUserStore();
    const rootStore = useRootStore();

    if (config.extraConfig?.enableLoading)
      Toast.loading({
        message: "加载中...",
        forbidClick: true
      });
    // 设置token
    if (userStore.isLogin && config.headers) {
      config.headers.token = userStore.token;
      config.headers.userId = userStore.userId;
      config.headers.channelId = rootStore.browser.isWeixin ? 0 : 1;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

instance.interceptors.response.use(
  (response: WakAxiosResponseMore) => {
    const {
      data: res,
      data: { data, code, msg, message },
      config
    } = response;
    const userStore = useUserStore();

    console.log(data);
    if (config.extraConfig?.enableLoading) Toast.clear();

    if (SUCCESS_CODES.includes(code)) {
      return data;
    } else if (TOKEN_FAILED_CODE.includes(code)) {
      Toast(msg || message || DEFAULT_ERROR_TIPS);
      userStore.clearUser();
      window.location.reload();
      return Promise.reject(res);
    } else if (WEIXIN_FAILED_CODE.includes(code)) {
      return Promise.reject(code);
    } else {
      if (!config.extraConfig?.disableErrorTips)
        Toast(msg || message || DEFAULT_ERROR_TIPS);
      return Promise.reject(res);
    }
  },
  (error) => {
    const {
      config,
      response: { data: { msg, message } = { msg: "", message: "" } },
      message: errorMessage
    } = error;
    console.log(config, "config");
    console.log(error, "error");
    console.log(message, "message");
    console.log(msg, "msg");

    if (config.extraConfig?.enableLoading) Toast.clear();
    // 接口异常msg/message>axios异常（network error）
    if (!config.extraConfig?.disableErrorTips)
      Toast(msg || message || errorMessage || DEFAULT_ERROR_TIPS);
    return Promise.reject(error);
  }
);

export default instance;

export interface WakAxiosRequestHeaders extends AxiosRequestHeaders {
  token?: string;
  userId?: string | number;
  channelId?: string | number;
  [props: string]: any;
}

export interface WakAxiosRequestConfig extends AxiosRequestConfig {
  extraConfig?: {
    disableErrorTips?: boolean; // 不使用全局错误提示
    enableLoading?: boolean; // 使用全局loading
  };
  headers?: WakAxiosRequestHeaders;
}
export interface WakAxiosResponseMore extends AxiosResponse {
  config: WakAxiosRequestConfig;
}
