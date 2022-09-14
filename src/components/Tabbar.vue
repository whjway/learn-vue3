<template v-once>
  <van-tabbar route active-color="#6FA5F3" inactive-color="#2e2e2e">
    <van-tabbar-item
      replace
      :to="item.path"
      v-for="item in tabbarList"
      :key="item.path"
    >
      <span>{{ item.name }}</span>
      <template #icon="props">
        <img :src="props.active ? item.active : item.inactive" />
      </template>
    </van-tabbar-item>
  </van-tabbar>
</template>

<script setup lang="ts">
const tabbarList = [
  {
    path: "/",
    name: "首页",
    active: require("@/assets/image/tabbar-home-selected.png"),
    inactive: require("@/assets/image/tabbar-home.png")
  },
  {
    path: "/airdrop",
    name: "领空投",
    active: require("@/assets/image/tabbar-airdrop-selected.png"),
    inactive: require("@/assets/image/tabbar-airdrop.png")
  },
  {
    path: "/platform",
    name: "找平台",
    active: require("@/assets/image/tabbar-platform-selected.png"),
    inactive: require("@/assets/image/tabbar-platform.png")
  },
  {
    path: "/me",
    name: "我的",
    active: require("@/assets/image/tabbar-me-selected.png"),
    inactive: require("@/assets/image/tabbar-me.png")
  }
];

defineExpose({ tabbarList });
</script>
