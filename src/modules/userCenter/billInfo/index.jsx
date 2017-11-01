import React from 'react';
import NewBillInfo from './components/NewBillInfo';
import {createActionContainer} from 'Roof';
import billInfoAction from '../../../actions/billInfo';
import CouponTemplate from './components/CouponTemplate';
import ClickMore from '../../../components/clickMore/ClickMore';
import $ from 'jquery';
import './css/index.less';
import CouponFeeTemplate from './components/CouponFeeTemplate';
import {Toast, Popup} from 'antd-mobile';
const API = {
  receiveCoupon: '/couponTake/receiveCoupon.do',//领取优惠券
};

class BillInfo extends React.Component {

  constructor(props) {
    super(props);

  }


  componentWillMount() {
    this.props.billInfoAction.fetchCouponList({pageIndex: "1", shopEntityId: this.props.params.shopEntityId});
    this.props.billInfoAction.billInfoData({
      billId: this.props.params.billId,
      shopEntityId: this.props.params.shopEntityId
    });
    _hmt.push(['_trackPageview', '/mygoo/billInfo']);
    _paq.push(['setCustomVariable', 1, "publish_shop_id", this.props.params.shopEntityId, "page"]);
    _paq.push(['trackPageView', '电子凭证']);
  }

  componentDidMount() {
    $('.billInfos').animate({
      scrollTop: localStorage.getItem("scrollTop")
    }, 100);
    localStorage.removeItem("scrollTop");
  }



  render() {
    document.setTitle('凭证详情');
    //优惠券
    var billCoupons = [];
    let couponInfoList = this.props.billCouponList.couponInfo;
    if (couponInfoList && couponInfoList.length > 0) {
      couponInfoList.forEach((item, idx)=> {
        if (item.couponUrl != "" && item.couponUrl != null && item.couponUrl != undefined) {
          billCoupons.push(<CouponFeeTemplate key={idx} items={item}  couponUrl={item.couponUrl} couponType={item.couponType} shopEntityId={this.props.params.shopEntityId} billId={this.props.billInfo.billId}></CouponFeeTemplate>);

        } else {
          billCoupons.push(<CouponTemplate key={idx} discountRate={item.discount || 9.9} useRule={item.useRule}
                                           discountPrice={item.discountPrice || 0}
                                           minSalePrice={item.minimumConsumeLimit || 0}
                                           shopEntityName={item.shopEntityName} couponName={item.couponBatchName}
                                           address={item.shopEntityAddress} startTime={item.useStartTime}
                                           endTime={item.useEndTime}
                                           couponType={item.couponType} reserve5={item.couponColor || '#F5A540'}
                                           item={item} billId={this.props.billInfo.billId}
                                           action={this.props.billInfoAction} shopEntityId={this.props.params.shopEntityId}/>)
        }

      })
    }

    return (
      <div className="billInfos">
        <NewBillInfo/>
        {
          this.props.billCouponList.couponInfo.length > 0 ?
            (<div className="moreCoupon">
              <div className="tit"><span>更多优惠推荐</span></div>

              <div className="coupons">
                {billCoupons}
              </div>
              <ClickMore pageIndex={this.props.billCouponList.pageIndex} pageSize={this.props.billCouponList.pageSize}
                         total={this.props.billCouponList.total} actionFunc={this.props.billInfoAction.fetchCouponList}
                         iconFlag={this.props.moreFlag} type="couponPage"
                         shopEntityId={this.props.params.shopEntityId}/>
            </div>)
            : '' }
      </div>
    )
  }
};

export  default createActionContainer({
  billInfo: 'billInfo',
  billCouponList: 'billCouponList',
  moreFlag: 'moreFlag',
}, {
  billInfoAction,
})(BillInfo);
