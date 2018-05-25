<template>
<div class="container hasnav">
  <!-- 返回顶部 -->
  <yd-backtop style="bottom:1.5rem;"></yd-backtop>
  <!-- 返回顶部 end -->

  <div class="top">
    <yd-navbar title="商品详情" bgcolor="#e8380d" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>
  <div class="cen">
    <!-- 商品主图 -->
    <div class="slidebox">

      <yd-slider>
        <yd-slider-item v-for=" item,key in data.goodsAlbum" :key="key">
          <img :src="item.goodsImg">
        </yd-slider-item>
      </yd-slider>

    </div>
    <div class="goodsinfo">
      <div class="goods-tit">{{data.goodsName}}
      </div>
      <div class="goods-desc"> {{data.goodsSpec}}
      </div>
      <div class="goods-price" v-if="data.userType == 2">会员价：{{data.marketPrice}}两</div>
      <div class="goods-price"> 零售价：{{data.shopPrice}} 元 <span class="goods-sales">评分: {{data.goodsScore}} &nbsp; 已售: {{data.saleCount}}</span> <span class="postage">快递：{{data.deliveryMoney}} 两</span>
      </div>
      <p class="add" v-if="data.FreeMoney">本商品满{{data.FreeMoney}}元即享包邮</p>
    </div>
    <div class="table-box">
      <yd-tab active-color="#e8380d">
        <yd-tab-panel label="详情" active tabkey="1">
          <div class="goods-info" v-html="data.goodsDesc">
            <!-- 这里面放详情 -->
          </div>
        </yd-tab-panel>
        <yd-tab-panel :label="'评论('+data.couponsCount+')'" tabkey="2">
          <div class="comment">
            <p v-if="!data.goods_appraises">暂无评论</p>
            <div class="comment-item" v-for="item,key in data.goods_appraises" :key="key">
              <p class="com-mame">{{item.loginName}}<span><yd-rate slot="left" v-model="item.goodsScore" size=".4rem" readonly></yd-rate></span></p>
              <p class="com-info">{{item.content}} <span class="com-time">【{{item.createTime}}】</span>
              </p>
            </div>

          </div>
        </yd-tab-panel>
      </yd-tab>
    </div>

    <!-- 本店其他商品 -->
    <div class="other">
      <div class="other-tit">
        本店其他商品
      </div>
      <goodslist v-if="url" :url="url" :theme="3"></goodslist>
    </div>
  </div>

  <!-- 弹出选择框 -->
  <div class="choose">
    <yd-popup v-model="show" position="bottom" height="60%">
      <div class="choose-top" slot="top">
        <p class="choose-tit">{{data.goodsName}}</p>
        <p class="choosed">已选：“<span>{{totalAttr}} ， {{spinner}}{{data.goodsUnit}} ， <i>{{totalPrice}} {{data.userType == 2 ? '两' : '元'}}</i></span>”</p>
      </div>
      <div class="choose-cen">
        <div class="choose-type">
          <p class="choose-type-tit">选择规格：</p>
          <yd-radio-group v-model="radio" size="16" color="#e8380d">
            <yd-radio v-for="item,key in data.goodsAttrs" :val="key" :key="key">{{item.attrVal}}</yd-radio>
          </yd-radio-group>
        </div>
        <div class="choose-num">
          <p class="choose-type-tit">选择数量：</p>
          <yd-spinner longpress v-model="spinner" :max="attrStock"></yd-spinner>
          <span>库存：{{attrStock}}</span>
        </div>


      </div>
      <div class="btn-group" slot="bottom">
        <yd-flexbox>
          <yd-flexbox-item>
            <div class="inCar">
              <yd-button bgcolor="#353535" color="#FFF" @click.native="inCar">加入购物车</yd-button>
            </div>
          </yd-flexbox-item>
          <yd-flexbox-item>
            <div class="buy" @click.native="show = true">
              <yd-button bgcolor="#e8380d" color="#FFF" @click.native="buyNow">立即购买</yd-button>
            </div>

          </yd-flexbox-item>
        </yd-flexbox>
      </div>

    </yd-popup>
  </div>






  <div class="bot">
    <yd-flexbox>
      <div class="collect" @click="collect">
        <yd-icon :name="data.favoriteGoodsId == 0 ? 'star-outline' : 'star' " size=".4rem" color="#e8380d"></yd-icon>
        <p>收藏</p>
      </div>
      <div class="shop">
        <router-link :to="{ name: 'shop', params: { shopId : data.shopId} }">
          <yd-icon name="home-outline" size=".4rem" color="#e8380d"></yd-icon>
          <p>店铺</p>
        </router-link>
      </div>
      <yd-flexbox-item>
        <div class="inCar">
          <yd-button bgcolor="#353535" color="#FFF" @click.native="show = true">加入购物车</yd-button>
        </div>
      </yd-flexbox-item>
      <yd-flexbox-item>
        <div class="buy" @click.native="show = true">
          <yd-button bgcolor="#e8380d" color="#FFF" @click.native="show = true">立即购买</yd-button>
        </div>

      </yd-flexbox-item>
    </yd-flexbox>
  </div>
</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      orderData: {}, //确认订单的数据
      rate: 0, //星评 整数
      show: false, //显示加入购物车
      radio: 1, //选了那个配置
      spinner: 1, //数量
      data: {
        favoriteGoodsId: 0
      },
      url: ``,
      totalPrice: '', //总价
      attrStock: 0, //库存
      totalAttr: '', //规格
      totalAttrPrice: 0 //规格
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    let self = this,
      goodsId = this.$route.params.goodsId;

    let url = `${config.host}index.php?m=Mobile&c=Goods&a=getGoodsDetails&goodsId=${goodsId}&userId=${userId}&p=`;
    this.$http.get(url).then((res) => {
      let data = res.body;
      console.log(data);
      self.data = data;
      for (let i = 0; i < data.goodsAlbum.length; i++) {
        data.goodsAlbum[i].goodsImg = config.host + data.goodsAlbum[i].goodsImg;
      };
      data.goodsImg = config.host + data.goodsImg;
      let firstImg = data.goodsImg;
      let imgBox = data.goodsAlbum;
      imgBox.unshift({
        "goodsImg": firstImg
      });
      // console.log(data);
      for (let j = 0; j < data.goodsAttrs.length; j++) {
        if (data.goodsAttrs[j].isRecomm == 1) {
          self.radio = j;
          self.totalAttr = self.data.goodsAttrs[j].attrVal;
          break;
        }
      };
      console.log('1111111111111111');
      console.log(self.radio);
      self.data = data;
      self.url = `${config.host}index.php?m=Mobile&c=Shops&a=getShopGoodsList&shopId=${data.shopId}&p=`;
      // console.log(data);
    }, (error) => {
      // console.log(error);
    });
  },
  watch: {
    radio: function(now) {
      this.attrStock = this.data.goodsAttrs[now].attrStock;
      this.totalAttr = this.data.goodsAttrs[now].attrVal;
      this.totalAttrPrice = this.data.goodsAttrs[now].attrPrice;
      if(this.data.userType == 2){
        this.totalPrice = parseFloat(this.data.marketPrice) * this.spinner;
      }else{
        this.totalPrice = parseFloat(this.data.goodsAttrs[now].attrPrice) * this.spinner;
      }

      this.totalPrice = this.totalPrice.toFixed(2);
      // console.log(now);
    },
    spinner: function(now) {
      console.log(now);
      // this.data = now.replace(/[^/d]/g,'');
      // if(now>this.attrStock*1) this.spinner = this.attrStock;
      // if(now <= 0) this.spinner = 1;
      if(this.data.userType == 2){
        this.totalPrice = parseFloat(this.data.marketPrice) * this.spinner;
      }else{
        // console.log(now+'-------------------'+this.data.goodsAttrs[now].attrPrice);
        this.totalPrice = parseFloat(this.data.goodsAttrs[this.radio].attrPrice) * this.spinner;
      }

      this.totalPrice = this.totalPrice.toFixed(2);
      // console.log(this.totalPrice);
    },
    '$route' (to, from) {
      this.$router.go(0);
      // $route.push({path:`${to.fullPath}`});
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    collect() {
      let goodsId = this.data.goodsId,
        url = `${config.host}index.php?m=Mobile&c=Goods&a=favoriteGoods&goodsId=${goodsId}&userId=${userId}`;
      if (this.data.favoriteGoodsId == 1) {
        this.$dialog.toast({
          mes: '已经收藏过啦!',
          timeout: 1500
        });
      } else {
        this.$http.get(url).then((res) => {
          console.log(res);
          if (res.body.status == 1) {
            this.$dialog.toast({
              mes: '收藏成功!',
              timeout: 1500
            });
            this.data.favoriteGoodsId = 1;
          } else {
            this.$dialog.toast({
              mes: '网络异常，请重试!',
              timeout: 1500
            });
          }
        })
      };

    },
    inCar() {
      if (this.attrStock * 1 <= 0) {
        this.$dialog.toast({
          mes: '该商品库存不足',
          timeout: 1500
        });
      } else {
        let goodsId = parseInt(this.data.goodsId),
          goodsCnt = this.spinner,
          goodsAttrId = parseInt(this.data.goodsAttrs[this.radio].id);
        // console.log(userId, goodsId, goodsCnt, goodsAttrId);

        //加入购物车
        let url = `${config.host}index.php?m=Mobile&c=Cart&a=addToCartAjax`;
        this.$http.post(url, {
          userId: userId,
          goodsId: goodsId,
          goodsCnt: goodsCnt,
          goodsAttrId: goodsAttrId
        }, {
          emulateJSON: true
        }).then((res) => {
          if (res.body.status === 1) {
            this.$dialog.toast({
              mes: '加入购物车成功!',
              timeout: 1500
            });
            this.show = false;
          }
        }, (err) => {
          console.log(err);
        })
      }

    },
    buyNow() {
      if (this.attrStock * 1 <= 0) {
        this.$dialog.toast({
          mes: '该商品库存不足',
          timeout: 1500
        });
      } else {
        let goodsId = parseInt(this.data.goodsId),
          goodsCnt = this.spinner,
          goodsAttrId = parseInt(this.data.goodsAttrs[this.radio].id);
        // console.log(userId, goodsId, goodsCnt, goodsAttrId);

        //把数据放进orderData中
        this.orderData.userId = userId;
        this.orderData.goodsData = [];
        this.orderData.goodsData.push({
          goodsId: goodsId, //商品ID
          goodsAttrId: goodsAttrId, //属性ID
          cnt: goodsCnt, //数量

          goodsName: this.data.goodsName, //商品名字
          goodsPrice: this.data.userType == 2 ? this.data.marketPrice : this.data.shopPrice, //已选规格的单价
          goodsThums: config.host + this.data.goodsThums, //图片
          goodsAttr: this.totalAttr, //已选规格
          shopName: this.data.shopName //店铺名字

        });

        console.log(this.orderData);
        let url = `${config.host}index.php?m=Mobile&c=Orders&a=checkOrderInfo`;
        this.$http.post(url, this.orderData, {
          emulateJSON: true
        }).then((res) => {
          // console.log(res);
          let data = res.body;
          console.log(data);

          this.orderData.defaultAddress = data.defaultAddress; //默认地址
          this.orderData.addressId = data.defaultAddress ? data.defaultAddress.addressId : 0; //默认地址ID
          this.orderData.orderIds = data.orderIds; //订单ID
          this.orderData.totalMoney = data.totalMoney; //商品价格
          this.orderData.deliverMoney = data.deliverMoney; //邮费
          this.orderData.realTotalMoney = data.realTotalMoney; //总价
          this.orderData.userMoney = data.userMoney; //余额

          this.$dialog.loading.open('正在生成订单...');
          setTimeout(() => {
            this.$dialog.loading.close();
          }, 500);

          if (data.status == 1) {

            // console.log(this.orderData);
            this.$router.push({
              name: 'makeOrder',
              query: {
                data: this.orderData,
                mjtype: 2
              }
            });

          } else if (data.status == -1) {
            this.$dialog.toast({
              mes: res.data.msg,
              timeout: 1500
            });
          } else(
            this.$dialog.toast({
              mes: '网络异常，请重试！',
              timeout: 1500
            })
          )
        });
      }
    }
  }
}
</script>

<style scoped>
.slidebox {
  width: 100%;
  height: 7.5rem;
  overflow: hidden;
}

/* 弹出选择框 */

.choose {
  width: 100%;
  height: 60%;
  position: relative;
}

.choose .btn-group {
  width: 100%;
  height: 1rem;
}

.choose-top {
  width: 100%;
  height: auto;
  padding: .1rem .2rem;
  border-bottom: 1px solid #e5e5e5;
}

.choose-top .choose-tit {
  font-size: .30rem;
  color: #333;
  font-weight: bold;
}

.choose-top .choosed {
  font-size: .28rem;
  line-height: .5rem;
  color: #999;
}

.choose-top .choosed span {
  color: #353535;
}

.choose-top .choosed span i {
  color: #e8380d;
}

.choose-cen {
  padding: .1rem .2rem;
}

.choose-cen .choose-type-tit {
  line-height: .5rem;
  color: #353535;
}

.choose-type {
  margin-bottom: .2rem;
}

.choose-type span {
  display: inline-block;
  height: .7rem;
  margin-right: .2rem;
}

.choose-num {
  clear: both;
}

.choose-num span:last-child {
  margin-left: .2rem;
  float: right;
  display: inline-block;
  height: 30px;
  line-height: 30px;
}

/* 商品详情 */

.goodsinfo {
  width: 100%;
  background: #ffffff;
  margin-bottom: .2rem;
}

.goods-info {
  width: 100%;
  background: #ffffff;
  margin-bottom: .2rem;
  padding: .2rem 0;
}

.goods-info p {
  width: 100% !important;
  padding: 0 .2rem;
}

.goods-info li {
  padding: 0 .2rem;
}

.goods-info img {
  width: 100% !important;
  display: block;
}

.goodsinfo p.add {
  padding: 0 .2rem;
  color: #666;
  height: .8rem;
  line-height: .8rem;
  font-size: .24rem;
}

.goods-info img {
  width: 100%;
  display: block;
}

.goodsinfo .goods-tit {
  font-size: .28rem;
  color: #353535;
  font-weight: bold;
  line-height: .4rem;
  padding: .1rem .2rem;
  max-height: 1rem;
  overflow: hidden;
}

.goodsinfo .goods-desc {
  font-size: .24rem;
  color: #888;
  line-height: .36rem;
  padding: 0 .2rem;
  max-height: .72rem;
  overflow: hidden;
}

.goodsinfo p {
  height: .4rem;
  line-height: .4rem;
  white-space: nowrap;
  overflow: hidden;
  border-top: 1px solid #eee;
  text-overflow: ellipsis;
}

.goods-price {
  height: .5rem;
  line-height: .5rem;
  font-size: .32rem;
  color: #e8380d;
  padding: 0 .2rem;
}

.goods-price .goods-sales,
.goods-price .postage {
  float: right;
  font-size: .24rem;
  color: #999;
}

.postage {
  margin-right: 1rem;
}

/* 评论 */

.comment {
  width: 100%;
  padding-bottom: .2rem;
  background: #f4f8fe;
}

.com-mame {
  height: .6rem;
  line-height: .6rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.comment-item {
  width: 100%;
  height: auto;
  background: #ffffff;
  padding: .1rem .2rem;
  margin-bottom: .2rem;
}

.comment-item p {
  width: 100%;
  line-height: .5rem;
  color: #454545;
  font-size: .28rem;
}

.comment-item p span {
  float: right;
}

.com-time {
  font-size: .24rem;
  color: #999;
  float: none !important;
  display: inline-block;
}

.comment-item .com-info {
  line-height: .4rem;
  font-size: .24rem;
  color: #888;
}

/* 固定底部 */

.bot {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
}

.buy {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #e8380d;
  text-align: center;
  color: #fff;
  font-size: .30rem;
}

.yd-btn {
  font-size: .30rem;
}

.inCar {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #333;
  text-align: center;
  color: #fff;
  font-size: .30rem;
}

.collect,
.shop {
  width: 1rem;
  height: 1rem;
  line-height: .6rem;
  text-align: center;
}

.collect p,
.shop p {
  font-size: .22rem;
  line-height: .2rem;
  color: #999;
}

.shop {
  margin-right: .15rem;
}

.collect {
  margin-left: .15rem;
}

.other .other-tit {
  width: 100%;
  height: .8rem;
  line-height: .8rem;
  font-size: .32rem;
  padding: 0 .2rem;
  color: #333;
  background: #ffffff;
  margin-top: .2rem;
}
</style>
