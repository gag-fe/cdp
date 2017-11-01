import React from 'react';
import '../css/couponTemplate.less';
import Utils from '../../../../utils/index';
import {Toast,Popup} from 'antd-mobile';
import PopupByCoupon from './PopupByCoupon';
import PopupByError from './PopupByError';
const ajax = Utils.ajax;
import Cookies from 'js-cookie';
import {createContainer} from 'Roof';
const API={
  receiveCoupon:'/couponTake/receiveCoupon.do',//领取优惠券
};

class CouponTemplate extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notReceive: this.props.notReceive,
    }
  }

  receiveCoupon = (item) => {
    ajax({
      url: window.COUPON_URL+ API.receiveCoupon,
      data: {
        takeSource: '03',
        couponChannel: '08',
        couponBatchId: item.couponId,
        openid: Cookies.get('openid'),
        riverDiversionShopEntityId: this.props.shopEntityId,
        riverDiversionShopEntityName: item.shopEntityName,
        billId: this.props.billId,
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        if(resp.data.resultCode == '0'){
          Popup.show(<div id="receiveCoupon" style={{'position':'relative','height':'340px'}}><PopupByCoupon orgNum={resp.data.orgNum} item={item} code="0" action={this.props.action}></PopupByCoupon></div>);
          setTimeout(function(){
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.minHeight = '340px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = '305px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.left = '35px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.top = '80px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.borderRadius = '8px';
          }, 50);
          this.setState({
            notReceive: 1
          })
        }else if(resp.data.resultCode == '-1'){
          Popup.show(<div id="receiveCoupon" style={{'position':'relative','height':'240px'}}><PopupByError orgNum={resp.data.orgNum} item={item} code="-1"></PopupByError></div>);
          setTimeout(function(){
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.minHeight = '240px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = '305px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.left = '35px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.top = '100px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.borderRadius = '8px';
          }, 50);
          this.setState({
            notReceive: 0
          })
        }else if(resp.data.resultCode == '2'){
          Popup.show(<div id="receiveCoupon" style={{'position':'relative','height':'240px'}}><PopupByError orgNum={resp.data.orgNum} item={item} code="2"></PopupByError></div>);
          setTimeout(function(){
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.minHeight = '240px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = '305px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.left = '35px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.top = '100px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.borderRadius = '8px';
          }, 50);
          this.setState({
            notReceive: 2
          })
        }else if(resp.data.resultCode == '3'){
          Popup.show(<div id="receiveError" style={{'position':'relative','minHeight':'240px'}}><PopupByError orgNum={resp.data.orgNum} item={item} code="3"></PopupByError></div>);
          setTimeout(function(){
            document.getElementById("receiveError").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.minHeight = '240px';
            document.getElementById("receiveError").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = '305px';
            document.getElementById("receiveError").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.left = '35px';
            document.getElementById("receiveError").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.top = '100px';
            document.getElementById("receiveError").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.borderRadius = '8px';
          }, 50);
          this.setState({
            notReceive: 1
          })
        }else if(resp.data.resultCode == '4'){
          Popup.show(<div id="receiveCoupon" style={{'position':'relative','height':'240px'}}><PopupByError orgNum={resp.data.orgNum} item={item} code="4" action={this.props.action}></PopupByError></div>);
          setTimeout(function(){
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.minHeight = '240px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.width = '305px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.left = '35px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.top = '100px';
            document.getElementById("receiveCoupon").parentNode.parentNode.parentNode.parentNode.childNodes[0].style.borderRadius = '8px';
          }, 50);
          this.setState({
            notReceive: 2
          })
        }

      }
    })
  };

  render() {
    let props = this.props;
    let p = <p className="discountRate"><span>{props.discountRate}</span>折</p>;
    let couponType = '折扣券';
    if (props.couponType == 'D') {
      p = <p className="discountRate"><span>{props.discountPrice}</span>元</p>;
      couponType = '代金券';
    } else if (props.couponType == 'G') {
      p = <p className="discountRate"><span>{props.discountPrice}</span>元</p>;
      couponType = '礼品券';
    }
    return (
      <div className="couponTemplate">
        <div style={{backgroundColor: props.reserve5}}>
          {p}
          <p>{props.useRule}</p>
        </div>
        <span className="type">{couponType}</span>
        <p className="name">{props.shopEntityName}</p>
        <p className="couponName">{props.couponName}</p>
        <p className="address">{props.address}</p>
        <p className="time">{props.startTime+'~'+props.endTime}
          {this.state.notReceive =='0' ? <span style={{borderColor: props.reserve5, color: props.reserve5}}
                                         onClick={this.receiveCoupon.bind(this, this.props.item)}>立即领取</span> :
            (this.state.notReceive =='2' ? <span style={{borderColor: '#bbbbbb', color: '#bbbbbb'}}>已结束</span>:<span style={{borderColor: '#bbbbbb', color: '#bbbbbb'}}>已领取</span>)}

        </p>
      </div>
    )
  }


}
;


export default createContainer({
  notReceive:'notReceive'
})(CouponTemplate);
