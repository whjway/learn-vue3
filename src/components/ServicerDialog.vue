<template>
  <van-popup v-model:show="show">
    <img class="servicer" src="@/assets/image/servicer.png" alt="" />
  </van-popup>
</template>

<script setup lang="ts">
const show = ref(false);

function toggle() {
  show.value = !show.value;
}
function close() {
  show.value = false;
}

onDeactivated(close);

defineExpose({
  toggle
});
</script>

<style lang="scss" scoped>
.servicer {
  width: 70vw;
}
</style>
