import Vue from 'vue'
import Router from 'vue-router'
//首页
import home from '@/pages/home'
import shop from '@/pages/shop'
import detail from '@/pages/detail'
import mdetail from '@/pages/mdetail'
//积分兑换
import pointMarket from '@/pages/pointMarket'
//分类
import goodsClass from '@/pages/goodsClass'
//购物车
import shopcar from '@/pages/shopcar'
//搜索
import search from '@/pages/search'
//个人中心
import my from '@/pages/my'
import shareQR from '@/pages/shareQR'
import myOrder from '@/pages/myOrder'
import myOrder1 from '@/pages/myOrder1'
import collect from '@/pages/collect'
import messages from '@/pages/messages'
import msgInfo from '@/pages/msgInfo'
import mySub from '@/pages/mySub'
import myInfo from '@/pages/myInfo'
import myLeader from '@/pages/myLeader'
import address from '@/pages/address'
import addAddress from '@/pages/addAddress'
import contact from '@/pages/contact'
import myPoint from '@/pages/myPoint'
import myMoney from '@/pages/myMoney'
import comment from '@/pages/comment'
import makeOrder from '@/pages/makeOrder'
import commission from '@/pages/commission'
import pwdManager from '@/pages/pwdManager'

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
