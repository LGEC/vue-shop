<template >
<div class="container">

  <div class="top">
    <yd-navbar :title="!loaded ? '' : showInput ? '绑定邀请码' : '我的推荐人'" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen" v-if="showInput && loaded">
    <yd-cell-group>

      <yd-cell-item>
        <span slot="left">绑定邀请码：</span>
        <yd-input slot="right" v-model="input" placeholder="请输入邀请码" required :show-success-icon="false" :show-error-icon="false" ref="input"></yd-input>
      </yd-cell-item>
			
    </yd-cell-group>
		<p style="display: block;padding:0 0.24rem;">*默认邀请码：<span style="color: #f00;font-size: 0.36rem;letter-spacing: 0.02rem;">QWEDFG</span></p>
    <yd-button-group>
      <yd-button bgcolor="#e8380d" color="#fff" size="large" @click.native="clickHander">提交</yd-button>
    </yd-button-group>
  </div>

  <div class="cen my-leader" v-if="!showInput && loaded">
    <!-- <h5>我的推荐人</h5> -->
    <img :src="content.userPhoto" alt="">
    <p>{{content.loginName}}</p>
  </div>


</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      input: '',
      content: {},
      loaded:false,
      showInput: ''
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    this.$dialog.loading.open('数据加载中');
    // http://00.37518.com/index.php?m=Mobile&c=Users&a=userCode&userId=
    let url = `${config.host}index.php?m=Mobile&c=Users&a=userCode&userId=${userId}`
    this.$http.get(url).then((res) => {
      this.$dialog.loading.close();
      this.loaded = true;
    // console.log(res);
      if (res.body.status == 1) {
        this.content = res.body;
        this.showInput = false;
      } else {
        this.showInput = true;
      }
    });
    
  	//微信分享
    let thisUrl = window.location.href;
    wechatShare({
    	url:thisUrl,
    	title: '分领商城',
    	desc:'分享财富，引领未来',
     	content: '分享财富，引领未来',
     	link: '',
     	logo: '',
    });
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    clickHander() {
      let url = `${config.host}index.php?m=Mobile&c=Users&a=toRegistCode`;
    // console.log(this.input);
      if (this.$refs.input.valid) {
        this.$http.post(url, {
          userId: userId,
          loginSecret: this.input
        }, {
          emulateJSON: true
        }).then((res) => {

        // console.log(res);
          if (res.body.status === 1) {
            this.$dialog.toast({
              mes: '绑定成功!',
              timeout: 1500
            });
          } else {
            this.$dialog.toast({
              icon: 'error',
              mes: res.body.msg,
              timeout: 1500
            });
          }
        }, (err) => {
        // console.log(err);
        });
      } else {
        this.$dialog.toast({
          icon: 'error',
          mes: '邀请码不能为空',
          timeout: 1500
        });
      }

    }
  }
}
</script>

<style scoped>
.cen {
  padding-top: .2rem;
}

.yd-cell::after {
  border: 0 !important;
}

:-moz-placeholder {
  /* Mozilla Firefox 4 to 18 */
  color: #b2b2b2;
  opacity: 1;
}

::-moz-placeholder {
  /* Mozilla Firefox 19+ */
  color: #b2b2b2;
  opacity: 1;
}

input:-ms-input-placeholder {
  color: #b2b2b2;
  opacity: 1;
}

input::-webkit-input-placeholder {
  color: #b2b2b2;
  opacity: 1;
}

.my-leader {
  text-align: center;
}

.my-leader h5 {
  text-align: center;
  font-size: .35rem;
}

.my-leader p {
  text-align: center;
  font-size: .3rem;
}

.my-leader img {
  border-radius: 50%;
  margin-top:100px;
  overflow: hidden;
}
</style>
