<template>
  <div class="search">
    <yd-search :placeholder="placeholder" v-model="value" :on-submit="submitHandler" :on-cancel="clearValue"></yd-search>
    <goodslist :isSearch="1" :theme="4" v-if="url" :url="url"></goodslist>

  </div>
</template>

<script type="text/babel">
import config from '@/config.js';
export default {
  data() {
    return {
      placeholder: "iphone X",
      value: '',
      url: ''
    }
  },
  created(){
    if(this.$route.query.keyWord){
      this.value = this.$route.query.keyWord;
      let goodsCatId2 = this.$route.query.key;
      this.url = `${config.host}index.php?m=Mobile&c=Index&a=goodsHot&goodsCatId2=${goodsCatId2}&p=`;
    }

  },
  watch:{
    url(){
      console.log(this.url);
    }
  },
  methods: {
    submitHandler(value) {
      if(value == ''){
        this.$dialog.toast({
          mes: `请输入搜索关键词`
        });
      }else{
        this.url = `${config.host}index.php?m=Mobile&c=Index&a=goodsHot&goodsName=${value}&p=`;
      }
    },
    clearValue() {
      this.value="";
      this.$router.go(-1);
    }
  }
}
</script>

<style scoped>
.search .yd-search-input .search-input{
  background: translate !important;
}

</style>
