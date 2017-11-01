import React from 'react';
import {List, Checkbox,Toast} from 'antd-mobile';
import './css/unInvoiceBill.less';
import Footer from '../billInfo/components/Footer';
import {createActionContainer} from 'Roof';
import combineBillAction from '../../../actions/combineBillList';
import {hashHistory} from 'react-router';
const defaultItem = require('../../../img/shopLogo.jpg');
const Item = List.Item;
const Brief = Item.Brief;
const UnInvoiceBill = React.createClass({
  getInitialState(){
   var obj={};
    this.props.combineList.map((item, idx)=> {
      obj[item.billId] = false;
    });
    return obj;
  },
  componentWillMount(){
    document.setTitle('合并开票');
    this.props.combineBillAction.combineBillList(this.props.params.shopEntityId)
  },
  billDetail(billId){
    hashHistory.push('/userCenter/billInfo/'+billId);
  },
  clickRow(billId){
    this.setState({
      [billId]: !this.state[billId],
    });

  },
  toInvoice(){
    var str='';
    var arr=[];
    var money =0;
    this.props.combineList.map((item, index)=> {
      if (!this.state[item.billId]) {
        money += item.payAmount;
        arr.push(item.billId);
      }
    });
    if (money < 100000) {
      if (arr.length > 1) {
        for (var i = 0; i < arr.length; i++) {
          str += arr[i] + ',';
        }
        this.props.combineBillAction.goInvoice({tradeId: str, isCombinedInvoice: 'Y'});
      }
      else if (arr.length == 1) {
        this.props.combineBillAction.goInvoice({tradeId: arr[0], isCombinedInvoice: 'N'});

      } else {
        Toast.info('请选择您要开的发票账单！', 2);
      }
    } else {
      Toast.info('开票金额超出上限！', 2);
    }
  },
  render(){
    var comlist = [];
    if (this.props.combineList && this.props.combineList.length > 0) {

      this.props.combineList.map((item, idx)=> {
        var currentName = this.state[item.billId] ? 'unselect' : 'unselect selected';
        comlist.push(
          <List key={idx}>
            <div onClick={this.clickRow.bind(this,item.billId)}>
              <Item
                thumb={item.shopImg ? item.shopImg : defaultItem}>{item.shopEntityName}<Brief>{item.billDate}</Brief></Item>
              <span className={currentName}></span>
            </div>
            <Item extra={"实付款：¥" + item.payAmount} onClick={this.billDetail.bind(this,item.billId)}
                  className="billDetaillItem">{item.goodsName}等{item.goodsAmount}件商品</Item>
          </List>
        )
      })
    }
    return (
      <div className="unInvoiceBill">

        {comlist}

        <div onClick={this.toInvoice}>
          <Footer content="合并开票"/>
        </div>
      </div>
    )
  }
});
export default createActionContainer({
  combineList: 'combineList'
}, {
  combineBillAction
})(UnInvoiceBill);
