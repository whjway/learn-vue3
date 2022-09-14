<template>
  <div class="mask">
    <div class="loading">
      <div class="loading-content">
        <van-loading vertical>{{ title }}</van-loading>
        <!--      <img width="24" height="24" src="./loading.gif">-->
        <!--      <p class="desc">{{title}}</p>-->
      </div>
    </div>
  </div>
</template>

<script>
import { Loading } from "vant";

export default {
  name: "Loading",
  components: {
    [Loading.name]: Loading
  },
  data() {
    return {
      title: "正在载入..."
    };
  },
  methods: {
    setTitle(title) {
      this.title = title;
    }
  }
};
</script>
<style>
.gloable-reative {
  position: relative;
}
</style>
<style lang="scss" scoped>
.mask {
  position: absolute;
  z-index: 10;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  background-color: #fff;
}
.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .loading-content {
    text-align: center;
    .desc {
      line-height: 20px;
      font-size: $font-size-small;
      color: $color-text-l;
    }
  }
}
</style>
