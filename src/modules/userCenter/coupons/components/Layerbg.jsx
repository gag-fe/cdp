import React from 'react';
import '../css/layerbg.less';
const popImg = require('../../../../img/pupop.png');
const deLogo = require('../../../../img/dLogo.png');
const triLeft = require('../../../../img/tri-left.png');

const Layerbg = React.createClass({
  getInitialState(){
    return{
      showFlag:false,
    }
  },
  showCode(){
     this.setState({
       showFlag:!this.state.showFlag,
     })
  },
  render(){

    return (
      <div className="bgLayer">
        <img src={this.props.item.shopEntityLog ? this.props.item.shopEntityLog :  deLogo} className="contentOne"/>
        <div className="contentTwo">
          {this.props.item.shopEntityName}-- {this.props.item.couponBatchName}
        </div>
        <h3>{(this.props.item.couponType == "D" ||this.props.item.couponType == "G" )? this.props.item.discountMoney + '元' : this.props.item.discount + '折'} {this.props.item.useRule ? (
          <img className="triImg" src={triLeft}/>) : ''}{this.props.item.useRule ? (
          <span className="triBg">{this.props.item.useRule}</span>) : ''}</h3>
        <div className="three">券码：{this.props.item.couponNumber} <span>有效期至：{this.props.item.useEndTime}</span></div>

        <ul>
          <li>
            地址：{this.props.item.shopEntityAddress}
          </li>
        </ul>

        <div className="barCode" style={{"display":this.state.showFlag?'none':'block'}}>
          <img className="tm" src={this.props.item.barCodeUrl}/>
          <span className="number">{this.props.item.couponNumber}</span>
          <span className="barButton" onClick={this.showCode}>查看二维码</span>
        </div>
        <div className="barCode" style={{"display":this.state.showFlag?'block':'none'}}>
          <img className="ewm" src={this.props.item.qrCodeUrl}/>
          <span className="number" style={{'marginTop': '-25px'}}>{this.props.item.couponNumber}</span>
          <span className="barButton" onClick={this.showCode}>查看条形码</span>
        </div>
        <div className="last">
          <h3>{this.props.item.couponContent ?'使用说明':''}</h3>
          <p>
            {this.props.item.couponContent} </p>
        </div>
        <div className="last">
          <h3>{this.props.item.useRule ?'使用条件':''}</h3>
          <p>
            {this.props.item.useRule} </p>
        </div>

      </div>
    )
  }
});
export default Layerbg;

