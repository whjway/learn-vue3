import { getItem, setItem, removeItem } from "@/utils/storage";

import { defineStore } from "pinia";

export type State = {
  token: string;
  userId: string;
  user: User;
};

export type UserInfo = {
  token: string;
  userId: string;
  [propName: string]: any;
};

type User = {
  uname: string;
  mobile?: string;
  [propName: string]: any;
};

export const useUserStore = defineStore("user", {
  state: (): State => ({
    token: getItem("token") || "",
    userId: getItem("userId") || "",
    user: getItem("user") || { uname: "", mobile: "" }
  }),
  getters: {
    isLogin: (state) => !!state.token
  },
  actions: {
    // async loadUser() {
    //   if (this.userId) throw new Error("Already logged in");
    //   const res = await new Promise((resolve) => {
    //     setTimeout(() => {
    //       resolve(null);
    //     }, 4000);
    //   });
    //   this.updateUser(res);
    // },
    updateUser(payload: State) {
      this.token = payload.token;
      this.userId = payload.userId;
      this.user = payload.user;
      setItem("token", payload.token);
      setItem("userId", payload.userId);
      setItem("user", payload.user);
    },
    clearUser() {
      // 恢复没有`muations`前的数据，如果初始化从`localstorage`获取赋值了，是清空不了的
      // this.$reset();
      this.token = "";
      this.userId = "";
      this.user = { uname: "", mobile: "" };
      removeItem("token");
      removeItem("userId");
      removeItem("user");
    }
  }
});
