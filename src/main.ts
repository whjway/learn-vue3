import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
// import { store, key } from "./store";
import { createPinia } from "pinia";
// 引入全局样式
import "@/assets/scss/index.scss";
// @ts-ignore
// import noResultDirective from "@/components/Base/NoResult/directive";
// Toast
import { Toast } from "vant";
import "vant/es/toast/style";
// 全局配置Toast
Toast.setDefaultOptions({ duration: 1000, forbidClick: true });

// Dialog
// import { Dialog } from "vant";
// import "vant/es/dialog/style";

const pinia = createPinia();
const app = createApp(App);

app.config.globalProperties.$toast = Toast;
// app.config.globalProperties.$dialog = Dialog;

app
  // .use(store, key)
  .use(pinia)
  .use(router)
  // .directive("noResult", noResultDirective)
  .mount("#app");
