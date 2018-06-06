<template>
<div class="container hasnav">
  <!-- 头部 -->
  <navIndex></navIndex>
  <!-- 头部 end-->
  <!-- 轮播图 -->
  <banner :banners="banners"></banner>
  <!-- 轮播图 end-->
  <!-- 滚动公告 -->
  <router-link :to="{name:'messages',params:{userId:userId}}">
    <rollNotice></rollNotice>
  </router-link>
  <!-- 滚动公告 end-->
  <!-- 宫格快捷入口 -->
  <grides></grides>
  <!-- 宫格快捷入口 end-->
  <!-- 专题模块 -->
  <div class="special-list" v-for="(item,index) of specials" :key="index">
    <special :specialData="item"></special>
  </div>
  <!-- 专题模块 end-->
  <!-- 热门推荐列表 -->
  <div class="goods-sug">
    <div class="goods-sug-tit">
      <span>热门推荐</span>
    </div>
    <div class="goods-sug-box">
      <goodslist :url="url"></goodslist>
    </div>
  </div>
  <!-- 热门推荐列表 end-->
  <!-- 底部导航 -->
  <navbar navbar="1"></navbar>
  <!-- 底部导航 end-->
  <!-- 返回顶部 -->
  <yd-backtop style="bottom:1.5rem;"></yd-backtop>
  <!-- 返回顶部 end -->

</div>
</template>

<script>
import config from '@/config.js';
//注册专题组件
import special from "@/components/special";
export default {
  data() {
    return {
      banners: [],
      userId: '',
      specials: [],
      mjTest: '',
      url: ``,
    }
  },
  beforeCreate() {
    this.$http.get(`${config.host}index.php?m=Mobile&c=Users&a=getUserId`).then(res => {
      window.localStorage.setItem('userId', res.body);
      // window.localStorage.setItem('userId', 157);
      this.userId = window.localStorage.getItem('userId');
    });
  },
  mounted() {
    let self = this;
    let specialUrl = `${config.host}index.php?m=Mobile&c=Index&a=Ads&rows=20`;
    let url = `${config.host}index.php?m=Mobile&c=Index&a=BannerPic`;
    this.$dialog.loading.open('数据加载中');
    console.log('::::::::::::::::::::::startrequest');
      this.$http.get(url).then((res) => {
        let banners = res.body || [];
        this.banners.push(...banners);
        this.$dialog.loading.close();
      });
      this.$http.get(specialUrl).then(res => {
        console.log(res);
        let temp = res.body || [];
        this.specials.push(...temp);
        console.log(this.specials);
      });
    this.url = `${config.host}index.php?m=Mobile&c=Index&a=goodsHot&p=`;
  },
  components:{
    special
  }
}
</script>

<style scoped>
.yd-backtop {
  bottom: 1.5rem !important;
}

.goods-sug-tit {
  width: 100%;
  height: .8rem;
  background: #fff;
  font-size: .32rem;
  color: #353535;
  line-height: .8rem;
  text-align: center;
  margin-top: .2rem;
}

.goods-sug-tit span {
  background-color: #ffffff;
  padding: 0 .1rem;
  position: relative;
  z-index: 3;

}

.goods-sug-tit span::before {
  content: '';
  position: absolute;
  left: -50%;
  top: 50%;
  z-index: -1;
  padding: 0 1.5rem;
  height: 1px;
  background: transparent;
  border-bottom: 1px solid #444;
}
</style>
