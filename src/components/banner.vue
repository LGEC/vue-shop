<template>
<div class="banner">
  <yd-slider autoplay="3000" style="height:3rem;">
    <yd-slider-item v-for="(banner,key,index) in banners" :key="index">
      <a v-bind:href="banner.adUrl">
          <img v-bind:src=" host + banner.adFile">
        </a>
    </yd-slider-item>
  </yd-slider>
</div>
</template>

<script>
import config from '@/config.js';
export default {
  data () {
    return {
      banners: [],
      host:config.host,
    }
  },
  created: function(){
    // `this` 指向 vm 实例
    let url = `${config.host}index.php?m=Mobile&c=Index&a=BannerPic`;
    let self = this;
    this.$http.get(url).then( (res) => {
      let data = res.body;
      // console.log(res);
      this.banners.push(...data)
    }, (error)=>{
      console.log(`获取数据失败：${error}`);
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.banner{
  /* height: 3rem; */
  overflow: hidden;
}
</style>
