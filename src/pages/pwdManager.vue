<template >
<div class="container hasNav">

  <div class="top">
    <yd-navbar :title="isPay?'修改密码':'设置密码'" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">
    <div class="form">
      <yd-cell-group v-if="!isPay">

        <yd-cell-item>
          <span slot="left">密码：</span>
          <yd-input slot="right" type="password" v-model="spwd1" regex="" placeholder="请输入密码"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">确认密码：</span>
          <yd-input slot="right" type="password" v-model="spwd2" regex="" placeholder="确认密码"></yd-input>
        </yd-cell-item>

      </yd-cell-group>
      <yd-cell-group v-if="isPay">

        <yd-cell-item>
          <span slot="left">原始密码：</span>
          <yd-input slot="right" type="password" v-model="npwd1" regex="" placeholder="请输入密码"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">新密码：</span>
          <yd-input slot="right" type="password" v-model="npwd2" regex="" placeholder="确认密码"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">确认密码：</span>
          <yd-input slot="right" type="password" v-model="npwd3" regex="" placeholder="确认密码"></yd-input>
        </yd-cell-item>

      </yd-cell-group>
    </div>
  </div>

  <div class="saveBtn" @click="confirmCommission">
    确 认
  </div>
</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      switch1: false,
      spwd1: '',
      spwd2: '',
      npwd1: '',
      npwd2: '',
      npwd3: '',
      isPay: false,
      service: '--'
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    // http://00.37518.com/index.php?m=Mobile&c=CashDraws&a=goodsShareTitle
    let url = `${config.host}index.php?m=Mobile&c=CashDraws&a=goodsShareTitle`;
    this.$http.get(url).then(res => {
      this.service = res.body;
      console.log(res);
    });


    this.isPay = this.$route.params.isPay == false || this.$route.params.isPay == 'false' ? false : true;
    console.log(this.isPay);
    console.log(this.$route.params);
    console.log(typeof this.$route.params.isPay);


  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    confirmCommission(ret) {
      if (this.isPay) {
        if (!this.npwd1) {
          this.$dialog.toast({
            mes: '原始密码不能为空',
            timeout: 1500
          });
        } else if (!this.npwd2) {
          this.$dialog.toast({
            mes: '新密码不能为空',
            timeout: 1500
          });
        } else if (this.npwd2 != this.npwd3) {
          this.$dialog.toast({
            mes: '两次密码不同',
            timeout: 1500
          });
        } else {
          let url = `${config.host}index.php?m=Mobile&c=Users&a=setPayPwd&userId=${userId}&newPwd=${this.npwd2}&oldPwd=${this.npwd1}`;
          this.$http.get(url).then(res => {
            console.log(res);
            if (res.body.status == 1) {
              this.$dialog.toast({
                mes: '设置成功',
                timeout: 1500
              });
              this.$router.go(-1);
            } else {
              this.$dialog.toast({
                mes: res.body.msg,
                timeout: 1500
              });
            }
          });
        }
      } else {
        if (!this.spwd1) {
          this.$dialog.toast({
            mes: '密码不能为空',
            timeout: 1500
          });
        } else if (this.spwd1 != this.spwd2) {
          this.$dialog.toast({
            mes: '两次密码不同',
            timeout: 1500
          });
        } else {
          let url = `${config.host}index.php?m=Mobile&c=Users&a=setPayPwd&userId=${userId}&newPwd=${this.spwd1}`;
          this.$http.get(url).then(res => {
            console.log(res);
            if (res.body.status == 1) {
              this.$dialog.toast({
                mes: '设置成功',
                timeout: 1500
              });
              this.$router.go(-1);
            } else {
              this.$dialog.toast({
                mes: res.body.msg,
                timeout: 1500
              });
            }
          });
        }
      }
    }
  }
}
</script>

<style scoped>
.cen {
  padding-top: .2rem;
}

.remark {
  font-size: 14px;
  color: #999;
  font-weight: normal;
  padding: 20px;
}

.yd-cell-title {
  line-height: .8rem important;
}

.saveBtn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  font-size: .32rem;
  text-align: center;
  background: #e8380d;
  color: #fff;
}
</style>
