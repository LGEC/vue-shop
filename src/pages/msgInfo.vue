<template >
  <div class="container">

    <div class="top">
      <yd-navbar title="消息详情" bgcolor="#d94927" color="#fff">
        <section slot="left" @click="handleBack">
          <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        </section>
      </yd-navbar>
    </div>

    <div class="cen">
      <div class="msg-tit">商城平台招募商家入驻啦！！！</div>
      <p class="msg-time">商城官方<span>2018-01-12 19:56</span></p>
      <div class="msg-body">
        我的小鱼你醒了，还认识早晨吗？昨夜你曾经说，愿夜幕永不开启，你的香腮边轻轻滑落的，是你的泪，还是我的泪？初吻吻别的那个季节，不是已经哭过了吗？我的指尖还记忆着，你慌乱的心跳，温润的体香里，那一绺长发飘飘...我的小鱼你醒了，还认识早晨吗？昨夜你曾经说，愿夜幕永不开启，你的香腮边轻轻滑落的，是你的泪，还是我的泪？初吻吻别的那个季节，不是已经哭过了吗？我的指尖还记忆着，你慌乱的心跳，温润的体香里，那一绺长发飘飘我的小鱼你醒了，还认识早晨吗？昨夜你曾经说，愿夜幕永不开启，你的香腮边轻轻滑落的，是你的泪，还是我的泪？初吻吻别的那个季节，不是已经哭过了吗？我的指尖还记忆着，你慌乱的心跳，温润的体香里，那一绺长发飘飘我的小鱼你醒了，还认识早晨吗？昨夜你曾经说，愿夜幕永不开启，你的香腮边轻轻滑落的，是你的泪，还是我的泪？初吻吻别的那个季节，不是已经哭过了吗？我的指尖还记忆着，你慌乱的心跳，温润的体香里，那一绺长发飘飘......
      </div>
    </div>


  </div>
</template>

<script>
export default {
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
  padding: .2rem;
}
.msg-tit{
  width: 100%;
  line-height: .5rem;
  font-size: .3rem;
  color: #353535;
  font-weight: bold;
  text-align: center;
}
.msg-time{
  text-align: center;
  color: #17a2f0;
  font-size: .24rem;
  line-height: .6rem;
}
.msg-time span{
  margin-left: .2rem;
  color: #999
}
.msg-body img{
  max-width: 100%;
}
</style>
