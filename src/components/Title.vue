<template>
  <div class="title-wrap">
    <div class="title-left">
      <img class="title-left-image" :src="icon" />
      <span>{{ title }}</span>
    </div>
    <div class="title-right" v-if="rightText" @click="$emit('clickRightText')">
      <span>{{ rightText }}</span>
      <img class="title-right-image" src="@/assets/image/icon-more.png" />
    </div>
  </div>
</template>

<script setup langt="ts">
const props = defineProps({
  iconType: {
    type: String,
    default: "airdrop"
  },
  title: {
    type: String,
    default: ""
  },
  rightText: {
    type: String,
    default: ""
  }
});

defineEmits(["clickRightText"]);

const icon = computed(() =>
  require(`@/assets/image/icon-${props.iconType}.png`)
);
</script>

<style scoped lang="scss">
.title-wrap {
  margin: 12px 0;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .title-left {
    font-size: 16px;
    font-weight: bold;
    color: #333;

    .title-left-image {
      margin-right: 6px;
      width: 15px;
      height: 15px;
    }
  }

  .title-right {
    color: #999;

    .title-right-image {
      margin-left: 4px;
      width: 7px;
      height: 10px;
    }
  }
}
</style>
