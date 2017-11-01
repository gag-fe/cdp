import React from 'react';
import CouponList from './components/CouponList';
import {createActionContainer } from 'Roof';
import CouponAction from '../../../actions/coupon';
import '../../../utils/common.js';
import './css/index.less';
import CommonPage from '../../../components/commonPage/CommonPage';

const asdddd=require('../../../img/ad.png');

const Coupon=React.createClass({
  componentWillUnmount(){
      CouponAction.Popup.hide();
  },
  componentWillMount(){
    this.props.CouponAction.getMyCouponList();
      this.props.setStoreState({
        pageFlag:false,
      });
    _hmt.push(['_trackPageview', '/mygoo/myCoupons']);
  },
  clickDetail(id){
    this.props.CouponAction.getCouponDetail(id);
  },
  render(){
    document.setTitle('优惠卡券');
    var list=[];
     if(this.props.couponList === '' ||  this.props.couponList === undefined || this.props.couponList === null ||this.props.couponList.length == '0'){
       return(<CommonPage/>)
     }else{
       this.props.couponList.map((item,index)=>{
         list.push(<div onClick={this.clickDetail.bind(this,item.couponId)} key={index}><CouponList  id={item.couponId} discount={item.discount} desc={item.useRule} shopEntityName={item.shopEntityName} couponBatchName={item.couponBatchName}
                               couponNumber={item.couponNumber} date={item.useEndTime} couponType={item.couponType} couponUrl={item.couponUrl}  use={item.use}  expired={item.expired} discountPrice={item.discountMoney} bgcolor={item.couponColor}/> </div>) ;
       });
       return(<div className="couponBg">{list}</div>)
     }
  }
});
export  default createActionContainer({
  couponList:'couponList',
  pageFlag:'pageFlag',
},{CouponAction})(Coupon) ;
