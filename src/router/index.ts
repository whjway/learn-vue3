import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Home from "../views/Index/index.vue";
import { isWeixin } from "@/utils/browser";
import wxconfig from "@/utils/wxconfig";
import { wechatLogin } from "@/api/user";
import { WEIXIN_FAILED_CODE } from "@/utils/constant";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    name: "Home",
    component: Home,
    meta: {
      title: "看数藏",
      tabbar: true,
      transitionName: "van-fade"
    }
  },
  {
    path: "/airdrop",
    name: "Airdrop",
    meta: {
      title: "领空投",
      tabbar: true,
      transitionName: "van-fade"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "Airdrop" */ "../views/Airdrop/index.vue")
  },
  {
    path: "/platform",
    name: "Platform",
    meta: {
      title: "找平台",
      tabbar: true,
      transitionName: "van-fade"
    },
    component: () =>
      import(/* webpackChunkName: "Platform" */ "../views/Platform/index.vue")
  },
  {
    path: "/me",
    name: "Me",
    meta: {
      title: "我的",
      tabbar: true,
      transitionName: "van-fade"
    },
    component: () =>
      import(/* webpackChunkName: "Me" */ "../views/Me/index.vue")
  },
  {
    path: "/setting",
    name: "Setting",
    meta: {
      title: "设置"
    },
    component: () =>
      import(/* webpackChunkName: "Setting" */ "../views/Setting/index.vue")
  },
  {
    path: "/airdrop-details",
    name: "AirdropDetails",
    meta: {
      title: "空投详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "AirdropDetails" */ "../views/AirdropDetails/index.vue"
      )
  },
  {
    path: "/platform-details",
    name: "PlatformDetails",
    meta: {
      title: "平台详情"
    },
    component: () =>
      import(
        /* webpackChunkName: "PlatformDetails" */ "../views/PlatformDetails/index.vue"
      )
  },
  {
    path: "/login",
    name: "Login",
    meta: {
      title: "登录"
    },
    component: () =>
      import(/* webpackChunkName: "Login" */ "../views/login/index.vue")
  },
  {
    path: "/user-agreement",
    name: "UserAgreement",
    meta: {
      title: "用户服务协议"
    },
    component: () =>
      import(
        /* webpackChunkName: "UserAgreement" */ "../views/Agreement/user.vue"
      )
  },
  {
    path: "/privacy-agreement",
    name: "PrivacyAgreement",
    meta: {
      title: "用户隐私协议"
    },
    component: () =>
      import(
        /* webpackChunkName: "PrivacyAgreement" */ "../views/Agreement/privacy.vue"
      )
  },
  {
    path: "/follow",
    name: "Follow",
    meta: {
      title: "我的关注"
    },
    component: () =>
      import(/* webpackChunkName: "Follow" */ "../views/Follow/index.vue")
  },
  {
    path: "/subscribe",
    name: "Subscribe",
    meta: {
      title: "我的提醒"
    },
    component: () =>
      import(/* webpackChunkName: "Subscribe" */ "../views/Subscribe/index.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    redirect: "/"
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

router.beforeEach(async (to, from, next) => {
  const userStore = useUserStore();
  const isLogin = userStore.isLogin;

  // 设置页面的title
  if (to.meta && to.meta.title) {
    window.document.title = String(to.meta.title);
  }
  if (isWeixin && !isLogin) {
    const { code } = to.query;
    console.log(code);
    if (!code || code === "undefined") {
      let url = window.location.href;
      console.log(url, "url");
      url = url.replace("login", "");
      url = url.replace("code", "old");
      console.log(
        url,
        "if (url.indexOf('login') > 0) url.replace('login', '');"
      );
      window.sessionStorage.setItem("collection_curPageUrl", url);
      wxconfig.wechatAuth();
      return false;
    }
    try {
      const res = await wechatLogin({
        code,
        inviterId: ""
      });
      userStore.updateUser(res);

      // 初始化微信分享
      await wxconfig.initWechatConfig();

      next();
    } catch (code: any) {
      console.log(code, "WEIXIN_FAILED_CODE");
      const isCodeFailed = WEIXIN_FAILED_CODE.includes(code);
      //  微信code失效后根据接口code 重新获取
      if (isCodeFailed) {
        const url =
          window.sessionStorage.getItem("collection_curPageUrl") || "";
        wxconfig.wechatAuth(url);
      }
    }
  } else {
    next();
  }
});
//
// router.afterEach((to, from) => {
//   const toDepth = to.path.split("/").length;
//   const fromDepth = from.path.split("/").length;
//   if (!to.meta.transitionName)
//     to.meta.transitionName = toDepth < fromDepth ? "slide-right" : "slide-left";
// });

export default router;
