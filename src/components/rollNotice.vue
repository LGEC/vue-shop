<template>
<div class="rollNotice">

  <yd-rollnotice autoplay="2000" style="background: transparent !important;" height="40">
      <yd-rollnotice-item v-for="(notice,key,index) in notices" :key="index">
        <span style="color:#e8380d; padding-right: .1rem"> 荐 </span>
        {{ notice.articleTitle }}
      </yd-rollnotice-item>

  </yd-rollnotice>

</div>
</template>

<script>
import config from '@/config.js';

export default {
  data() {
    return {
      notices: [],
      host: config.host
    }
  },
  created(){
    let url = `${config.host}index.php?m=Mobile&c=Index&a=loadMessages&p=@value`;
    this.$http.get(url).then(res=>{
      let data = res.body;
      // console.log(data);
      this.notices.push(...data)
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.rollNotice {
  height: .8rem;
  overflow: hidden;
  background: #f4f8fe;
  padding: 0 .2rem;
  padding-left: .8rem;
  background-image: url('../assets/notice.png');
  background-repeat: no-repeat;
  background-position: 0.2rem center;
  background-size: .55rem .8rem;
}
</style>
