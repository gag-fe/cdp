import 'antd-mobile/dist/antd-mobile.less';
import ReactDOM from 'react-dom';
import React from 'react';
import Utils from '../utils/index';
import '../common/lib.js';
import IndexRouter from '../components/index/IndexRouter';
import '../../index.html';
import './index.less';
import {NavBar, Icon,} from 'antd-mobile';
const ajax = Utils.ajax, login = Utils.common.login;
import Cookies from 'js-cookie';

//运维随环境配置
window.baseUrl = '.gooagoo.com';
window.channelType = 'CBPOA';
//appid
if (window.location.origin.indexOf('gooagoo.com') > 0) {
  window.appId = 'wxca8522da10631e79';
  window.yzappId='wx0aba42619533ab40';
  window.componentId='wx6051082e233d1e80';
  window.baseUrl = '.gooagoo.com';
} else if (window.location.origin.indexOf('test.goago.cn') > 0) {
  window.appId = 'wx21012865e811d26b';
  window.yzappId='wx0aba42619533ab40';
  window.componentId='wxdcd5ac59df484a19';
  window.baseUrl = '.test.goago.cn';
} else if (window.location.origin.indexOf('pressure.goago.cn') > 0) {
  window.appId = 'wx20c34a4a5ea4ef64';
  window.yzappId='wx0aba42619533ab40';
  window.componentId='wxc20a21d1b3d44c4b';
  window.baseUrl = '.pressure.goago.cn';
} else {
  window.appId = 'wx5b245e517ead1427';
  window.yzappId = 'wx1e625207e315bc8c';
  window.componentId='wx16462690a5596777';
  window.baseUrl = '.dev.goago.cn';
}
// window.API_URL ='';
// window.COUPON_URL= '';
window.API_URL = 'http://mygoo'+window.baseUrl;
window.MEMBER_URL='http://member'+window.baseUrl;
window.LOGIN_URL = 'http://acquirer' + window.baseUrl;
window.COUPON_URL='http://marketing' + window.baseUrl;
window.WX_URL = 'http://wx' + window.baseUrl;
window.INVOICE_API = 'http://f' + window.baseUrl;   //前端域名
window.INVOICE_API_URL='http://invoice'+window.baseUrl;   //后端开发票域名
ReactDOM.render(<IndexRouter/>, document.getElementById('react-content'));
