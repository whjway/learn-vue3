<template>
  <div class="content">
    <van-tabs v-model:active="active" sticky color="#6FA5F3">
      <van-tab title="发售">
        <van-pull-refresh v-model="refreshLoading" @refresh="onRefresh">
          <van-list
            v-model:loading="loading"
            :finished="finished"
            :finished-text="finishText"
            :immediate-check="false"
            @load="onLoad"
          >
            <PlatformCard
              v-for="(item, index) in list"
              :key="item.id"
              :item="item"
              :isShowRate="false"
              @click="handleRoute(item.jumpUrl, true)"
            >
              <div
                v-if="isShowSubscribe"
                class="alarm"
                @click.stop="
                  handleSubscribe(
                    item.collectionId,
                    item.subscribe,
                    index,
                    1,
                    item
                  )
                "
              >
                <img src="@/assets/image/icon-alarm.png" />{{
                  item.subscribe === 1 ? "取消" : "提醒"
                }}
              </div>
            </PlatformCard>
          </van-list>
        </van-pull-refresh>
      </van-tab>
      <van-tab title="空投">
        <van-pull-refresh
          v-model="refreshLoadingAirdrop"
          @refresh="onRefreshAirdrop"
        >
          <van-list
            v-model:loading="loadingAirdrop"
            :finished="finishedAirdrop"
            :finished-text="finishTextAirdrop"
            :immediate-check="false"
            @load="onLoadAirdrop"
          >
            <PlatformCard
              v-for="(item, index) in listAirdrop"
              :key="item.id"
              :item="item"
              :isShowRate="false"
              @click="handleRoute(`/airdrop-details?id=${item.airId}`)"
            >
              <div
                v-if="isShowSubscribe"
                class="alarm"
                @click.stop="
                  handleSubscribe(item.airId, item.subscribe, index, 0, item)
                "
              >
                <img src="@/assets/image/icon-alarm.png" />{{
                  item.subscribe === 1 ? "取消" : "提醒"
                }}
              </div>
            </PlatformCard>
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>
  </div>
</template>
<script setup lang="ts">
import PlatformCard from "@/components/PlatformCard.vue";
import { getAirdropSubcribeList, getCollectionSubcribeList } from "@/api/index";
import useSubscribe from "@/composables/use-subscribe";
import useRefreshList from "@/composables/use-refresh-list";
import { handleRoute } from "@/utils/index";

defineOptions({
  name: "Subscribe"
});

const form = ref({
  pageIndex: 1,
  pageSize: 20
});
const formAirdrop = ref({
  pageIndex: 1,
  pageSize: 20
});
const active = ref(0);

// 初始化上拉加载和下拉刷新
const {
  list,
  loading,
  finished,
  finishText,
  onLoad,

  refreshLoading,
  onRefresh
} = useRefreshList(getCollectionSubcribeList, form);

const {
  list: listAirdrop,
  loading: loadingAirdrop,
  finished: finishedAirdrop,
  finishText: finishTextAirdrop,
  onLoad: onLoadAirdrop,

  refreshLoading: refreshLoadingAirdrop,
  onRefresh: onRefreshAirdrop
} = useRefreshList(getAirdropSubcribeList, formAirdrop);

// 订阅
const { subscribe, isShowSubscribe } = useSubscribe();

async function handleSubscribe(
  id: number | string,
  action: number | string,
  cardIndex: number,
  type: number,
  item: any
) {
  const nextAction = Number(action) === 1 ? 0 : 1;
  await subscribe({ type, id, action: nextAction });
  // 改变订阅状态
  item.subscribe = nextAction;
}

onActivated(() => {
  onLoad(true);
  onLoadAirdrop(true);
});
</script>

<style lang="scss" scoped>
.content {
  //min-height: calc(100vh - var(--van-tabbar-height));
  min-height: 100vh;
  background-color: $bg-color-grey;
}
:deep(.van-list) {
  padding: 0 15px;
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
