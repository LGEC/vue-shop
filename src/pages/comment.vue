<template >
  <div class="container">

    <div class="top">
      <yd-navbar title="评论" bgcolor="#d94927" color="#fff">
        <section slot="left" @click="handleBack">
          <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        </section>
      </yd-navbar>
    </div>

    <div class="cen">
      <yd-cell-group>
        <yd-cell-item>
          <!-- <span slot="left">提示文字</span> -->
            <yd-rate slot="left" v-model="rate" size=".4rem" :show-text="showText"></yd-rate>
        </yd-cell-item>
        <yd-cell-item>
          <yd-textarea slot="right" placeholder="请写下您的评价吧" maxlength="200" v-model="content"></yd-textarea>
        </yd-cell-item>

    </yd-cell-group>
    <yd-button-group>
      <yd-button bgcolor="#e8380d" color="#fff" size="large" @click.native="clickHander">提交评价</yd-button>
    </yd-button-group>
    </div>


  </div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data(){
    return {
      rate:3,
      content:'',
      showText:['很差','还行','一般','挺好','非常好']
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
      // console.log(this.$router);
    },
    clickHander(){
      let orderId = this.$route.query.orderId,
          url = `${config.host}index.php?m=Mobile&c=Orders&a=addGoodsAppraises`,
          data = {
            userId: userId,
            orderId: orderId,
            goodsScore: this.rate,
            content: this.content
          };
          console.log(data);
      this.$http.post(url,data,{emulateJSON: true}).then((res)=>{
        console.log(res.body);
        if(res.body.status == 1){
          this.$dialog.toast({
            mes: '已提交评论',
            timeout: 1500
          });
          this.$router.go(-1);
        } else {
          this.$dialog.toast({
            mes: '网络异常，请重试！',
            timeout: 1500
          });
        }
      });

    }
  }
}
</script>

<style scoped>

</style>
