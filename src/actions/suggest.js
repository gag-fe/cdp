/**
 * Created by kana on 16/11/29.
 */
import Utils from '../utils/index';
import React from 'react';
import { hashHistory } from 'react-router';
import {Toast} from 'antd-mobile';
const ajax = Utils.ajax;
const API={
  suggestUrl:'/my/addopinion.do',

};
const  suggestAction={

  //添加意见反馈
  addSuggestData(load,{setState,getState}){
      console.log(getState().content);
      ajax({
        url: window.API_URL+API.suggestUrl,
        data:{
          content:getState().content
        },
        method: 'post',
        type: 'json',
        xhrFields: {
          withCredentials: true
        },
        crossDomain: true,
      }).then(resp => {
        if (resp.status == 'S') {

          Toast.success('提交成功!',1,()=>{
            hashHistory.push('/userCenter');
          });
        }
      })


  },
};
export  default  suggestAction;
