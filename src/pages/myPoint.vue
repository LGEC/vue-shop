<template >
  <div class="container">

    <div class="top">
      <yd-navbar title="积分明细" bgcolor="#d94927" color="#fff">
        <section slot="left" @click="handleBack">
          <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
        </section>
      </yd-navbar>
    </div>

    <div class="cen">
      <div class="list">
        <div class="item">
          <p class="green">+500 <span>2018-01-16 19:45</span></p>
          <div class="info">
            成功推荐一名会员加入分领商城，奖励积分。
          </div>
        </div>

        <div class="item">
          <p class="green">+500 <span>2018-01-16 19:45</span></p>
          <div class="info">
            成功推荐一名会员加入分领商城，奖励积分。
          </div>
        </div>

        <div class="item">
          <p class="red">-500 <span>2018-01-16 19:45</span></p>
          <div class="info">
            成功推荐一名会员加入分领商城，奖励积分。
          </div>
        </div>
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
.list{
  width: 100%;
  padding: 0.2rem 0;
}
.item{
  width: 100%;
  padding: .2rem;
  background: #fff;
  margin-bottom: .2rem;
}
.item p{
  width: 100%;
  font-size: .4rem;
  line-height: .5rem;
  border-bottom: 1px solid #eee;
}
.item p span{
  color:#999;
  font-size: .24rem;
  float: right;
}
.item .info{
  width: 100%;
  padding-top: .1rem;
  color: #777;
  line-height: .4rem;
}
.red{
  color:#e8380d;
}
.green{
  color: #59BD54;
}
</style>
