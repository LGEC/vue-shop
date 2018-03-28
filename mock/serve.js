const Koa = require("koa");
const app = new Koa();
const router = require('koa-router')();

router.get('/api', function(ctx, next) {
  ctx.body = 'Hello World!';
});
// 头像和默认搜索关键字
router.get('/api/navIndex', function(ctx, next) {
  ctx.body = {
    data: {
      "headPic": "headPic.jpg",
      "keyWords": "iphone X",
      test: ctx
    }
  };

  // console.log(ctx.query.id);
  console.log('请求navIndex成功!!');
});

//轮播图
router.get('/api/banners', function(ctx, next) {
  ctx.body = {
    data: [
      {
        href: "https://www.baidu.com",
        src: "banner.png"
      }, {
        href: "https://www.baidu.com",
        src: "banner1.png"
      }, {
        href: "https://www.baidu.com",
        src: "banner2.png"
      }
    ]
  }
  console.log('请求banners成功!!');
});

// 专题组件
router.get('/api/special', function(ctx, next) {
  ctx.body = {
    data: [
      {
        id: 1, //专题id
        img: "img-special2.png", //专题图片
        list: [
          {
            id: 1, //商品di
            img: 'img-01.jpg', //商品图片
            title: 'Aussic Bee 蜂蜜', //商品标题
            desc: 'Aussic Bee 蜂蜜 纯正蜂蜜250g 特价活动 原产地澳大利亚', //商品描述
            sales: 20, //销量
            mark: 4.8, //评分
            oldPrice: 399, //原价
            price: [120] //价格：数组 【￥，电子币 ，积分】
          }, {
            id: 2,
            img: 'img-05.jpg',
            title: '现货 欧洲站2017 VIVI ',
            desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
            sales: 20,
            mark: 4.8, 
            oldPrice: 399, //原价
            price: [199, 500]
          }, {
            id: 3,
            img: 'img-06.jpg',
            title: '「卢洁云」CARIEDO 2017冬新款女短款超大毛领时',
            desc: 'ZOWZOW呛口小辣椒羽绒服女中长款2017新款韩版狐狸大',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [260, 50]
          }, {
            id: 4,
            img: 'img-07.jpg',
            title: ' 2017冬中长款大毛领羽',
            desc: '◆ANNA◆2017冬新款超大狐狸毛领过膝中长款羽绒服加厚',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [399]
          }, {
            id: 5,
            img: 'img-13.jpg',
            title: '2017新款韩版宽松貉子毛领连帽大码蝙蝠袖中长款加',
            desc: 'FFAN泛泛 御寒神器 回馈Bi入款 貉子大毛领加厚羽绒',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [26]
          }, {
            id: 6,
            img: 'img-14.jpg',
            title: '余潇潇超大毛领收腰显瘦过膝加厚羽绒服女中长款',
            desc: '2017冬装新款韩版高端奢华真狐狸毛超大毛领白色羽',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [438]
          }, {
            id: 7,
            img: 'img-25.jpg',
            title: ' 于momo2017真狐狸毛超大毛领奶茶色小个子羽绒服',
            desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [60]
          }, {
            id: 8,
            img: 'img-26.jpg',
            title: '大喜自制2017冬装新款复古可拆卸貉子大毛领加厚90白鸭绒',
            desc: '中老年羽绒服女中长款2017冬季新款加厚加肥加大码',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [480]
          }
        ]
      }, {
        id: 2, //专题id
        img: "img-special1.png", //专题图片
        list: [
          {
            id: 1, //商品di
            img: 'img-18.jpg', //商品图片
            title: 'Aussic Bee 蜂蜜', //商品标题
            desc: 'Aussic Bee 蜂蜜 纯正蜂蜜250g 特价活动 原产地澳大利亚', //商品描述
            sales: 20, //销量
            mark: 4.8, //评分
            oldPrice: 399, //原价
            price: [120] //价格：数组 【￥，电子币 ，积分】
          }, {
            id: 2,
            img: 'img-16.jpg',
            title: '现货 欧洲站2017 VIVI ',
            desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [199, 500]
          }, {
            id: 3,
            img: 'img-09.jpg',
            title: '「卢洁云」CARIEDO 2017冬新款女短款超大毛领时',
            desc: 'ZOWZOW呛口小辣椒羽绒服女中长款2017新款韩版狐狸大',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [260, 50]
          }, {
            id: 4,
            img: 'img-08.jpg',
            title: ' 2017冬中长款大毛领羽',
            desc: '◆ANNA◆2017冬新款超大狐狸毛领过膝中长款羽绒服加厚',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [399]
          }, {
            id: 5,
            img: 'img-10.jpg',
            title: '2017新款韩版宽松貉子毛领连帽大码蝙蝠袖中长款加',
            desc: 'FFAN泛泛 御寒神器 回馈Bi入款 貉子大毛领加厚羽绒',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [26]
          }, {
            id: 6,
            img: 'img-11.jpg',
            title: '余潇潇超大毛领收腰显瘦过膝加厚羽绒服女中长款',
            desc: '2017冬装新款韩版高端奢华真狐狸毛超大毛领白色羽',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [438]
          }, {
            id: 7,
            img: 'img-12.jpg',
            title: ' 于momo2017真狐狸毛超大毛领奶茶色小个子羽绒服',
            desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [60]
          }, {
            id: 8,
            img: 'img-15.jpg',
            title: '大喜自制2017冬装新款复古可拆卸貉子大毛领加厚90白鸭绒',
            desc: '中老年羽绒服女中长款2017冬季新款加厚加肥加大码',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [480]
          }
        ]
      }, {
        id: 3, //专题id
        img: "img-special3.png", //专题图片
        list: [
          {
            id: 1, //商品di
            img: 'img-26.jpg', //商品图片
            title: 'Aussic Bee 蜂蜜', //商品标题
            desc: 'Aussic Bee 蜂蜜 纯正蜂蜜250g 特价活动 原产地澳大利亚', //商品描述
            sales: 20, //销量
            mark: 4.8, //评分
            oldPrice: 399, //原价
            price: [120] //价格：数组 【￥，电子币 ，积分】
          }, {
            id: 2,
            img: 'img-20.jpg',
            title: '现货 欧洲站2017 VIVI ',
            desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [199, 500]
          }, {
            id: 3,
            img: 'img-22.jpg',
            title: '「卢洁云」CARIEDO 2017冬新款女短款超大毛领时',
            desc: 'ZOWZOW呛口小辣椒羽绒服女中长款2017新款韩版狐狸大',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [260, 50]
          }, {
            id: 4,
            img: 'img-24.jpg',
            title: ' 2017冬中长款大毛领羽',
            desc: '◆ANNA◆2017冬新款超大狐狸毛领过膝中长款羽绒服加厚',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [399]
          }, {
            id: 5,
            img: 'img-23.jpg',
            title: '2017新款韩版宽松貉子毛领连帽大码蝙蝠袖中长款加',
            desc: 'FFAN泛泛 御寒神器 回馈Bi入款 貉子大毛领加厚羽绒',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [26]
          }, {
            id: 6,
            img: 'img-25.jpg',
            title: '余潇潇超大毛领收腰显瘦过膝加厚羽绒服女中长款',
            desc: '2017冬装新款韩版高端奢华真狐狸毛超大毛领白色羽',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [438]
          }, {
            id: 7,
            img: 'img-19.jpg',
            title: ' 于momo2017真狐狸毛超大毛领奶茶色小个子羽绒服',
            desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [60]
          }, {
            id: 8,
            img: 'img-10.jpg',
            title: '大喜自制2017冬装新款复古可拆卸貉子大毛领加厚90白鸭绒',
            desc: '中老年羽绒服女中长款2017冬季新款加厚加肥加大码',
            sales: 20,
            mark: 4.8,
            oldPrice: 399, //原价
            price: [480]
          }
        ]
      }
    ]
  };

  // console.log(ctx.query.id);
  console.log('请求专题模块成功!!');
});

// 热门推荐组件
router.get('/api/goodslist', function(ctx, next) {
  ctx.body = {
    data: {
      page: 1,
      pageSize: 10,
      list: [
        {
          id: 1, //商品di
          img: 'img-18.jpg', //商品图片
          title: 'Aussic Bee 蜂蜜', //商品标题
          desc: 'Aussic Bee 蜂蜜 纯正蜂蜜250g 特价活动 原产地澳大利亚', //商品描述
          sales: 20, //销量
          mark: 4.8, //评分
          oldPrice: 399, //原价
          price: [120] //价格：数组 【￥，电子币 ，积分】
        }, {
          id: 2,
          img: 'img-16.jpg',
          title: '现货 欧洲站2017 VIVI ',
          desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [199, 500]
        }, {
          id: 3,
          img: 'img-09.jpg',
          title: '「卢洁云」CARIEDO 2017冬新款女短款超大毛领时',
          desc: 'ZOWZOW呛口小辣椒羽绒服女中长款2017新款韩版狐狸大',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [260, 50]
        }, {
          id: 6,
          img: 'img-11.jpg',
          title: '余潇潇超大毛领收腰显瘦过膝加厚羽绒服女中长款',
          desc: '2017冬装新款韩版高端奢华真狐狸毛超大毛领白色羽',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [438]
        }, {
          id: 4,
          img: 'img-10.jpg',
          title: '2017冬中长款大毛领羽',
          desc: '◆ANNA◆2017冬新款超大狐狸毛领过膝中长款羽绒服加厚',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [399]
        }, {
          id: 5,
          img: 'img-22.jpg',
          title: '2017新款韩版宽松貉子毛领连帽大码蝙蝠袖中长款加',
          desc: 'FFAN泛泛 御寒神器 回馈Bi入款 貉子大毛领加厚羽绒',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [26]
        }, {
          id: 7,
          img: 'img-12.jpg',
          title: ' 于momo2017真狐狸毛超大毛领奶茶色小个子羽绒服',
          desc: '2017冬装新款女装时尚奢华超大毛领羽绒服女中长款',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [60]
        }, {
          id: 8,
          img: 'img-15.jpg',
          title: '大喜自制2017冬装新款复古可拆卸貉子大毛领加厚90白鸭绒',
          desc: '中老年羽绒服女中长款',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [480]
        }, {
          id: 9,
          img: 'img-15.jpg',
          title: '大喜自制2017冬装新款复古可拆卸貉子大毛领加厚90白鸭绒',
          desc: '中老年羽绒服女中长款2017冬季新款加厚加肥加大码',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [480]
        }, {
          id: 10,
          img: 'img-15.jpg',
          title: '大喜自制2017冬装新款复古可拆卸貉子大毛领加厚90白鸭绒',
          desc: '中老年羽绒服女中长款2017冬季新款加厚加肥加大码',
          sales: 20,
          mark: 4.8,
          oldPrice: 399, //原价
          price: [480]
        }
      ]
    }
  };

  // console.log(ctx.query.id);
  console.log('请求热门推荐模块成功!!');
});

router.post('/api/submitComment', function(ctx, next) {
  console.log('提交评论');

  let postdata;
  ctx.req.addListener('data', (data) => {
    postdata += data;
    console.log(data);
  });
  ctx.req.addListener('end', function() {
    console.log(postdata);
  });

  //返回值
  ctx.body = {
    errno: 0,
    msg: 'ok'
  }
})

app.use(router.routes()).use(router.allowedMethods());

//监听8088端口
app.listen(8088, _ => {
  console.log('server started')
});
