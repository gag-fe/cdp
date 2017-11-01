import Utils from '../utils/index';
import {Toast,Popup} from 'antd-mobile';
import React from 'react';
import Layerbg from '../modules/userCenter/coupons/components/Layerbg';
const ajax = Utils.ajax;

const API = {
  couponList: '/coupon/getMyCoupon.do',
  couponDetail: '/coupon/getCouponDetail.do',
};
const couponAction = {
  getMyCouponList(param, {setState, getState}){
    ajax({
        url: window.API_URL + API.couponList,
        data: {},
        method: 'post',
        type: 'json',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
        timeout:10000,
      }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        setState({
          couponList:data.couponInfo,
          pageFlag:true,
        })
      }
      else{
        setState({
          pageFlag:true,
        });
      }
    }).catch(()=>{
      setState({
        pageFlag:true,
      });
    })
  },
  getCouponDetail(param, {setState, getState}){
    ajax({
      url: window.API_URL + API.couponDetail,
      data: {
        couponId:param
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
      Popup.show(<div id="couponPop"><Layerbg  item={data.couponDetail}/></div>);
        setTimeout(function(){
          document.getElementById("couponPop").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = '80%';
          document.getElementById("couponPop").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.left = '10%';
          document.getElementById("couponPop").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.top = '15%';
          document.getElementById("couponPop").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.borderRadius = '8px';
        }, 50);
    }
  })
  },
  Popup:Popup,
};
export  default couponAction;
