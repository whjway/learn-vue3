<template>
  <div class="no-result">
    <div class="no-result-content">
      <div class="icon"></div>
      <p class="text" v-html="title"></p>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
export default {
  name: 'no-result',
  data() {
    return {
      title: ''
    }
  },
  methods: {
    setTitle(title) {
      this.title = title
    }
  }
}
</script>
<style>
.gloable-reative {
  position: relative;
}
</style>
<style lang="scss" scoped>
.no-result {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate3d(-50%, -50%, 0);
  .no-result-content {
    text-align: center;
    .icon {
      width: 240px;
      height: 130px;
      margin: 0 auto;
      background-image: url(./no-result.png);
      background-size: 240px 130px;
    }
    .text {
      margin-top: 10px;
      font-size: 12px;
      color: #666;
      line-height: 1.4;
    }
  }
}
</style>
