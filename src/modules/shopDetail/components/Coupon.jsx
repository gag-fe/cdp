import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import { Accordion } from 'antd-mobile';

import '../css/coupon.less';

const Coupon = React.createClass({
  _onReceive(){
    alert('领取成功');
  },

  render() {
    let header=<div><span className="tag">折</span>优惠活动</div>,
        time='2016.10.30';
    return (
      <div className="couponContainer">
        <Accordion>
          <Accordion.Panel header={header}>
            <p>当日消费满199元即可享受九五折优惠</p>
            <div className="coupon">
              <div className="jag jag-top"></div>

              <div className="describe">
                <p>¥<span>{50}</span></p>
                <p>实付满{199}可用</p>
                <p>有效至{time}</p>
              </div>
              <div onClick={this._onReceive}>立即领取</div>
              <div className="jag jag-bottom"></div>
            </div>
          </Accordion.Panel>
        </Accordion>
      </div>
    )
  }
});

export default createContainer({
})(Coupon);
