import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import {Button,Toast} from 'antd-mobile';
import DishContainer from './components/DishContainer';
import ShareRemind from '../../components/shareRemind/ShareRemind';
import shareActions from '../../actions/shop/share';
import EmptyPage from '../userCenter/emptyPage/EmptyPage';
import Jquery from 'jquery';

import './css/index.less';

const ShareDish = React.createClass({
  getInitialState(){
    return{
      allSelect:false,
    }
  },

  //分享
  _onShare(){
    console.log(this.props.getStoreState().shareProducts.length);
    if(this.props.getStoreState().shareProducts.length==0){
      Toast.info('请选择要分享的菜品',1.5);
    }else{
      this.props.setStoreState({
        shareRemind:true,
      });
    }
  },

  //全选
  _selectAll(){
    this.setState({
      allSelect:!this.state.allSelect,
    });
    //全选
    let shareProducts=[];
    this.props.goodsData.forEach(({goodsId,goodsName})=>{
      shareProducts.push({
        goodsId,
        goodsName,
      });
    });
    this.props.setStoreState({
      shareProducts:shareProducts,
    });
  },

  componentWillMount(){
    document.setTitle('分享单品');

    //清空缓存
    this.props.setStoreState({
      shareProducts:[],
      score:5,
    });

    this.props.shareActions.loadShareDish({
      shopEntityId:this.props.getStoreState().shopDetail.id,
      shareType:'G'});

    //获取微信配置信息config
    Jquery.ajax({
      url: window.WX_URL + "/qwx/getJSticket.do?url=" + location.href.split('?')[0],
      data: {},
      method: 'post',
      type: 'json',
    }).done(data => {
      //设置微信配置信息
      const wxConfigData=JSON.parse(data);
      console.log(wxConfigData);
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
      console.log('微信配置成功');

      window.wx.hideAllNonBaseMenuItem();
      window.wx.showMenuItems({
        menuList: [
          "menuItem:share:timeline",
          "menuItem:share:appMessage",
          "menuItem:favorite"
        ]
      });

      // 分享给好友
      wx.onMenuShareAppMessage({
        title: '我发现不错的商家，推荐大家去看看', // 分享标题
        desc: '这家店值得推荐', // 分享描述
        link:"https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent('http://f.pressure.goago.cn/cdp/#/shareView/' + shareId)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect",
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
        success: function () {
          // 用户确认分享后执行的回调函数
          self.props.shareActions.share({
            shareId:shareId,
            shareSource:'2',
            shareType:'G',
            shopEntityId:self.props.getStoreState().shopDetail.id,
            products:self.props.getStoreState().shareProducts,
          });

          //关闭弹窗
          self.props.setStoreState({
            shareRemind:false,
          });
        }
      });

      // 分享到朋友圈
      wx.onMenuShareTimeline({
        title: '我发现不错的店铺，推荐大家去看看', // 分享标题
        link:"https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent('http://f.pressure.goago.cn/cdp/#/shareView/' + shareId)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect",
        imgUrl: '', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          self.props.shareActions.share({
            shareId:shareId,
            shareSource:'2',
            shareType:'G',
            shopEntityId:self.props.getStoreState().shopDetail.id,
            products:self.props.getStoreState().shareProducts,
          });

          //关闭弹窗
          self.props.setStoreState({
            shareRemind:false,
          });
        }
      });

    })
  },

  render() {
    let dishs=[];
    if(this.props.goodsData.length!=0){
      this.props.goodsData.forEach((item,index)=>{
        dishs.push(<DishContainer dish={item} key={index} allSelect={this.state.allSelect}/>);
      });
    }else{
      dishs.push(
        <EmptyPage key={1}/>
      )
    }

    return (
      <div className="shareDish">
        <div className="dishHeader">你消费过的<span onClick={this._selectAll}>全选</span></div>
        {dishs}
        <Button className="gag_button" onClick={this._onShare}>分享出去</Button>
        <ShareRemind/>
      </div>
    );
  }
});

export default createActionContainer({
  goodsData:'goodsData',
},{
  shareActions,
})(ShareDish);
