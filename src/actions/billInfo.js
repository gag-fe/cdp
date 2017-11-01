/**
 * Created by kana on 16/11/29.
 */
import Utils from '../utils/index';
import {Toast} from 'antd-mobile';
import {hashHistory} from 'react-router';
const ajax = Utils.ajax;
const API={
  billInfo:'/certificate/getCertificateOutlineInfo.do',
  billDetailInfo:'/certificate/getCertificateDetailInfo.do',
  billCouponList:'/certificate/getMoreCoupons.do', //优惠券列表
  receiveCoupon:'/couponTake/receiveCoupon.do',//领取优惠券
  ifUser:'/coupon/checkIfYZUser.do',//是否是银座会员
};
var billCouponList=[];
const billInfoAction={
  //账单概要页面
  billInfoData(param, {setState, getState}){
    ajax({
      url: window.API_URL+API.billInfo,
      data: {
        billId:param.billId,
        shopEntityId:param.shopEntityId,
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        setState({
          billInfo:data.certificateOutlineInfo,
        });
      }
    })
  },

//优惠券列表
  fetchCouponList(param, {setState, getState}){
    if (param.pageIndex > 1) {
      setState({
        moreFlag: true
      });
    }
    ajax({
      url: window.API_URL + API.billCouponList,
      data: {
        shopEntityId:param.shopEntityId,
        pageIndex: param.pageIndex,
        pageSize: 20,
      },
      method: 'post',
      type: 'json',
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        if (param.pageIndex == 1) {
          if(data.couponInfo){
            billCouponList = data.couponInfo;
          }

        } else {
          var rows=[];
          if(data.couponInfo){
            rows = data.couponInfo;
          }

          if (rows && rows.length > 0) {
            rows.forEach((item, index) => {
              billCouponList.push(item);
            })
          }
        }
        setState({
          billCouponList: {
            pageIndex: param.pageIndex,
            pageSize: data.pageSize,
            total: data.total,
            couponInfo: billCouponList,
          },
          moreFlag: false,
          notReceive:'0',
        });
      }

    })
  },
  //账单详情页面
  billDetailData(billId, {setState, getState}){
    ajax({
      url: window.API_URL+API.billDetailInfo,
      data: {
        billId:billId
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        setState({
          billDetailData:data.certificateDetailInfo,
        });
      }
    })
  },

  //账单详情页面
  ifUser(param, {setState, getState}){
    ajax({
      url: window.API_URL+API.ifUser,
      data: {
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        if(resp.data.isYZUser){
          window.location.href='http://m.jn.harmonymall.com.cn/izone/myIntegral.html?memberId='+resp.data.memberId;
        }else{
          console.log('----------');
          console.log(window.location.origin+window.location.pathname+'#/login/sdyz');
          // window.location.href = window.location.origin+window.location.pathname+'#/login/sdyz';
          hashHistory.push('/login/sdyz');
        }
      }
    })
  }

};
export  default billInfoAction;
