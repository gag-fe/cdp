import React from 'react';
import {createContainer} from  'Roof';
import '../css/header.less';
import '../css/user.less';

const img = require("../../../../img/default.png");
const label = require("../../../../img/label.png");
const Header = React.createClass({

  _myBill(){
    this.context.router.push("/userCenter/myBill");
    localStorage.setItem("unFlag", "1");
    document.setTitle('历史账单');
  },
  //优惠券
  _coupon(){
    this.context.router.push("/userCenter/coupons");
    document.setTitle('优惠卡券');
  },
  _personal(){
    this.context.router.push("/userCenter/personal");
    document.setTitle('会员编码');
  },
  contextTypes: {
    router: React.PropTypes.object
  },
  render(){
    if (this.props.userInfo.headImg == undefined || this.props.userInfo.headImg == null || this.props.userInfo.headImg == '') {
      this.props.userInfo.headImg = img;
    }
    if (this.props.userInfo.billAmount == undefined || this.props.userInfo.billAmount == null || this.props.userInfo.billAmount == '') {
      this.props.userInfo.billAmount = 0;
    }
    return (
      <div className="userCenter">
        <div className="header">

            <div className="defaultImg"><img src={this.props.userInfo.headImg}/></div>
            <div className="userName">{this.props.userInfo.nickName}</div>
            <div className="personImg" onClick={this._personal}><img src={label}/></div>

        </div>
      </div>
    )
  }
});
export default createContainer({
  userInfo: 'userInfo'
})(Header);
