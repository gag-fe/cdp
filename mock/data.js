const Qs = require('qs');
const Mock = require('mockjs');
// 数据持久

var movie = {
  'id|+1': 1,
  'name': '@Name',
};

var name = {
  'id|+1': 1,
  'first': '@FIRST',
  'last': '@LAST',
};

var mockUserList = Mock.mock({
  'userList|55': [{'id|+1': 1, 'name': '@cname', 'age': '@natural(10,50)', 'address': '@city(true)'}]
});

var invoiceTitleList = Mock.mock({
  "invoiceTitleData|10": [{"invoiceId|+1": 1, "invoiceTitle": '@cname'}]
});
module.exports = {
  // Forward 到另一个服务器
  'GET https://assets.daily/!*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定路径
  'GET https://assets.daily/!*': 'https://assets.online/v2/',

  // Forward 到另一个服务器，不指定来源服务器
  'GET /assets/!*': 'https://assets.online/',

  // Forward 到另一个服务器，并指定子路径
  // 请求 /someDir/0.0.50/index.css 会被代理到 https://g.alicdn.com/tb-page/taobao-home, 实际返回 https://g.alicdn.com/tb-page/taobao-home/0.0.50/index.css
  'GET /someDir/(.*)': 'https://g.alicdn.com/tb-page/taobao-home',

  // 本地文件替换
  'GET /local': './local.js',

  // Mock 数据返回
  'GET /users': [{name: 'sorrycc'}, {name: 'pigcan'}],
  'GET /users/1': {name: 'jaredleechn'},

  // Mock 数据，基于 mockjs
  'POST /tag/user/SearchEmployeeInfo.do': Mock.mock({
    status: 'S',
    success: true,
    'data|40': [{
      'id|+1': 1,
      siteName: '@url',
      domain: '@url',
      description: '@sentence',
      interfacePersonList: '@cname'
    }],
  }),

  'GET /y.do'(req, res) {
    res.status(200);
    res.jsonp(Mock.mock({data: movie, success: true, status: 'S',}), 'cb');
  },

  'POST /z.do'(req, res) {
    var postData = Qs.parse(req.body);
    var pageSize = postData.pageSize;
    var currentPage = postData.currentPage;
    name['id|+1'] = pageSize * (currentPage - 1);
    var tmpl = {};
    tmpl['dataList|' + pageSize] = [name];
    tmpl['success'] = true;
    tmpl['pageSize'] = pageSize;
    tmpl['currentPage'] = currentPage;
    res.json(Mock.mock(tmpl));
  },

  //消费指数
  'POST /shop/getMyConsumStatisticData.do'(req, res){
    let returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        consumeData: {
          consumeCount: 12,//累计消费
          maxMount: 1000,//最豪消费
          saveMount: 200,//为您节省
          singleTypeConsumeDatas: null,
          totalMount: 12003224.32//累计消费
        }
      }
    };
    res.json(returnData);
  },

  //我的商家
  'POST /shop/getMyShopInfo.do'(req, res){
    let returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        myShopInfo: [//我的商铺信息
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 3.5,//评分
            hasDiscountCounpon: true,//是否有打折券
            hasMoneyCounpons: true,//是否有普通券
            id: "1",//实体店Id
            myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "",//推荐人头像
            recommenderNickName: "sadfsfdsfa",//推荐人昵称
            shareId: "12345",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁天安门厕所旁天安门厕所旁天安门厕所旁天安门厕所旁天安门厕所旁天安门厕所旁天安门厕所旁",//地址
            // shopEntityImg: "/src/common/img/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点111铁板烧点111铁板烧点111铁板烧点111铁板烧点111铁板烧点111",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5,//等待时间
            shopTypeName: "娱乐"//业态名称
          },
          {
            averageConsume: 818.32,//人均
            averageProducetPrice: 1266.62,//件单价
            backConsumeExponent: 120.52,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 3,//评分
            hasDiscountCounpon: false,//是否有打折券
            hasMoneyCounpons: false,//是否有普通券
            id: "2",//实体店Id
            myShopType: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "",//推荐人头像
            recommenderNickName: "人昵称",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "a",//地址
            // shopEntityImg: "/src/common/img/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点444",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5,//等待时间
            shopTypeName: "生活"//业态名称
          },
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 4,//评分
            hasDiscountCounpon: true,//是否有打折券
            hasMoneyCounpons: false,//是否有普通券
            id: "1",//实体店Id
            myShopType: "3",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "",//推荐人头像
            recommenderNickName: "fasfs",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁",//地址
            // shopEntityImg: "/src/common/img/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点222",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5,//等待时间
            shopTypeName: "美容"//业态名称
          },
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 4.5,//评分
            hasDiscountCounpon: false,//是否有打折券
            hasMoneyCounpons: true,//是否有普通券
            id: "2",//实体店Id
            myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "",//推荐人头像
            recommenderNickName: "asd",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁",//地址
            // shopEntityImg: "/src/common/img/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点333",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5,//等待时间
            shopTypeName: "餐饮"//业态名称
          }
        ]
      }
    };
    res.json(returnData);
  },

  //搜索结果的商家详情
  'POST /shop/getMyShopSearchResult.do'(req, res){
    let returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        myShopInfo: [{
          averageConsume: 88.3,//人均
          averageProducetPrice: 66.6,//件单价
          backConsumeExponent: 20.5,//回头率
          colseTime: "21:00",//关店时间
          consumeTimes: 5,//消费次数
          evaluateScore: 3.5,//评分
          hasDiscountCounpon: true,//是否有打折券
          hasMoneyCounpons: true,//是否有普通券
          id: "1",//实体店Id
          myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
          recommenderImg: "",//推荐人头像
          recommenderNickName: "昵称",//推荐人昵称
          shareId: "DJFIJIEJFUDF93H",//分享Id
          openTime: "11:00",//开店时间
          phone: "888888",//手机号
          shopEntityAddress: "天安门厕所旁",//地址
          // shopEntityImg: "/src/common/img/shopLogo.png",//店铺图片
          shopEntityName: "铁板烧点111",//店名称
          unInvoiceTimes: 3,//未开发票次数
          waitTimeMinite: 5,//等待时间
          shopTypeName: "餐饮"//业态名称
        },
          {
            averageConsume: 88.3,//人均
            averageProducetPrice: 66.6,//件单价
            backConsumeExponent: 20.5,//回头率
            colseTime: "21:00",//关店时间
            consumeTimes: 5,//消费次数
            evaluateScore: 3.5,//评分
            hasDiscountCounpon: true,//是否有打折券
            hasMoneyCounpons: true,//是否有普通券
            id: "1",//实体店Id
            myShopType: "1",//我的店铺类型，1-消费、2-收藏、3-推荐
            recommenderImg: "",//推荐人头像
            recommenderNickName: "昵称",//推荐人昵称
            shareId: "DJFIJIEJFUDF93H",//分享Id
            openTime: "11:00",//开店时间
            phone: "888888",//手机号
            shopEntityAddress: "天安门厕所旁",//地址
            // shopEntityImg: "/src/common/img/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧点222",//店名称
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 5,//等待时间
            shopTypeName: "生活"//业态名称
          }
        ]
      }
    };
    res.json(returnData);
  },

  //搜索联想
  'POST /shop/searchMyShopInfo.do'(req, res){
    let keyWord = Qs.parse(req.body).keyWord;
    let returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        myShopInfo: [],
      }
    };
    if (keyWord == 'a') {
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          myShopInfo: [
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店1"//实体店名称
            },
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店2"//实体店名称
            },
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店3"//实体店名称
            }, {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店4"//实体店名称
            },
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店5"//实体店名称
            }, {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店6"//实体店名称
            },
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店7"//实体店名称
            }
          ]
        }
      }
    }
    if (keyWord == 'ab') {
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          myShopInfo: [
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店33"//实体店名称
            },
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店22"//实体店名称
            },
            {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店11"//实体店名称
            }, {
              action: "2",//我的店铺类型，1-消费、2-收藏、3-推荐
              sharedFromChannelId: null,
              sharedFromChannelType: null,
              sharedFromUserId: "JF3J9JD9FJ93J",//action=3时，分享人的id
              sharedId: "F3U9FDOSJAF9J3",//action=3时，分享id
              shopEntityId: "FIEF93JFOJ9AJFIO",//实体店id
              shopEntityName: "北京凯德茂店44"//实体店名称
            }
          ]
        }
      }
    }

    res.json(returnData);
  },

  //商家详情
  'POST /shop/getMyShopEntityDetail.do'(req, res){
    let shopEntityId = Qs.parse(req.body).shopEntityId;
    let returnData;
    if (shopEntityId == 1) {
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          shopEntityDetail: {
            averageConsume: 881.32,//人均消费
            averageProducetPrice: 616.16,
            backConsumeExponent: 120.52,//回头指数
            colseTime: "21:00",//关店时间
            commentDatas: [//评论
              {
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 2,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: ""//平路人头像
              }, {
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 5,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: "http://src"//平路人头像
              }, {
                commentContent: "评论内容评论内容评论内容评论内容评论内容评论内容评论内容" +
                "评论内容评论内容评论内容评论内容评论内容评论内容评论内容评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "",//评论人手机号
                commenterNickName: "",//评论人昵称
                score: 3.5,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: ""//平路人头像
              }, {
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 4,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "",//实体店图片
                userHeadImg: ""//平路人头像
              }
            ],
            consumeTimes: 5,//消费次数
            couponInfo: null,//优惠券信息待定
            evaluateScore: 3.5,//店铺平均评分
            hasDiscountCounpon: false,//是否有折扣券
            hasMoneyCounpons: false,//是否有代金券
            id: "DFEL6DS83SAFE",//店铺Id
            monthTop: [//月排行
              // {
              //   img: "",//商品图片
              //   name: "土豆丝炒肉土豆丝炒肉土豆丝炒肉土豆丝炒肉",//商品名称
              //   price: 5223.61,//商品价格
              //   isConsume:false//商品是否消费过
              // },
              // {
              //   img: "",//商品图片
              //   name: "土豆丝炒肉111",//商品名称
              //   price: 5223.61,//商品价格
              //   isConsume:false//商品是否消费过
              // },
              // {
              //   img: "",//商品图片
              //   name: "土豆丝炒肉222",//商品名称
              //   price: 522,//商品价格
              //   isConsume:true//商品是否消费过
              // },
              // {
              //   img: "",//商品图片
              //   name: "土豆丝炒肉333",//商品名称
              //   price: 5223.61,//商品价格
              //   isConsume:true//商品是否消费过
              // }
            ],
            myShopType: "1",//1-消费、2-收藏、3-推荐
            newProduct: [//店内上新
              {
                img: "",//商品图片
                name: "土豆丝炒肉",//商品名称
                price: 53.6,//商品价格
                isConsume: true,//商品是否消费过
                collectId: '123123123'
              }
            ],
            openTime: "11:00",//开门时间
            phone: "888888",//店铺电话
            shopEntityAddress: null,//店铺地址
            // shopEntityImg: "/src/common/img/shopLogo.png",//店铺图片
            shopEntityName: "铁板烧",//店铺名称
            signatureProduct: [//招牌商品
              {
                img: "",//商品图片
                name: "土豆丝炒肉1土豆丝炒肉1土豆丝炒肉1土豆丝炒肉1" +
                "土豆丝炒肉1土豆丝炒肉1土豆丝炒肉1土豆丝炒肉1",//商品名称
                price: 53.6,//商品价格
                isConsume: true,//商品是否消费过
                isCollectDish: true,//是否收藏店铺
                goodsId: 'FJI3FJ9DJSA9F3',//商品id
                originPrice: 60.3,//商品原价
                isCollected: true,
                productDesc: '商品描述1商品描述1商品描述1商商品描述1商品描述1商品描述1商商品描述1商品描述1商品描述1商' +
                '品描述1商品描述1商品描述1商品描述1商品描述1商品描述1',
                collectId: '123123123'
              },
              {
                img: "",//商品图片
                name: "土豆丝炒肉2",//商品名称
                price: 59.9,//商品价格
                isConsume: false,//商品是否消费过
                isCollectDish: false,//是否收藏店铺
                goodsId: '123',//商品id
                originPrice: 80,//商品原价
                isCollected: false,
                productDesc: '商品描述2',
                collectId: ''
              }
            ],
            unInvoiceTimes: 3,//未开发票次数
            waitTimeMinite: 15,//平均等待时间（分）
            hasCollected: true,//是否收藏店铺
            collectId: '333333',

          }
        }
      };
    }

    if (shopEntityId == 2) {
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          shopEntityDetail: {
            averageConsume: 55.3,//人均消费
            averageProducetPrice: 33.6,
            backConsumeExponent: 56,//回头指数
            colseTime: "21:00",//关店时间
            commentDatas: [//评论
              {
                commentContent: "评论内容评论内容评论内容评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 4.5,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "http://src",//实体店图片
                userHeadImg: ""//平路人头像
              }, {
                commentContent: "评论内容",//评论内容
                commentDate: "2016-11-29 18:31:24",//评论时间
                commenterMobile: "18348549635",//评论人手机号
                commenterNickName: "用户微信昵称",//评论人昵称
                score: 3,//评分
                shopEntityName: "望京店",//实体店名称
                shopImg: "http://src",//实体店图片
                userHeadImg: ""//平路人头像
              }
            ],
            consumeTimes: 3,//消费次数
            couponInfo: null,//优惠券信息待定
            evaluateScore: 5,//店铺平均评分
            hasDiscountCounpon: true,//是否有折扣券
            hasMoneyCounpons: true,//是否有代金券
            id: "DFEL6DS83SAFE",//店铺Id
            monthTop: [//月排行
              {
                img: "",//商品图片
                name: "土豆丝炒肉1",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉2",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉3",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉4",//商品名称
                price: 53.6,//商品价格
                isConsume: false//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉5",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉6",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉7",//商品名称
                price: 53.6,//商品价格
                isConsume: false//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉8",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉9",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉10",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }
            ],
            myShopType: "1",//1-消费、2-收藏、3-推荐
            newProduct: [//店内上新
              {
                img: "",//商品图片
                name: "土豆丝炒肉12",//商品名称
                price: 53.6,//商品价格
                isConsume: false//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉22",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉4",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉42",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉52",//商品名称
                price: 53.6,//商品价格
                isConsume: false//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉62",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }
            ],
            openTime: "11:00",//开门时间
            phone: "66666666",//店铺电话
            shopEntityAddress: "天安门旁",//店铺地址
            shopEntityImg: null,//店铺图片
            shopEntityName: "铁板333烧点",//店铺名称
            signatureProduct: [//招牌商品
              {
                img: "",//商品图片
                name: "土豆丝炒肉11",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉22",//商品名称
                price: 53.6,//商品价格
                isConsume: false//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉33",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉44",//商品名称
                price: 53.6,//商品价格
                isConsume: true//商品是否消费过
              }, {
                img: "",//商品图片
                name: "土豆丝炒肉55",//商品名称
                price: 53.6,//商品价格
                isConsume: false//商品是否消费过
              }
            ],
            unInvoiceTimes: 2,//未开发票次数
            waitTimeMinite: 30,//平均等待时间（分）
            hasCollected: false,//是否收藏店铺
            collectId: '',
          }
        }
      };
    }

    res.json(returnData);
  },

  //收藏商家 or 单品
  'POST /my/addColl.do'(req, res){
    let shopEntityId = Qs.parse(req.body).shopEntityId;
    let returnData;
    returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        ret: "12345646"       //新增收藏的收藏id
      }
    };
    res.json(returnData);
  },

  //取消收藏
  'POST /my/cancelColl.do'(req, res){
    let id = Qs.parse(req.body).id;
    let returnData;
    returnData = {
      status: 'S',
      msg: "操作成功",
      success: true,
      data: {
        ret: "true"       //新增收藏的收藏id
      }
    };
    res.json(returnData);
  },

  //分享详情
  'POST /share/getShareDetail.do'(req, res){
    let shareId = Qs.parse(req.body).shareId;
    let returnData;
    if (shareId == 'DJFIJIEJFUDF93H') {
      returnData = {
        status: 'S',
        msg: "操作成功",
        success: true,
        data: {
          shareInfo: {
            averageConsume: 50.5,//人均消费
            averageGoodsPrice: 25,//件单价
            goods: [//shareType=G、J 会有
              {
                eatTimes: 1,//分享者吃过多少次
                goodsId: "JFIEJIF339JJ",//商品id
                goodsImg: "/src/common/img/shopLogo.jpg",//商品图片
                goodsName: "葱爆牛葱爆牛葱爆牛葱爆牛葱爆牛",//商品名称
                price: 20.8,//商品价格
                tatolSale: 100//商品总销售数量
              },
              {
                eatTimes: 2,//分享者吃过多少次
                goodsId: "JFIEJIF339JJ",//商品id
                goodsImg: "/src/common/img/shopLogo.jpg",//商品图片
                goodsName: "葱爆牛",//商品名称
                price: 20121212.28,//商品价格
                tatolSale: 100//商品总销售数量
              },
              {
                eatTimes: 3,//分享者吃过多少次
                goodsId: "JFIEJIF339JJ",//商品id
                goodsImg: "/src/common/img/shopLogo.jpg",//商品图片
                goodsName: "葱爆牛",//商品名称
                price: 20.8,//商品价格
                tatolSale: 100//商品总销售数量
              },
              {
                eatTimes: 4,//分享者吃过多少次
                goodsId: "JFIEJIF339JJ",//商品id
                goodsImg: "",//商品图片
                goodsName: "葱爆牛",//商品名称
                price: 20.8,//商品价格
                tatolSale: 100//商品总销售数量
              },
              {
                eatTimes: 5,//分享者吃过多少次
                goodsId: "JFIEJIF339JJ",//商品id
                goodsImg: "/src/common/img/shopLogo.jpg",//商品图片
                goodsName: "葱爆牛",//商品名称
                price: 20.8,//商品价格
                tatolSale: 100//商品总销售数量
              }
            ],
            ip: null,
            isHasDiscountCoupon: false,//是否有折扣券
            isHasMoneyCoupon: true,//是否有代金券
            openId: null,
            products: null,
            // recommedWords:null,
            recommedWords: "这家店的牛肉不错不错",//分享心得，shareType=J才有
            reconsumePercent: 30,//回头指数
            shareScore: 4.5,//分享评分, shareType=J才有
            shareSource: null,
            shareType: "E",//分享类型 E-实体店  G-单品 J-经验
            shopEntityId: "1",//实体店id
            shopEntityName: "望京店望京店望京店望京店望京店望京店望京店望京店望京店",//店铺名称
            shopLogoImg: null,//店铺logo图片
            shopShowImg: null,//店铺展示图片
            shopTypeName: "美容",//店铺业态名称
            userId: null,
          }

        }
      };
    }

    res.json(returnData);
  },

  //分享单品获取
  'POST /share/initShareGoods.do'(req, res){
    let data = Mock.mock({
      'goodsData|8': [{
        'eatTimes|+1': 1,
        'goodsId|+1': 1,
        goodsImg: '',
        goodsName: '@name',
        'price|11-99': 1,
        'totalSale|11-99': 1
      }]
    });
    var returnData = {
      status: "S",
      msg: "成功！",
      data
    };
    res.json(returnData);
  },

  //分享单品or店铺or心得
  'POST /share/addShare.do'(req, res){
    let returnData = {
      status: "S",
      msg: "成功！",
      data: {}
    };
    res.json(returnData);
  },

  //搜索历史
  'POST /shop/getSearchHistory.do'(req, res){
    let returnData = {
      status: "S",
      msg: "成功！",
      data: {
        searchHistory: ['外婆家', '拾味馆', '黑松白鹿', '铁板烧', '拾味馆铁板烧', 'a', 'ab'],//历史查询
      }
    };
    res.json(returnData);
  },

  //清除搜索历史
  'POST /shop/deleteSearchHistory.do'(req, res){
    let returnData = {
      status: "S",
      msg: "成功！",
      data: {}
    };
    res.json(returnData);
  },


//个人中心
  'POST /user/userCenter.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "userData": {
          "billAmount": 79,//我的订单数
          "collectedGoodsPriceChangeAmount": null,//收藏商品价格变更数量
          "couponAmount": null,//优惠券数量
          "headImg": "",//头像
          "nickName": "微信昵称",//昵称,
          "greditUrl":"http://www.baidu.com",
        }

      }
    };
    res.json(Mock.mock(retrunData));
  },
  'POST /user/getBarInfo.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "barCode": '475457498759457',
        "barCodePicUrl": "../src/img/shfw@2x.png",
      }
    };
    res.json(Mock.mock(retrunData));
  },
//退出成功
  'POST /mobile/logout.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {}
    };
    res.json(Mock.mock(retrunData));
  },
  //全部账单的list
  'POST /bill/getMysBillList.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        'pageIndex|+1': 1,
        pageSize: 6,
        total: 20,
        'billListDatas': [
          {

            'id|+1': 1,
            signedPdfUrl:'http://www.baidu.com',
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤烧烤鱼烧烤鱼烧烤鱼鱼',
            invoiceStatu: '1',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            signedPdfUrl:null,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '1',
            goodsName: '烧烤烧烤鱼烧烤鱼烧烤鱼烧烤鱼烧烤鱼鱼',
            invoiceStatu: '-1',
            invoiceValidDays: '-2', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '',
            invoiceStatu: '0',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '2',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '3',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: false,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '-1',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
        ]
      }
    };
      return  res.json(Mock.mock(retrunData));
  },

  //账单优惠券列表list
  'POST /certificate/getMoreCoupons.do'(req, res) {
    var postData = Qs.parse(req.body);
    var shopEntityId = postData.shopEntityId;
    var pageIndex = postData.pageIndex;
    var pageSize = postData.pageSize;
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        'pageIndex|+1': 1,
        pageSize: 20,
        total: 25,
        "couponInfo":[
          {
            "couponBatchName": "优惠券名称",
            "couponId":"HSOFJEPFDJSOJ",//优惠券id
            "couponColor":"#F5A540",//优惠券颜色
            "couponMarketingType": "D",//优惠营销方式（单品D，整单Z等等）
            "couponNumber": "111111112222", //优惠券线下核销券码
            "couponType": "D",//优惠券类型（D代金券，Z折扣券）
            "couponUrl": "http://img.test.goago.cn/88coupon/couponCooperative/1BO6T14U55L24A0034GMGCBHKP0HBIE9",//优惠券图片地址
            "discount": 7.5,//折扣值(例如：8.0,7.9)
            "discountMoney": 5.5,//优惠金额（元）
            "discountPrice": 30,//优惠金额（分）
            "expired": true,//是否可失效,true：失效，false：没失效
            "minSalePrice": 200,//门槛：最低消费金额(分)
            "minimumConsumeLimit": 100,//最低消费金额（元）
            "shopEntityName": "华夏世界店",// 实体店编号（必填）
            "shopEntityId":'1111111111',
            "shopEntityAddress":"望京",//实体店地址
            "use": true,//是否已使用 true：已使用，false：未使用
            "useStartTime":"2017-02-27",//优惠券开始时间
            "useEndTime": "2017-02-27",//优惠券有效期
            "useRule": "全场无门槛",//使用规则
          },
          {
            "couponBatchName": "优惠券名称",
            "couponId":"HSOFJEPFDJSOJ",//优惠券id
            "couponColor":"#F5A540",//优惠券颜色
            "couponMarketingType": "D",//优惠营销方式（单品D，整单Z等等）
            "couponNumber": "111111112222", //优惠券线下核销券码
            "couponType": "D",//优惠券类型（D代金券，Z折扣券）
            "couponUrl": "http://img.test.goago.cn/88coupon/couponCooperative/1BO6T14U55L24A0034GMGCBHKP0HBIE9",//优惠券图片地址
            "discount": 7.5,//折扣值(例如：8.0,7.9)
            "discountMoney": 5.5,//优惠金额（元）
            "discountPrice": 30,//优惠金额（分）
            "expired": true,//是否可失效,true：失效，false：没失效
            "minSalePrice": 200,//门槛：最低消费金额(分)
            "minimumConsumeLimit": 100,//最低消费金额（元）
            "shopEntityName": "华夏世界店",// 实体店编号（必填）
            "shopEntityId":'1111111111',
            "shopEntityAddress":"望京",//实体店地址
            "use": true,//是否已使用 true：已使用，false：未使用
            "useStartTime":"2017-02-27",//优惠券开始时间
            "useEndTime": "2017-02-27",//优惠券有效期
            "useRule": "全场无门槛",//使用规则
          },
          {
            "couponBatchName": "优惠券名称",
            "couponId":"HSOFJEPFDJSOJ",//优惠券id
            "couponColor":"#F5A540",//优惠券颜色
            "couponMarketingType": "D",//优惠营销方式（单品D，整单Z等等）
            "couponNumber": "111111112222", //优惠券线下核销券码
            "couponType": "D",//优惠券类型（D代金券，Z折扣券）
            "couponUrl": "",//优惠券图片地址
            "discount": 7.5,//折扣值(例如：8.0,7.9)
            "discountMoney": 5.5,//优惠金额（元）
            "discountPrice": 30,//优惠金额（分）
            "expired": true,//是否可失效,true：失效，false：没失效
            "minSalePrice": 200,//门槛：最低消费金额(分)
            "minimumConsumeLimit": 100,//最低消费金额（元）
            "shopEntityName": "华夏世界店",// 实体店编号（必填）
            "shopEntityId":'1111111111',
            "shopEntityAddress":"望京",//实体店地址
            "use": true,//是否已使用 true：已使用，false：未使用
            "useStartTime":"2017-02-27",//优惠券开始时间
            "useEndTime": "2017-02-27",//优惠券有效期
            "useRule": "全场无门槛",//使用规则
          }
        ]
      }
    };
     return  res.json(Mock.mock(retrunData));
  },


  //已开发票的list
  'POST /bill/getInvoicedBillList.do'(req, res) {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        pageIndex: 1,
        pageSize: 6,
        total: 20,
        'billListDatas': [
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '2',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '0',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '1',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '2',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: true,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '3',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
          {
            'id|+1': 1,
            billDate: '2015/11/23 12:03',
            saleTime: '2015/11/23 12:03',
            billId: 'FJDIJDKJSOAF7Y93UIFDO',
            canInvoiced: false,
            commented: true,
            goodsAmount: '5',
            goodsName: '烧烤鱼',
            invoiceStatu: '-1',
            invoiceValidDays: '10', //开发票有效天数
            payAmount: '76.5',
            shopEntityName: 'k吾蟹可鸡',
            shopImg: '',
            shopEntityId: '1111'
          },
        ]
      }
    };
    res.json(Mock.mock(retrunData));
  },

  //未开发票
  'POST /bill/getUnInvoiceBillList.do'(req, res){
    var postData = Qs.parse(req.body);
    var returnData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "unInvoiceBill": [
          {
            "shopEntityName": "望京华彩电",
            "shopImg": "",
            "shopEntityId": 11,
            "mergeFlag": true,
            "billListDatas": [ //账单列表数据
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 111,  //账单Id
                "canInvoiced": true,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 34, //开发票有效天数
                "payAmount": 500,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 11, //实体店Id
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 11222,  //账单Id
                "canInvoiced": true,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 10, //开发票有效天数
                "payAmount": 500,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 11, //实体店Id
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 1113333,  //账单Id
                "canInvoiced": true,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 330, //开发票有效天数
                "payAmount": 500,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 11, //实体店Id
              }
            ]
          },
          {
            "shopEntityName": "望京华彩电",
            "shopImg": "",
            "shopEntityId": 11,
            "mergeFlag": false,
            "billListDatas": [ //账单列表数据
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 111,  //账单Id
                "canInvoiced": true,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 34, //开发票有效天数
                "payAmount": 500,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 11, //实体店Id
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 11222,  //账单Id
                "canInvoiced": true,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 10, //开发票有效天数
                "payAmount": 500,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 11, //实体店Id
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 1113333,  //账单Id
                "canInvoiced": true,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 500,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 11, //实体店Id
              }
            ]
          },
          {
            "shopEntityName": "望京华彩电",
            "shopImg": "",
            "shopEntityId": 12,
            "mergeFlag": true,
            "billListDatas": [ //账单列表数据
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 115333,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 34, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 12, //实体店Id
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 11533332,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 34, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 12, //实体店Id
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 133315,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 12, //实体店Id
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 133315,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 13,
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 133315,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 13,
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 133315,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 13,
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 133315,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 13,
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 133315,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": 1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 13,
              },
              {
                "billDate": '2016/12/06 12:12:12',//账单日期
                "saleTime": "2016/12/06 12:12:12",//账单日期
                "billId": 133315,  //账单Id
                "canInvoiced": false,//是否可以开发票
                "commented": false,//是否评价过
                "goodsAmount": 5,//商品数量
                "goodsName": "烧烤鱼",
                "invoiceStatu": -1, //发票状态，-1：没开过，
                "invoiceValidDays": 0, //开发票有效天数
                "payAmount": 76.5,//支付金额
                "shopEntityName": "望京华彩电",
                "shopImg": "",
                "shopEntityId": 13,
              }
            ]
          }
        ]
      }
    };
    res.json(Mock.mock(returnData));
  },
  //账单详情
  'POST /bill/getBillDetailInfo.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var billId = postData.billId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      billId: billId,
      data: {
        "billData": {
          "canComment": true,//是否可以评价 true:可以，false:不可以
          "billCouponInfo": [//账单优惠券
            {
              "couponId": "1946445464664",//优惠券Id
              "couponMoney": 7.8,//优惠金额
              "couponType": "Z"//优惠券类型
            },
            {
              "couponId": "1946445464664",//优惠券Id
              "couponMoney": 7.8,//优惠金额
              "couponType": "Z"//优惠券类型
            }
          ],
          "billSerialNumber": "2016030220160302523645523668",//订单流水号
          "canInvoicing": true,//是否可以开发票
          "saleTime": '2015-12-12 12:22:33',//createContainer
          "goodsDetails": [//
            {
              "goodCouponInfo": {//单品优惠券
                "discountamount": 5,//优惠金额
                "goodsid": "88888",//商品id
                "goodsname": "砀山秘制黄桃",//商品名称
                "voucherid": "464645646464546"//优惠券id
              },
              "goodstype": null,//商品类型
              "itemserial": "88888",//
              "name": "砀山秘制黄砀山秘制黄桃砀山秘制黄桃桃",//商品名称
              "paidinamount": 0,//
              "price": 60,//商品价格
              "discountPrice": 30, //使用优惠券后的价格
              "totalnum": 2,//商品数量
              "totalprice": 0//总金额
            },
            {
              "goodCouponInfo": {//单品优惠券
                "discountamount": 5,//优惠金额
                "goodsid": "88888",//商品id
                "goodsname": "砀山秘制黄桃",//商品名称
                "voucherid": "464645646464546"//优惠券id
              },
              "goodstype": null,//商品类型
              "itemserial": "88888",//
              "name": "砀山秘制黄桃",//商品名称
              "paidinamount": 0,//
              "price": 40,//商品价格
              "discountPrice": 40, //使用优惠券后的价格
              "totalnum": 2,//商品数量
              "totalprice": 3//总金额
            }
          ],
          "id": "22222333",//账单id
          "invoiced": false,//是否开过发票
          "originPirce": 25.3,//原价格
          "payType": "钱包支付",//支付方式
          "privilegePrice": 3.2,//优惠金额
          "receivableAmount": 22.1,//实际支付金额
          "shopEntityName": "k吾蟹可鸡",//商家名称
          "shopImg": "",//商铺头像
          "shopName": "大众莲花",//店铺名
          "comment": {
            "commentContent": "评论内容",//评论内容
            "commentDate": "2016/12/06 12:12:12",//评论时间
            "score": 7,//评分
            "shopEntityName": "驴肉火烧点",//实体店名称
            "shopImg": "http://src"//实体店图片
          },
          "invoiceData": {
            "createTime": "2016/12/06 12:12:12",//创建时间
            "custName": "发票抬头",//发票抬头、发票信息
            "detail": "发票内容",
            "invoiceAmount": "255.5",//开发票合计金额
            "invoiceId": "FIDJFID68F3F",//发票编号UUID生成
            "invoicePrintDate": null,//发票打印更新状态日期
            "invoiceRequestDate": null,//发票申请日期
            "invoiceType": "000000",//发票类型 (000000-普票  000001-专票   000002-电子（显示成普票）)
            "shopEntityId": null,
            "shopEntityName": "望京华彩店",//实体店名称（系统产生）
            "shopName": null,
            "invoiceStatus": 1,
            "verificationCode": "123",//取票验证码（三位随机数）
            "source": "3",//发票来源 0-彩单 1-快开发票 2-快服务(0菜单 1扫码 3 电子的)
            "invoiceUrl": "http://www.baidu.com",//电子发票url
            "eleInvoiceChannel": "3",//电子发票渠道：1-百望电子发票，2-航信电子发票，3-票通（发票类型包含000002-电子发票时有值）
            "invoiceCode": '2222222',//发票代码
            "invoiceNo": '2222',//发票号
          },

          "invoiceStatusDTO": {
            "invoiceStatus": "1", //-1:没开发票，0 申请  1 成功  2 失败  3 开票中  4-配置不可以开发票  5-开发票过期
            "validLeftInvoiceDays": 5, //剩余有效开发票天数
          }
        }


      }

    };
    res.json(Mock.mock(returnData));
  },

  //好友力荐列表
  'POST /recommend/getRecommendByUserId.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var returnData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "pageIndex": 1,
        "pageSize": 5,
        "total": 8,
        "recommendDatas|5": [
          {
            recommendId: '1',
            averageConsume: 36.5,//人均价
            recommendDate: "2016-11-29 16:24:46",
            recommendGoodsName: [
              "土豆丝炒肉",
              "蜗牛炒蚯蚓"
            ],
            recommendPersonName: "黑色眼睛",//推荐人
            recommendWords: "这家的菜真是的不错啊啊",
            score: '3',//评分
            shopEntityName: '望京沙特店',
            shopImg: '',
            shopEntityId: '1112'
          },
        ]
      }

    };
    res.json(Mock.mock(returnData));
  }
  ,

  //我的分享列表
  'POST /my/myshare.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var returnData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "pageIndex": 1,
        "pageSize": 5,
        "total": 10,
        "rows|5": [
          {
            "id": "123465",
            "shopEntityId": "132456789",       //实体店id
            "shopEntityName": "分享测试",    //实体店名字
            "shopLogImg": "",    //实体店图片
            "topicType": "G",                          //  分享类型   G--单品分享  E – 商店分享
            "content": "好吃",                         //分享内容
            "userId": "123456789",                //分享用户ID
            "operateDate": "2015-12-12 12:89:99",   //分享日期
            "score": "8",                                    //评分
            "averConsume": "35",                    //平均消费
            "goodsInfo": [{                                //分享类型为 单品 情况下的 单品详情
              "goodsId": "123",
              "goodsName": "狮子头"
            }]
          },
        ]
      }
    };
    res.json(Mock.mock(returnData));
  }
  ,
  //发票抬头列表
  'POST /invoice/getMyInvoiceTitleList.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        invoiceTitleDataP: invoiceTitleList.invoiceTitleData,
      }

    };
    res.json(Mock.mock(retrunData));
  }
  ,
  //发票历史列表
  'POST /invoice/getInvoiceHistory.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "invoiceHistoryData|5": [//发票抬头数据
          {
            "createTime": '2012-12-2 12:12:11',//创建时间
            "custName": "发票抬头",//发票抬头、发票信息
            "detail": "发票内容",//商品详情
            "invoiceAmount": "255.5",//开发票合计金额
            "invoiceId": "FIDJFID68F3F",//发票编号UUID生成
            "invoicePrintDate": null,//发票打印更新状态日期
            "invoiceRequestDate": null,//发票申请日期
            "invoiceType": "000000",//发票类型 (000000-普票   其他 -专票)
            "shopEntityId": null,
            "shopEntityName": "望京华彩店",//实体店名称（系统产生）
            "shopName": null
          }
        ]

      }
    };
    res.json(Mock.mock(retrunData));
  }
  ,
  //发票抬头详情
  'POST /invoice/getInvoiceTitleDetail.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var invoiceTitleId = postData.invoiceTitleId;
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      invoiceTitleId: invoiceTitleId,
      data: {
        "invoiceData": {
          "custAdress": "地址",//付款方地址、注册地址
          "custBank": "银行",//付款方银行、开户行
          "custBankAccount": "888888888",//开户行账号
          "custName": "用户名称",//发票抬头、发票信息
          "custTaxNo": "1232333333",//识别号、税号
          "id": "256456165",//主键ID
          "mobile": "18855223366",//联系电话
          "userId": '222'//用户编号
        }


      }
    };
    res.json(Mock.mock(retrunData));
  },
  //查询企业信息
  'POST /invoice/associate.do'(req, res){
    var postData = Qs.parse(req.body);
    var custName = postData.custName;
    var returnData = {
      status: "S",
      msg: '操作成功',
      custName: custName,
      data: [{
        "id|+1": 1,
        "custName": "北京数衍科技有限公司", //发票抬头、发票信息
        "mobile": "18911159627",  //手机号、联系电话
        "custTaxNo": "124t646757",  //识别号、税号
        "custAdress": "北京市朝阳区望京科技创业园",  //付款方地址、注册地址
        "custBank": "招商银行",//付款方银行、开户行
        "custBankAccount": "1246547586798798798",   //开户行账号
        "num": "5"  // 开票次数
      },
        {
          "id|+1": 1,
          "custName": "2北京数衍科技有限公司", //发票抬头、发票信息
          "mobile": "18911159627",  //手机号、联系电话
          "custTaxNo": "124t646757",  //识别号、税号
          "custAdress": "北京市朝阳区望京科技创业园",  //付款方地址、注册地址
          "custBank": "招商银行",//付款方银行、开户行
          "custBankAccount": "1246547586798798798",   //开户行账号
          "num": "5"  // 开票次数
        }
      ]
    };

    res.json(Mock.mock(returnData));
  },

  //删除抬头
  'POST /invoice/delInvoiceTitle.do'(req, res)
  {
    let id = Qs.parse(req.body).invoiceTitleId;
    let dIndex;
    invoiceTitleList.invoiceTitleData.forEach((item, index)=> {
      if (item.id == id) dIndex = index;
    });
    invoiceTitleList.invoiceTitleData.splice(dIndex, 1);
    let returnData = {
      status: 'S',
      success: true
    };
    res.json(returnData);
  }
  ,
  //添加抬头
  'POST /invoice/addInvoiceTitle.do'(req, res)
  {
    let invoice = Qs.parse(req.body);
    console.log(invoice);
    let id = invoiceTitleList.invoiceTitleData.length + 1;
    invoiceTitleList.invoiceTitleData.push(invoice);
    let returnData = {
      status: 'S',
      success: true,
      msg: "添加成功",
      data: {}
    };

    res.json(returnData);
  }
  ,
  //编辑抬头
  'POST /invoice/updateInvoiceTitle.do'(req, res)
  {
    let invoice = Qs.parse(req.body),
      id = invoiceTitleList.invoiceTitleData.length + 1;
    let dIndex;

    //更新用户
    invoiceTitleList.invoiceTitleData.forEach((item, index)=> {
      if (item.id == invoice.id)
        dIndex = index;
    });
    invoiceTitleList.invoiceTitleData[dIndex] = Object.assign({}, invoiceTitleList.invoiceTitleData[dIndex], {
      "custAdress": invoice.custAdress,//付款方地址、注册地址
      "custBank": invoice.custBank,//付款方银行、开户行
      "custBankAccount": invoice.custBankAccount,//开户行账号
      "custName": invoice.custName,//发票抬头、发票信息
      "custTaxNo": invoice.custTaxNo,//识别号、税号
      "mobile": invoice.mobile,//联系电话
    });

    let returnData = {
      status: 'S',
      success: true,
      msg: "添加成功",
      data: {}
    };

    res.json(returnData);
  },

  //我的收藏
  'POST /my/mycolls.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var pageIndex = postData.pageIndex;
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      pageIndex: pageIndex,
      data: {
        "ret": {
          "pageIndex": 1,
          "pageSize": 10,
          "rows": [
            {
              "id": "1B2L7EANSJLSFO1KSQMVHH2CP29DS6E8",
              "shopEntityId": "T_SHOP_ENTITY_010A_4",
              "shopEntityName": "sdfas",                     //实体店名称
              "shopLogoImg": "",           // 实体店logo
              "singlePrice": "12.00",                            // 件单价
              "backIndex": "45",                                   //回头指数
              "averConsume": "25",                              //人平均消费
              "operateDate": "Nov 29, 2016 1:51:07 PM",           //日期
              "userId": "D561ABA50114B8C14B7DC54D9B61BBEB",     //用户id
              "score": "3.5",                                                                         //评分
              "goodId": "1B",                                                                  //商品id
              "goodName": "可口可乐",                                                //商品名称
              "goodPrice": 3,                                                               //商品价格
              "goodItemserial": "123456",                                         //商品条形码
              "discountSign": true,                                                    //打折标识
              "couponSign": true,                                                        //优惠标识
              "cutDesc": "比收藏时降价6元",                                       //降价描述
              "topicType": "E"                                                              //收藏类型     E–商户收藏     G--单品收藏
            },
            {
              "id": "1B2L7EANSJLSFO1KSQMVHH2CP29DS6E8",
              "shopEntityId": "T_SHOP_ENTITY_010A_4",
              "shopEntityName": "sdfas",                     //实体店名称
              "shopLogoImg": "",           // 实体店logo
              "singlePrice": "12.00",                            // 件单价
              "backIndex": "45",                                   //回头指数
              "averConsume": "25",                              //人平均消费
              "operateDate": "Nov 29, 2016 1:51:07 PM",           //日期
              "userId": "D561ABA50114B8C14B7DC54D9B61BBEB",     //用户id
              "score": "5",                                                                         //评分
              "goodId": "1B",                                                                  //商品id
              "goodName": "可口可乐",                                                //商品名称
              "goodPrice": 3,                                                               //商品价格
              "goodItemserial": "123456",                                         //商品条形码
              "discountSign": true,                                                    //打折标识
              "couponSign": true,                                                        //优惠标识
              "cutDesc": "比收藏时降价6元",                                       //降价描述
              "topicType": "G"                                                              //收藏类型     E–商户收藏     G--单品收藏
            }
          ]
        }

      }
    };
    res.json(Mock.mock(retrunData));
  },
  //优惠券列表
  'POST /coupon/getMyCoupon.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      data: {
        "couponInfo|5": [{
          "couponId|+1": 1,
          "couponBatchName": "满3件减100",
          "couponColor": "red",//优惠券颜色
          "couponNumber": "111111112222", //优惠券线下核销券码
          "couponType": "D",//优惠券类型（D代金券，Z折扣券）
          "couponUrl": "",//优惠券图片地址
          "discount": 7.5,//折扣值(例如：8.0,7.9)
          "discountMoney": 5.5,//优惠金额（元）
          "expired": false,//是否可失效,true：失效，false：没失效
          "shopEntityName": "华夏世界店",// 实体店编号（必填）
          "use": true,//是否已使用 true：已使用，false：未使用
          "useEndTime": "2017-02-27",//优惠券有效期
          "useRule": "全场无门槛",//使用规则

        }]

      }
    };
    res.json(Mock.mock(retrunData));
  },
  //优惠券详情页面
  'POST /coupon/getCouponDetail.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var couponId = postData.couponId;
    var retrunData = {
      status: 'S',
      msg: "操作成功",
      couponId: couponId,
      data: {
        "couponDetail": {
          "couponBatchName": "满3件减100",
          "couponColor": "red",//优惠券颜色
          "couponContent": "优惠券说明很长的说明",
          "couponNumber": "111111112222", //优惠券线下核销券码
          "couponType": "Z",//优惠券类型（D代金券，Z折扣券）
          "couponUrl": "",//优惠券图片地址
          "discount": 7.5,//折扣值(例如：8.0,7.9)
          "discountMoney": 5.5,//优惠金额（元）
          "expired": false,//是否可失效,true：失效，false：没失效
          "shopEntityAddress": "北京市朝阳区望京",//实体店地址
          "shopEntityName": "华夏世界店",// 实体店名称（必填）
          "use": false,//是否已使用 true：已使用，false：未使用
          "useEndTime": "2017-02-27",//优惠券有效期
          "useRule": "全场无门槛",//使用规则
          "barCodeUrl":"img/shfw@2x.png",//一维码图片url
          "qrCodeUrl":"",//二维码图片ur'l

        }

      }
    };
    res.json(Mock.mock(retrunData));
  },
  //获取安全验证码
  'POST /mobile/sendShortMessage.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var pageNo = postData.pageNo;
    var retrunData = {
      status: 'S',
      msg: "操作成功"
    };
    res.json(Mock.mock(retrunData));
  }
  ,
  //获取登陆信息
  'POST /mobile/login.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var pageNo = postData.pageNo;
    var retrunData = {
      status: 'S',
      msg: "操作成功"
    };
    res.json(Mock.mock(retrunData));
  },

  'POST /billSearch/getBillsByStatus.do'(req, res){

  },

  //账单详情
  'POST /certificate/getCertificateOutlineInfo.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var billId = postData.billId;
    var shopEntityId = postData.shopEntityId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      billId: billId,
      shopEntityId: shopEntityId,
      data: {
        certificateOutlineInfo: {
          "billId": '222',
          "certificateId": "111111",  //凭证Id
          "paidAmount": "10.00",//实际收款金额
          "shopLogoURL": "../../img/404.jpg",    //商户图标logo地址
          "shopEntityName": "测试实体店1",       //实体店名称
          "goodsName": "GAP儿童服装",        //按照商品显示规则，显示的概要商品信息，未抓取得到则不显示本条
          "discountAmount": "1.00",   //优惠金额
          "shopName": "赛特奥莱购物中心",    //商场名称,GAG采集的本商户所在MALL名称
          "billTradeTime": "2016-02-18 13:20:00",       //凭证出具方提供的交易时间 yyyy-MM-dd HH:mm:ss
          // "payChannelName": [{
          //   "p": '微信支付',
          //   "a": "5.00",
          // }, {
          //   "p": '优惠券',
          //   "a": "5.00",
          // }],  //电子凭证出具方采集的交易方式
          payChannelName:[],
          "gwNum": "392015091828730364",       // 电子凭证出具方采集的交易流水号
          "goodsTradingCode": "123456789", //商品交易编码,商户ERP流水号（关联之后可以使用）
          "goodsDetailsList": [{//商品详情列表
            "name": "益达口香糖",//商品名称[截获，选填]
            "price": 0.9,//单价-元,小数[截获，选填
            "totalNum": 5, //总数,小数[截获，选填]
            "totalPrice": 4.5//总价-元,小数[截获，选填]
          },{//商品详情列表
            "name": "益达口香糖",//商品名称[截获，选填]
            "price": 0.9,//单价-元,小数[截获，选填
            "totalNum": 5, //总数,小数[截获，选填]
            "totalPrice": 4.5//总价-元,小数[截获，选填]
          },{//商品详情列表
            "name": "益达口香糖",//商品名称[截获，选填]
            "price": 0.9,//单价-元,小数[截获，选填
            "totalNum": 5, //总数,小数[截获，选填]
            "totalPrice": 4.5//总价-元,小数[截获，选填]
          },{//商品详情列表
            "name": "益达口香糖短发短发短发的短发短发",//商品名称[截获，选填]
            "price": 0.9,//单价-元,小数[截获，选填
            "totalNum": 5, //总数,小数[截获，选填]
            "totalPrice": 4.5//总价-元,小数[截获，选填]
          },{//商品详情列表
            "name": "益糖",//商品名称[截获，选填]
            "price": 0.9,//单价-元,小数[截获，选填
            "totalNum": 5, //总数,小数[截获，选填]
            "totalPrice": 4.5//总价-元,小数[截获，选填]
          },{//商品详情列表
            "name": "益达糖",//商品名称[截获，选填]
            "price": 0.9,//单价-元,小数[截获，选填
            "totalNum": 5, //总数,小数[截获，选填]
            "totalPrice": 4.5//总价-元,小数[截获，选填]
          },{//商品详情列表
            "name": "益达口香糖短发短发",//商品名称[截获，选填]
            "price": 0.9,//单价-元,小数[截获，选填
            "totalNum": 5, //总数,小数[截获，选填]
            "totalPrice": 4.5//总价-元,小数[截获，选填]
          },]
        }
      }

    };
    res.json(Mock.mock(returnData));
  },

  'POST /invoice/checkIfCombineInvoice.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var shopEntityId = postData.shopEntityId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      shopEntityId: shopEntityId,
      data: {
        combineFlag: true,
      }
    };
    res.json(Mock.mock(returnData));
  },
  'POST /invoice/getCombineUnInvoiceBillList.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var shopEntityId = postData.shopEntityId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      shopEntityId: shopEntityId,
      data: {
        "billListDatas|10": [//账单列表数据
          {
            "billDate": '2017-04-06 15:43:33',
            "billId|+1": 1,
            "goodsAmount": '5',
            "goodsName": "烧烤鱼",
            "invoiceStatu": '-1',
            "invoiceValidDays": 10,//开发票有效天数
            "payAmount": 76.5,//支付金额
            "shopEntityName": "望京华彩电",
            "shopImg": "",
            "shopEntityId": "FHIDJFIHFUY8FH9"//实体店Id
          }
        ]
      }
    };
    res.json(Mock.mock(returnData));
  },

  //联想商户
  'POST /billSearch/getShopOnKeyword.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var keyword = postData.keyword;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      keyword: keyword,
      data: {
        "shopRecords": [{"shopName": "实体店一", "shopId": "19BHGRA6L2G8PEQCP2D7N714J6T"},
          {"shopName": "实体店二", "shopId": "19BHG010KRAVLL2G8PEQCP2D74J6T"},
          {"shopName": "实体店三", "shopId": "19BHG010KRAVLL2G8PEQCP2D7N71T"}]

      }
    };
    res.json(Mock.mock(returnData));
  },
  //搜索
  'POST /billSearch/selBillsByShop.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var keyword = postData.keyword;
    var searchType = postData.searchType;
    var invoiceStatus = postData.invoiceStatus;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      keyword: keyword,
      searchType: searchType,
      invoiceStatus: invoiceStatus,
      data: {
        'pageIndex|+1': 1,
        pageSize: 6,
        total: 17,
        "billListDatas|6": [//账单列表数据
          {
            "saleTime": '2017-04-06 15:43:33',
            "billId": "FJDIJDKJSOAF7Y93UIFDO",
            "goodsAmount": '5',
            "canInvoiced":true,
            "goodsName": "烧烤鱼",
            "invoiceStatu": '-1',
            "invoiceValidDays": 10,//开发票有效天数
            "payAmount": 76.5,//支付金额
            "shopEntityName": "望京华彩电",
            "shopImg": "",
            "shopEntityId": "FHIDJFIHFUY8FH9"//实体店Id
          }
        ]
      }
    };
    res.json(Mock.mock(returnData));
  },

  // 根据开票状态 （不用）
  'POST /billSearch/getBillsByStatus.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var invoiceStatus = postData.invoiceStatus;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      invoiceStatus: invoiceStatus,
      data: {
        'pageIndex|+1': 1,
        pageSize: 6,
        total: 20,
        "billListDatas|6": [//账单列表数据
          {
            "saleTime": '2017-04-06 15:43:33',
            "billId": "FJDIJDKJSOAF7Y93UIFDO",
            "goodsAmount": '5',
            "goodsName": "烧烤鱼",
            "invoiceStatu": '-1',
            "invoiceValidDays": 10,//开发票有效天数
            "payAmount": 76.5,//支付金额
            "shopEntityName": "望京华彩电",
            "shopImg": "",
            "shopEntityId": "FHIDJFIHFUY8FH9"//实体店Id
          }
        ]
      }
    };
    res.json(Mock.mock(returnData));
  },
  //最近商户
  'POST /billSearch/getShopOnConsume.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var returnData = {
      status: 'S',
      msg: '操作成功',
      data: {
        "shopRecords": [{"shopName": "实体店一", "shopId": "19BHG010KRAVLL2G8PEQCP2D7N714"},
          {"shopName": "实体店二", "shopId": "19BHG010KRAVLL2G8PEQCP2D7N714J6T"},
          {"shopName": "实体店三", "shopId": "19BHG010KRAVLL2G8PEQCP2D7N714J6"}]

      }
    };
    res.json(Mock.mock(returnData));
  },
  //发送邮箱
  'POST /centificate/sendBillCentificateEmail.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var email = postData.email;
    var centificateId = postData.centificateId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      email: email,
      centificateId: centificateId,
      data: {}
    };
    res.json(Mock.mock(returnData));
  },
  'POST /certificate/getCertificateDetailInfo.do'(req, res){
    var postData = Qs.parse(req.body);
    var billId = postData.billId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      billId: billId,
      data: {
        certificateDetailInfo: {
          "billId": '111',
          "certificateId": "8DD3F6965F064676554B5A69D53BC01D",  //凭证Id
          "shopLogoURL": "www.baidu.com",   //商户图标logo地址
          "shopName": "",    //商场名称,GAG采集的本商户所在MALL名称。自注册的商户，隶属于88合作社的商户不显示
          "shopEntityName": "测试实体店1",       //实体店名称
          "certificateTime": "2016-02-18 13:20:00",       // 凭证产生时间  yyyy-MM-dd HH:mm:ss
          "receipt": {//收款凭证(8个字段)
            paidAmount: "10.00",//实际收款金额
            amountPayable: "20.00",//应付金额
            discountAmount: "0",//优惠金额
            payTime: "2016-02-18 13:20:00",       //凭证出具方提供的交易时间 yyyy-MM-dd HH:mm:ss
            terminalNum: "123456789",  //收银款台号
            casherId: "77774626", //商家收银员ID
            settlementWay: "微信支付",   //支付方式
            serialNumber: "11111111122345678909876655432213", //收银记录号
            serialNumberBarCode: "img/shfw@2x.png" ,//收银记录号条形码
            // payChannelName: [{
            //   "p": '微信支付',
            //   "a": "5.00",
            // }, {
            //   "p": '优惠券',
            //   "a": "5.00",
            // }],  //电子凭证出具方采集的交易方式
            payChannelName:[],
            remarks:"感谢您光临GAP中国"  //收款凭证备注
          },
          "payment": {//支付凭证(15个字段)
            "terminalNo": "1008989",//收单行终端号
            "casherId": "22222",//收银员号
            "transactionType": "银行卡支付",//交易类型
            "merchantNo": "334442",       //收单商户号
            "cardType": "借记卡",  //银行卡类别
            "termValidity": "03/27", //银行卡有效期
            "cardNo": "6225 **** **** **51", //银行卡号
            "paidAmount": "15.50",   //支付金额
            "payTime": "2016-02-18 13:20:00", //支付时间
            "batchNumber": "123123",  //批次号
            "serialNumber": "2223333333",  //流水号
            "referenceNumber": "2223333333",  //参考号
            "authorizationCode": "123123",  //授权码
            "gwNum": "2223333333",  //第三方订单号
            "transactionNumber": "11111111122345678909876655432213",  //交易号
            "transactionNumberBarCode": "img/shfw@2x.png",  //交易号条形码
          },
          "memo": {//消费水单(10个字段)
            "shopId": "10089891008989100898910089891234",//商店编号
            "deskNo": "22222",//桌号
            "diningNumber": "3",//就餐人数
            "paidAmount": "15.50",   //支付金额
            "tradeTime": "2016-02-18 13:20:00", //时间
            "goodsDetailsList": [{//商品详情列表
              "name": "益达口香糖",//商品名称[截获，选填]
              "price": 0.9,//单价-元,小数[截获，选填
              "totalNum": 5, //总数,小数[截获，选填]
              "totalPrice": 4.5, //总价-元,小数[截获，选填]
            }],
            "discountAmount": "0",  //总优惠金额
            "totalFee": "55.00",  //应收金额
            "memoNum": "11111111122345678909876655432213",  //水单编号
            "tradeIdBarCode": "img/shfw@2x.png",  //水单编号条形码
            "remarks": "感谢您光临GAP中国",  //水单备注
            "telephone": "18512341021", //商户电话
            "shopAddress": "北京市朝阳区一个赛特奥莱的总部",  //商户地址
            "shopTerminalNum":"4654646",  //商家收银终端号
            "shopCasherId":"454646",  //商家收银员号
          },

        }
      }
    };
    res.json(Mock.mock(returnData));
  },


  //领取优惠券
  'POST /couponTake/receiveCoupon.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var takeSource = postData.takeSource;
    var couponBatchId = postData.couponBatchId;
    var couponChannel = postData.couponChannel;
    var openid = postData.openid;
    var riverDiversionShopEntityId = postData.riverDiversionShopEntityId;
    var riverDiversionShopEntityName = postData.riverDiversionShopEntityName;
    var billId = postData.billId;
    var returnData = {
      status: 'S',
      msg: '操作成功',
      data:{
        "resultCode":'0',
      }
    };
    res.json(Mock.mock(returnData));
  },


  //领取优惠券
  'POST /coupon/checkIfYZUser.do'(req, res)
  {
    var postData = Qs.parse(req.body);
    var returnData = {
      status: 'S',
      msg: '操作成功',
      data:{
        "isYZUser":false, //true是 false不是
      }
    };
    res.json(Mock.mock(returnData));
  },
};
