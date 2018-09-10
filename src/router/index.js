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
const supplierApply = () => import('@/pages/supplierApply');
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
      component: home,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/shop/:shopId',
      name: 'shop',
      component: shop,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/pointMarket',
      name: 'pointMarket',
      component: pointMarket,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/goodsClass',
      name: 'goodsClass',
      component: goodsClass,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/shopcar',
      name: 'shopcar',
      component: shopcar,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/my',
      name: 'my',
      component: my,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/search',
      name: 'search',
      component: search,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/detail/:goodsId',
      name: 'detail',
      component: detail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/mdetail/:goodsId',
      name: 'mdetail',
      component: mdetail,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/shareQR',
      name: 'shareQR',
      component: shareQR,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/myOrder',
      name: 'myOrder',
      component: myOrder,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/myOrder1',
      name: 'myOrder1',
      component: myOrder1,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/collect',
      name: 'collect',
      component: collect,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/messages',
      name: 'messages',
      component: messages,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/msgInfo',
      name: 'msgInfo',
      component: msgInfo,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/mySub',
      name: 'mySub',
      component: mySub,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/supplierApply',
      name: 'supplierApply',
      component: supplierApply,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/myInfo',
      name: 'myInfo',
      component: myInfo,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/myLeader',
      name: 'myLeader',
      component: myLeader,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/historyCommission',
      name: 'historyCommission',
      component: historyCommission,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/address',
      name: 'address',
      component: address,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/addAddress',
      name: 'addAddress',
      component: addAddress,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/contact',
      name: 'contact',
      component: contact,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/myPoint',
      name: 'myPoint',
      component: myPoint,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/myMoney',
      name: 'myMoney',
      component: myMoney,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/comment',
      name: 'comment',
      component: comment,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/makeOrder',
      name: 'makeOrder',
      component: makeOrder,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/commission',
      name:'commission',
      component:commission,
      meta: {
        keepAlive: false
      }
    },
    {
      path: '/pwdManager/:isPay',
      name:'pwdManager',
      component:pwdManager,
      meta: {
        keepAlive: false
      }
    }
  ]
})
