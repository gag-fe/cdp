import React from 'react';
import {createContainer, createActionContainer} from 'Roof';
import {List, Button} from 'antd-mobile';
import  EmptyPage from '../../emptyPage/EmptyPage';
import  CommonPage from '../../../../components/commonPage/CommonPage';
import {hashHistory} from 'react-router';
import invoiceAction from '../../../../actions/invoice';
const Item = List.Item;
import '../css/ManageHeader.less';
const Brief = Item.Brief;
const ManageHeader = React.createClass({
  _addHeader(){
    this.props.setStoreState({
      invoice: Object.assign({}, this.props.getStoreState().invoice, {
        invoiceType: '000001',
        custAdress: "",
        custBank: "",
        custBankAccount: "",
        custName: "",
        custTaxNo: "",
        mobile: "",
      })
    });
    hashHistory.push("/userCenter/addInvoiceHeader/0");
    document.setTitle('添加抬头');
  },
  _detail(id){
    this.props.invoiceAction.invoiceDetailData(id);
  },
  componentWillMount(){
    this.props.invoiceAction.invoiceTitleData();
    this.props.setStoreState({
      pageFlag:false,
    });
  },
  componentWillReceiveProps(nextProps){
    if (this.props.invoiceTitleListP != nextProps.invoiceTitleListP) {
      this.setState({
        invoiceTitleListP: nextProps.invoiceTitleListP
      });
    }
    if (this.props.invoiceTitleListZ != nextProps.invoiceTitleListZ) {
      this.setState({
        invoiceTitleListZ: nextProps.invoiceTitleListZ
      });
    }
  },
  render(){
    var list_title_p = '';
    var list_title_z = '';
    var list_p = [];
    var list_z = [];
    var inTitListP = this.props.invoiceTitleListP;
    var inTitListZ = this.props.invoiceTitleListZ;

    if (inTitListP != null && inTitListP != '' && inTitListP.length > 0) {
      inTitListP.forEach((item, index)=> {
        list_p.push(
          <Item key={index} arrow="horizontal" onClick={this._detail.bind(this, item.invoiceId)}>
            {item.invoiceTitle}</Item>
        )
      })
    }

    if (inTitListZ != null && inTitListZ != '' && inTitListZ.length > 0) {
      inTitListZ.forEach((item_z, index_z)=> {
        list_z.push(
          <Item key={index_z} arrow="horizontal" onClick={this._detail.bind(this, item_z.invoiceId)}>
            {item_z.invoiceTitle}</Item>
        )
      })
    }
    if (list_p != null && list_p != '' && list_p.length > 0) {
      list_title_p = <div className="invoiceT"><span>普通发票</span></div>;
    }
    if (list_z != null && list_z != '' && list_z.length > 0) {
      list_title_z = <div className="invoiceT"><span>专用发票</span></div>;
    }
    if ((inTitListP == null || inTitListP == '') && (inTitListZ == null || inTitListZ == '')) {
      list_p.push(<CommonPage key={1}/>);
    }
    return (

      <div className="mInvoice">
        <List>
          {list_title_p}
          {list_p}
          {list_title_z}
          {list_z}
        </List>

        <Button onClick={this._addHeader}>添加新抬头</Button>
      </div>
    )
  }
});
export  default createActionContainer({
  invoiceTitleListP: 'invoiceTitleListP',
  invoiceTitleListZ: 'invoiceTitleListZ',
  pageFlag:'pageFlag'
}, {
  invoiceAction
})(ManageHeader);


