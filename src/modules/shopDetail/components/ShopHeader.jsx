import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import {Popup,Toast} from 'antd-mobile';
import shopDetailActions from '../../../actions/shop/shopDetail';

import '../css/shopHeader.less';
const shopLogo = require("../../../img/shopLogo.jpg");
const shopbg = require("../../../img/shopbg.jpg");
//引入样式

const ShopHeader =React.createClass({
  getInitialState(){
    return{
      click:0,//定义状态，判断是否是点击收藏事件触发数据变更
      shareRemindState:0,//控制销毁时蒙层关闭
    }
  },

  //分享经验
  _shareExperience(){
    this.setState({
      shareRemindState:0,
    });
    Popup.hide();
    setTimeout(()=>{
      this.context.router.push("/shareExperience");
    },10);
  },

  //分享单品
  _shareDish(){
    this.setState({
      shareRemindState:0,
    });
    Popup.hide();
    setTimeout(()=>{
      this.context.router.push("/shareDish");
    },10);
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  //分享店铺
  _shareShop(){
    Popup.hide();
    this.props.setStoreState({
      shareRemind:true,
    });
    this.setState({
      shareRemindState:0,
    });
  },

  _onCancel(){
    this.setState({
      shareRemindState:0,
    });
    Popup.hide();
  },

  _showShare(){
    Popup.show(
      <div className="shareOptions"  id="shareId">
        <p onClick={this._shareShop}>分享店铺</p>
        <p onClick={this._shareDish} style={{display:this.props.isLogin?'block':'none'}}>分享单品</p>
        <p onClick={this._shareExperience} style={{display:this.props.isLogin?'block':'none'}}>分享心得</p>
        <p onClick={this._onCancel}>取消</p>
      </div>
      ,
      { animationType: 'slide-up',
        maskClosable:false}
    );

    setTimeout(function(){
      document.getElementById("shareId").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = '100%';
      document.getElementById("shareId").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.left = '0';
      document.getElementById("shareId").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.borderRadius = '0';
    }, 50);

    this.setState({
      shareRemindState:1,
    });
  },

  //收藏/取消 切换
  _onCollect(){
    this.setState({
      click:1,
    });
    //判断收藏或者取消
    if(this.props.shopDetail.hasCollected==true){//取消收藏
      this.props.shopDetailActions.cancelCollect({id:this.props.shopDetail.collectId,topicType:"E"});
    }else{//收藏店铺
      this.props.shopDetailActions.collectShop({
        shopEntityId : this.props.shopDetail.id,
        goodId       : '',
        goodPrice    : '',
        topicType    : "E",
      });
    }
  },

  _toastTip(){
    let content = this.props.shopDetail.hasCollected?'取消成功!':'收藏成功';
    Toast.info(content,1);
  },

  //调转历史账单
  _toBill(){
    this.context.router.push("/userCenter/myBill");
  },

  componentWillReceiveProps(nextProps){
    if(this.props.shopDetail.hasCollected!=nextProps.hasCollected){
      // 判断是否是用户操作
      if(this.state.click==1)this._toastTip();
    }
  },

  componentWillUnmount(){
    this.props.setStoreState({
      shareRemind:false,
    });

    //蒙层开启 则关闭
    if(this.state.shareRemindState==1){
      Popup.hide();
    }
  },

  render(){
    let progressValue=85,//进度条
      shopBackgroundImg_url=shopbg,//默认商铺背景
      shopEntityImg_url=shopLogo;//默认商铺LOGO
    if(this.props.shopDetail.shopEntityImg)shopEntityImg_url=this.props.shopDetail.shopEntityImg;
    if(this.props.shopDetail.shopBackgroundImg)shopBackgroundImg_url=this.props.shopDetail.shopBackgroundImg;

    return(
      <div className="shop">
        <header>
          <div>
            <div  onClick={this._showShare} className="icon commend"/>
          </div>
          <img className="shopLogo" src={shopEntityImg_url}/>
          <div>
            <div  onClick={this._onCollect} className={this.props.shopDetail.hasCollected?'icon collect-light':'icon collect-dark'}/>
          </div>
        </header>
        <div
          className="headerBg"
          style={{backgroundImage:"url("+shopBackgroundImg_url+")"}}
        ></div>
        <div className="content">
          <div>
            <span className="shopName">{this.props.shopDetail.shopEntityName}</span>
            <span className="sign" style={{display:this.props.shopDetail.hasDiscountCounpon?'inline-block':'none'}}>折</span>
            <span className="sign ticket" style={{display:this.props.shopDetail.hasMoneyCounpons?'inline-block':'none'}}>券</span>
            {/*<span>¥{this.props.shopDetail.averageConsume}/人</span>*/}
          </div>
          <div className="list">
            <span className="img img-address"></span>
            <span className="address">{this.props.shopDetail.shopEntityAddress}</span>
          </div>
          <div className="list">
            <span className="img img-time"></span>
            <span>{this.props.shopDetail.openTime}-{this.props.shopDetail.colseTime}</span>
            <div className="consumeCount" onClick={this._toBill} style={{display:this.props.isLogin?'inline-block':'none'}}>
              <div className="img consume"></div>
              <span>消费记录</span>
              <span>{this.props.shopDetail.consumeTimes}次</span>
            </div>
          </div>
          <div className="list">
            <span className="img img-phone"></span>
            <span>{this.props.shopDetail.phone}</span>
            <div className="invoiceCount" onClick={this._toBill} style={{display:this.props.isLogin?'inline-block':'none'}}>
              <div className="img"></div>
              <span>未开发票</span>
              <span>{this.props.shopDetail.unInvoiceTimes}次</span>
            </div>
          </div>
          {/*<progress value={(100-progressValue)} max={100}>80/100</progress>*/}
          {/*<div className="drogue" style={{marginRight:'2rem'}}>*/}
            {/*<span></span>*/}
            {/*<p>约等{this.props.shopDetail.waitTimeMinite}min</p>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
});

export default createActionContainer({
  isLogin:'isLogin',
},{
  shopDetailActions,
})(ShopHeader);

