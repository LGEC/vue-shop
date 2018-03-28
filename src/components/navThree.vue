<template>
<yd-navbar title="分类" bgcolor="#e8380d" color="#fff">
  <section slot="left" @click="handleBack" >
    <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
  </section>
</yd-navbar>
</template>

<script>
export default {
  methods : {
    handleBack () {
      this.$router.go(-1);
      // console.log(this.$router);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
