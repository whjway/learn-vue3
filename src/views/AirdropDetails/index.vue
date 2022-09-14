<template>
  <div class="content">
    <div class="image-wrap">
      <img class="image" :src="details.picture" />
    </div>
    <div class="title">空投·{{ details.title }}</div>
    <div class="gap"></div>
    <van-cell-group :border="false">
      <van-cell title="发行方议" :value="details.producer" size="large" />
      <van-cell title="平台" size="large">
        <div class="paltform">
          <img
            class="platform-image"
            src="@/assets/image/avatar-default.png"
          />{{ details.plateformName }}
        </div>
      </van-cell>
      <van-cell title="时间" :value="activityDuring" size="large" />
      <van-cell
        title="要求"
        :value="requirementMap[details.requirements]"
        size="large"
      />
      <van-cell title="教程" size="large" :border="false" />
    </van-cell-group>
    <div class="steps">{{ details.description }}</div>
    <img class="product-image" :src="details.descPicture" />

    <div class="fixed">
      <div @click="handleServicer">进群交流</div>
      <div @click="handleRoute(details.jumpUrl, true)">查看原文 ></div>
      <div
        v-if="isShowSubscribe"
        class="alarm"
        @click.stop="handleSubscribe(details.id, details.subscribe)"
      >
        <img src="@/assets/image/icon-alarm.png" />{{
          details.subscribe === 1 ? "取消" : "提醒"
        }}
      </div>
    </div>

    <ServicerDialog ref="servicer"></ServicerDialog>
  </div>
</template>
<script setup lang="ts">
import { getAirdropDetails } from "@/api/index";
import parseTime from "@/utils/parseTime";
import ServicerDialog from "@/components/ServicerDialog.vue";
import useSubscribe from "@/composables/use-subscribe";
import { handleRoute } from "@/utils/index";

defineOptions({
  name: "AirdropDetails"
});

const route = useRoute();
const details = ref<AirdropDetails>({
  id: 0,
  picture: undefined,
  title: "",
  producer: "",
  plateformName: "",
  requirements: 0,
  description: "",
  descPicture: "",
  dropStartTime: "",
  dropEndTime: "",
  jumpUrl: "",
  subscribe: 0
});

const requirementMap: NumberMap = {
  0: "注册空投",
  1: "实名空投",
  2: "邀请空投",
  3: "购买空投",
  4: "抽奖空投"
};

const activityDuring = computed((): string => {
  const detailsValue = details.value;
  if (detailsValue.dropEndTime) {
    return `${parseTime(
      detailsValue.dropStartTime,
      "{m}月{d}日 {h}:{i}"
    )}-${parseTime(detailsValue.dropEndTime, "{m}月{d}日 {h}:{i}")}`;
  } else {
    return "";
  }
});

// 客服组件
const servicer = ref();
function handleServicer() {
  servicer.value.toggle();
}

// 订阅
const { subscribe, isShowSubscribe } = useSubscribe();

async function handleSubscribe(id: number | string, action: number | string) {
  const nextAction = Number(action) === 1 ? 0 : 1;
  await subscribe({ type: 0, id, action: nextAction });
  // 改变订阅状态
  details.value.subscribe = nextAction;
}

async function getDetailsData() {
  const res = await getAirdropDetails({ id: route.query.id });
  details.value = res;
}

onActivated(() => {
  getDetailsData();
});
onDeactivated(() => {
  details.value = {
    id: 0,
    picture: undefined,
    title: "",
    producer: "",
    plateformName: "",
    requirements: 0,
    description: "",
    descPicture: "",
    dropStartTime: "",
    dropEndTime: "",
    jumpUrl: "",
    subscribe: 0
  };
});
</script>

<style lang="scss" scoped>
.content {
  padding: 15px 0 calc(env(safe-area-inset-bottom, 0px) + 50px);
  background-color: $bg-color-grey;
  .image-wrap {
    margin: 0 15px;
    padding: 7px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #fff;
    border: 1xp solid $border-color;
    border-radius: 4px;
    .image {
      width: 100%;
      //width: 660px;
      //height: 660px;
    }
  }
  .title {
    padding: 15px;
    font-size: 20px;
    color: #333333;
    line-height: 1.2;
  }
}
:deep(.van-cell) {
  background-color: transparent !important;
}
:deep(.van-cell__value) {
  flex: 1 0 auto;
}
.paltform {
  display: flex;
  align-items: center;
  justify-content: flex-end;
  .platform-image {
    width: 15px;
    height: 15px;
    margin-right: 6px;
  }
}
.steps {
  padding: 15px;
  font-size: 15px;
  color: #333333;
  line-height: 25px;
}
.product-image {
  margin: 10px 15px 0;
  width: calc(100% - 30px);
  box-sizing: border-box;
}

.fixed {
  position: fixed;
  bottom: 0;
  display: flex;
  align-items: center;
  width: 100%;
  height: 50px;
  padding-bottom: env(safe-area-inset-bottom, 0px);
  background-color: #fff;
  box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
  & div:nth-child(1) {
    padding-left: 15px;
    padding-right: 25px;
    border-right: 1px solid #2e2e2e;
    font-size: 18px;
    color: #2e2e2e;
  }
  & div:nth-child(2) {
    padding-left: 25px;
    padding-right: 10px;
    font-size: 18px;
    color: #2e2e2e;
  }
  .alarm {
    padding-right: 15px;
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
}
</style>
