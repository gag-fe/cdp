import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import {Modal,Button} from 'antd-mobile';
import RateShow from '../../../components/rateShow/RateShow';
import shareActions from '../../../actions/shop/share';

import '../css/shopList.less';
const shopLogo = require("../../../img/shopLogo.jpg");
const shopbg = require("../../../img/shopbg.jpg");

const ShopList =React.createClass({
  getInitialState(){
    return{
      consumeTab:false,//消费记录 ，未开发票的显隐
      collectTab:false,//收藏
      commendTab:false,//推荐
    }
  },

  //推荐详情
  _showModal(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.setStoreState({
      visible:true
    });
    //禁止or允许 滑动
    this.props.getStoreState().outContainer.style.position=
      (this.props.getStoreState().visible)?'fixed':'static';

    //数据变更时重新请求分享信息
    if(this.props.getStoreState().shareInfo.shopEntityId!=this.props.shopInfo.id){
      //查询分享信息
      this.props.shareActions.loadShareDetail({shareId:this.props.shopInfo.shareId});
    }
  },

  _toShopDetail(){
    this.context.router.push("/shopDetail/"+this.props.shopInfo.id+'/111');
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  //字符串截取中英文，'推荐人昵称'
  _sub(str,n){
    let r=/[^\x00-\xff]/g;
    if(str.replace(r,"mm").length<=n){return str;}
    let m=Math.floor(n/2);
    for(let i=m;i<str.length;i++){
      if(str.substr(0,i).replace(r,"mm").length>=n){
        return str.substr(0,i)+"...";
      }
    }
    return str;
  },

  //调转历史账单
  _toBill(e){
    e.stopPropagation();
    e.preventDefault();
    this.context.router.push("/userCenter/myBill");
  },

  componentWillMount(){
    //判断消费类型，控制list样式
    switch (this.props.shopInfo.myShopType){
      //消费
      case '1':this.setState({
        consumeTab:true,
      });break;
      //收藏
      case '2':this.setState({
        collectTab:true,
      });break;
      //推荐
      case '3':this.setState({
        commendTab:true,
      });break;
    }
  },

  render(){
    let tab='食',//业态标记
        progressValue=85,//进度条
        nickName='',//推荐人昵称
        shopBackgroundImg_url=shopbg,//默认商铺背景
        shopEntityImg_url=shopLogo;//默认商铺LOGO
    if(this.props.shopInfo.shopEntityImg)shopEntityImg_url=this.props.shopInfo.shopEntityImg;
    if(this.props.shopInfo.shopBackgroundImg)shopBackgroundImg_url=this.props.shopInfo.shopBackgroundImg;

    switch (this.props.shopInfo.shopTypeName){
      case '零售':tab='零';break;
      case '娱乐':tab='娱';break;
      case '美容':tab='美';break;
      case '餐饮':tab='食';break;
      case '生活':tab='杂';break;
      case '住行':tab='行';break;
    }
    //截取四个字符
    if(this.props.shopInfo.recommenderNickName){
      nickName=(this._sub(this.props.shopInfo.recommenderNickName,4));
    }

    return(
      <div className="shopList" onClick={this._toShopDetail}>
        <header>
          <img className="shopLogo" src={shopEntityImg_url}/>
          <div className="tagIcon">
            <p>{tab}</p>
            <div className="recommend" onClick={this._showModal}
                 style={{display:this.state.commendTab?'inline-block':'none'}}
            >
              <img src={this.props.shopInfo.recommenderImg}/>
              <span>{nickName}&nbsp;推荐</span>
            </div>
            <div className="recommend no-recommend"
                 style={{display:this.state.consumeTab?'inline-block':'none'}}
            >
              消费过
            </div>
            <div className="recommend no-recommend"
                 style={{display:this.state.collectTab?'inline-block':'none'}}
            >
              已收藏
            </div>
          </div>
        </header>
        <div
          className="headerBg"
          style={{backgroundImage:"url("+shopBackgroundImg_url+")"}}
        ></div>
        <div className="content">
          <div>
            <span className="shopName">{this.props.shopInfo.shopEntityName}</span>
            <span className="sign" style={{display:this.props.shopInfo.hasDiscountCounpon?'inline-block':'none'}}>折</span>
            <span className="sign ticket" style={{display:this.props.shopInfo.hasMoneyCounpons?'inline-block':'none'}}>券</span>
            <span className="count" onClick={this._toBill}
                  style={{display:this.state.consumeTab?'inline-block':'none'}}
            >{this.props.shopInfo.consumeTimes}</span>
            <span className="record" onClick={this._toBill}
                  style={{display:this.state.consumeTab?'inline-block':'none'}}
            >消费记录:</span>
          </div>
          <div>
            <span className="img"></span>
            <span className="address">{this.props.shopInfo.shopEntityAddress}</span>
            <span className="count" onClick={this._toBill}
                  style={{display:this.state.consumeTab?'inline-block':'none'}}
            >{this.props.shopInfo.unInvoiceTimes}</span>
            <span className="record" onClick={this._toBill}
                  style={{display:this.state.consumeTab?'inline-block':'none'}}
            >未开发票:</span>
          </div>
          <div>
            <RateShow count={this.props.shopInfo.evaluateScore}/>
            {/*<span className="average">人均:¥{this.props.shopInfo.averageConsume}</span>*/}
            <span className="piece">件单价:¥{this.props.shopInfo.averageProducetPrice}</span>
            {/*<span>回头指数:{this.props.shopInfo.backConsumeExponent}%</span>*/}
          </div>
          {/*<progress value={(100-progressValue)} max={100}>85/100</progress>*/}
          {/*<div className="floatTip" style={{marginRight:'2rem'}}>*/}
            {/*<span></span>*/}
            {/*<p>约等{this.props.shopInfo.waitTimeMinite}min</p>*/}
          {/*</div>*/}
        </div>
      </div>
    )
  }
});

export default createActionContainer({
  visible:'visible'
},{
  shareActions
})(ShopList);

