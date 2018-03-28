<template >
  <div class="container">

    <div class="top">
      <yd-navbar title="消息中心" bgcolor="#d94927" color="#fff">
        <section slot="left" @click="handleBack">
          <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        </section>
      </yd-navbar>
    </div>

    <div class="cen">

      <div class="item" v-for='item,key in data' :key='key'>
        <yd-flexbox style="align-items:flex-start">
          <div class="logo">
            <div class="logo-box">
              <img src="../assets/logo.png" alt="">
            </div>
          </div>
          <yd-flexbox-item>
            <div class="message">
              <div class="msg-tit">
                {{item.articleTitle}}
              </div>
              <div class="msg-body" v-html="item.articleContent"></div>
              <p class="msg-time">{{item.createTime}}</p>
            </div>
          </yd-flexbox-item>

        </yd-flexbox>
      </div>

    </div>


  </div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data () {
    return {
      data:{}
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created(){
    let url = `${config.host}index.php?m=Mobile&c=Index&a=loadMessages&userId=${userId}`;
        this.$http.get(url).then((res)=>{
          let data = res.body;
          // console.log(data);
          this.data = data;
        });
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
.cen{
  width: 100%;
}
.cen .item{
  width: 100%;
  margin: .1rem 0;
  background: #ffffff;
  padding: 0.2rem;
}
.item .logo{
  width: 1rem;
  height: 100%;
  margin-right: .2rem;
}
.item .logo .logo-box{
  width:1rem;
  height: 1rem;
  overflow:hidden;
  border-radius: 50%;
  /* margin-top: .2rem; */
}
.msg-body {
  overflow: hidden;
}
.item .logo .logo-box img{
  width: 100%;
}
.message .msg-tit{
  line-height: .5rem;
  font-size: .3rem;
  color: #353535;
  font-weight: bold
}
.message .msg-time{
  font-size: .24rem;
  line-height: .5rem;
  color: #999;
}
</style>
