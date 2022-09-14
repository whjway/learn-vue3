import { ref, computed, watch } from "vue";

/**
 * TODO
 * 从store 获取下拉选项及默认第一个值为初始值
 * @param form 绑定对象
 * @param  需要平台
 * @param onLoad 回调函数
 */
export default function useDropdown(onLoad: (reset: boolean) => void): any {
  const configStore = useConfigStore();
  // 下拉框数据
  const form = ref({});

  // 初始化选项默认值及下拉框数据
  const config = computed(() => configStore.config);

  watch(config, () => {
    form.value = {
      airdrop: {
        month: config.value.airdrop?.month[0]?.value,
        platform: config.value.airdrop?.platform[0]?.value,
        requirement: config.value.airdrop?.requirement[0]?.value
      },
      platform: {
        market: config.value.platform?.market[0]?.value,
        given: config.value.platform?.given[0]?.value,
        uplink: config.value.platform?.uplink[0]?.value
      }
    };
  });

  function changeDropdown() {
    onLoad(true);
  }

  return {
    form,
    config,

    changeDropdown
  };
}
