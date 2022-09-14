<template>
  <div class="content">
    <van-cell-group>
      <van-cell
        title="注册协议"
        is-link
        @click="handleRoute('/user-agreement')"
      />
      <van-cell
        title="隐私协议"
        is-link
        :border="false"
        @click="handleRoute('/privacy-agreement')"
      />
    </van-cell-group>

    <div class="button" v-show="!isWeixin" @click="handleSignOut">
      退出我的账号
    </div>
  </div>
</template>

<script setup lang="ts">
import { handleRoute } from "@/utils/index";
defineOptions({
  name: "Setting"
});
const userStore = useUserStore();
const rootStore = useRootStore();
const router = useRouter();
const isWeixin = computed(() => rootStore.browser.isWeixin);

function handleSignOut() {
  userStore.clearUser();
  router.back();
}
</script>

<style lang="scss" scoped>
.content {
  min-height: 100vh;
  padding: 15px 0;
  box-sizing: border-box;
  background-color: $bg-color-grey;
}
.button {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 45px;
  margin-top: 45px;

  font-size: 16px;
  color: $color-error;
  background-color: #fff;
}
</style>
