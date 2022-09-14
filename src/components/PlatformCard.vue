<template>
  <div class="card">
    <div class="info">
      <div class="info-image-wrap">
        <img class="info-image" :src="item.logo || item.icon" />
      </div>
      <div class="info-content">
        <div class="content-title">
          <span class="title">{{ item.pname || item.name }}</span>
          <slot class="rate"></slot>
          <div class="rate" v-if="isShowRate">
            综合评分
            <img
              v-for="i in item.star"
              :key="i"
              class="rate-image"
              src="@/assets/image/icon-star.png"
            />
          </div>
        </div>
        <div class="content-tag" v-if="item.description">
          <div class="tag">
            <text class="van-ellipsis">{{ item.description }}</text>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps({
  item: {
    type: Object,
    default: () => ({}),
    required: true
  },
  isShowRate: {
    type: Boolean,
    default: true
  }
});
</script>

<style scoped lang="scss">
.card {
  margin: 10px 0;
  padding: 15px;
  background: #ffffff;
  box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
  border-radius: 5px;
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
      border-radius: 6px;
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
        .rate {
          display: flex;
          align-items: center;
          font-size: 15px;
          color: #383a4d;
          .rate-image {
            width: 15px;
            height: 15px;
            margin-right: 3px;
            &:nth-child(1) {
              margin-left: 10px;
            }
          }
        }
      }
      .content-tag {
        display: flex;
        align-items: center;

        .tag {
          min-width: 0;
          display: flex;
          align-items: center;
          margin-right: 30px;
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
