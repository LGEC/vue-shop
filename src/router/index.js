import Vue from 'vue'
import Router from 'vue-router'
//首页
import home from '@/pages/home'
const shop = () => import('@/pages/shop');
const detail = () => import('@/pages/detail');
const mdetail = () => import('@/pages/mdetail');
//积分兑换
const pointMarket = () => import('@/pages/pointMarket');
//分类
const goodsClass = () => import('@/pages/goodsClass');
//购物车
const shopcar = () => import('@/pages/shopcar');
//搜索
const search = () => import('@/pages/search');
//个人中心
const my = () => import('@/pages/my');
const shareQR = () => import('@/pages/shareQR');
const myOrder = () => import('@/pages/myOrder');
const myOrder1 = () => import('@/pages/myOrder1');
const collect = () => import('@/pages/collect');
const messages = () => import('@/pages/messages');
const msgInfo = () => import('@/pages/msgInfo');
const mySub = () => import('@/pages/mySub');
const myInfo = () => import('@/pages/myInfo');
const myLeader = () => import('@/pages/myLeader');
const historyCommission = () => import('@/pages/historyCommission');
const address = () => import('@/pages/address');
const addAddress = () => import('@/pages/addAddress');
const contact = () => import('@/pages/contact');
const myPoint = () => import('@/pages/myPoint');
const myMoney = () => import('@/pages/myMoney');
const comment = () => import('@/pages/comment');
const makeOrder = () => import('@/pages/makeOrder');
const commission = () => import('@/pages/commission');
const pwdManager = () => import('@/pages/pwdManager');

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    },
    {
      path: '/shop/:shopId',
      name: 'shop',
      component: shop
    },
    {
      path: '/pointMarket',
      name: 'pointMarket',
      component: pointMarket
    },
    {
      path: '/goodsClass',
      name: 'goodsClass',
      component: goodsClass
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar
    },
    {
      path: '/my',
      name: 'my',
      component: my
    },
    {
      path: '/search',
      name: 'search',
      component: search
    },
    {
      path: '/detail/:goodsId',
      name: 'detail',
      component: detail
    },
    {
      path: '/mdetail/:goodsId',
      name: 'mdetail',
      component: mdetail
    },
    {
      path: '/shareQR',
      name: 'shareQR',
      component: shareQR,
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder,
    },
    {
      path: '/myOrder1',
      name: 'myOrder1',
      component: myOrder1,
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect,
    },
    {
      path: '/messages',
      name: 'messages',
      component: messages,
    },
    {
      path: '/msgInfo',
      name: 'msgInfo',
      component: msgInfo,
    },
    {
      path: '/mySub',
      name: 'mySub',
      component: mySub,
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: myInfo,
    },
    {
      path: '/myLeader',
      name: 'myLeader',
      component: myLeader,
    },
    {
      path: '/historyCommission',
      name: 'historyCommission',
      component: historyCommission,
    },
    {
      path: '/address',
      name: 'address',
      component: address,
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress,
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
    },
    {
      path: '/myPoint',
      name: 'myPoint',
      component: myPoint,
    },
    {
      path: '/myMoney',
      name: 'myMoney',
      component: myMoney,
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment,
    },
    {
      path: '/makeOrder',
      name: 'makeOrder',
      component: makeOrder,
    },
    {
      path: '/commission',
      name:'commission',
      component:commission
    },
    {
      path: '/pwdManager/:isPay',
      name:'pwdManager',
      component:pwdManager
    }
  ]
})
