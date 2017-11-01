/**
 * Created by kana on 16/11/29.
 */
import Utils from '../utils/index';
import React from 'react';
import {Toast} from 'antd-mobile';
import  Cookies from 'js-cookie';
import { hashHistory } from 'react-router';
const ajax = Utils.ajax;
const API={
  userCenter:'/user/userCenter.do',
  logoutUrl:'/user/logout.do',
  barInfoUrl:'/user/getBarInfo.do',
};
const  userCenterAction={

  //个人中心
  showUserData(load,{setState,getState}){
    ajax({
      url: window.API_URL+API.userCenter,
      data:{
        appid:window.appId
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
         setState({
           userInfo:resp.data.userData
         });
      }
    })

  },

  //退出登陆
   logout(load,{setState,getState}){
     console.log(Cookies.get('mobile_token'));
    ajax({
      url: window.LOGIN_URL+API.logoutUrl,
      data:{
        // mobile_token :Cookies.get('mobile_token'),
        // channelType:window.channelType
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        Toast.info('退出成功','1',()=>{
          // Cookies.remove('mobile_token');
          hashHistory.push('/login/userCenter');
        });
      }
    })

  },

  //获取条形码信息
  showPersonData(load,{setState,getState}){
    ajax({
      url: window.API_URL+API.barInfoUrl,
      data:{
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        setState({
          barInfo:resp.data
        });
      }
    })

  },

};
export  default  userCenterAction;
