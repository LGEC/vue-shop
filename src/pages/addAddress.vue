<template >
<div class="container hasNav">

  <div class="top">
    <yd-navbar title="收货地址" bgcolor="#d94927" color="#fff">
      <section slot="left" @click="handleBack">
        <yd-navbar-back-icon color="#fff"></yd-navbar-back-icon>
      </section>
    </yd-navbar>
  </div>

  <div class="cen">
    <div class="form">
      <yd-cell-group>

        <yd-cell-item>
          <span slot="left">姓名：</span>
          <yd-input slot="right" v-model="input1" regex="" placeholder="请输入收货人姓名" ref="input1"></yd-input>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">手机：</span>
          <yd-input slot="right" v-model="input2" regex="" placeholder="请输入收货人手机号"></yd-input>
        </yd-cell-item>

        <yd-cell-item arrow>
          <span slot="left">地区：</span>
          <input slot="right" type="text" @click.stop="show = true" v-model="defaultAddress" placeholder="请选择省、市、县/区">
        </yd-cell-item>

        <yd-cell-item>
          <yd-textarea slot="right" v-model="address" placeholder="请输入您的详细地址"></yd-textarea>
        </yd-cell-item>

        <yd-cell-item>
          <span slot="left">设为默认地址</span>
          <yd-switch slot="right" color="#e8380d" v-model="switch1"></yd-switch>
        </yd-cell-item>

      </yd-cell-group>




      <yd-cityselect title="选择省、市、县/区" v-model="show" ref="cityselectDemo" :callback="result" :items="district" provance="河南" city="郑州市" area="金水区"></yd-cityselect>
    </div>
  </div>

  <div class="saveBtn" @click="saveNewAddress">
    保 存
  </div>
</div>
</template>

<script>
import District from 'ydui-district/dist/jd_province_city_area';
import config from '@/config.js';
let userId;
export default {
  data() {
    return {
      switch1: false,
      input1: '',
      input2: '',
      areaId1: '河南',
      areaId2: '郑州市',
      areaId3: '金水区',
      address: '',
      show: false,
      defaultAddress: '河南 郑州市 金水区',
      district: District
    }
  },
  beforeCreate() {
    userId = window.localStorage.getItem('userId');
  },
  created() {
    let addressId = this.$route.query.addressId,
      url = `http://00.37518.com/index.php?m=Mobile&c=UserAddress&a=getAddressDetail&id=${addressId}`;
    if (addressId) {
      this.$http.get(url).then((res) => {
        // console.log(res.body);
        let data = res.body;
          this.input1 = data.userName;
          this.input2 = data.userPhone;
          this.areaId1 = data.areaId1;
          this.areaId2 = data.areaId2;
          this.areaId3 = data.areaId3;
          this.address = data.address;
          this.switch1 = data.isDefault == 1 ? true : false
      });
    }
  },
  methods: {
    handleBack() {
      this.$router.go(-1);
    },
    result(ret) {
      this.defaultAddress = ret.itemName1 + ' ' + ret.itemName2 + ' ' + ret.itemName3;
      this.areaId1 = ret.itemName1;
      this.areaId2 = ret.itemName2;
      this.areaId3 = ret.itemName3;
    },
    saveNewAddress(ret) {
      let addressId = this.$route.query.addressId,
        url = `${config.host}index.php?m=Mobile&c=UserAddress&a=optionUserAddress`,
        data = {
          id: 0,
          userId: userId,
          userName: this.input1,
          userPhone: this.input2,
          areaId1: this.areaId1,
          areaId2: this.areaId2,
          areaId3: this.areaId3,
          address: this.address,
          isDefault: this.switch1 ? 1 : 0
        };
      if (addressId) {
        data.id = addressId;
      };
      // console.log(data);
      // console.log(url);
      if (!data.userName) {
        this.$dialog.toast({
          mes: '姓名不能为空！',
          timeout: 1500
        });
      } else if (!(/^1[3|4|5|6|7|8|9][0-9]{9}$/.test(data.userPhone))) {
        this.$dialog.toast({
          mes: '请输入正确的手机号码！',
          timeout: 1500
        });
      } else if (!data.address) {
        this.$dialog.toast({
          mes: '请输入详细地址！',
          timeout: 1500
        });
      } else {
        this.$http.post(url, data, {
          emulateJSON: true
        }).then(res => {
          // console.log(res.body);
          if (res.body.status == 1) {
            this.$dialog.toast({
              mes: '操作成功！',
              timeout: 1500
            });
            this.$router.go(-1);
          } else {
            this.$dialog.toast({
              mes: '网络异常，请重试！',
              timeout: 1500
            });
          }
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
