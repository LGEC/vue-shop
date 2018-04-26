<template >
  <div class="container">

    <!-- 返回顶部 -->
    <yd-backtop style="bottom:1.5rem;"></yd-backtop>
    <!-- 返回顶部 end -->

    <div class="top">
      <yd-navbar title="店铺主页" bgcolor="#d94927" color="#fff">
        <section slot="left" @click="handleBack">
          <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        </section>
      </yd-navbar>
    </div>

    <div class="cen">
      <div class="main-pic" :style="{backgroundImage: data.shopBanner}">
        <!-- <yd-slider style="height:4rem;">
          <yd-slider-item>
            <a href="#">
                <img src=" ../assets/img-12.jpg">
              </a>
          </yd-slider-item>
        </yd-slider> -->
      </div>
      <!-- 联系方式 -->
      <div class="contact">
        <p class="shop-name">{{data.shopName}}</p>
        <p class="shop-area">所在地区：<span>{{data.shopAddress}}</span></p>
        <p class="shop-tel">联系方式：<a :href="tel">{{data.shopTel}}</a></p>
        <p class="shop-tel" v-if="data.qqNo !== '' ">Q Q客服：<a :href="qq">{{data.qqNo}}</a></p>
      </div>

      <div class="goods-list">
        <p class="title">
          本店所有商品
        </p>
        <goodslist v-if="url" :url="url" :theme="3"></goodslist>
      </div>
    </div>


  </div>
</template>

<script>
import config from '@/config.js';
export default {
  data(){
    return{
      url:``,
      qq:'',
      tel:'',
      data:{}
    }
  },
  created(){
    let shopId = this.$route.params.shopId;
    this.url = `${config.host}index.php?m=Mobile&c=Shops&a=getShopGoodsList&shopId=${shopId}&p=`;
    let shopUrl = `${config.host}index.php?m=Mobile&c=Shops&a=getShopInfo&shopId=${shopId}`;
    this.$http.get(shopUrl).then((res)=>{
      let data = res.body;
      data.shopBanner = `url(${config.host}${data.shopBanner})`;
      this.data = data;
      this.qq = 'tencent://message/?uin='+data.qqNo+'&Site=400301.com&Menu=yes';
      this.tel = 'tel:'+data.shopTel;
      // console.log(this.data);
    },(error)=>{
      //错误回调
    })
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
      // console.log(this.$router);
    }
  }
}
</script>

<style scoped>
.main-pic{
  width: 100%;
  height: 4rem;
  background-color: #666;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  overflow: hidden;
}
.contact{
  width: 100%;
  background: #ffffff;
  padding: 0.1rem .2rem;
}
.contact p{
  border-bottom: 1px solid #eee;
}
.contact .shop-name{
  height: .8rem;
  line-height: .8rem;
  color: #353535;
  font-size: .3rem;
  font-weight: bold;
}
.contact .shop-area,
.contact .shop-tel{
  line-height: .7rem;
}
.contact .shop-area span,
.contact .shop-tel span{
  float: right;
  font-size: .24rem;
}
.goods-list {
  margin-top: .2rem;
}
.goods-list .title{
  padding: 0 .2rem;
  font-size: .28rem;
  color: #353535;
  font-weight: bold;
  line-height: .8rem;
  background: #ffffff;
}
</style>
