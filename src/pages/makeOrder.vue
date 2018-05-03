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
          <div class="addBtn" @click="handleAddAddress">
            添加收货地址
          </div>
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
              单价：<i>{{item.goodsPrice}} {{mjtype?'两':'元'}}</i><span>×{{item.cnt}}</span>
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
        <span slot="right">{{orderData.totalMoney}} {{mjtype?'两':'元'}}</span>
      </yd-cell-item>

      <yd-cell-item>
        <span slot="left">邮费</span>
        <span slot="right">{{orderData.deliverMoney}} {{mjtype?'两':'元'}}</span>
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

  <div class="use-market" v-if="mjtype && orderData.userMoney*1 <= orderData.realTotalMoney && orderData.userMoney*1 > 0">
    <yd-checkbox v-model="isUseMarket" shape="circle">当前剩余银两 {{orderData.userMoney}} 是否使用银子抵扣</yd-checkbox>
  </div>

  <!-- 固定底部 -->
  <div class="fixed-bot">
    <yd-flexbox>
      <yd-flexbox-item>
        <p class="bot-left">总计：<span>{{adTotalMoney}}   {{mjtype?'两':'元'}}</span></p>
      </yd-flexbox-item>
      <div class="sure-btn" @click="confirmOrder1" v-if="mjtype">
        余额支付
      </div>
      <div class="sure-btn" @click="confirmOrder">
        微信支付
      </div>
    </yd-flexbox>
  </div>
</div>
</template>

<script>
import config from '@/config.js';
let userId,allowPaymat=true;
export default {
  data() {
    return {
      adTotalMoney: '',
      isUseMarket: false, //是否使用银子折扣
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
  watch: {
    isUseMarket(now) {
      if (now) {
        this.adTotalMoney = this.orderData.realTotalMoney * 1 - this.orderData.userMoney * 1;
      } else {
        this.adTotalMoney = this.orderData.realTotalMoney;
      }
    }
  },
  created() {
    allowPaymat = true;
    console.log(this.$route.query.mjtype);
    console.log('-------------------------------------');
    console.log(window.mjOrderData);
    console.log('-------------------------------------');
    if (window.mjOrderData) {
      this.orderData = window.mjOrderData;
      this.adTotalMoney = this.orderData.realTotalMoney;
      this.mjtype = window.mjType == 2 ? true : false;
      this.radio = this.orderData.addressId;
    } else {
      this.orderData = this.$route.query.data;
      this.adTotalMoney = this.orderData.realTotalMoney;
      this.mjtype = this.$route.query.mjtype == 2 ? true : false;
      this.radio = this.orderData.addressId;
    }

    console.log('addressid=' + this.orderData.addressId);
    // console.log(this.radio);
    // for (let i = 0; i < this.orderData.goodsData.length; i++) {
    //   this.orderData.goodsData[i].goodsThums = config.host + this.orderData.goodsData[i].goodsThums;
    // }
    // console.log(this.orderData);
  },
  methods: {
    //跳转至添加地址页面
    handleAddAddress(e) {
      //跳转页面后返回本页面 数据丢失 为了解决本问题 将数据保存至window对象上(因为项目设计时未使用vuex)
      window.mjOrderData = this.orderData;
      window.mjType = this.mjType;
      console.log('111');
      this.$router.push('/addAddress');
    },
    handleBack() {
      this.$router.go(-1);
      // console.log(this.$router);
    },
    // 选择地址
    chooseAddress() {
      this.show = true;
      this.$dialog.loading.open('数据加载中');
      let url = `${config.host}index.php?m=Mobile&c=UserAddress&a=getUserAddress&userId=${userId}`;
      this.$http.get(url).then((res) => {
        this.addressData = res.body;
        this.$dialog.loading.close();
        console.log(res.body.length);
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
          console.log(this.orderData);
        }

      };
      this.show = false;
    },
    confirmOrder1() {
      if(!allowPaymat) return true;
      allowPaymat = false;
      window.mjOrderData = null;
      window.mjType = null;
      if (!this.orderData.defaultAddress) {
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '请选择收货地址！',
          opts: [{
              txt: '取消',
              color: false
            },
            {
              txt: '确定',
              color: true,
              callback: () => {
                this.chooseAddress();
              }
            }
          ]
        });
      } else {
        console.log(this.orderData.addressId);
        console.log(userId);
        this.postData.addressId = this.orderData.addressId; //地址ID
        this.postData.orderIds = this.orderData.orderIds; //订单ID
        this.postData.orderRemarks = this.orderRemarks; //留言
        // console.log(this.postData);
        let url =
          `${config.host}index.php?m=Mobile&c=Orders&a=addOrders&userId=${userId}&orderId=${this.postData.orderIds}&consigneeId=${this.postData.addressId}&remarks=${this.postData.orderRemarks}&type=2&totalMoney=${this.orderData.realTotalMoney}`;
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
          } else if (res.data.status == -6) {
            this.$dialog.toast({
              icon: 'error',
              mes: '账户余额不足',
              timeout: 1500
            });
          } else if (res.data.status == -5) {
            this.$dialog.toast({
              icon: 'error',
              mes: '您还不是分销商，银子不足',
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
      }

    },
    //提交订单
    confirmOrder() {
      window.mjOrderData = null;
      window.mjType = null;
      if (!this.orderData.defaultAddress) {
        this.$dialog.confirm({
          title: '温馨提示',
          mes: '请选择收货地址！',
          opts: [{
              txt: '取消',
              color: false
            },
            {
              txt: '确定',
              color: true,
              callback: () => {
                this.chooseAddress();
              }
            }
          ]
        });
      } else {
        console.log(this.orderData.addressId);
        this.postData.addressId = this.orderData.addressId; //地址ID
        this.postData.orderIds = this.orderData.orderIds; //订单ID
        this.postData.orderRemarks = this.orderRemarks; //留言
        this.postData.useMarket = this.isUseMarket ? 1 : 0; //是否使用抵扣
        // console.log(this.postData);
        let url =
          `${config.host}index.php?m=Mobile&c=Orders&a=addOrders&userId=${userId}&orderId=${this.postData.orderIds}&consigneeId=${this.postData.addressId}&remarks=${this.postData.orderRemarks}&type=1&totalMoney=${this.orderData.realTotalMoney}`;
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
}
</script>

<style scoped>
/* 默认地址 */

.use-market {
  padding: 10px;
  background-color: #fff;
}

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

.addBtn {
  width: 90%;
  margin: 0 auto;
  margin-top: .5rem;
  line-height: .8rem;
  border-radius: .4rem;
  background-color: #E8380d;
  color: #fff;
  display: block;
  text-align: center;
}
</style>
