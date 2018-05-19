<template>
<section class="container hasnav">
  <nav class="nav">
    <navThree></navThree>
  </nav>
  <!-- <section class="main"> -->
    <section class="goodsClass">
      <scrollTab :classData="data"></scrollTab>
    </section>
  <!-- </section> -->
  <navbar navbar= "2" ></navbar>
</section>
</template>

<script type="text/babel">

import config from '@/config.js';

export default {
  data(){
    return{
      data:[]
    }
  },

  mounted() {
    if(!window.mallGoodsClass){
      let url = `${config.host}index.php?m=Mobile&c=Index&a=GoodsCats`;
      this.$dialog.loading.open('数据加载中');
      this.$http.get(url).then(res=>{
        this.data=res.body;
        window.mallGoodsClass = res.body;
        this.$dialog.loading.close();
      });
    }else{
      this.data=window.mallGoodsClass;
    }

  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-direction:column;
  height: 100vh;
}
.nav {
  height: 1rem;
}

.goodsClass {
  position: relative;
  flex: 1;
  margin-bottom: -1px;
}
</style>
