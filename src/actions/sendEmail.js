/**
 * Created by kana on 16/11/29.
 */
import Utils from '../utils/index';
const ajax = Utils.ajax;
import {Toast} from 'antd-mobile';
import {hashHistory} from 'react-router';
const API={
  sendEmail:'/centificate/sendBillCentificateEmail.do'
};
const sendEmailAction={
  //账单详情
  sendEmail(param, {setState, getState}){
    ajax({
      url: window.API_URL+API.sendEmail,
      data: {
        email:param.email,
        centificateId:param.centificateId
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        Toast.info('发送成功！',2,()=>{
          hashHistory.push('/userCenter');
        });
      }else{
        Toast.info('发送失败！',2,()=>{
          hashHistory.push('/userCenter');
        });
      }
    })
  },

};
export  default sendEmailAction;
