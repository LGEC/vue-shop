<template>
<div class="bg">
  <div class="top">
    <yd-navbar title="分享二维码" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack" >
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>
  <div class="main">
    <div class="main-top">
      <div class="code-box">
        <img :src="userRqcode" alt="">
      </div>
      <p>微信扫一扫</p>
      <div class="main-text">
        <p>邀请您加入分领商城</p>
        <p>邀请码：{{loginSecret}}</p>
      </div>
    </div>
    <div class="main-bot">
      <div class="market-name">
        分领商城
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  data(){
    return{
      userRqcode:'',
      loginSecret:''
    }
  },
  created(){
    let data = this.$route.query;
        this.userRqcode = this.$route.query.userRqcode;
        this.loginSecret = this.$route.query.loginSecret;

  },
  methods : {
    handleBack () {
      this.$router.go(-1);
      // console.log(this.$router);
    }
  }
}
</script>
<style scoped>
.bg {
  position: relative;
  width: 100%;
  height: 100vh;
  background: #d94927;
}
.main{
  width: 80%;
  height: 80%;
  border-radius: 10px;
  background: #fff;
  position: absolute;
  top: 12%;
  left: 10%;
  overflow: hidden;
}
.main-top{
  width: 100%;
  height: 70%;
}
.market-name{
  padding-top: 15%;
}
.main-text{
  padding-top: 5%;
  color: #333;
}
.main-text p:first-child{
  font-size: .36rem;
  line-height: .6rem;
}
.code-box{
  width: 3rem;
  margin: 0 auto;
  padding-top: 20%;
  overflow: hidden;
}
.main-top p{
  text-align: center;
}
.code-box img{
  width: 3rem;
  height: 3rem;
}
.main-bot{
  width: 100%;
  height: 30%;
  background: #f3f3f3;
  position: relative;
  font-size: .48rem;
  color: #e8380d;
  text-align: center;
}
.main-bot:before,.main-bot:after{
  content: '';
  width: .5rem;
  height: .5rem;
  border-radius: 50%;
  background: #d94927;
  position: absolute;
  top: -.25rem;
}
.main-bot:before{
  left: -.25rem;
}
.main-bot:after{
  right: -.25rem;
}
</style>
