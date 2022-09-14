import axios from "./request";

// 平台详情
export function getPlatformDetails(params: any = {}): Promise<any> {
  return axios.get("/platform/detail", {
    params,
    extraConfig: {
      enableLoading: true
    }
  });
}

// 平台藏品列表
export function getPlatformCollectionList(params: any = {}): Promise<any> {
  return axios.get("/collection/page", {
    params
  });
}

// 关注平台
export function toggleFollow(params: any = {}): Promise<any> {
  return axios.post("/platform/like", params, { params });
}
