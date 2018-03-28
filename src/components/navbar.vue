<template>
<yd-tabbar fixed activeColor="#e8380d">
  <yd-tabbar-item title="首页" link="/" :active=' navbar == 1 ? true:false '>
    <yd-icon name="home-outline" slot="icon" size="0.54rem"></yd-icon>
  </yd-tabbar-item>
  <yd-tabbar-item title="分类" link="/goodsClass" :active=' navbar == 2 ? true:false '>
    <yd-icon name="type" slot="icon" size="0.54rem"></yd-icon>
  </yd-tabbar-item>
  <yd-tabbar-item title="购物车" link="/shopcar" :active=' navbar == 3 ? true:false '>
    <yd-icon name="shopcart-outline" slot="icon" size="0.54rem"></yd-icon>
  </yd-tabbar-item>
  <yd-tabbar-item title="个人中心" link="/my" :active=' navbar == 4 ? true:false '>
    <yd-icon name="ucenter-outline" slot="icon" size="0.54rem"></yd-icon>
  </yd-tabbar-item>
</yd-tabbar>
</template>

<script>
export default {
  props: {
    navbar: {
      default: 1
    }
  }
}
</script>

<style>

</style>
