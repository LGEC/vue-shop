<template >
<div class="container">

  <div class="top">
    <yd-navbar title="提现记录" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">

    <yd-preview v-for="item,index in list" :key="index" :buttons="item.btns" style="margin-top:10px">
      <yd-preview-header>
        <div slot="left">提现金额</div>
        <div slot="right">{{item.money}}</div>
      </yd-preview-header>

      <yd-preview-item>
        <div slot="left">姓名</div>
        <div slot="right">{{item.accUser}}</div>
      </yd-preview-item>
      <yd-preview-item>
        <div slot="left">卡号</div>
        <div slot="right">{{item.accNo}}</div>
      </yd-preview-item>
      <yd-preview-item>
        <div slot="left">手续费</div>
        <div slot="right">{{item.chargeMoney}}</div>
      </yd-preview-item>
      <yd-preview-item>
        <div slot="left">提现时间</div>
        <div slot="right">{{item.createTime}}</div>
      </yd-preview-item>
      <yd-preview-item>
        <div slot="left">提现状态</div>
        <div slot="right">{{item.cashSatus == 1 ? '已处理' : item.cashSatus == 2 ? '已驳回' : item.cashSatus == 3 ? '已取消' : item.cashSatus == 0 ? '待处理' : '未知'}}</div>
      </yd-preview-item>
    </yd-preview>
  </div>


</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      list: [],
      input: ''
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    console.log(userId);
    this.$dialog.loading.open('数据加载中');
    let url = `${config.host}index.php?m=Mobile&c=CashDraws&a=queryByPage&userId=${userId}`;
    this.$http.get(url).then((res) => {
      let list = res.body || [];
      console.log(list);
      for (let i = 0; i < list.length; i++) {
        if (list[i].cashSatus == 0) {
          list[i].btns = [{
            color: '#F00',
            text: '取消提现',
            click: () => {
              this.$dialog.loading.open('取消中');
              let url = `${config.host}index.php?m=Mobile&c=CashDraws&a=rebackMoney&cashId=${list[i].cashId}`;
              this.$http.get(url).then((ress) => {
                this.$dialog.loading.close();
                if (ress.body.status == 1) {
                  this.$dialog.toast({
                    icon: 'success',
                    mes: '取消成功',
                    timeout: 1000,
                    callback: () => {
                      window.location.reload();
                    }
                  });
                } else {
                  this.$dialog.toast({
                    icon: 'error',
                    mes: '网络异常，请重试!',
                    timeout: 1500
                  });
                }
              });
              console.log(i, userId);
            }
          }];
        } else {
          list[i].btns = [];
        }
      }
      this.list = list;
      this.$dialog.loading.close();
    })
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    clickHander() {
      let url = `${config.host}index.php?m=Mobile&c=CashDraws&a=queryByPage&userId=${userId}`;
      console.log(userId);

    }
  }
}
</script>

<style scoped>
.cen {
  /*padding-top: .2rem;*/
}

.yd-cell::after {
  border: 0 !important;
}

.list-item {
  font-size: .2rem;
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
</style>
