import React from 'react';
import {Toast, Card} from 'antd-mobile';
import '../css/newbillInfo.less';
import {createActionContainer} from 'Roof';
import Footer from './Footer';
import {hashHistory} from 'react-router';
import billInfoAction from '../../../../actions/billInfo';

const inDetail = require('../../../../img/inDetail.png');
const hisImg = require("../../../../img/his-right@2x.png");
const NewBillInfo = React.createClass({

  componentWillMount(){
    Toast.hide();
  },
  detailInfo(billId){
    hashHistory.push('/userCenter/billDetailInfo/'+billId)
  },

  render(){
    document.setTitle('凭证详情');
    var goodsName = '';
    //商品明细
    var listArr = [];
    var goodsDetailsList = this.props.billInfo.goodsDetailsList;
    if (goodsDetailsList != undefined && goodsDetailsList != null && goodsDetailsList != '' && goodsDetailsList.length > 0) {
      for (var i = 0; i < goodsDetailsList.length; i++) {
        goodsName = goodsDetailsList[0].name;
        listArr.push(
          <Card.Footer key={i} content={goodsDetailsList[i].name}
                       extra={<div className="goodsList">
                         <span>{goodsDetailsList[i].totalNum ? 'x'+goodsDetailsList[i].totalNum: ''}</span><span>{goodsDetailsList[i].price ?'￥'+goodsDetailsList[i].price : ''}</span>
                       </div>}/>
        )
      }
    }

    var goodsDetailInfo = '';
    if (listArr != '' && listArr != null) {
      goodsDetailInfo = <div className="group">
        <Card.Body>
          <Card.Header
            title="商品明细"
            extra={<span>{this.props.billInfo.goodsTradingCode ? '交易编码' : ''}<span className="code">{this.props.billInfo.goodsTradingCode}</span></span>}
          />
        </Card.Body>
        {listArr}
      </div>;
    }

    var payChannel=[];
    if(this.props.billInfo.payChannelName){
      this.props.billInfo.payChannelName.map((item,idx)=> {
        payChannel.push(<div key={idx}>{item.p}<br/></div>);
      });

    }

    return (
      <div className="newBillInfo">
        <div className="title">
          {this.props.billInfo.certificateId ? (<div className="titleName">{'凭证号：'+this.props.billInfo.certificateId}</div>):''}
          {this.props.billInfo.certificateId ? <div onClick={this.detailInfo.bind(this,this.props.billInfo.billId)} className="seeInfoBtn">
            查看消费凭证详情
          </div> : ''}
          {this.props.billInfo.shopLogoURL ?<img src={this.props.billInfo.shopLogoURL}/> :''}
        </div>
        <div className="detailInfo">

          <div className="row">
            <Card>
              <Card.Header
                title="应付金额"
                extra={<span>{this.props.billInfo.paidAmount ? '¥'+this.props.billInfo.paidAmount:''}</span>}
              />
              <div className="cardDiv">
                {this.props.billInfo.goodsName ? <Card.Footer content="商品" extra={<div>{this.props.billInfo.goodsName}{goodsDetailsList.length>1 ? '等': ''} </div>}/> : ''}

                <Card.Footer content="商户名称" extra={<div>{this.props.billInfo.shopEntityName}</div>}/>
                {this.props.billInfo.discountAmount > 0 ?
                  <Card.Footer content="优惠/折扣" extra={<div>共优惠 ¥{this.props.billInfo.discountAmount}</div>}/> : ''}
                {this.props.billInfo.billTradeTime ?
                <Card.Footer content="统一收银交易时间" extra={<div>{this.props.billInfo.billTradeTime}</div>}/> :''}
                {this.props.billInfo.gwNum ?<Card.Footer content="统一收银流水号" extra={<div>{this.props.billInfo.gwNum}</div>}/> : ''}

                {payChannel.length>0 ? <Card.Footer content="支付方式" extra={<div>{payChannel}</div>}/> : <Card.Footer content="支付方式" extra={<div>其它</div>}/> }

              </div>

            </Card>
          </div>
          {goodsDetailInfo}
        </div>



      </div>
    )
  }

});
export  default  createActionContainer({
  billInfo: 'billInfo',
}, {
  billInfoAction
})(NewBillInfo);
