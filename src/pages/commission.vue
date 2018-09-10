<template >
<div class="container hasNav">

  <div class="top">
    <yd-navbar title="提现" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">
    <div class="form">
      <yd-cell-group>

        <yd-cell-item>
          <span slot="left">卡号：</span>
          <yd-input slot="right" v-model="cardNum" regex="" placeholder="请输入银行卡号"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">开户行：</span>
          <yd-input slot="right" v-model="openHang" regex="" placeholder="请输入开户行"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">姓名：</span>
          <yd-input slot="right" v-model="userName" regex="" placeholder="请输入持卡人姓名"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">金额：</span>
          <yd-input slot="right" type="number" v-model="money" regex="" placeholder="请输入提现金额"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">密码：</span>
          <yd-input slot="right" v-model="pwd" type="password" regex="" placeholder="请输入您的提现密码"></yd-input>
        </yd-cell-item>

        <h6 class="remark">
          注：提现手续费为{{service}}%
        </h6>

      </yd-cell-group>
    </div>
  </div>

  <div class="saveBtn" @click="confirmCommission">
    确 认 提 现
  </div>
</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      switch1: false,
      cardNum: '',
      userName: '',
      money: '',
      pwd: '',
      openHang:'',
      service: '--'
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    // http://00.37518.com/index.php?m=Mobile&c=CashDraws&a=goodsShareTitle
    let url = `${config.host}index.php?m=Mobile&c=CashDraws&a=goodsShareTitle`;
    this.$http.get(url).then(res => {
      this.service = res.body;
    // console.log(res);
    });
    
  	//微信分享
    let thisUrl = window.location.href;
  // console.log(thisUrl)
    wechatShare({
    	url:thisUrl,
    	title: '分领商城',
    	desc:'分享财富，引领未来',
     	content: '分享财富，引领未来',
     	link: '',
     	logo: '',
    });

  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    confirmCommission(ret) {

      if (!this.cardNum) {
        this.$dialog.toast({
          mes: '卡号不能为空！',
          timeout: 1500
        });
      }else if(!this.openHang){
        this.$dialog.toast({
          mes: '开户行不能为空！',
          timeout: 1500
        });
      } else if (!this.userName) {
        this.$dialog.toast({
          mes: '姓名不能为空！',
          timeout: 1500
        });
      } else if (!this.money) {
        this.$dialog.toast({
          mes: '提现金额不能为空',
          timeout: 1500
        });
      } else if (!this.pwd) {
        this.$dialog.toast({
          mes: '支付密码不能为空',
          timeout: 1500
        });
      } else {
        let url = `${config.host}index.php?m=Mobile&c=CashDraws&a=drawsCashByUser&userId=${userId}&payPwd=${this.pwd}&drawMoney=${this.money}&accNo=${this.cardNum}&accUser=${this.userName}&openHang=${this.openHang}`;
        this.$http.get(url).then(res => {
        // console.log(res);
          if (res.body.status == 1) {
            this.$dialog.toast({
              mes: '提现成功',
              timeout: 1500
            });
            this.$router.go(-1);
          } else {
            this.$dialog.toast({
              mes: res.body.msg,
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
.cen {
  padding-top: .2rem;
}

.remark {
  font-size: 14px;
  color: #999;
  font-weight: normal;
  padding: 20px;
}

.yd-cell-title {
  line-height: .8rem important;
}

.saveBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: .32rem;
  text-align: center;
  background: #e8380d;
  color: #fff;
}
</style>
