<template>
  <div class="content">
    <div class="header">
      <img class="image" :src="details.logo" />
      <div class="info-wrap">
        <div class="title">
          {{ details.pname }}
          <text class="follow">{{ details.likes }}关注</text>
        </div>
        <div class="desc van-multi-ellipsis--l2">
          {{ details.description }}
        </div>
      </div>
    </div>
    <van-cell-group :border="false">
      <van-cell title="上链信息" :value="details.uplink" size="large" />
      <van-cell
        title="交易模式"
        :value="configStore.modelMap[String(details.secondaryMarket)]"
        size="large"
        :border="false"
      />
      <!--      <van-cell title="是否有二级市场" size="large" :border="false" />-->
    </van-cell-group>

    <!--平台内藏品列表-->
    <div class="tab">藏品</div>
    <div class="products">
      <div
        class="item"
        v-for="item in list"
        :key="item.id"
        @click="handleRoute(item.jumpUrl, true)"
      >
        <img class="image" :src="item.picture" />
        <div class="price">￥ {{ item.price }}</div>
      </div>
    </div>

    <div class="fixed">
      <div @click="handleFollow">{{ followBtnText }}</div>
      <div @click="handleRoute(details.url, true)">立即前往</div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {
  getPlatformDetails,
  getPlatformCollectionList,
  toggleFollow
} from "@/api/platfom";
import { Toast } from "vant";
import { throttle } from "@/utils/debounced";
import { handleRoute } from "@/utils/index";

defineOptions({
  name: "PlatformDetails"
});

const router = useRouter();
const route = useRoute();
const configStore = useConfigStore();
const userStore = useUserStore();
const list = ref<CardItem[]>([]);
const details = ref<PlatformDetails>({
  id: 0,
  logo: "",
  pname: "",
  likes: 0,
  likeFlag: 0,
  description: "",
  uplink: "",
  secondaryMarket: "",
  picture: "",
  url: "",
  jumpUrl: ""
});

//  0-未关注 1-已关注
const isFollowed = computed(() => details.value?.likeFlag === 1);
const followBtnText = computed(() => (isFollowed.value ? "取消关注" : "关注"));
const isLogin = computed(() => userStore.isLogin);

// 关注与取消关注
const handleFollow = throttle(async function handleFollow() {
  if (!isLogin.value) return router.push("/login");
  const params = {
    platformId: route.query.id,
    type: isFollowed.value ? 0 : 1
  };
  await toggleFollow(params);
  if (isFollowed.value) {
    Toast("取消关注成功");
    details.value.likeFlag = 0;
  } else {
    Toast("关注成功");
    details.value.likeFlag = 1;
  }
}, 1000);

// 平台详情
async function getData() {
  const res = await getPlatformDetails({ id: route.query.id });
  details.value = res;
}

// 平台下收藏列表
async function getCollectionList() {
  const params = {
    pageIndex: 1,
    pageSize: 50,
    pId: route.query.id
  };
  ({ list: list.value } = await getPlatformCollectionList(params));
}

onActivated(() => {
  getData();
  getCollectionList();
});

onDeactivated(() => {
  list.value = [];
  details.value = {
    id: 0,
    logo: "",
    pname: "",
    likes: 0,
    likeFlag: 0,
    description: "",
    uplink: "",
    secondaryMarket: "",
    picture: "",
    url: "",
    jumpUrl: ""
  };
});
</script>

<style lang="scss" scoped>
.content {
  padding-bottom: calc(env(safe-area-inset-bottom, 0px) + 50px);

  .header {
    display: flex;
    align-items: center;
    height: 100px;
    padding: 20px 15px;
    box-sizing: border-box;
    background: url("~@/assets/image/platform-details-bg.png") 0 0/100% 100%
      no-repeat;
    .image {
      width: 60px;
      height: 60px;
      padding: 5px;
      margin-right: 10px;
      background-color: #fff;
      border-radius: 3px;
    }
    .info-wrap {
      flex: 1;
      min-width: 0;
      height: 60px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        font-size: 17px;
        font-weight: bold;
        color: #2e2e2e;
        .follow {
          font-size: 12px;
          color: #f37b7d;
          font-weight: initial;
        }
      }
      .desc {
        font-size: 13px;
        color: #8c8c8c;
        line-height: 18px;
      }
    }
  }

  .products {
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    background-color: #fff;
    padding: 0 15px;

    .item {
      margin-right: auto;
      margin-bottom: 10px;
      width: 167px;
      height: 212px;
      padding: 5px 0;
      box-sizing: border-box;
      border: 1px solid #e6e6e6;
      border-radius: 5px;
      .image {
        display: block;
        margin: 0 auto;
        width: 157px;
        height: 157px;
      }
      .price {
        margin-top: 20px;
        text-align: center;
        font-size: 16px;
        color: #333333;
      }
    }
  }

  .tab {
    position: relative;
    height: 55px;
    padding-top: 15px;
    box-sizing: border-box;

    text-align: center;
    font-size: 17px;
    font-weight: bold;
    color: #333333;
    background-color: #fff;
    &:after {
      content: "";
      position: absolute;
      top: 37px;
      left: 50%;
      width: 20px;
      height: 4px;
      background: $color-primary;
      border-radius: 2px;

      transform: translate(-50%, 0);
    }
  }

  .fixed {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 1px 5px 0 rgba(0, 0, 0, 0.3);
    background-color: #fff;
    padding-bottom: env(safe-area-inset-bottom, 0px);
    div {
      position: relative;
      display: flex;
      justify-content: center;
      width: 50%;
      font-size: 18px;
      font-weight: bold;
      color: #2e2e2e;
      &:nth-child(2) {
        border-left: 1px solid #2e2e2e;
      }
    }
  }
}
:deep(.van-cell) {
  background-color: transparent !important;
}
</style>
