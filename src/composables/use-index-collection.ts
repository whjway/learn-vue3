import { getCollectionList } from "@/api";
import parse from "@/utils/parseTime";

export default function useIndexCollection(): any {
  const configStore = useConfigStore();
  // 收藏列表
  const collectionList = ref({});
  // 下拉框数据
  const form = ref({
    date: "",
    platform: "",
    model: ""
  });

  // 初始化选项默认值及下拉框数据
  const collection = computed(() => configStore.collection);
  const model = computed(() => collection.value?.model);
  const platform = computed(() => collection.value?.platform);
  const date = computed(() => collection.value?.date);

  watch(
    collection,
    () => {
      console.log(collection.value, "collection.value");
      form.value = {
        date: collection.value.date[0]?.value,
        platform: collection.value.platform[0]?.value,
        model: collection.value.model[0]?.value
      };
      if (form.value.date) getCollectionData();
    },
    {
      immediate: true
    }
  );
  //
  // watchEffect(async () => {
  //   console.log("watch");
  //   (form.value.date = collection.value.date[0]?.value),
  //     (form.value.platform = collection.value.platform[0]?.value),
  //     (form.value.model = collection.value.model[0]?.value);
  //
  //   if (collection.value.date[0]?.value) {
  //     // 函数内的响应变量也会监听，form变化导致watch执行
  //     await getCollectionData();
  //   }
  // });

  function changeDropdown() {
    document.querySelector(".page")?.scrollTo({
      top: 375,
      left: 0,
      behavior: "smooth"
    });

    getCollectionData();
  }

  // 处理时间戳，返回开售时间字符串
  function parseTime(timeStamps: number): string {
    return `${parse(timeStamps, "{m}月{d}日 {h}:{i}")} 开售`;
  }
  // 处理交易模式 改成store存储
  // function formatModel(value: string): string {
  //   const modelText = model.value.find((item: Item) => item.value === value);
  //   return modelText.text;
  // }

  async function getCollectionData() {
    const params = {
      pageIndex: 1,
      pageSize: 100,
      startTime: form.value.date,
      endTime: Number(form.value.date) + 24 * 60 * 60 * 1000,
      pId: form.value.platform,
      exchangeModel: form.value.model
    };
    collectionList.value = await getCollectionList(params);
  }

  return {
    collectionList,
    date,
    platform,
    model,
    form,

    changeDropdown,
    parseTime
    // formatModel
  };
}
