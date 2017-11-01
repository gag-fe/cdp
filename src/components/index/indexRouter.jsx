import React from 'react';
import {createContainer, createRootContainer} from 'Roof';
import {Router, Route, IndexRoute, hashHistory} from 'react-router';
import PagesTest from '../../modules/pagesTest/index';
import Shop from '../../modules/shop/Index';
import ShopSearch from '../../modules/shopSearch/Index';
import ShopDetail from '../../modules/shopDetail/Index';
import ShareDish from '../../modules/shareDish/Index';
import ShareExperience from '../../modules/shareExperience/Index';
import ShareView from '../../modules/shareView/Index';

import UserCenter from '../../modules/userCenter/user/UserCenter';
import InvoiceHeader  from '../../modules/userCenter/invoiceHeader/index';
import InvoiceHeaderDetail from  '../../modules/userCenter/invoiceHeaderDetail/index';
import AddHeader from '../../modules/userCenter/addInvoiceHeader/index';
import Collection  from '../../modules/userCenter/collections/index';
import Friends  from '../../modules/userCenter/friends/index';
import Share  from '../../modules/userCenter/share/index';
import CommentList  from '../../modules/userCenter/commentList/index';
import CommentDetailList  from '../../modules/userCenter/commentDetail/index';
import Comment  from '../../modules/userCenter/comment/index';
import Suggest  from '../../modules/userCenter/suggest/index';
import MyBill  from '../../modules/userCenter/myBill/MyBill';
import BillSearch from  '../../modules/userCenter/myBill/BillSearch';
import UnInvoiceBill from '../../modules/userCenter/myBill/UnInvoiceBill';
import MyConsume from '../../modules/userCenter/myBill/MyConsume';
import Coupon  from '../../modules/userCenter/coupons/index';
import BillInfo from '../../modules/userCenter/billInfo/index';
import BillDetailInfo from  '../../modules/userCenter/billInfo/BillDetailInfo';
import Print from '../../modules/userCenter/billInfo/Print';
import SendEmail from '../../modules/userCenter/billInfo/SendEmail';
import Login from '../login/index';
import YZEleVoucher from '../../modules/yzElectronic/YZEleVoucher';
import Personal from '../../modules/userCenter/user/components/Personal';
const IndexRouter = React.createClass({

  render(){
    return (
      <Router history={hashHistory}>
        <Route path="/">
          <Route path="shop" component={Shop}/>
          <Route path="shopSearch" component={ShopSearch}/>
          <Route path="shopDetail/:shopId/:shareId" component={ShopDetail}/>
          <Route path="shareDish" component={ShareDish}/>
          <Route path="shareExperience" component={ShareExperience}/>
          <Route path="shareView/:shareId" component={ShareView}/>
          <Route path="userCenter" component={UserCenter}/>
          <Route path="userCenter/invoiceHeader" component={InvoiceHeader}/>
          <Route path="userCenter/invoiceHeaderDetail/:id" component={InvoiceHeaderDetail}/>
          <Route path="userCenter/addInvoiceHeader/:id" component={AddHeader}/>
          <Route path="userCenter/friends" component={Friends}/>
          <Route path="userCenter/collections" component={Collection}/>
          <Route path="userCenter/share" component={Share}/>
          <Route path="userCenter/commentList" component={CommentList}/>
          <Route path="userCenter/commentDetail" component={CommentDetailList}/>
          <Route path="userCenter/comment" component={Comment}/>
          <Route path="userCenter/suggest" component={Suggest}/>
          <Route path="userCenter/myBill/:type" component={MyBill}/>
          <Route path="userCenter/billSearch" component={BillSearch}/>
          <Route path="userCenter/unInvoiceBill/:shopEntityId" component={UnInvoiceBill}/>
          <Route path="userCenter/myConsume" component={MyConsume}/>
          <Route path="userCenter/coupons" component={Coupon}/>
          <Route path="userCenter/personal" component={Personal}/>
          <Route path="userCenter/billInfo/:billId/:shopEntityId" component={BillInfo}/>
          <Route path="userCenter/billDetailInfo/:billId" component={BillDetailInfo}/>
          <Route path="userCenter/print" component={Print}/>
          <Route path="userCenter/send/:id" components={SendEmail}/>
          <Route path="login/:targets" component={Login}/>
          <Route path="yzEleVoucher" component={YZEleVoucher}/>
        </Route>
      </Router>)
  }
});

export default createRootContainer({
  outContainer: null,//蒙层弹出后，控制下层不可滑动
  visible: false,//推荐弹出层显隐
  shareRemind: false,//分享提示

  carouselModal: false,//当月排行弹出层大图的显隐
  carouselPictures: [],//当月排行弹出层大图lists

  industryState: 'cloth',//当前业态（英文），对应icon的url名字

  consumeList: {
    consumeType: '零售',
    consumePercent: 0,
  },//当前业态的消费信息
  consumeData: {},//消费总数据

  myShopListInfo: null,//我的商家列表
  shopDetail: {},//商家详情信息

  searchAssociate: [],//搜索联想列表
  searchShow: false,//搜索功能中 ，列表显示隐藏
  searchHistory: [],//搜索历史记录

  shareInfo: {},//分享详情
  goodsData: [],//可分享单品list
  shareProducts: [],//选中分享的单品
  score: 5,//打分

  isLogin: true,//用户是否登陆

  //userCenter
  userInfo: {},
  //历史账单列表
  billList: {
    pageIndex: '',
    pageSize: '',
    total: '',
    billListDatas: []
  },

  billCouponList: {
    pageIndex: '',
    pageSize: '',
    total: '',
    couponInfo: []
  },

  moreFlag:false,
  //已开发票账单列表
  invoicedBillList: {
    pageIndex: '',
    pageSize: '',
    total: '',
    rows: []
  },
  invoicedFlag:false,
  //未开发票账单列表
  unInvoicedBillList:[],
  //账单详情
  billInfo: {},
  //好友力荐列表
  friendList: {
    pageIndex: '',
    pageSize: '',
    total: '',
    recommendDatas: []
  },
  //我的分享
  shareList: {
    pageIndex: '',
    pageSize: '',
    total: '',
    retList: []
  },
  //发票抬头list
  invoiceTitleListP: [],
  invoiceTitleListZ: [],
  //发票历史list
  invoiceHistoryList: [],
  //发票详情
  invoiceData: {},
  invoice: {
    invoiceTitleId: '',
    invoiceType: "000001",
    custAdress: "",//付款方地址、注册地址
    custBank: "",//付款方银行、开户行
    custBankAccount: "",//开户行账号
    custName: "",//发票抬头、发票信息
    custTaxNo: "",//识别号、税号
    mobile: "",//联系电话
  },
  invoiceFlag: true,
  //收藏商品
  goodsObj: {
    pageIndex: '',
    pageSize: '',
    total: '',
    goodsList: []
  },
  //收藏店铺
  shopObj: {
    pageIndex: '',
    pageSize: '',
    total: '',
    shopEntityList: []
  },
  keyFlag: false,
  //意见反馈
  content: '',
  pageFlag:false,
  //优惠券list
  couponList:[],
  dataList:[],
  dataFlag:false,
  barInfo:{},
  combineList:[],
  shopRecordLists:[],   //最近商家list
  searchRecords:[],   //联想list
  searchVal:'',
  sDataFlag:false,
  email:'',
  billDetailData:{},
  notReceive:'0',//优惠券状态//0立即领取1已领取2已结束
})(IndexRouter);
