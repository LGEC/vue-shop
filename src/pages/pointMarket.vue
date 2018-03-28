<template >
  <div class="container">

    <div class="top">
      <yd-navbar title="积分兑换" bgcolor="#d94927" color="#fff">
        <section slot="left" @click="handleBack">
          <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        </section>
      </yd-navbar>
    </div>

    <div class="cen">
      <mgoodslist :url="url" theme="1"></mgoodslist>
    </div>


  </div>
</template>

<script>
import config from "@/config.js";
export default {
  data () {
    return {
      url: `${config.host}index.php?m=Mobile&c=Convert&a=getConvertGoodsList&p=`
    }
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

</style>
