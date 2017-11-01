import React from 'react';
import {Tabs, WhiteSpace} from 'antd-mobile';
import {createActionContainer} from 'Roof';
import  ManageHeader from './components/ManageHeader';
import  HistoryInvoice from './components/HistoryInvoice';
import $ from 'jquery';
import  '../../../utils/index';
const TabPane = Tabs.TabPane;
import invoiceAction from '../../../actions/invoice';
const InvoiceHeader = React.createClass({
  componentWillMount(){
    document.setTitle('管理抬头');
  },
  callback(key) {
    if (key == '1') {
      document.setTitle('管理抬头');
      this.props.setStoreState({
        invoiceFlag: true,
      });
    } else {
      document.setTitle('开票历史');
      this.props.setStoreState({
        invoiceFlag: false,
      });
    }
  },
  render(){
    return (<div className="gagTabs">
      <WhiteSpace />
      <Tabs defaultActiveKey={this.props.invoiceFlag ? '1' : '2'} animated={false} onChange={this.callback}>
        <TabPane tab="管理抬头" key="1">
          <div>
            <ManageHeader></ManageHeader>
          </div>
        </TabPane>
        <TabPane tab="开票历史" key="2">
          <div >
            <HistoryInvoice></HistoryInvoice>
          </div>
        </TabPane>
      </Tabs>
      <WhiteSpace />
    </div>)
  }
});
export  default createActionContainer({
  invoiceFlag: 'invoiceFlag',
  invoiceTitleList: 'invoiceTitleList',
}, {
  invoiceAction
})(InvoiceHeader);
