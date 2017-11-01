import {createContainer, createActionContainer} from 'Roof';
import React from 'react';
import {Button, TextareaItem} from 'antd-mobile';
import Score from '../../components/score/Score';
import ShareDish from './components/DishContainer';
import ShareRemind from '../../components/shareRemind/ShareRemind';
import shareActions from '../../actions/shop/share';
import Jquery from 'jquery';

import './css/index.less';

const ShareExperience = React.createClass({
  getInitialState(){
    return {
      value: '',
    }
  },

  _onChange(e){
    this.setState({
      value: e
    });
  },

  //点击分享按钮
  _onShare(){
    this.props.setStoreState({
      shareRemind: true,
    });
  },

  componentWillMount(){
    document.setTitle('分享心得');

    //初始化要分享的单品
    this.props.setStoreState({
      shareProducts: [],
    });

    this.props.shareActions.loadShareDish({
      shopEntityId:this.props.getStoreState().shopDetail.id,
      shareType:'E'});

    //获取微信配置信息config
    Jquery.ajax({
      url: window.WX_URL + "/qwx/getJSticket.do?url=" + location.href.split('?')[0],
      data: {},
      method: 'post',
      type: 'json',
    }).done(data => {
      //设置微信配置信息
      const wxConfigData=JSON.parse(data);
      //微信配置
      wx.config({
        debug: false, //  开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId:wxConfigData.appId, // 必填，公众号的唯一标识
        timestamp: wxConfigData.timestamp, // 必填，生成签名的时间戳
        nonceStr: wxConfigData.nonceStr, // 必填，生成签名的随机串
        signature: wxConfigData.signature, // 必填，签名，见附录1
        jsApiList: ['checkJsApi','hideAllNonBaseMenuItem','showMenuItems', 'onMenuShareTimeline', 'onMenuShareAppMessage'] //必填，需要使用的JS接口列表，所有JS接口列表见附录2
      });
    });
  },

  componentDidMount(){

    let self=this;
    let shareId=window.uuid();

    //配置成功
    wx.ready(function () {
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      window.wx.hideAllNonBaseMenuItem();
      window.wx.showMenuItems({
        menuList: [
          "menuItem:share:timeline",
          "menuItem:share:appMessage",
          "menuItem:favorite"
        ]
      });

      //分享给好友
      wx.onMenuShareAppMessage({
        title: '我发现不错的商家，推荐大家去看看', // 分享标题
        desc: '这家店值得推荐', // 分享描述
        link:"https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent('http://f.pressure.goago.cn/cdp/#/shareView/' + shareId)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect",
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success(){
          // 用户确认分享后执行的回调函数
          self.props.shareActions.share({
            shareId: shareId,
            shareSource: '2',
            shareType: 'J',
            shopEntityId: self.props.getStoreState().shopDetail.id,
            products: self.props.getStoreState().shareProducts,
            recommedWords: self.state.value,
            shareScore: self.props.getStoreState().score,
          });

          //关闭弹窗
          self.props.setStoreState({
            shareRemind:false,
          });
        }
      });

      //分享到朋友圈
      wx.onMenuShareTimeline({
        title: '我发现不错的，可以去看看', // 分享标题
        link:"https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent('http://f.pressure.goago.cn/cdp/#/shareView/' + shareId)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect",
        imgUrl: '', // 分享图标
        success(){
          // 用户确认分享后执行的回调函数
          self.props.shareActions.share({
            shareId: shareId,
            shareSource: '2',
            shareType: 'J',
            shopEntityId: self.props.getStoreState().shopDetail.id,
            products: self.props.getStoreState().shareProducts,
            recommedWords: self.state.value,
            shareScore: self.props.getStoreState().score,
          });

          //关闭弹窗
          self.props.setStoreState({
            shareRemind:false,
          });
        }
      });
    });
  },

  render() {
    return (
      <div className="shareExperience">
        <Score />
        <TextareaItem
          placeholder="跟你的好友说点什么"
          rows={5}
          value={this.state.value}
          onChange={this._onChange}
          count={100}
        />
        <ShareDish shopId={this.props.params.shopId}/>
        <Button className="gag_button" onClick={this._onShare}>分享出去</Button>
        <ShareRemind/>
      </div>
    );
  },
});

export default createActionContainer({}, {
  shareActions,
})(ShareExperience);
