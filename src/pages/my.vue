<template>
<div class="container hasnav">
  <div class="top">
    <yd-navbar slot="navbar" title="个人中心" bgcolor="#e8380d" color="#fff"></yd-navbar>
  </div>
  <div class="cen">
    <div class="centop">
      <!-- 基本信息盒子 -->
      <div class="cenbg">
        <yd-flexbox>
          <div class="head-pic autoimg" v-bind:style="{ backgroundImage : 'url(' + data.userPhoto + ')' }"></div>
          <yd-flexbox-item>
            <p class="name">{{data.loginName}}</p>
            <p class="id">ID: {{data.loginId}}</p>
          </yd-flexbox-item>
          <div class="qrcode">
            <router-link :to="{name:'shareQR', query: { userRqcode: data.userRqcode,loginSecret: data.loginSecret}}">
              <div class="icon-qrcode">
                <img src="../assets/icon-qrcode.png" alt="">
              </div>
              <span>分享二维码</span>
            </router-link>

          </div>
        </yd-flexbox>
      </div>
      <!-- 积分电子币盒子 -->
      <div class="money">
        <yd-flexbox>
          <yd-flexbox-item>
            <!-- 后台说没有明细，如果需要就把注释打开 -->
            <!-- <router-link to="/myPoint">  -->
              <p>{{data.userMoney}}</p>
              <p><span>积分</span></p>
            <!-- </router-link> -->
          </yd-flexbox-item>
          <yd-flexbox-item >
            <!-- <router-link to="/myMoney"> -->
              <p v-on:click="handleGoToMyMoney">{{data.userScore}}</p>
              <p v-on:click="handleGoToMyMoney"><span>银子(两)</span></p>
            <!-- </router-link> -->
          </yd-flexbox-item>
        </yd-flexbox>
      </div>

    </div>
    <div class="cenlist">
      <yd-cell-group>

        <yd-cell-item arrow type="link" href="/myOrder">
            <span slot="left">我的订单</span>
            <span slot="right">查看全部订单</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/myOrder1">
            <span slot="left">积分兑换</span>
            <span slot="right">历史兑换商品</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/messages">
            <span slot="left">我的消息</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/collect">
            <span slot="left">我的收藏</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/mySub">
            <span slot="left">我的会员</span>
        </yd-cell-item>
        <!-- <yd-cell-item arrow type="link" href="/myInfo">
            <span slot="left">绑定手机号</span>
        </yd-cell-item> -->
        <yd-cell-item arrow type="link" href="/myLeader">
            <span slot="left">绑定推荐人</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/address">
            <span slot="left">收货地址</span>
            <span slot="right">管理收货地址</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" :href="{name:'pwdManager',params:{isPay: isPay}}">
            <span slot="left">支付密码</span>
            <span slot="right">{{isPay?'修改支付密码':'绑定支付密码'}}</span>
        </yd-cell-item>
        <yd-cell-item arrow type="link" href="/contact">
            <span slot="left">客服咨询</span>
            <!-- <span slot="right">666-6666666</span> -->
        </yd-cell-item>

    </yd-cell-group>
    </div>
  </div>
  <div class="bot">
    <navbar navbar="4"></navbar>
  </div>
</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      codeUrl:'',
      loginSecret:'',
      data:[],
      code:'',
      isPay:false,
      thref:''
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created: function() {
    this.$dialog.loading.open('数据加载中');
    // `this` 指向 vm 实例
    console.log(this.GLOBAL);
    let url=`${config.host}index.php?m=Mobile&c=Users&a=getUserById&userId=${userId}`
    this.$http.get(url).then((res) => {
      console.log(res);
      let data = res.body;
      data.userPhoto = data.userPhoto;
      this.userRqcode = data.userRqcode;
      this.loginSecret = data.loginSecret;
      this.data  = data ;
      this.isPay = data.isPay == 1 ? true : false ;
      this.$dialog.loading.close();
      // this.thref = `/pwdManager?isPay=${data.isPay}`
    })
  },
  methods:{
    handleGoToMyMoney(){
      this.$router.push('/myMoney')
      console.log('goto')
    }
  }
}
</script>

<style scoped>
.centop {
  width: 100%;
  height: 3.8rem;
  color: #fff;
  position: relative;
}

.cenbg {
  width: 100%;
  height: 2.8rem;
  background-image: radial-gradient(#e8380d, #f55a35);
  /* 标准的语法 */
  padding: .3rem;
}

.head-pic {
  width: 1.4rem;
  height: 1.4rem;
  border-radius: 50%;
  margin-right: .2rem;
}
.name{
  font-size: .3rem;
  line-height: .6rem;
}
.id{
  font-size: .24rem;
}
.icon-qrcode{
  clear: both;
  height: .7rem;
}
.qrcode img{
  width:.7rem;
  text-align: right;
  height: .7rem;
  display:block;
  float: right;
  /* margin-left: .5rem; */
}
.qrcode span{
  display: block;
  font-size: .20rem;
  margin-top: .1rem;
}
.money{
  width: 7rem;
  height: 1.6rem;
  background: #ffffff;
  position: absolute;
  top: 2rem;
  left: 50%;
  margin-left: -3.5rem;
  border-radius: 2px;
  box-shadow: 0 0 4px rgba(0,0,0,.2);
  padding: .2rem;
}
.money:after{
  content: '';
  display:block;
  width: 1px;
  height: 1.2rem;
  background: #e0e0e0;
  position: absolute;
  left: 50%;
  top: .2rem;
}
.money p{
  color: #e8380d;
  font-size: .48rem;
  text-align: center;
}
.money p span{
  color: #454545;
  font-size: .28rem;
}
.yd-cell:after {
  border-bottom: 0 !important;
}
</style>
