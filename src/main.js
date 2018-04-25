// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import Vuex from 'vuex'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import YDUI from 'vue-ydui'
import 'vue-ydui/dist/ydui.rem.css'

Vue.use(YDUI);
Vue.use(VueResource);

// Vue.use(Vuex);
let test = new Vue({
  created() {
    console.log('-------------------');
    Vue.prototype.GLOBAL = 'hello vue prototype';
    this.$dialog.loading.open('正在登陆中');
    this.$http.get(`http://00.37518.com/index.php?m=Mobile&c=Users&a=getUserId`).then(res => {
      console.log('------------');
      console.log(res.body);
      console.log('------------');
      // window.localStorage.setItem('userId', res.body);
      window.localStorage.setItem('userId', 136);
      this.$dialog.loading.close();
    });
  }
});

// Vue.prototype.GLOBAL = 'hello vue prototype';
/**
 * YDUI 可伸缩布局方案
 * rem计算方式：设计图尺寸px / 100 = 实际rem  【例: 100px = 1rem，32px = .32rem】
 */
!function(window) {

  /* 设计图文档宽度 */
  var docWidth = 750;

  var doc = window.document,
    docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window
      ? 'orientationchange'
      : 'resize';

  var recalc = (function refreshRem() {
    var clientWidth = docEl.getBoundingClientRect().width;

    /* 8.55：小于320px不再缩小，11.2：大于420px不再放大 */
    docEl.style.fontSize = Math.max(Math.min(20 * (clientWidth / docWidth), 11.2), 8.55) * 5 + 'px';

    return refreshRem;
  })();

  /* 添加倍屏标识，安卓为1 */
  docEl.setAttribute(
    'data-dpr', window.navigator.appVersion.match(/iphone/gi)
    ? window.devicePixelRatio
    : 1);

  if (/iP(hone|od|ad)/.test(window.navigator.userAgent)) {
    /* 添加IOS标识 */
    doc.documentElement.classList.add('ios');
    /* IOS8以上给html添加hairline样式，以便特殊处理 */
    if (parseInt(window.navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/)[1], 10) >= 8)
      doc.documentElement.classList.add('hairline');
    }

  if (!doc.addEventListener)
    return;
  window.addEventListener(resizeEvt, recalc, false);
  doc.addEventListener('DOMContentLoaded', recalc, false);

}(window);

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({el: '#app', router, template: '<App/>', components: {
    App
  }})
