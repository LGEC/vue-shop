<template>
<div class="banner">
  <yd-slider autoplay="3000" style="height:3rem;">
    <yd-slider-item v-for="(banner,key,index) in banners" :key="index">
      <a v-bind:href="banner.adUrl">
          <img :src=" host + banner.adFile">
        </a>
    </yd-slider-item>
  </yd-slider>
</div>
</template>

<script>
import config from '@/config.js';
export default {
  props: {
    banners: {
      type: Array,
      require: true
    }
  },
  data() {
    return {
      host: config.host,
    }
  },
  created: function() {
    // `this` 指向 vm 实
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner {
  /* height: 3rem; */
  overflow: hidden;
}
</style>
