import React from 'react';
import '../css/popupByCoupon.less';
import {Popup} from 'antd-mobile';
import {hashHistory} from 'react-router';

const cmClose=require('../../../../img/cm-close.png');
const cmHeader=require('../../../../img/cm-head.png');
const cmHeadert=require('../../../../img/cm-headt.png');

class PopupByCoupon extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  onClose = (sel) => {
    this.setState({ sel });
    Popup.hide();
  };

  tohref=(orgNum)=>{
    this.onClose();
    if(orgNum == '0'){
      hashHistory.push("/userCenter/coupons");
    }else{
      this.props.action.ifUser();
    }

  };
  render(){
    return (
      <div className="modal-coupon">
        <img src={cmClose} className="cm-close" onClick={this.onClose}/>
        <div className="am-modal-dialog">
          <div className="am-modal-hd">
            <img src={cmHeader}/>
          </div>
          <div className="am-modal-bd">
            <h3>获得优惠券</h3>
            <p className="cbName">{this.props.item.couponBatchName}</p>
            <div>使用有效日期：<i className="cbStart">{this.props.item.useStartTime}</i>~<i className="cbEnd">{this.props.item.useEndTime}</i></div>
            <span className='seeCouponList' onClick={this.tohref.bind(this,this.props.orgNum)}>立刻查看</span>
          </div>
        </div>
      </div>
    )
  }
};

export default PopupByCoupon;

