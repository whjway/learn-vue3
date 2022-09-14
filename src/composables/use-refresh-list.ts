import { ref, computed } from "vue";
import type { Ref } from "vue";

type Params = {
  pageIndex: number;
  pageSize: number;
  [propName: string]: any;
};

export default function useRefreshList(
  ajax: (params: Params) => Promise<any>,
  params: Ref<Params>
): any {
  // 上拉加载
  const list = ref([]);
  const loading = ref(false);
  const finished = ref(false);

  const isEmpty = computed(() => !loading.value && !list.value.length);
  const finishText = computed(() =>
    !isEmpty.value ? "我是有底线的" : "暂无数据"
  );

  async function onLoad(reset = false): Promise<any> {
    if (reset) {
      params.value.pageIndex = 1;
      params.value.pageSize = 20;
      finished.value = false;
      loading.value = true;
    }

    try {
      const res = await ajax(params.value);

      if (reset) {
        list.value = res.list;
      } else {
        // @ts-ignore
        list.value = [...list.value, ...res.list];
      }
      // 加载状态结束
      loading.value = false;
      // 数据全部加载完成
      if (!res.nextPage) {
        finished.value = true;
      } else {
        params.value.pageIndex++;
      }
    } catch (e) {
      loading.value = false;
      finished.value = true;
    }
  }

  //  下拉刷新
  const refreshLoading = ref(false);
  function onRefresh(): void {
    onLoad(true).finally(() => (refreshLoading.value = false));
  }

  return {
    list,
    loading,
    finished,
    finishText,
    onLoad,
    isEmpty,

    refreshLoading,
    onRefresh
  };
}
