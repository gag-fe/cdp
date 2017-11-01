import React, {Component}from 'react';
import {hashHistory} from 'react-router';
import Cookies from 'js-cookie';
import {Toast} from 'antd-mobile';
import Jquery from 'jquery';
import Utils from '../../utils/index';
const ajax = Utils.ajax;
const API = {
  WX_AOAUTH: '/qwx/AJAXoauth.do',
  LOGIN_URL: '/user/channelUserLogin.do',
};
class YZEleVoucher extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
      if (!window.GetRequest('code')) {
        let url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=" + encodeURIComponent(window.location.href) + "&appid=" + window.yzappId + "&response_type=code&scope=snsapi_base&state=123&component_appid="+window.componentId+"&connect_redirect=1#wechat_redirect";
        window.location.href = url;
      }
  }

  componentDidMount() {
    let codeVal = window.GetRequest('code');
    let appId=window.yzappId;
    let authType="1";


    if (codeVal) {
      Jquery.ajax({
        url: window.WX_URL + API.WX_AOAUTH,
        data: {
          appid: appId,
          code: codeVal,
          authType: authType,
        },
        method: 'post',
        type: 'json',
      }).then(resp => {
        let res = JSON.parse(resp);
        if (res.status == 'sucess') {
          Cookies.set('openid', res.openid);

          ajax({
            url: window.MEMBER_URL + API.LOGIN_URL,
            data: {
              openId: res.openid,
              appId: window.yzappId,
              channelType:'04',
            },
            method: 'post',
            type: 'json',
          }).then(back => {
            if(back.status == 'S'){
              hashHistory.push('/userCenter/myBill/A');
              // window.location.href=window.location.origin + '/cdp/#/userCenter/myBill/A';
            }
          });
        }else{
          if(!Cookies.get('openid')){
            Toast.info(res.message);
          }

        }
      });
    }
  }

  render() {
    document.setTitle('');
    return (
      <div></div>
    )
  }
}
export  default  YZEleVoucher;
