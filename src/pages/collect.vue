<template>
<div class="container   hasnav">
  <div class="top">
    <yd-navbar title="我的收藏" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">
    <yd-checklist v-model="checklist" :label="false" color="#e8380d" ref="checklistDemo" :callback="change">
      <!-- 循环shop -->
      <div class="shop">
        <!-- <div class="shop-tit">
          {{data.shopName}}
        </div> -->
        <yd-checklist-item :val="item.favoriteId" v-for="item,key in data" :key="key">
          <router-link :to="{ name: 'detail', params: { goodsId:item.goodsId } }">
            <yd-flexbox style="padding: 10px 0;">
              <img :src="item.goodsThums" class="img">
              <yd-flexbox-item align="top" class="goods-right">
                <p class="goods-tit">{{item.goodsName}}</p>
                <div class="goods-type">
                  <span>{{item.goodsSpec}}</span>
                </div>
                <p style="color:#e8380d;"><span>￥{{item.goodsPrice}}</span></p>
              </yd-flexbox-item>
            </yd-flexbox>
          </router-link>
        </yd-checklist-item>
      </div>
      <!-- shop end -->

    </yd-checklist>

  </div>

  <div class="payBtnBox" slot="bottom">
    <yd-flexbox>
      <div class="del-btn">
        <yd-checkbox v-model="isCheckAll" shape="circle" color="#e8380d" :change="checkAll">全选</yd-checkbox>
      </div>
      <yd-flexbox-item class="sum">已选：<i>{{checklist.length}}</i></yd-flexbox-item>
      <div class="pay-btn" @click="deleteBtn">删 除</div>
    </yd-flexbox>
  </div>

</div>
</template>

<script type="text/babel">
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      checklist: [],
      isCheckAll: false,
      data: []
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    let url = `${config.host}index.php?m=Mobile&c=Goods&a=queryGoodsByPage&userId=${userId}`;
    this.$http.get(url).then((res) => {
      let data = res.body;
      for (let i = 0; i < data.length; i++) {
        data[i].goodsThums = config.host + data[i].goodsThums;
      };
      this.data = data;
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
      // console.log(this.$router);
    },
    change(value, isCheckAll) {
      this.isCheckAll = isCheckAll;
    },
    checkAll() {
      this.isCheckAll = !this.isCheckAll;
      this.$refs.checklistDemo.$emit('ydui.checklist.checkall', this.isCheckAll);
    },
    deleteBtn() {
      let url = `${config.host}index.php?m=Mobile&c=Goods&a=cancelFavorite`,
        data = {
          userId: userId,
          favoriteInfo: []
        };
      for (let j = 0; j < this.checklist.length; j++) {
        data.favoriteInfo.push({
          favoriteId: this.checklist[j]
        });
      };
      if (this.checklist.length == 0) {
        this.$dialog.toast({
          mes: '请选择至少一个商品',
          timeout: 1500
        });
      } else {
      // console.log(data);
        this.$http.post(url, data, {
          emulateJSON: true
        }).then((res) => {
        // console.log(res.body);
          if (res.body.status == 1) {
            this.$dialog.toast({
              mes: '删除成功！',
              timeout: 1500
            });
            window.location.reload();
          } else {
            this.$dialog.toast({
              mes: '网络异常，请重试！',
              timeout: 1500
            });
          }
        })
      }
    }
  }
}
</script>

<style scoped>
.hasnav {
  padding-bottom: 1.1rem;
}

.yd-checklist:after {
  border-bottom: 0 !important;
}

.shop {
  background: #ffffff;
  margin-top: .2rem;
}

.shop-tit {
  width: 100%;
  padding: .24rem .24rem;
  border-bottom: 1px solid #e0e0e0;
  color: #353535;
}

.img {
  width: 1.8rem;
  height: 1.8rem;
}

.goods-type {
  color: #999;
  font-size: .24rem;
  margin: .1rem 0;
}

.goods-right {
  padding-left: .2rem;
}

.goods-num {
  float: right;
  color: #666;
}

.payBtnBox {
  position: fixed;
  width: 100%;
  height: 1rem;
  color: #fff;
  bottom: 0;
  background: #efefef;
  z-index: 99;
}

.del-btn {
  width: 1.8rem;
  text-align: center;
  border-right: 1px solid #ececec;
}

.sum {
  padding: 0 .1rem;
  color: #666;
  text-align: right;
  font-size: .24rem;
}

.sum>span {
  color: #e8380d;
}

.pay-btn {
  width: 2rem;
  height: 1rem;
  line-height: 1rem;
  text-align: center;
  font-size: .32rem;
  background-image: -webkit-linear-gradient(left, #F36847, #e8380d);
  /* Safari 5.1 - 6.0 */
  background-image: -o-linear-gradient(right, #F36847, #e8380d);
  /* Opera 11.1 - 12.0 */
  background-image: -moz-linear-gradient(right, #F36847, #e8380d);
  /* Firefox 3.6 - 15 */
  background-image: linear-gradient(to right, #F36847, #e8380d);
}
</style>
