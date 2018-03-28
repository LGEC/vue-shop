<template >
<div class="container">

  <div class="top">
    <yd-navbar title="我的成员" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">
    <yd-tab>
      <yd-tab-panel class="item" :label="`一级会员(${data.Count[0]})`">
        <div class="sub" v-for="item,key in data.Fchilds" :key="key">
          {{item.loginName}}<span>活跃度: {{item.userTotalScore}}</span>
        </div>
      </yd-tab-panel>
      <yd-tab-panel class="item" :label="`二级会员(${data.Count[1]})`">
        <div class="sub" v-for="item,key in data.Schilds" :key="key">
          {{item.loginName}}<span>活跃度: {{item.userTotalScore}}</span>
        </div>
      </yd-tab-panel>
      <yd-tab-panel class="item" :label="`三级会员(${data.Count[2]})`">
        <div class="sub" v-for="item,key in data.Tchilds" :key="key">
          {{item.loginName}}<span>活跃度: {{item.userTotalScore}}</span>
        </div>
      </yd-tab-panel>

    </yd-tab>
  </div>


</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data () {
    return {
      data : {}
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created () {
    let url = `${config.host}index.php?m=Mobile&c=Users&a=getSpreadUserList&userId=${userId}`;
        this.$http.get(url).then((res)=>{
          // console.log(res.body);
        this.data = res.body;
        })
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  }
}
</script>
<style scoped>
.item{
  width: 100%;
  padding: .2rem 0;
}
.sub{
  width: 100%;
  padding: 0 .2rem;
  height: .8rem;
  line-height: .8rem;
  background: #ffffff;
  border-bottom: 1px solid #eee;
}
.sub span{
  float: right;
  font-size: .24rem;
}
</style>
