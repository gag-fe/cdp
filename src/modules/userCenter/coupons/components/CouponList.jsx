import React from 'react';
import '../css/couponList.less';
import {List} from 'antd-mobile';
import {createContainer} from 'Roof';
const Item = List.Item;
const Brief = Item.Brief;
const used = require('../../../../img/used-two.png');
const disabled = require('../../../../img/used@2x.png');
const couponUsed = require('../../../../img/coupon-right-used.png');
const CouponList = React.createClass({
  render(){
    var bgColor = '';
    var useImg = '';
    if (this.props.use) {
      bgColor = '#999999';
      useImg = <div className="usedCIMG"><img src={used}/></div>;
    } else if (this.props.expired) {
      bgColor = '#999999';
      useImg = <div className="usedCIMG"><img src={disabled}/></div>;
    } else {
      bgColor = this.props.bgcolor;
    }
    var str = <div className="couponContainer">
      <div className="coupon_left" style={{'backgroundColor': bgColor}}>
        <p style={{"color": (this.props.use || this.props.expired ) ? '#e1e1e1' : ''}}><label
          style={{"color": (this.props.use || this.props.expired ) ? '#e1e1e1' : ''}}>{(this.props.couponType == "D" || this.props.couponType == "G" )? this.props.discountPrice : this.props.discount}</label>{(this.props.couponType == "D" || this.props.couponType == "G") ? '元' : '折'}
        </p>
        <span style={{"color": (this.props.use || this.props.expired ) ? '#e1e1e1' : ''}}>{this.props.desc}</span>
      </div>
      {useImg}
      <div className="coupon_right">
        <div
          style={{"color": (this.props.use || this.props.expired ) ? '#999999' : ''}}>{this.props.shopEntityName}</div>
        <label
          style={{"color": (this.props.use || this.props.expired ) ? '#999999' : ''}}>{this.props.couponBatchName}</label>
        <span className="codename"
              style={{"color": (this.props.use || this.props.expired ) ? '#999999' : ''}}>券码：{this.props.couponNumber}</span>
        <p>有效期至{this.props.date}</p>
      </div>
      <div className="couponType"
           style={{"backgroundImage": (this.props.use || this.props.expired ) ? "url(" + couponUsed + ")" : ""}}>
        <span>{this.props.couponType == 'D' ? '代金券' : (this.props.couponType == 'Z' ? '折扣券' : '礼品券')  }</span>
      </div>
    </div>;
    if (this.props.couponUrl == '' || this.props.couponUrl == null || this.props.couponUrl == undefined)
      return (
        <div>
          {str}
        </div>
      );
    else {
      return (
        <div className="couponContainer couponImg">
          <img src={this.props.couponUrl}/>
          {useImg}
        </div>
      )

    }
  }
});
export default createContainer({

})(CouponList);
