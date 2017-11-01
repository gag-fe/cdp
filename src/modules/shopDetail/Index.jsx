import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import {NavBar,Icon,Button} from 'antd-mobile';
import ShopHeader from './components/ShopHeader'
import Coupon from './components/Coupon';
import PictureRoll from './components/PictureRoll';
import CommentContainer from './components/CommentContainer';
import DishModal from './components/DishModal';
import ShareRemind from '../../components/shareRemind/ShareRemind';
import shopDetailActions from '../../actions/shop/shopDetail';
import shareActions from '../../actions/shop/share';

import Cookies from 'js-cookie';
import Jquery from 'jquery';

const ShopDetail = React.createClass({
  componentWillMount(){
    document.setTitle('商家详情');

    //加载店铺信息
    this.props.shopDetailActions.loadShopDetail({
      shopEntityId: this.props.params.shopId,
      commentPageNum: 1,
      appId: window.appId,
    });

    let urlData='';
    if(location.href.split('?')[1]){
      urlData='?'+encodeURIComponent((location.href.split('?')[1]).split('#')[0]);
    }
    //获取微信配置信息config
    Jquery.ajax({
      url: window.WX_URL + "/qwx/getJSticket.do?url=" + location.href.split('?')[0]+urlData,
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

    //添加好友力荐
    if(self.props.params.shareId!=111){
      // openid存在
      if(Cookies.get('openid')){
        self.props.shareActions.addFriendShare({
          shareId:self.props.params.shareId,
          openId:Cookies.get('openid'),
        });
      }else{//openid不存在，去获取openid
        let codeVal = window.GetRequest('code');
        if (codeVal) {
          Jquery.ajax({
            url: window.WX_URL + API.WX_AOAUTH,
            data: {
              appid: window.appId,
              code: codeVal,
              authType: '1'
            },
            method: 'post',
            type: 'json',
          }).then(resp => {
            let res = JSON.parse(resp);
            if (res.status == 'sucess') {
              Cookies.set('openid', res.openid);
              //添加好友力荐
              self.props.shareActions.addFriendShare({
                shareId:self.props.params.shareId,
                openId:res.openid,
              });
            }
          });
        }
      }
    }


    let shareId=window.uuid();

    //配置成功
    wx.ready(function(){
      // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
      wx.checkJsApi({
        jsApiList: ['hideAllNonBaseMenuItem','showMenuItems','onMenuShareTimeline','onMenuShareAppMessage'], // 需要检测的JS接口列表，所有JS接口列表见附录2,
        success: function(res) {
          console.log(JSON.stringify(res));
        }
      });

      //隐藏分享items
      wx.hideAllNonBaseMenuItem();
      wx.showMenuItems({
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
        // link:"https://open.weixin.qq.com/connect/oauth2/authorize?redirect_uri="+encodeURIComponent('http://f.pressure.goago.cn/cdp/#/shopDetail/' + self.props.params.shopId+'/'+shareId)+"&appid=" + window.appId + "&response_type=code&scope=snsapi_base&state=123&connect_redirect=1#wechat_redirect",
        link: 'http://f.pressure.goago.cn/cdp/#/shopDetail/' + self.props.params.shopId+'/'+shareId, // 分享链接
        imgUrl: '', // 分享图标
        type: '', // 分享类型,music、video或link，不填默认为link
        success:function(){
          // 用户确认分享后执行的回调函数
          self.props.shareActions.share({
            shareId: shareId,
            shareSource: '2',
            shareType: 'E',
            shopEntityId: self.props.params.shopId,
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
        link: 'http://f.pressure.goago.cn/cdp/#/shopDetail/' + self.props.params.shopId+'/'+shareId, // 分享链接
        imgUrl: '', // 分享图标
        success: function () {
          // 用户确认分享后执行的回调函数
          self.props.shareActions.share({
            shareId:shareId,
            shareSource: '2',
            shareType: 'E',
            shopEntityId: self.props.params.shopId,
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
    let monthTop=[],newProduct=[],signatureProduct=[],commentDatas=[];
    if(this.props.shopDetail.monthTop)monthTop=this.props.shopDetail.monthTop;
    if(this.props.shopDetail.newProduct)newProduct=this.props.shopDetail.newProduct;
    if(this.props.shopDetail.signatureProduct)signatureProduct=this.props.shopDetail.signatureProduct;
    if(this.props.shopDetail.commentDatas)commentDatas=this.props.shopDetail.commentDatas;

    return (
      <div>
          <ShopHeader shopDetail={this.props.shopDetail}/>
          {/*<Coupon/>*/}
          <PictureRoll dishes={monthTop} label="当月排行"/>
          {/*<PictureRoll dishes={newProduct} label="店内上新"/>*/}
          {/*<PictureRoll dishes={signatureProduct} label='招牌菜'/>*/}
          {/*<CommentContainer commentDatas={commentDatas}/>*/}
          <DishModal/>
        <ShareRemind/>
      </div>
    );
  }
});

export default createActionContainer({
  shopDetail:'shopDetail',
},{
  shopDetailActions,
  shareActions,
})(ShopDetail);
