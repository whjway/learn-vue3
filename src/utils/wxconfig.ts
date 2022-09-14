import wx from "weixin-js-sdk";
import sha1 from "js-sha1";
import { getWechatApiTicket } from "@/api/user";
import { APPID } from "@/utils/constant";
import { isIOS } from "@/utils/browser";

// 获取微信jsapi-ticket
function getTicket() {
  return getWechatApiTicket();
}

// 生成时间戳
function generateTimestamp() {
  return Date.now();
}

// 生成随机字符串
function generateNoncestr() {
  const n = 17;
  let nonceStr = "";
  const str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  const len = str.length;
  for (let i = 0; i < n; i += 1) {
    const rand = Math.floor(Math.random() * len);
    nonceStr += str.charAt(rand);
  }
  return nonceStr;
}

// 生成签名
function generateSignature(
  ticket: string,
  noncestr: string,
  timestamp: number
) {
  if (!window.pageUrl) {
    window.pageUrl = location.href.split("#")[0];
  }
  // IOS下分享校验的地址 是第一次打开页面的地址
  const validUrl = isIOS ? window.pageUrl : location.href.split("#")[0];
  const obj = {
    jsapi_ticket: ticket,
    noncestr,
    timestamp,
    url: validUrl
  } as Recordable;
  // as {
  //   [propName: string]: any;
  // };
  let str = "";
  Object.keys(obj).forEach((k) => {
    str += `&${k}=${obj[k]}`;
  });
  console.log("str=========", str.slice(1));
  return sha1(str.slice(1));
}

type ShareItem = {
  title: string;
  desc: string;
  link: string;
  imgUrl: string;
  successCallback: () => void;
};

// 配置分享分案
function setShare(
  { title, desc, link, imgUrl, successCallback }: ShareItem = {
    title: "看数藏",
    desc: "看数藏",
    link: "http://51chacredit.com/",
    imgUrl: "http://eva.91wak.com/images/logo.jpg",
    successCallback: () => ({})
  }
): void {
  wx.ready(() => {
    // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
    // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,
    // 则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
    console.log(title, "weixin-share-title");
    console.log(imgUrl, "weixin-share-imgUrl");

    wx.onMenuShareTimeline({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {
        // 用户点击了分享后执行的回调函数
        // 设置成功
        if (successCallback) successCallback();
      }
    });
    wx.onMenuShareAppMessage({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl, // 分享图标
      success() {
        // 用户点击了分享后执行的回调函数
        // 设置成功
        if (successCallback) successCallback();
      }
    });

    wx.updateAppMessageShareData({
      title, // 分享标题
      desc, // 分享描述
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl // 分享图标
    });

    wx.updateTimelineShareData({
      title, // 分享标题
      link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
      imgUrl // 分享图标
    });
  });
}

async function initWechatConfig(args?: ShareItem): Promise<any> {
  const ticket = await getTicket();
  const timestamp = generateTimestamp();
  const nonceStr = generateNoncestr();
  const signature = generateSignature(ticket, nonceStr, timestamp);
  console.log(APPID, "APPID");
  wx.config({
    debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: APPID, // 必填，公众号的唯一标识
    timestamp, // 必填，生成签名的时间戳
    nonceStr, // 必填，生成签名的随机串
    signature, // 必填，签名
    jsApiList: [
      // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
      // 分享接口
      "updateAppMessageShareData",
      "updateTimelineShareData",
      "onMenuShareTimeline",
      "onMenuShareAppMessage"
    ] // 必填，需要使用的JS接口列表
  });
  setShare(args);

  // wx.ready(() => {
  //   // config信息验证成功后会执行ready方法,所有接口调用都必须在config接口获得结果之后
  //   // config 是一个客户端的异步操作,所以如果需要在页面加载时调用相关接口,
  //   // 则须把相关接口放在ready函数中调用来确保正确执行.对于用户触发是才调用的接口,则可以直接调用,不需要放在ready函数中
  // });
  wx.error((err: any) => {
    // config 信息验证失败会执行error函数,如签名过期导致验证失败,具体错误信息可以打开config的debug模式查看,也可以在返回的res参数中查看,对于SPA可以在这里更新签名
    console.log(`配置验证失败:${err.errMsg}`);
  });
}

function wechatAuth(
  redirect_url = window.location.href,
  state = 1,
  scope = "snsapi_base"
): void {
  const authUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${APPID}&redirect_uri=${encodeURIComponent(
    redirect_url
  )}&response_type=code&scope=${scope}&state=${state}#wechat_redirect`;
  window.location.href = authUrl;
}

export default { initWechatConfig, wechatAuth, setShare };
