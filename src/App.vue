<template>
  <router-view v-slot="{ Component, route }" class="page" :style="viewStyle">
    <!--    <transition :name="route.meta.transitionName">-->
    <transition name="van-fade">
      <!--      <KeepAlive max="10" exclude="AirdropDetails,PlatformDetails">-->
      <KeepAlive max="10" exclude="Login">
        <component :is="Component" :key="route.path" />
      </KeepAlive>
    </transition>
  </router-view>
  <Tabbar v-show="isShowTabbar"></Tabbar>
</template>

<script setup lang="ts">
import Tabbar from "@/components/Tabbar.vue";
const route = useRoute();
const configStore = useConfigStore();
const isShowTabbar = ref(false);
// 兼容ios安全底部以及tabbar导航栏
const viewStyle = computed(() => ({
  bottom: isShowTabbar.value
    ? "calc(var(--van-tabbar-height) + env(safe-area-inset-bottom))"
    : "0"
}));

watchEffect(() => {
  isShowTabbar.value = !!route.meta.tabbar;
});

onBeforeMount(async () => {
  // 初始化加载下拉栏数据，跳转页面不会重复调用
  await configStore.getConfig();
});
</script>
<style lang="scss">
#app {
  height: 100%;
  color: $text-color;
  font-size: $font-size-sm;
}
.page {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  overflow: auto;
}
</style>
