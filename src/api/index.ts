import axios from "./request";

/**
 * 获取banner图
 * @param params
 */
export function getBanner(params: any = {}): Promise<any> {
  return axios.get("/banner", {
    params
  });
}

export function getAirdrop(params: any = {}): Promise<any> {
  return axios.get("/airdrop", {
    params
  });
}

export function getCollectionList(params: any = {}): Promise<any> {
  return axios.get("/collection/list", {
    params,
    extraConfig: {
      enableLoading: true
    }
  });
}

export function getCollectionPage(params: any = {}): Promise<any> {
  return axios.get("/collection/page", {
    params
  });
}

export function getPlatform(params: any = {}): Promise<any> {
  return axios.get("/plateform", {
    params
  });
}
// 获取下拉栏通用设置
export function getSetting(params: any = {}): Promise<any> {
  return axios.get("/setting", {
    params
  });
}

// 领空投详情
export function getAirdropDetails(params: any = {}): Promise<any> {
  return axios.get("/airdrop/detail", {
    params,
    extraConfig: {
      enableLoading: true
    }
  });
}

// 订阅
export function updateSubscribe(params: any = {}): Promise<any> {
  return axios.post("/user/notice/subscribe", params, {
    params
  });
}

// 关注列表
export function getFollowList(params: any = {}): Promise<any> {
  return axios.get("/platform/page/by/user", {
    params
  });
}

// 用户订阅的空投提醒列表
export function getAirdropSubcribeList(params: any = {}): Promise<any> {
  return axios.get("/user/airdrop/page", {
    params
  });
}

// 用户订阅的藏品提醒列表
export function getCollectionSubcribeList(params: any = {}): Promise<any> {
  return axios.get("/user/collection/page", {
    params
  });
}
