<template>
<transition :name="animateName">
  <div class="loadings" v-show="isShow">
    <div class="loadings__loader">
      <div class="loadings__loader__dot"></div>
      <div class="loadings__loader__dot"></div>
      <div class="loadings__loader__dot"></div>
      <div class="loadings__loader__dot"></div>
      <div class="loadings__loader__dot"></div>
    </div>
  </div>
</transition>
</template>
<script type="text/babel">
export default {
  data() {
    return {
      isShow: false,
      hasAnimate: true,
    }
  },
  computed: {
    /**
     * 动画效果样式，没有返回空
     * @return {String} 样式
     */
    animateName() {
      return this.hasAnimate ? 'opacity' : ''
    },
  },
  methods: {
    /**
     * 开启动画效果
     */
    opemAnimate() {
      this.hasAnimate = true
    },
    /**
     * 去除动画效果
     * @return {Promise} 返回promise
     */
    removeAnimate() {
      return new Promise((resolve) => {
        this.hasAnimate = false
        resolve()
      })
    },
    /**
     * 显示动画loading
     */
    show() {
      this.isShow = true
    },
    /**
     * 隐藏动画loading
     */
    hide() {
      this.isShow = false
    },
  },
}
</script>

<style scope>
.loadings {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background: transparent;
}

.loadings__loader {
  position absolute top 50% left 50% transform translate3d(-50%, -50%, 0)
}

.loadings__loader__dot {
  width 40px height 40px background #3ac border-radius 100% display inline-block animation slide 1s infinite margin-right: 6px;
}


@keyframes slide {
  0% {
    transform scale(1)
  }
  50% {
    opacity .3 transform scale(2)
  }
  100% {
    transform scale(1)
  }
}
</style>
