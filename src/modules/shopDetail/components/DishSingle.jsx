import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import {Toast} from 'antd-mobile';
import shopDetailActions from '../../../actions/shop/shopDetail';

import '../css/dishSingle.less';

//带个图片list组件
const SingleContainer =React.createClass({
  getInitialState(){
    return{
      click:0,//定义状态，判断是否是点击收藏事件触发数据变更
    }
  },

  //关注/取消 切换
  _onAttention(e){
    e.stopPropagation();
    e.preventDefault();

    this.setState({
      click:1
    });

    //判断收藏或者取消
    if(this.props.picture.isCollected==true){//取消收藏
      this.props.shopDetailActions.cancelCollect({
        id:this.props.picture.collectId,
        goodId: this.props.picture.goodsId,
        topicType:"G",
      });
    }else{//收藏店铺
      this.props.shopDetailActions.collectShop({
        shopEntityId : this.props.getStoreState().shopDetail.id,
        goodId       : this.props.picture.goodsId,
        goodName     : this.props.picture.name,
        goodPrice    : this.props.picture.price,
        topicType    : "G",
      });
    }
  },

  _toastTip(){
    let content = this.props.picture.isCollected?'取消成功!':'收藏成功';
    Toast.info(content,1);
  },

  componentWillReceiveProps(nextProps){
    if(this.props.picture.isCollected!=nextProps.picture.isCollected){
      // 判断是否是用户操作
      if(this.state.click==1)this._toastTip();
    }
  },

  //关闭模态框
  _closeModal(e){
    e.stopPropagation();
    e.preventDefault();
    this.props.setStoreState({
      carouselModal: !this.props.getStoreState().carouselModal,
    });
  },

  render(){
    return(
      <div className="singleContainer">
        <div onClick={this._closeModal} className="close"/>
        <div className="border"></div>
        <div onClick={this._onAttention} className={this.props.picture.isCollected?'onAttention':'attention'}/>
        <img className="dish" src={this.props.picture.img}/>
        <div className="textContainer">
          <p className="name">{this.props.picture.name}</p>
          <p className="describe">{this.props.picture.productDesc}</p>
          <div className="price">
            {this.props.picture.price ? <span>¥</span>  : ''}{this.props.picture.price}
            <p><span>{this.props.picture.originPrice ?<span>¥</span>:''}{this.props.picture.originPrice} </span></p>
          </div>
        </div>
      </div>
    );
  }
});

export default createActionContainer({
},{
  shopDetailActions,
})(SingleContainer);
