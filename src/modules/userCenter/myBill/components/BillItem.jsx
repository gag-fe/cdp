import React from 'react';
import {List, Checkbox} from 'antd-mobile';
import '../css/BillItem.less';
import {createActionContainer} from 'Roof';
import myBillAction from '../../../../actions/myBill';
import {hashHistory} from 'react-router';
const defaultItem = require('../../../../img/shopLogo.jpg');
const invoiced=require('../../../../img/invoiced.png');
const Item = List.Item;
const Brief = Item.Brief;
const BillItem = React.createClass({

  billDetail(item){
    if(this.props.item.signedPdfUrl ==""  ||  this.props.item.signedPdfUrl  == null || this.props.item.signedPdfUrl  == undefined){
      hashHistory.push('/userCenter/billInfo/'+this.props.item.billId +'/'+this.props.item.shopEntityId);
    }else{
      window.location.href=this.props.item.signedPdfUrl;
    }

  },
  toInvoice(item){
    this.props.myBillAction.checkPage({shopEntityId:item.shopEntityId,tradeId:item.billId});
  },
  render(){
    var status='';
    if (this.props.item.shopImg == '' || this.props.item.shopImg == null) {
      this.props.item.shopImg = defaultItem;
    }
    if(this.props.item.invoiceStatu == '-1'){
      status = '未开发票';
    } else if (this.props.item.invoiceStatu == '0') {
      status = '申请中';
    } else if (this.props.item.invoiceStatu == '1') {
      status = '';
    } else if (this.props.item.invoiceStatu == '2') {
      status = '开票失败';
    } else if (this.props.item.invoiceStatu == '3') {
      status = '开票中';
    } else if (this.props.item.invoiceStatu == '4') {
      status = '';
    }else if (this.props.item.invoiceStatu == '5') {
      status = '发票过期';
    }

    var str='';
    if(this.props.item.goodsName){
      if(this.props.item.goodsAmount >1){
        if(this.props.item.goodsName.length>7){
          this.props.item.goodsName=this.props.item.goodsName.substr(0,7)+'..';
        }
        str=this.props.item.goodsName +'等'+this.props.item.goodsAmount+'件商品';
      }else{
        if(this.props.item.goodsName.length > 12){
          str=this.props.item.goodsName.substr(0,12)+'..';
        }else{
          str=this.props.item.goodsName;
        }

      }

    }else{
      str='总交易金额';
    }

    return (
      <div className="billItem">
      <List>
        <Item thumb={this.props.item.shopImg}  extra={status}>{this.props.item.shopEntityName}</Item>
        {this.props.item.invoiceStatu == '1' ? <img className="invoiced" src={invoiced}/> : ''}
        <Item extra={'实付款：¥'+this.props.item.payAmount}  onClick={this.billDetail.bind(this,this.props.item)} className="twoItem">{str}</Item>
        {this.props.item.canInvoiced ? <Item extra='开具发票'  onClick={this.toInvoice.bind(this,this.props.item)} className="threeItem">{this.props.item.saleTime}</Item> :  <Item extra=''   className="threeItem">{this.props.item.saleTime}</Item>}

      </List>
     </div>
    )
  }
});
export default createActionContainer({
},{
  myBillAction
})(BillItem);
