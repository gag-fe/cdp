import { createContainer, createRootContainer } from 'Roof';
import React from 'react';

import '../css/shareViewDetail.less';

const ShareViewDetail = React.createClass({
  render() {
    return (
      <div className="ShareViewDetail">
        <p>
          <span className="shopName">{this.props.shareInfo.shopEntityName}</span>
          <span className="sign" style={{display:this.props.shareInfo.isHasDiscountCoupon?'inline-block':'none'}}>折</span>
          <span className="sign ticket" style={{display:this.props.shareInfo.isHasMoneyCoupon?'inline-block':'none'}}>券</span>
        </p>
        <p>
          <span>件单价:￥{this.props.shareInfo.averageGoodsPrice}</span>
          {/*<span>回头指数:{this.props.shareInfo.reconsumePercent}%</span>*/}
          {/*<span>￥{this.props.shareInfo.averageConsume}/人</span>*/}
        </p>
      </div>
    );
  }
});

export default createContainer({
})(ShareViewDetail);
