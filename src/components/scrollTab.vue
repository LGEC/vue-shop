<template>
<yd-scrolltab>
  <yd-scrolltab-panel :label="item.catName" v-for="item,key in classData" :key="key">
    <div class="subClass">
      <router-link :to="{ name: 'search', query: {keyWord:sub.catName,key:sub.catId} }" v-for="(sub, key) in item.childs" :key="key">
        <span>{{ sub.catName }}</span>
      </router-link>
    </div>
  </yd-scrolltab-panel>
  <!-- ... -->
</yd-scrolltab>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      data: []
    }
  },
  props: {
    classData: {
      default: []
    },
  }
}
</script>

<style scoped>
.subClass span {
  display: inline-block;
  margin-left: .2rem;
  color: #999;
  font-size: .28rem;
  padding: .04rem;
}
</style>
