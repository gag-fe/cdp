import React from 'react';
import Utils from '../../utils/index';
import LoginForm from 'mobile-login-module';
import Cookies from 'js-cookie';
import Jquery from 'jquery';
import {hashHistory} from 'react-router';
const ajax = Utils.ajax;
const API = {
  LOGIN_URL: '/user/login.do',
  LOGIN_SHORT_MESSAGE: '/user/sendShortMessage.do',
  WX_AOAUTH: '/qwx/AJAXoauth.do',
  GAG_SHORT_MESSAGE: '/user/sendMessageCode.do',
  GAG_LOGIN_URL: '/user/mobileUserLogin.do',
};

const Login = React.createClass({
    propTypes: {
      codeVal: React.PropTypes.string
    },
    getInitialState() {
      return {
        codeVal: ''
      };
    },
    componentWillMount() {
      if (!window.GetRequest('code')) {
        let url = '';
        if (this.props.params.targets == 'sdyz') {
          url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=" + encodeURIComponent(window.location.href) + "&appid=" + window.yzappId + "&response_type=code&scope=snsapi_base&state=123&component_appid="+window.componentId+"&connect_redirect=1#wechat_redirect";
        } else {
          url = "https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri=" + encodeURIComponent(window.location.href) + "&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&component_appid="+window.componentId+"&connect_redirect=1#wechat_redirect";
        }
        window.location.href = url;
      }
    },
    componentDidMount(){

      let codeVal = window.GetRequest('code');
      if (codeVal) {
        this.setState({
          codeVal: codeVal
        });
      }
      let appid = '';
      if (this.props.params.targets == 'sdyz') {
        appid = window.yzappId;
      } else {
        appid = window.appId;
      }
      if (codeVal && !Cookies.get('openid')) {
        Cookies.remove('openid');
        Jquery.ajax({
          url: window.WX_URL + API.WX_AOAUTH,
          data: {
            appid: appid,
            code: codeVal,
            authType: '1'
          },
          method: 'post',
          type: 'json',
        }).then(resp => {
          let res = JSON.parse(resp);
          if (res.status == 'sucess') {
            Cookies.set('openid', res.openid);
          }
        });
      }
    },
    //获取验证码
    _sendSecurityCode(phoneNumber)
    {
      if (this.props.params.targets == 'sdyz') {
        ajax({
          url: window.LOGIN_URL + API.LOGIN_SHORT_MESSAGE,
          data: {
            mobile: phoneNumber,
          },
          method: 'post',
          type: 'json',
        }).then(resp => {
          if (resp.status == 'S') {
          }
        })
      } else {
        ajax({
          url: window.MEMBER_URL + API.GAG_SHORT_MESSAGE,
          data: {
            mobile: phoneNumber,
          },
          method: 'post',
          type: 'json',
        }).then(resp => {
          if (resp.status == 'S') {
          }
        })
      }

    }
    ,
//获取用户的登陆信息。
    _getLoginInfo(phoneValue, codeValue)
    {
      let appid = '';
      if (this.props.params.targets == 'sdyz') {
        appid = window.yzappId;
        ajax({
          url: window.LOGIN_URL + API.LOGIN_URL,
          data: {
            topic: '3',
            chnl: '04',
            mobile: phoneValue,
            code: codeValue,
            src: '1',
            appid: appid,
            openid: Cookies.get('openid'),
            isbind: '1',
          },
          method: 'post',
          type: 'json',
        }).then(resp => {
          if (resp.status == 'S') {
            window.location.href = resp.data.toUrl;
          }
        });

      } else {
        appid = window.appId;
        ajax({
          url: window.MEMBER_URL + API.GAG_LOGIN_URL,
          data: {
            openId: Cookies.get('openid'),
            appId: appid,
            channelType: '04',
            mobile: phoneValue,
            code: codeValue,
          },
          method: 'post',
          type: 'json',
        }).then(resp => {
          if (resp.status == 'S') {
            let data = resp.data;
            console.log(this.props.params.targets == 'gag');
            if(this.props.params.targets == 'gag'){
              hashHistory.push('/userCenter');
            }else{
                if (this.props.params.targets && this.props.params.targets != 'gag' ) {
                  let targetUrl = this.props.params.targets.replace(/\|/i, '/');
                  console.log(targetUrl);
                  console.log(window.location.origin + window.location.pathname + '#/' + targetUrl);
                  window.location.href = window.location.origin + window.location.pathname + '#/' + targetUrl;
                }
            }
          }
        });


      }


    }
    ,
    render()
    {
      return (
        <div>
          {this.state.codeVal ? <LoginForm getCode={this._sendSecurityCode} getLogin={this._getLoginInfo}/> : ""}
        </div>
      )
    }
  })
  ;
export  default Login;
