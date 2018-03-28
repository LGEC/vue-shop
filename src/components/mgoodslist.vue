<template>
<yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">

  <yd-list :theme="theme" slot="list">

    <yd-list-item type="link" :href="{name:'mdetail',params:{goodsId: item.goodsId}}" v-for="item, key in data" :key="key">
      <img slot="img" :src="item.goodsImg">
      <span class="goods-tit" slot="title">{{item.goodsName}}</span>
      <p class="goods-desc" slot="other">{{item.goodsSpec}}</p>
      <yd-list-other class="goods-price-box" slot="other">
        <div>
          <span class="goods-price">{{item.goodsPrice}} 两</span>
        </div>
        <div class="goods-sales">已售：{{item.saleCount}}</div>
      </yd-list-other>
    </yd-list-item>

    <p class="isShow" v-if="isShow">没有搜索到哎~~换个关键词试试吧</p>

  </yd-list>

  <!-- 数据全部加载完毕显示 -->
  <span slot="doneTip">啦啦啦，啦啦啦，没有更多啦~~</span>

  <!-- 加载中提示，不指定，将显示默认加载中图标 -->
  <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg" />

</yd-infinitescroll>
</template>

<script type="text/babel">
import config from '@/config.js';
let page = 1;
export default {
  props: {
    theme: {
      default: 3
    },
    url: {
      default:''
    },
    isSearch: {
      default:''
    }
  },
  data() {
    return {
      isShow:false,
      data:[]
    }
  },
  created() {
    let self = this;
    this.page = 1 ;
    this.pageSize = 10 ;
    console.log(this.url);
    self.$http.get(`${this.url}${this.page}`).then( res => {
      console.log(res.body);
      this.page++;
      let data = res.body;
      for (let i = 0; i < data.length; i++) {
        data[i].goodsImg = config.host + data[i].goodsImg;
      };
      this.data.push(...data);
      if(data.length == 0 && this.isSearch == 1){
        this.isShow = true;
      }
      // console.log(data);
    });

  },
  methods: {
    loadList() {
      // console.log(this.page);
      this.$http.get(`${this.url}${this.page}`).then(function(res) {
        const _data = res.body;
        // console.log(_data);
        for (let i = 0; i < _data.length; i++) {
          _data[i].goodsImg = config.host + _data[i].goodsImg;
        };
        this.data = [...this.data, ..._data];

        if (_data.length < this.pageSize) {
          /* 所有数据加载完毕 */
          this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.loadedDone');
          return;
        }

        /* 单次请求数据完毕 */
        this.$refs.infinitescrollDemo.$emit('ydui.infinitescroll.finishLoad');

        this.page++;
      });
    }
  }
}
</script>
<style scoped>
.goods-tit {
  color: #353535;
  font-size: .28rem;
  font-weight: normal;
}
.isShow{
  line-height: .5rem;
  color: #999;
  font-size: .24rem;
  text-align: center;
  padding: 0 .2rem;
  margin-top: .2rem;
}
.goods-desc {
  width: 100%;
  height: 0.6rem;
  line-height: 0.3rem;
  font-size: 0.24rem;
  color: #666;
  overflow: hidden;
  margin-top: 0.1rem;
}

.goods-price {
  color: #e8380d;
}

.goods-sales {
  font-size: .24rem;
}

.goods-price-box {
  height: 0.4rem;
}
</style>
