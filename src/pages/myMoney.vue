<template >
<div class="container hasnav">

  <div class="top">
    <yd-navbar title="银子明细" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">
    <div class="list">
      <div class="item" v-for="(item,index) of lists" :key="index">
        <p v-bind:class="{green:item.type == 1,red:item.type==0}">{{item.type == 1 ? '+' : '-'}}{{item.distributMoney}} <span>{{item.createTime}}</span></p>
        <div class="info">
          {{item.moneyRemark}}
        </div>
      </div>

      <!-- <div class="item">
        <p class="green">+500 <span>2018-01-16 19:45</span></p>
        <div class="info">
          成功推荐一名会员加入分领商城，奖励积分。
        </div>
      </div> -->

      <!-- <div class="item">
        <p class="red">-500 <span>2018-01-16 19:45</span></p>
        <div class="info">
          成功推荐一名会员加入分领商城，奖励积分。
        </div>
      </div> -->
    </div>
  </div>

  <div class="bot">
    <yd-flexbox>
      <!-- <yd-flexbox-item class="moneyIn">
        <div @click="handleRecharge">
          充值
        </div>
      </yd-flexbox-item> -->
      <yd-flexbox-item class="moneyOut">
        <router-link to="commission">
          提现
        </router-link>
      </yd-flexbox-item>
    </yd-flexbox>
  </div>

  <yd-popup v-model="showPop" position="bottom" height="180px">
    <div style="padding:10px">
      <yd-cell-item>
        <span slot="left">充值金额：</span>
        <yd-input slot="right" v-model="howMoney" regex="/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/" placeholder="请输入充值金额"></yd-input>
      </yd-cell-item>
      <yd-button size="large" type="danger" @click.native="handleConfirmRecharge">去支付</yd-button>
    </div>
  </yd-popup>

</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      howMoney: '',
      showPop: false,
      lists: []
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  watch: {
    // howMoney(now){
    //   this.howMoney = now.replace(/[123456789\.]/g,'');
    // }
  },
  created() {
    let url = `${config.host}index.php?m=Mobile&c=Users&a=distributMoneys&userId=${userId}`;
  // console.log(1024);
    this.$http.get(url).then(res => {
      this.lists = res.body;
    // console.log('-------------------');
    // console.log(res);
    });
    
  	//微信分享
    let thisUrl = window.location.href;
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
    handleConfirmRecharge() {
    // console.log(this.howMoney);
      if (!this.howMoney) {
        this.$dialog.toast({
          mes: '请输入充值金额',
          timeout: 1500
        });
      } else if (this.howMoney * 1 <= 0) {
        this.$dialog.toast({
          mes: '请输入合法的金额',
          timeout: 1500
        });
      } else if (!new RegExp(/(^[1-9]([0-9]+)?(\.[0-9]{1,2})?$)|(^(0){1}$)|(^[0-9]\.[0-9]([0-9])?$)/).test(this.howMoney)) {
        this.$dialog.toast({
          mes: '请输入合法的金额',
          timeout: 1500
        });
      } else {
        // this.$dialog.loading.open('提交中');
        // http://00.37518.com/index.php?m=Mobile&c=Payments&a=rechange&money=\
        window.location.href = `${config.host}index.php?m=Mobile&c=Payments&a=rechange&money=${this.howMoney}&userId=${userId}`;
      }
    },
    handleRecharge() {
      this.showPop = true;
    // console.log('6666666666666666666666');
    },
    handleBack() {
      this.$router.go(-1);
      // console.log(this.$router);
    }
  }
}
</script>

<style scoped>
.list {
  width: 100%;
  padding: 0.2rem 0;
}

.item {
  width: 100%;
  padding: .2rem;
  background: #fff;
  margin-bottom: .2rem;
}

.item p {
  width: 100%;
  font-size: .4rem;
  line-height: .5rem;
  border-bottom: 1px solid #eee;
}

.item p span {
  color: #999;
  font-size: .24rem;
  float: right;
}

.item .info {
  width: 100%;
  padding-top: .1rem;
  color: #777;
  line-height: .4rem;
}

.red {
  color: #e8380d;
}

.green {
  color: #59BD54;
}

.bot {
  width: 100%;
  height: 1rem;
  position: fixed;
  bottom: 0;
}

.bot .moneyIn,
.bot .moneyOut {
  font-size: .32rem;
  color: #fff;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
}

.moneyIn {
  background: #353535;
}

.moneyOut {
  background: #e8380d;
}
</style>
