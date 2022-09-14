<template>
  <div class="content">
    <!--  <div class="content" v-no-result:[noResultText]="isEmpty">-->
    <van-sticky>
      <div class="dropdown-wrap">
        <van-dropdown-menu active-color="#6FA5F3">
          <van-dropdown-item
            v-model="form.dropStartTime"
            :options="config.airdrop.month"
            @change="changeDropdown"
          />
          <van-dropdown-item
            v-model="form.plateformId"
            :options="config.airdrop.platform"
            @change="changeDropdown"
          />
          <van-dropdown-item
            v-model="form.requirements"
            :options="config.airdrop.requirement"
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
        <Card
          :item="item"
          v-for="(item, index) in list"
          :key="item.id"
          @click="handleRoute(`/airdrop-details?id=${item.id}`)"
        >
          <template #alarm>
            <div
              v-if="isShowSubscribe"
              class="alarm"
              @click.stop="handleSubscribe(item.id, item.subscribe, index)"
            >
              <img src="@/assets/image/icon-alarm.png" />{{
                item.subscribe === 1 ? "取消" : "提醒"
              }}
            </div>
          </template>
          <template #content="{ item }">
            <div class="desc">{{ item.description }}</div>
          </template>
        </Card>
      </van-list>
    </van-pull-refresh>
  </div>
</template>
<script setup lang="ts">
import Card from "@/components/Card.vue";
import useRefreshList from "@/composables/use-refresh-list";
import useSubscribe from "@/composables/use-subscribe";
import { getAirdrop } from "@/api/index";
import { handleRoute } from "@/utils/index";

defineOptions({
  name: "Airdrop"
});

const configStore = useConfigStore();
// const noResultText = ref("暂无内容");
const form = ref({
  pageIndex: 1,
  pageSize: 20,
  dropStartTime: "-1",
  requirements: "-1",
  plateformId: "0"
  // dropEndTime: 0
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
} = useRefreshList(getAirdrop, form);

// 初始化选项默认值及下拉框数据
const config = computed(() => configStore.config);

// watch(
//   config,
//   () => {
//     form.value.dropStartTime = config.value.airdrop?.month[0]?.value;
//     form.value.plateformId = config.value.airdrop?.platform[0]?.value;
//     form.value.requirements = config.value.airdrop?.requirement[0]?.value;
//   },
//   { immediate: true }
// );

watchEffect(() => {
  form.value.dropStartTime = config.value.airdrop?.month[0]?.value;
  form.value.plateformId = config.value.airdrop?.platform[0]?.value;
  form.value.requirements = config.value.airdrop?.requirement[0]?.value;
});

// 订阅
const { subscribe, isShowSubscribe } = useSubscribe();

async function handleSubscribe(
  id: number | string,
  action: number | string,
  cardIndex: number
) {
  const nextAction = Number(action) === 1 ? 0 : 1;
  await subscribe({ type: 0, id: id, action: nextAction });
  // 改变订阅状态
  list.value[cardIndex].subscribe = nextAction;
}

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
  //min-height: calc(100vh - var(--van-tabbar-height));
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
  padding: 15px 0 5px;
  font-size: 13px;
  font-weight: bold;
  line-height: 1.3;
  color: #2e2e2e;
}
</style>
