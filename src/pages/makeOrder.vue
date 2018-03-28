<template >
<div class="container hasnav">

  <div class="top">
    <yd-navbar title="确认订单" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">

    <!-- 地址 -->
    <div class="address" @click="chooseAddress">
      <yd-flexbox>
        <yd-flexbox-item v-if="!orderData.defaultAddress">
          请选择
        </yd-flexbox-item>
        <yd-flexbox-item v-if="orderData.defaultAddress">
          <div class="item-top">
            {{orderData.defaultAddress.userName}} <span class="phone">{{orderData.defaultAddress.userPhone}}</span>
          </div>
          <div class="item-address">
            <span class="default" v-if="orderData.defaultAddress.isDefault == 1">[默认]</span>{{orderData.defaultAddress.areaId1}} {{orderData.defaultAddress.areaId2}} {{orderData.defaultAddress.areaId3}} {{orderData.defaultAddress.address}}
          </div>
        </yd-flexbox-item>
        <div>
          <yd-icon name="more" size=".4rem" color="#999"></yd-icon>
        </div>
      </yd-flexbox>
    </div>
    <!-- 彩条 -->
    <div class="color-line"></div>

    <!-- 弹出选择框 -->
    <div class="choose">
      <yd-popup v-model="show" position="bottom" height="60%">
        <div class="choose-top" slot="top">
          <yd-flexbox>
            <div class="choose-false" @click="show=false">取消</div>
            <yd-flexbox-item>
              <div class="choose-tit">
                更改收货地址
              </div>
            </yd-flexbox-item>
            <div class="choose-true" @click="changeAddress">确定</div>
          </yd-flexbox>
        </div>
        <div class="choose-cen">
          <yd-radio-group v-model="radio" size="16" color="#e8380d">
            <yd-radio :val="item.addressId" class="add-item" v-for="item,key in this.addressData" :key="key">
              <i class="choose-address">
                <i class="item-top">
                  {{item.userName}} <span class="phone">{{item.userPhone}}</span>
                </i>
              <br>
              <i class="pl item-address">
                  <span class="default" v-if="item.isDefault == 1">[默认]</span>{{item.areaId1}} {{item.areaId2}} {{item.areaId3}} {{item.address}}
                </i>
              </i>
            </yd-radio>
          </yd-radio-group>
        </div>
      </yd-popup>
    </div>

    <!-- 商品列表 -->
    <div class="goods-list">
      <div class="item" v-for="item,key in orderData.goodsData" :key="key">
        <yd-flexbox>
          <div class="goods-img">
            <img :src="item.goodsThums" alt="">
          </div>
          <yd-flexbox-item class="list-body-right">
            <p>{{item.goodsName}}</p>
            <div class="goods-type">
              规格：“<span>{{item.goodsAttr}}</span>”
            </div>
            <p class="goods-price">
              单价：<i>{{item.goodsPrice}} 两</i><span>×{{item.cnt}}</span>
            </p>
          </yd-flexbox-item>
        </yd-flexbox>
      </div>
    </div>
  </div>

  <!-- 统计信息 -->
  <div class="money">
    <div class="title">
      商品合计
    </div>
    <yd-cell-group>

      <yd-cell-item>
        <span slot="left">商品总价</span>
        <span slot="right">{{orderData.totalMoney}} 两</span>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">邮费</span>
        <span slot="right">{{orderData.deliverMoney}} 两</span>
      </yd-cell-item>

    </yd-cell-group>
  </div>

  <!-- 统计信息 -->
  <div class="money">
    <div class="title">
      买家留言
    </div>
    <div class="text">
      <yd-textarea slot="right" v-model="orderRemarks" placeholder="选填：对本次交易的说明"></yd-textarea>
    </div>
  </div>

  <!-- 固定底部 -->
  <div class="fixed-bot">
    <yd-flexbox>
      <yd-flexbox-item>
        <p class="bot-left">总计：<span>{{orderData.realTotalMoney}}   两</span></p>
      </yd-flexbox-item>
      <div class="sure-btn" @click="confirmOrder1">
        余额支付
      </div>
      <div class="sure-btn" @click="confirmOrder" v-if="mjtype">
        微信支付
      </div>
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
      orderData: {}, //渲染到页面的数据（上一个页面传过来的）
      addressData: [], //地址数据
      orderRemarks: '', //文本域
      mjtype: 1,
      postData: {}, //确认订单提交的数据
      radio: 0,
      show: false
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    console.log(this.$route.query.mjtype);
    this.orderData = this.$route.query.data;
    console.log(this.orderData);
    this.mjtype = this.$route.query.mjtype == 2 ? true : false;
    this.radio = this.orderData.addressId;
    // console.log(this.radio);
    // for (let i = 0; i < this.orderData.goodsData.length; i++) {
    //   this.orderData.goodsData[i].goodsThums = config.host + this.orderData.goodsData[i].goodsThums;
    // }
    // console.log(this.orderData);
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
      // console.log(this.$router);
    },
    // 选择地址
    chooseAddress() {
      this.show = true;

      let url = `${config.host}index.php?m=Mobile&c=UserAddress&a=getUserAddress&userId=${userId}`;
      this.$http.get(url).then((res) => {
        this.addressData = res.body;
        console.log(res.body);
      })
    },
    // 更改地址
    changeAddress() {
      // console.log(this.radio);
      // console.log(this.orderData.addressId);
      if (this.radio != this.orderData.addressId) {
        this.orderData.addressId = this.radio;
        // console.log(this.orderData.addressId);
        for (let i = 0; i < this.addressData.length; i++) {
          if (this.addressData[i].addressId == this.radio) {
            this.orderData.defaultAddress = this.addressData[i];
            // console.log(this.orderData.address);
            // console.log(this.orderData);
          };
        }
      };
      this.show = false;
    },
    confirmOrder1() {
      console.log(userId);
      this.postData.addressId = this.orderData.addressId; //地址ID
      this.postData.orderIds = this.orderData.orderIds; //订单ID
      this.postData.orderRemarks = this.orderRemarks; //留言
      // console.log(this.postData);
      let url = `${config.host}index.php?m=Mobile&c=Orders&a=addOrders&userId=${userId}&orderId=${this.postData.orderIds}&consigneeId=${this.postData.addressId}&remarks=${this.postData.orderRemarks}&type=2&totalMoney=${this.orderData.realTotalMoney}`;
      this.$http.post(url, this.postData, {
        emulateJSON: true
      }).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.$dialog.toast({
            icon: 'success',
            mes: '下单成功!',
            timeout: 1500,
            callback: () => {
              // window.location.href = 'http://00.37518.com/index.php?m=Mobile&c=Payments&a=toPay';
              this.$router.go(-1);
            }
          });
        }else if(res.data.status == -6){
          this.$dialog.toast({
            icon: 'error',
            mes: '账户余额不足',
            timeout: 1500
          });
        } else {

          this.$dialog.toast({
            icon: 'error',
            mes: '网络异常，请重试!',
            timeout: 1500
          });
        }
      });
    },
    //提交订单
    confirmOrder() {
      this.postData.addressId = this.orderData.addressId; //地址ID
      this.postData.orderIds = this.orderData.orderIds; //订单ID
      this.postData.orderRemarks = this.orderRemarks; //留言
      // console.log(this.postData);
      let url = `${config.host}index.php?m=Mobile&c=Orders&a=addOrders&userId=${userId}&orderId=${this.postData.orderIds}&consigneeId=${this.postData.addressId}&remarks=${this.postData.orderRemarks}&type=1&totalMoney=${this.orderData.realTotalMoney}`;
      this.$http.post(url, this.postData, {
        emulateJSON: true
      }).then((res) => {
        console.log(res);
        if (res.data.status == 1) {
          this.$dialog.toast({
            icon: 'success',
            mes: '正在生成订单~~~',
            timeout: 1500,
            callback: () => {
              window.location.href = `${config.host}index.php?m=Mobile&c=Payments&a=toPay`;
              // this.$router.go(-1);
            }
          });
        } else {
          this.$dialog.toast({
            icon: 'error',
            mes: '网络异常，请重试!',
            timeout: 1500
          });
        }
      });
    }
  }
}
</script>

<style scoped>
/* 默认地址 */

.address {
  width: 100%;
  height: auto;
  padding: .1rem .2rem;
  background: #fffbef;
}

.color-line {
  width: 100%;
  height: 3px;
  background-image: url('../assets/add-line.png');
  background-repeat: repeat-x;
  /* background-size: 100%; */
  background-position: left top;
}

.item-top {
  line-height: .5rem;
}

.item-top span {
  margin-left: .5rem;
}

.item-address {
  padding-right: .2rem;
  font-size: .24rem;
  line-height: .4rem;
}

.default {
  color: #e8380d;
  font-size: .24rem;
  font-weight: bold;
}

/* 更换地址 */

.choose-top {
  height: 0.9rem;
  line-height: .9rem;
  border-bottom: 1px solid #e0e0e0;
}

.choose-top .choose-false,
.choose-top .choose-true {
  width: 1.4rem;
  text-align: center;
}

.choose-top .choose-tit {
  text-align: center;
  color: #353535;
  font-size: .32rem;
}

.add-item {
  width: 100%;
  display: block;
  border-bottom: 1px solid #eee;
  padding: 0.2rem;
}

.pl {
  margin-left: .5rem;
  display: inline-block;
}

.add-item span {
  display: inline-block;
}

/* 商品简要 */

.goods-list {
  background: #ffffff;
}

.item {
  width: 100%;
  padding: 0.2rem;
  border-bottom: 1px solid #e5e5e5;
}

.item:last-child {
  border-bottom: 0;
}

.item .goods-img {
  width: 1.8rem;
  height: 1.8rem;
  overflow: hidden;
}

.item .goods-img img {
  width: 100%;
}

.list-body-right {
  padding-left: .2rem;
}

.list-body-right .goods-type {
  color: #666;
  font-size: .24rem;
  line-height: .4rem;
}

.list-body-right .goods-type span {
  color: #999;
}

.goods-price {
  font-size: .24rem;
  color: #666;
}

.goods-price i {
  color: #e8380d;
}

.goods-price span {
  float: right;
}

/* bot */

.fixed-bot {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  background: #fafafa;
  position: fixed;
  bottom: 0;
}

.sure-btn {
  width: 2.4rem;
  text-align: center;
  color: #fff;
  background: #E8380d;
  font-size: .32rem;
}

.bot-left {
  padding: 0 .2rem;
}

.bot-left span {
  color: #e8380d;
}

/* 统计 */

.money {
  width: 100%;
  background: #ffffff;
  margin-top: .2rem;
}

.title {
  height: .7rem;
  line-height: .7rem;
  padding: 0 .3rem;
  color: #101010;
  font-size: .30rem;
  border-bottom: 1px solid #eee;
}

.text {
  padding: 0 .3rem;
}
</style>
