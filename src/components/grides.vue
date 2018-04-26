<template>
<yd-grids-group :rows="4">
  <yd-grids-item v-bind:link="gride.link" v-for="(gride,key,index) in grides" :key="index">
    <img class="imgBox" slot="icon" v-bind:src=" gride.icon ">
    <span class="textBox" slot="text">{{ gride.name }}</span>
  </yd-grids-item>
</yd-grids-group>
</template>

<script>
export default {
  data () {
    return {
      grides: [
        {
          name: "成为分销商",
          icon: require("../assets/icon-grides1.png"),
          link: "/pointMarket"
        },
        {
          name: "银子明细",
          icon: require("../assets/icon-grides2.png"),
          link: "/myMoney"
        },
        {
          name: "客服咨询",
          icon: require("../assets/icon-grides3.png"),
          link: "/contact"
        },
        {
          name: "消息中心",
          icon: require("../assets/icon-grides4.png"),
          link: "messages"
        }
      ]
    }
  }
}
</script>

<style scoped>
.imgBox{
  width: 0.8rem;
  height: 0.8rem;
}
.textBox{
  font-size: 0.24rem;
  color: #999;
  margin-top: 0.2rem;
}

.yd-grids-4 .yd-grids-item {
  width:25%;
  box-sizing: border-box;
}

</style>
