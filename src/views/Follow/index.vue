<template>
  <div class="content">
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
          :isShowRate="false"
          @click="handleRoute(`/platform-details?id=${item.pid}`)"
        ></PlatformCard>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script setup lang="ts">
import PlatformCard from "@/components/PlatformCard.vue";
import useRefreshList from "@/composables/use-refresh-list";
import { getFollowList } from "@/api/index";
import { handleRoute } from "@/utils/index";
defineOptions({
  name: "Follow"
});

const form = ref({
  pageIndex: 1,
  pageSize: 20
});

// 初始化上拉加载和下拉刷新
const {
  list,
  loading,
  finished,
  finishText,
  onLoad,

  refreshLoading,
  onRefresh
} = useRefreshList(getFollowList, form);

onActivated(() => {
  onLoad(true);
});
</script>

<style lang="scss" scoped>
.content {
  //min-height: calc(100vh - var(--van-tabbar-height));
  box-sizing: border-box;

  padding: 0 15px 10px;
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
