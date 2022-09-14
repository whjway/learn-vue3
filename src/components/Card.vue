<template>
  <div class="card" v-if="item.picture">
    <div class="info">
      <div class="info-image-wrap">
        <img class="info-image" :src="item.picture" />
      </div>
      <div class="info-content">
        <div class="content-title">
          <span class="title">{{ item.title }}</span> <slot name="alarm"></slot>
        </div>
        <div class="content-tag">
          <div class="tag">
            <img class="tag-image" :src="item.producerPic" />
            <span class="van-ellipsis">{{ item.producer }}</span>
          </div>
          <div class="tag">
            <img class="tag-image" :src="item.authorPic" />
            <text class="van-ellipsis">{{ item.author }}</text>
          </div>
        </div>
      </div>
    </div>
    <slot name="content" :item="item"></slot>
  </div>
</template>

<script setup lang="ts">
import type { PropType } from "vue";

defineProps({
  item: {
    type: Object as PropType<CardItem>,
    default: () => ({}),
    required: true
  }
});
</script>

<style scoped lang="scss">
.card {
  margin: 15px 0;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
  border-radius: 10px;
  .info {
    display: flex;
    justify-content: flex-start;
    align-items: center;
    .info-image-wrap {
      margin-right: 10px;
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid $border-color;
      border-radius: 3px;
      .info-image {
        display: block;
        width: 55px;
        height: 55px;
        border-radius: 50%;
      }
    }

    .info-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: space-around;
      height: 60px;
      .content-title {
        display: flex;
        justify-content: space-between;
        .title {
          font-weight: bold;
          font-size: 17px;
          color: #2e2e2e;
        }
      }
      .content-tag {
        display: flex;
        align-items: center;

        .tag {
          min-width: 0;
          display: flex;
          align-items: center;
          margin-right: 15px;
          color: #aeaeae;
        }
        .tag-image {
          margin-right: 6px;
          width: 15px;
          height: 15px;
          flex-shrink: 0;
        }
      }
    }
  }
}
</style>
