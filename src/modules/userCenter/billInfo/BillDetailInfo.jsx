import React from 'react';
import './css/billDetailInfo.less';
import {Card} from 'antd-mobile';
import {createActionContainer} from 'Roof';
import {hashHistory} from 'react-router';
import billInfoAction from '../../../actions/billInfo';
const tempImg = require('../../../img/shfw@2x.png');
const BillDetailInfo = React.createClass({
  componentWillMount(){
    this.props.billInfoAction.billDetailData(this.props.params.billId);
    _hmt.push(['_trackPageview', '/mygoo/billDetailInfo']);
  },
  print(){
    hashHistory.push('/userCenter/print');
  },
  sendEmail(id){
    hashHistory.push('/userCenter/send/' + id);
  },
  render(){
    document.setTitle('凭证详单');
    var goodsList = [];
    if (this.props.billDetailData.memo != undefined && this.props.billDetailData.memo.goodsDetailsList.length > 0) {
      this.props.billDetailData.memo.goodsDetailsList.map((item, index)=> {
        goodsList.push(<Card.Footer key={index} content={item.name}
                                    extra={<div className="goodsList">
                                      <span>{item.totalNum ? 'x'+item.totalNum : ''}</span><span></span><span>{item.price ? '￥'+item.price: ''}</span>
                                    </div>}/>);
      });
    }
    var payChannelList = [];
    if (this.props.billDetailData.receipt != undefined && this.props.billDetailData.receipt.payChannelName.length > 0) {
      this.props.billDetailData.receipt.payChannelName.map((item, idx)=> {
        payChannelList.push(<div key={idx}>{item.p}<span style={{"padding-left": '10px'}}>{item.a ? item.a+'元': ''}</span><br/></div>);
      });

    }
    return (
      <div className="billDetailInfo">
        <div className="billTitle">
          <p>凭证号-{this.props.billDetailData.certificateId}</p>
          <h2>{(this.props.billDetailData.shopEntityName!=undefined&&this.props.billDetailData.shopEntityName) ?this.props.billDetailData.shopEntityName : ''}</h2>
          <div>{(this.props.billDetailData.shopName!=undefined && this.props.billDetailData.shopName) ? this.props.billDetailData.shopName :''}</div>
        </div>
        {(this.props.billDetailData.receipt && Object.keys(this.props.billDetailData.receipt).length>0 )  ?
          <div className="row_one">

            <Card>
              {/*<Card.Header*/}
                {/*title="实付金额"*/}
                {/*extra={<span>{this.props.billDetailData.receipt.paidAmount ? '¥'+this.props.billDetailData.receipt.paidAmount : ''}</span>}*/}
              {/*/>*/}
              <div className="cardDiv">
                {(this.props.billDetailData.receipt.amountPayable) ?
                  <Card.Footer content="应付金额"
                               extra={<div>¥{this.props.billDetailData.receipt.amountPayable}</div>}/> : ''}
                {(this.props.billDetailData.receipt.discountAmount&& this.props.billDetailData.receipt.discountAmount > 0)  ?
                  <Card.Footer content="优惠/折扣"
                               extra={<div>¥{this.props.billDetailData.receipt.discountAmount}</div>}/> : ''}
                {this.props.billDetailData.receipt.payTime ?
                  <Card.Footer content="统一收银交易时间" extra={<div>{this.props.billDetailData.receipt.payTime}</div>}/> : ''}
                {this.props.billDetailData.receipt.terminalNum ?
                  <Card.Footer content="统一收银终端号"
                               extra={<div>{this.props.billDetailData.receipt.terminalNum}</div>}/> : ''}
                {this.props.billDetailData.receipt.casherId ?
                  <Card.Footer content="收银员" extra={<div>{this.props.billDetailData.receipt.casherId}</div>}/> : ''}
                {payChannelList.length>0 ?
                  <Card.Footer content="交易方式" extra={<div>{payChannelList}</div>}/> : <Card.Footer content="交易方式" extra={<div>其它</div>}/>}
              </div>
            </Card>
            <div className="last">
              {this.props.billDetailData.receipt.serialNumberBarCode ? <img src={this.props.billDetailData.receipt.serialNumberBarCode} className="codeBar"/> :''}

              {this.props.billDetailData.receipt.serialNumber ?
                <div className="code">
                  统一收银流水号<span>{this.props.billDetailData.receipt.serialNumber} </span>
                </div>: ''}

              {
                this.props.billDetailData.receipt.remarks ?
                  <p className="text">
                    {
                      this.props.billDetailData.receipt.remarks}
                  </p> : ''}
            </div>

          </div>
          : ''}
        {(this.props.billDetailData.payment && Object.keys(this.props.billDetailData.payment).length>0 )  ?
          <div className="row_two">
            <Card>
              <div className="cardDiv">
                {this.props.billDetailData.payment.terminalNo ?
                  <Card.Footer content="终端机号" extra={<div>{this.props.billDetailData.payment.terminalNo}</div>}/> : ''}
                {this.props.billDetailData.payment.casherId ?
                  <Card.Footer content="收银员号" extra={<div>{this.props.billDetailData.payment.casherId}</div>}/> : ''}
                {this.props.billDetailData.payment.transactionType ?
                  <Card.Footer content="交易类型"
                               extra={<div>{this.props.billDetailData.payment.transactionType}</div>}/> : ''}
                {this.props.billDetailData.payment.merchantNo ?
                  <Card.Footer content="收单行商户号"
                               extra={<div>{this.props.billDetailData.payment.merchantNo}</div>}/> : ''}
                {this.props.billDetailData.payment.cardType ?
                  <Card.Footer content="银行卡类别" extra={<div>{this.props.billDetailData.payment.cardType}</div>}/> : ''}
                {this.props.billDetailData.payment.cardNo ?
                  <Card.Footer content="银行卡号" extra={<div>{this.props.billDetailData.payment.cardNo}</div>}/> : ''}
                {this.props.billDetailData.payment.paidAmount ?
                  <Card.Footer content="支付金额" extra={<div>¥{this.props.billDetailData.payment.paidAmount}</div>}/> : ''}
                {this.props.billDetailData.payment.payTime ?
                  <Card.Footer content="统一收银交易时间" extra={<div>{this.props.billDetailData.payment.payTime}</div>}/> : ''}
                {this.props.billDetailData.payment.batchNumber ?
                  <Card.Footer content="批次号" extra={<div>{this.props.billDetailData.payment.batchNumber}</div>}/> : ''}
                {this.props.billDetailData.payment.serialNumber ?
                  <Card.Footer content="流水号" extra={<div>{this.props.billDetailData.payment.serialNumber}</div>}/> : ''}
                {this.props.billDetailData.payment.referenceNumber ?
                  <Card.Footer content="参考号"
                               extra={<div>{this.props.billDetailData.payment.referenceNumber}</div>}/> : ''}
                {this.props.billDetailData.payment.authorizationCode ?
                  <Card.Footer content="授权码"
                               extra={<div>{this.props.billDetailData.payment.authorizationCode}</div>}/> : ''}
                {this.props.billDetailData.payment.gwNum ?
                  <Card.Footer content="第三方支付交易号" extra={<div>{this.props.billDetailData.payment.gwNum}</div>}/> : ''}

              </div>
            </Card>
            <div className="last">
              {this.props.billDetailData.payment.transactionNumberBarCode ? <img src={this.props.billDetailData.payment.transactionNumberBarCode} className="codeBar"/>:''}

              {this.props.billDetailData.payment.transactionNumber ?
              <div className="code">
                交易单号<span>{this.props.billDetailData.payment.transactionNumber}</span>
              </div> : ''}
            </div>

          </div>
          : ''}
        { (this.props.billDetailData.memo && Object.keys(this.props.billDetailData.memo ).length>0) ?
          <div className="row_thr">
            <Card>
              <Card.Header
                title={(this.props.billDetailData.memo.discountAmount && this.props.billDetailData.memo.discountAmount>0) ? '优惠/折扣：¥'+this.props.billDetailData.memo.discountAmount: ''}
                extra={<span>{this.props.billDetailData.memo.totalFee? '应收金额：¥'+ this.props.billDetailData.memo.totalFee:''}</span>}
              />
              <div className="cardDiv" style={{paddingTop: '5px'}}>
                {this.props.billDetailData.memo.shopId ?
                  <Card.Footer content="店铺号" extra={<div>{this.props.billDetailData.memo.shopEntityId}</div>}/> : ''}
                {this.props.billDetailData.memo.shopTerminalNum ?
                <Card.Footer content="商家收银终端号" extra={<div>{this.props.billDetailData.memo.shopTerminalNum}</div>}/> :''}
                {this.props.billDetailData.memo.shopCasherId ?
                <Card.Footer content="商家收银员" extra={<div>{this.props.billDetailData.memo.shopCasherId}</div>}/> :''}
                {this.props.billDetailData.memo.deskNo ?
                  <Card.Footer content="桌号" extra={<div>{this.props.billDetailData.memo.deskNo}</div>}/> : ''}
                {this.props.billDetailData.memo.diningNumber ?
                  <Card.Footer content="就餐人数" extra={<div>{this.props.billDetailData.memo.diningNumber}</div>}/> : ''}
                {this.props.billDetailData.memo.tradeTime ?
                  <Card.Footer content="销售时间" extra={<div>{this.props.billDetailData.memo.tradeTime}</div>}/> : ''}
              </div>
              <div className="cardFooter">
                {goodsList}
              </div>
            </Card>
            <div className="last">
              {this.props.billDetailData.memo.memoNumBarCode ?
                <img src={this.props.billDetailData.memo.memoNumBarCode} className="codeBar"/>:''}

              {this.props.billDetailData.memo.memoNum ?
              <div className="code">
                水单流水号<span>{this.props.billDetailData.memo.memoNum} </span>
              </div> :''}
              <p className="text">
                <span>{this.props.billDetailData.memo.remarks}</span>

                {this.props.billDetailData.memo.shopAddress ? '商家地址：' + this.props.billDetailData.memo.shopAddress : ''}<br/>
                {this.props.billDetailData.memo.telephone ? '商家电话：' + this.props.billDetailData.memo.telephone : ''}
                <br/>
              </p>
            </div>
          </div>
          : ''}
        <div className="footer">
          <span onClick={this.print}>打印说明</span>
          <span onClick={this.sendEmail.bind(this, this.props.billDetailData.billId)}>发送至邮箱</span>
        </div>
      </div>
    )
  }
});
export default createActionContainer({
  billDetailData: 'billDetailData',
}, {
  billInfoAction,
})(BillDetailInfo)
