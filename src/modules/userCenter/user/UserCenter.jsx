import React, {Component}from 'react';
import {hashHistory} from 'react-router';
import Cookies from 'js-cookie';
import {Toast} from 'antd-mobile';
import Jquery from 'jquery';
import Utils from '../../../utils/index';

import {List} from 'antd-mobile';
import Header from './components/Header';
import userAction from '../../../actions/userCenter';
import {createActionContainer} from 'Roof';
import './css/userIndex.less';
const Item=List.Item;
const pz_icon=require('../../../img/dz_icon@4x.png');
const coupon_icon=require('../../../img/coupon_icon@4x.png');
const invoice_icon=require('../../../img/invoice_icon@4x.png');
const park_icon=require('../../../img/park_icon@4x.png');
const unPark=require('../../../img/unpark@4x.png');
const unIntegral=require('../../../img/unIntegral@4x.png');
const unReplace=require('../../../img/unreplace@4x.png');
const integral=require('../../../img/integral@2x.png');
const ajax = Utils.ajax;
const API = {
  WX_AOAUTH: '/qwx/AJAXoauth.do',
  CHANNEL_LOGIN_URL: '/user/channelUserLogin.do',
};



class UserCenter extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    if (!window.GetRequest('code')) {
      let url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=" + encodeURIComponent(window.location.href) + "&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&component_appid="+window.componentId+"&connect_redirect=1#wechat_redirect";
      window.location.href = url;
    }
  }

  componentDidMount() {
    let codeVal = window.GetRequest('code');
    let appId=window.appId;
    let authType="1";

    if (codeVal) {
      if(Cookies.get('openid')){
        ajax({
          url: window.MEMBER_URL + API.CHANNEL_LOGIN_URL,
          data: {
            openId: Cookies.get('openid'),
            appId: window.appId,
            channelType:'04',
          },
          method: 'post',
          type: 'json',
        }).then(back => {
          if(back.status == 'S'){
            if(back.data.mobileRegisterFlag){
              this.props.userAction.showUserData();
              _hmt.push(['_trackPageview', '/mygoo/userCenter']);
            }else{
              hashHistory.push('/login/gag')
            }
          }
        });
      }else{
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
              url: window.MEMBER_URL + API.CHANNEL_LOGIN_URL,
              data: {
                openId: res.openid,
                appId: window.appId,
                channelType:'04',
              },
              method: 'post',
              type: 'json',
            }).then(back => {
              if(back.status == 'S'){
                if(back.data.mobileRegisterFlag){
                  this.props.userAction.showUserData();
                  _hmt.push(['_trackPageview', '/mygoo/userCenter']);
                }else{
                  hashHistory.push('/login/gag')
                }
              }
            });
          }
        });
      }

    }
  }

  mybill(){
    hashHistory.push("/userCenter/myBill/A");
  }
  toCoupons(){
    hashHistory.push("/userCenter/coupons");
  }
  toIntegral(greditUrl){
   window.location.href=greditUrl;
  }
  invoicePage=()=>{
    this.props.setStoreState({
      invoiceFlag:true,
    });
    hashHistory.push("/userCenter/invoiceHeader");
  };

  render() {
    if(Object.keys(this.props.userInfo).length == '0'){
      return (<div></div>)
    }else{
      document.setTitle('个人中心');
      return (
        <div className="userIndex">
          <Header></Header>
          <List>
            <Item
              thumb={pz_icon}
              arrow="horizontal"
              onClick={this.mybill}
            >电子凭证</Item>
            <Item thumb={coupon_icon} arrow="horizontal" onClick={this.toCoupons}>我的优惠券</Item>
            <Item thumb={invoice_icon} arrow="horizontal" onClick={this.invoicePage}>发票管家</Item>
            <Item thumb={integral} arrow="horizontal" onClick={this.toIntegral.bind(this,this.props.userInfo.greditUrl)}><span>我的积分</span></Item>
            <Item thumb={unPark} ><span style={{"color":'#999'}}>停车缴费</span></Item>
            <Item thumb={unReplace} ><span style={{"color":'#999'}}>退换货记录</span></Item>
          </List>

        </div>)
    }
  }
}
export default createActionContainer({
  userInfo: 'userInfo',
  invoiceFlag:'invoiceFlag',
}, {
  userAction
})(UserCenter);
