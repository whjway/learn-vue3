<template>
  <div class="content">
    <img class="avatar" src="@/assets/image/avatar-default.png" />
    <div class="user" @click="handleLogin">{{ userName }}</div>

    <div class="list">
      <div
        class="item"
        v-for="item in toolsList"
        :key="item.id"
        @click="handleRoute(item)"
      >
        <img class="item-image" :src="item.icon" />
        {{ item.title }}
        <img class="item-arrow" src="@/assets/image/icon-more.png" />
      </div>
    </div>

    <ServicerDialog ref="servicer"></ServicerDialog>
  </div>
</template>

<script setup lang="ts">
import { Toast } from "vant";
import ServicerDialog from "@/components/ServicerDialog.vue";
defineOptions({
  name: "Me"
});

const router = useRouter();
const userStore = useUserStore();
const toolsList = [
  {
    id: 1,
    icon: require("@/assets/image/me-follow.png"),
    title: "我的关注",
    type: "follow",
    isLogin: true
  },
  {
    id: 2,
    icon: require("@/assets/image/me-alarm.png"),
    title: "我的提醒",
    type: "subscribe",
    isLogin: true
  },
  {
    id: 3,
    icon: require("@/assets/image/me-business.png"),
    title: "商务合作",
    type: "servicer"
  },
  {
    id: 4,
    icon: require("@/assets/image/me-service.png"),
    title: "联系客服",
    type: "servicer"
  },
  {
    id: 5,
    icon: require("@/assets/image/me-setting.png"),
    title: "设置",
    type: "setting"
  }
];
const servicer = ref();

const isLogin = computed(() => userStore.isLogin);
const userName = computed(() =>
  isLogin.value ? `数藏 ${userStore.user?.uname}` : "点击登录"
);

function handleRoute(item: MeItem) {
  if (item.isLogin && !isLogin.value) {
    Toast("请先登录");
  } else if (item.type === "servicer") {
    servicer.value.toggle();
  } else {
    router.push({
      path: `/${item.type}`
    });
  }
}
function handleLogin() {
  if (isLogin.value) return;
  router.push({
    path: "/login"
  });
}
</script>

<style lang="scss" scoped>
.content {
  //min-height: calc(100vh - var(--van-tabbar-height));
  padding: 22px 15px 10px;
  box-sizing: border-box;
  background: url("~@/assets/image/index-bg.png") 0 0/100% 100% no-repeat;
  text-align: center;

  .avatar {
    width: 70px;
    height: 70px;
    margin-bottom: 7px;
  }
  .user {
    padding-bottom: 30px;
    font-size: 17px;
    color: #2e2e2e;
    //font-weight: bold;
  }
  .list {
    padding: 10px 20px;
    background: #ffffff;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
    border-radius: 10px;
    .item {
      height: 45px;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      font-size: 14px;
      color: #333333;

      .item-image {
        margin-right: 10px;
        width: 18px;
        height: 18px;
      }

      .item-arrow {
        margin-left: auto;
        width: 7px;
        height: 12px;
      }
    }
  }
}
</style>
