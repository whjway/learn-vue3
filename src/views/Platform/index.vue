<template>
  <div class="content">
    <van-sticky>
      <div class="dropdown-wrap">
        <van-dropdown-menu active-color="#6FA5F3">
          <van-dropdown-item
            v-model="form.uplink"
            :options="config.platform.uplink"
            @change="changeDropdown"
          />
          <van-dropdown-item
            v-model="form.secondaryMarket"
            :options="config.collection.model"
            @change="changeDropdown"
          />
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
      <van-list
        v-model:loading="loading"
        :finished="finished"
        :finished-text="finishText"
        :immediate-check="false"
        @load="onLoad"
      >
        <PlatformCard
          v-for="item in list"
          :key="item.id"
          :item="item"
          @click="handleRoute(`/platform-details?id=${item.id}`)"
        ></PlatformCard>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import PlatformCard from "@/components/PlatformCard.vue";
import useRefreshList from "@/composables/use-refresh-list";
import { getPlatform } from "@/api/index";
import { handleRoute } from "@/utils/index";

defineOptions({
  name: "Platform"
});

const configStore = useConfigStore();
// const noResultText = ref("暂无内容");
const form = ref({
  pageIndex: 1,
  pageSize: 20,
  uplink: "-1",
  secondaryMarket: "-1"
});

// 初始化上拉加载和下拉刷新
const {
  list,
  loading,
  finished,
  finishText,
  onLoad,
  // isEmpty,

  refreshLoading,
  onRefresh
} = useRefreshList(getPlatform, form);

// 初始化选项默认值及下拉框数据
const config = computed(() => configStore.config);

// watch(
//   config,
//   () => {
//     form.value.uplink = config.value.platform?.uplink[0]?.value;
//     form.value.secondaryMarket = config.value.collection?.model[0]?.value;
//   },
//   { immediate: true }
// );
watchEffect(() => {
  form.value.uplink = config.value.platform?.uplink[0]?.value;
  form.value.secondaryMarket = config.value.collection?.model[0]?.value;
});

function changeDropdown() {
  document.querySelector(".page")?.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
  onLoad(true);
}

onBeforeMount(() => {
  onLoad(true);
});
</script>

<style lang="scss" scoped>
.content {
  padding: 0 15px;
  box-sizing: border-box;
  background-color: $bg-color-grey;
}
.dropdown-wrap {
  padding: 15px 0px 0px;
  background-color: $bg-color-grey;
}

.alarm {
  margin-left: auto;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-size: 13px;
  color: $color-error;
  img {
    margin-right: 3px;
    width: 15px;
    height: 15px;
  }
}
.desc {
  padding: 15px 0;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.3;
  color: #2e2e2e;
}
</style>
