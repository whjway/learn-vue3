import axios from "./request";

export function getUcardLogin(params: any = {}): Promise<any> {
  return axios.post("/user/mobile/login", params, { params });
}

export function getUcardSMS(params: any = {}): Promise<any> {
  return axios.post("/sms/code", params, { params });
}

export function getCaptcha(params: any = {}): Promise<any> {
  return axios.get("/captcha", { params });
}

// 获取微信票据
export function getWechatApiTicket(params: any = {}): Promise<any> {
  return axios.get("/user/wx/jsapi/ticket", { params });
}
// 微信授权登录
export function wechatLogin(params: any = {}): Promise<any> {
  return axios.post("/user/wx/login", params, {
    params,
    extraConfig: { disableErrorTips: true }
  });
}
