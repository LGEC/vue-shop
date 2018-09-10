<template>
<yd-navbar class="head" bgcolor="#e8380d">
  <router-link to="/my" slot="left">
    <span class="headPic" v-bind:style="{ backgroundImage : 'url(' + headPic + ')' }"></span>
  </router-link>

  <!-- <div  class="search">搜索</div> -->
  <router-link to="/search" slot="center">
    <div class="search-box"> {{ keyWords }} </div>
  </router-link>

  <router-link to="/search" slot="right">
    <span class="search-btn">搜索</span>
  </router-link>
</yd-navbar>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  name: 'navIndex',
  data() {
    return {
      headPic: '',
      keyWords: ''
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created: function() {
       console.log(new Date());
       console.log(userId);
    let url = `${config.host}index.php?m=Mobile&c=Index&a=loadConfigs&userId=${userId}`;
    if (!userId) {
      url = `${config.host}index.php?m=Mobile&c=Index&a=loadConfigs&userId=${window.localStorage.getItem('userId')}`;
    }
    // `this` 指向 vm 实例
    let self = this;
    this.$http.get(url).then(res => {
      let data = res.body;
       // console.log(new Date());
      self.headPic = data['goodsImg'];
      self.keyWords = data['hotSearchs'][0];
    });
    if (!parseInt(window.localStorage.getItem('userId'))) {
      setTimeout(() => {
        url = `${config.host}index.php?m=Mobile&c=Index&a=loadConfigs&userId=${window.localStorage.getItem('userId')}`;
        this.$http.get(url).then(res => {
          let data = res.body;
          self.headPic = data['goodsImg'];
          self.keyWords = data['hotSearchs'][0];
        });
      }, 2000);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.head a {
  display: black !important;
}

.headPic {
  display: block;
  width: .64rem;
  height: .64rem;
  border-radius: 50%;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  margin-left: .1rem;
  /* background-image: "../assets/xiaobian.jpg"; */
}

.search-box {
  width: 5rem;
  height: .54rem;
  line-height: .54rem;
  padding: 0 .2rem;
  padding-left: 0.6rem;
  border-radius: .30rem;
  display: block;
  border: 1px solid #fff;
  color: #ecc7c3;
  font-size: 0.24rem;
  background-image: url("../assets/search.png");
  background-size: 0.4rem;
  background-repeat: no-repeat;
  background-position: 0.1rem center;
}

.search-btn {
  color: #fff;
  font-size: 0.28rem;
  padding-right: 0.15rem;
}

.navbar-bottom-line-color:after {
  border-color: #e8380d !important;
}

.yd-navbar-center-box:after {
  width: 80% !important;
}
</style>
