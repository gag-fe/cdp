import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import ReactDOM from 'react-dom';
import {Modal, Button} from 'antd-mobile';
import RateShow from '../../../components/rateShow/RateShow';
import CommentContainer from '../../shareView/components/CommentContainer';

import '../css/commendModal.less';

const CommendModal = React.createClass({
  _onClose() {
    this.props.setStoreState({
      visible: false,
    });
    //禁止or允许 滑动
    this.props.getStoreState().outContainer.style.position=
      (this.props.getStoreState().visible)?'fixed':'static';
  },

  render() {
    let dishs=[];
    if(this.props.shareInfo.goods){
      this.props.shareInfo.goods.forEach(({goodsImg,goodsName,price},index)=>{
        dishs.push(
          <div key={index}>
            <img src={goodsImg}/>
            <p>{goodsName}</p>
            <p>¥{price}</p>
          </div>
        )
      });
    }else{
      return <div></div>
    }
    return (
      <Modal
        className='recommendModalbg'
        closable
        maskClosable
        transparent
        visible={this.props.visible}
      >
        <div className="recommendModal">
          <header>
            <p>{this.props.shareInfo.shopEntityName}</p>
            <span>营业时间 09:00-21:30</span>
            <span className="singlePrice">人均:¥{this.props.shareInfo.averageConsume}</span>
          </header>
          <CommentContainer shareInfo={this.props.shareInfo}/>
          <div className="shareMain">
            <p>推荐单品</p>
            {dishs}
          </div>
          <div onClick={this._onClose} className="cancel"/>
        </div>
      </Modal>
    );
  }
});

export default createContainer({
  visible:'visible',
  shareInfo:'shareInfo'
})(CommendModal);
