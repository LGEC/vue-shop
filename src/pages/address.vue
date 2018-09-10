<template >
<div class="container">

  <div class="top">
    <yd-navbar title="收货地址" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>

      <router-link class="addBtn" to="/addAddress" slot="right">
        添加
      </router-link>
    </yd-navbar>
  </div>

  <div class="cen">
    <div class="tip" v-if=" data.length == 0">暂无收货地址，点击右上角添加</div>
    <div class="list">
      <div class="item" v-for="item,key in data">
        <yd-flexbox>
          <yd-flexbox-item>
            <div class="item-top">
              {{item.userName}} <span class="phone">{{item.userPhone}}</span>
            </div>
            <div class="item-address">
              <span class="default" v-if="item.isDefault == 1">[默认]</span>{{item.areaId1}} {{item.areaId2}} {{item.areaId3}} {{item.address}}
            </div>
          </yd-flexbox-item>
          <div>
            <router-link :to="{ name:'addAddress',query:{addressId:item.addressId}}">
              <yd-icon size=".32rem" color="#999" style="display:inline-block;margin-bottom:.2rem;" name="compose"></yd-icon>
            </router-link>
            <br>
            <yd-icon size=".32rem" color="#999" name="delete" :id="item.addressId" @click.native="deleteAddress"></yd-icon>
          </div>
        </yd-flexbox>
      </div>
    </div>


  </div>


</div>
</template>

<script>
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      seen: false,
      data: []
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    let url = `${config.host}index.php?m=Mobile&c=UserAddress&a=getUserAddress&userId=${userId}&p=`;
    this.$http.get(url).then((res) => {
      this.data = res.body;
    // console.log(res.body);
    })
    
    //微信分享
    let thisUrl = window.location.href;
  // console.log(thisUrl)
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
    deleteAddress(e) {
      // console.log(e.path[0].id);
      this.$dialog.confirm({
        mes: '您确定要删除这个地址吗？',
        opts: () => {
          let addressId = e.path[0].id,
            url = `${config.host}index.php?m=Mobile&c=UserAddress&a=delUserAddress&userId=${userId}&id=${addressId}`;
          this.$http.get(url).then((res) => {
            if (res.body.status == 1) {
              this.$dialog.toast({
                mes: '删除成功！',
                timeout: 1500
              });
              window.location.reload();
            } else {
              this.$dialog.toast({
                mes: '删除失败，请重试！',
                timeout: 1500
              });
            }
          });
        }
      });
    }
  }
}
</script>

<style scoped>
.tip {
  text-align: center;
  font-size: .24rem;
  line-height: .5rem;
  color: #999;
}

.cen {
  padding-top: .2rem;
}

.addBtn {
  color: #fff;
}

.list {
  padding: .1rem .2rem;
}

.item {
  width: 100%;
  height: auto;
  padding: .1rem .2rem;
  background: #ffffff;
  margin-bottom: .2rem;
}

.item-top {
  line-height: .5rem;
}

.item-top span {
  margin-left: .5rem;
}

.item-address {
  padding-right: .2rem;
  font-size: .24rem;
  line-height: .4rem;
}

.default {
  color: #e8380d;
  font-size: .24rem;
  font-weight: bold;
}
</style>
