<template>
  <div class="content">
    <van-swipe
      v-show="isShowBanner"
      class="swiper"
      :autoplay="3000"
      indicator-color="white"
    >
      <van-swipe-item
        class="swiper-item"
        v-for="item in bannerList"
        :key="item.id"
        @click="handleRoute(item.url, true)"
        ><img :src="item.picture" :alt="item.picture"
      /></van-swipe-item>
    </van-swipe>
    <!--领空投-->
    <Title
      v-show="isShowAirdrop"
      icon-type="airdrop"
      title="领空投"
      @clickRightText="handleRoute('/airdrop')"
      right-text="更多"
    ></Title>
    <div class="airdrop" v-show="isShowAirdrop">
      <div
        class="airdrop-item van-ellipsis"
        v-for="item in airdropList"
        :key="item.id"
        @click="handleRoute(`/airdrop-details?id=${item.id}`)"
      >
        {{ item.title }}
      </div>
    </div>
    <!--热门-->
    <Title
      v-show="isShowHot"
      icon-type="hot"
      title="热门平台"
      @clickRightText="handleRoute('/platform')"
      right-text="更多"
    ></Title>
    <div class="hot" v-show="isShowHot">
      <div
        class="hot-item"
        v-for="item in hotList"
        :key="item.id"
        @click="handleRoute(`/platform-details?id=${item.id}`)"
      >
        <img class="hot-image" :src="item.logo" />
        <span>{{ item.pname }}</span>
      </div>
    </div>
    <!--收藏 开售-->
    <van-sticky>
      <div class="dropdown-wrap">
        <van-dropdown-menu active-color="#6FA5F3">
          <van-dropdown-item
            v-model="form.date"
            :options="date"
            @change="changeDropdown"
          />
          <van-dropdown-item
            v-model="form.platform"
            :options="platform"
            @change="changeDropdown"
          />
          <van-dropdown-item
            v-model="form.model"
            :options="model"
            @change="changeDropdown"
          />
        </van-dropdown-menu>
      </div>
    </van-sticky>
    <template v-for="(item, index) in collectionList" :key="index">
      <Title icon-type="time" :title="parseTime(Number(index))"></Title>
      <Card
        :item="cardItem"
        v-for="(cardItem, cardIndex) in item"
        :key="cardItem.id"
        @click="handleRoute(cardItem.jumpUrl, true)"
      >
        <template v-slot:content>
          <div class="details">
            <div class="price details-bg">
              <div>￥{{ cardItem.price }}</div>
              <div>价格</div>
            </div>
            <div class="amount details-bg">
              <div>{{ cardItem.limitNum }}份</div>
              <div>限量</div>
            </div>
            <div class="desc details-bg">
              <div>
                {{ configStore.modelMap[String(cardItem.exchangeModel)] }}
              </div>
              <div>交易</div>
            </div>
            <div
              v-if="isShowSubscribe"
              class="alarm"
              @click.stop="
                handleSubscribe(
                  cardItem.id,
                  cardItem.subscribe,
                  cardIndex,
                  index
                )
              "
            >
              <img src="@/assets/image/icon-alarm.png" />{{
                cardItem.subscribe === 1 ? "取消" : "提醒"
              }}
            </div>
          </div>
        </template>
      </Card>
    </template>
  </div>
</template>

<script setup lang="ts">
import Title from "@/components/Title.vue";
import Card from "@/components/Card.vue";
import { getBanner, getAirdrop, getPlatform } from "@/api/index";
import useIndexCollection from "@/composables/use-index-collection";
import useSubscribe from "@/composables/use-subscribe";
import { handleRoute } from "@/utils";

defineOptions({
  name: "Index"
});

const configStore = useConfigStore();
// banner
const bannerList = shallowRef<BannerItem[]>([]);
// 领空投
const airdropList = shallowRef<AirdropDetails[]>([]);
// 热门
const hotList = shallowRef<PlatformDetails[]>([]);

const isShowBanner = computed(() => bannerList.value?.length > 0);
const isShowAirdrop = computed(() => airdropList.value?.length > 0);
const isShowHot = computed(() => hotList.value?.length > 0);

// 收藏
const {
  collectionList,
  date,
  platform,
  model,
  form,

  changeDropdown,
  parseTime
} = useIndexCollection();

// 订阅
const { subscribe, isShowSubscribe } = useSubscribe();

async function handleSubscribe(
  id: number | string,
  action: number | string,
  cardIndex: number,
  index: number
) {
  const nextAction = Number(action) === 1 ? 0 : 1;
  await subscribe({ type: 1, id: id, action: nextAction });
  // 改变订阅状态
  collectionList.value[index][cardIndex].subscribe = nextAction;
}

// 获取页面数据
async function getBannerData() {
  const result = await getBanner();
  bannerList.value = result?.list ?? [];
}
async function getAirdropData() {
  const params = {
    pageIndex: 1,
    pageSize: 3,
    showIndex: 1
  };
  ({ list: airdropList.value = [] } = await getAirdrop(params));
}
async function getPlatformData() {
  const params = {
    pageIndex: 1,
    pageSize: 5,
    hot: 1
  };
  ({ list: hotList.value = [] } = await getPlatform(params));
}

function init() {
  getBannerData();
  getAirdropData();
  getPlatformData();
  // getCollectionData();
}

onActivated(async () => {
  init();
});
</script>

<style lang="scss" scoped>
.content {
  //min-height: calc(100vh - var(--van-tabbar-height));
  padding: 10px 15px 0;
  box-sizing: border-box;
  background: url("~@/assets/image/index-bg.png") 0 0/100% 100% no-repeat;
}

.swiper {
  width: 100%;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
}

.swiper-item {
  display: block;
  height: 100px;
  border-radius: 10px;
  img {
    width: 100%;
    height: 100%;
  }
}

.airdrop {
  padding: 10px 14px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
  border-radius: 7px;
  .airdrop-item {
    position: relative;
    padding-left: 12px;
    font-size: 14px;
    color: #8c8c8c;
    line-height: 27px;

    &:after {
      content: "";
      width: 5px;
      height: 5px;
      position: absolute;
      top: 50%;
      left: 0px;
      transform: translate(0, -50%);
      border-radius: 50%;
      background-color: $color-error;
    }
  }
}

.hot {
  height: 78px;
  display: flex;
  justify-content: center;
  align-items: center;

  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
  border-radius: 7px;
  .hot-item {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 20%;
    font-size: 13px;
    color: #666;
    .hot-image {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
      border-radius: 50%;
    }
  }
}

.dropdown-wrap {
  padding: 20px 0 10px;
}
:deep(.van-sticky--fixed) {
  .dropdown-wrap {
    margin: 0 -15px;
    padding: 20px 15px 10px;
    background-color: $bg-color-grey;
  }
}

.details {
  margin-top: 20px;
  display: flex;
  align-items: center;
  .details-bg {
    width: 70px;
    height: 50px;
    padding: 9px 0 0 10px;
    background: url("~@/assets/image/index-details-bg.png") 0 0/100% no-repeat;
    & div:nth-child(1) {
      padding-bottom: 3px;
      font-size: 14px;
      font-weight: bold;
      color: $color-primary;
    }
    & div:nth-child(2) {
      font-size: 13px;
      color: #aeaeae;
    }
  }
  .amount {
    margin: 0 4vw 0 2vw;
  }
  .alarm {
    margin-left: auto;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    font-size: 13px;
    color: $color-error;
    img {
      margin-right: 6px;
      width: 15px;
      height: 15px;
    }
  }
}
</style>
