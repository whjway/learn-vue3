import { throttle } from "@/utils/debounced";
import { updateSubscribe } from "@/api/index";
import { Toast } from "vant";

type Subscribe = {
  type: number | string; // 订阅类型 0-空投 1-藏品
  id: number | string; // 空投或者藏品的ID
  action: number; // 0-取消提醒 1-提醒
};

export default function useSubscribe(): any {
  const userStore = useUserStore();
  const rootStore = useRootStore();
  const router = useRouter();
  const route = useRoute();
  const isLogin = computed(() => userStore.isLogin);
  const isShowSubscribe = computed(() => rootStore.browser.isWeixin);

  const subscribe = throttle(async function (params: Subscribe): Promise<any> {
    if (!isLogin.value) {
      router.push({
        path: "/login",
        query: {
          redirect_path: encodeURIComponent(route.path || "/")
        }
      });
      return Promise.reject();
    }
    const res = await updateSubscribe(params);
    Toast(params.action === 1 ? "提醒成功" : "取消提醒");
    return res;
  }, 1000);

  return {
    isShowSubscribe,
    isLogin,
    subscribe
  };
}
