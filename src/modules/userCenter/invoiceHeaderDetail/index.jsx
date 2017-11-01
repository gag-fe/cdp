import React from 'react';
import  HeaderList from './components/HeaderList';
import {Button,Toast} from 'antd-mobile';
import './css/index.less';
import ShareRemind from '../../../components/shareRemind/ShareRemind';
import {createActionContainer} from 'Roof';
import invoiceAction from '../../../actions/invoice';

const InvoiceHeaderDetail=React.createClass({
  getInitialState(){
    return {
      invoice:[]
    }
  },
  _shareHeader(){
    document.setTitle('分享');
    this.props.setStoreState({
      shareRemind:!this.props.getStoreState().shareRemind
    })
  },
  //编辑
  _editHeader(){
    this.context.router.push("/userCenter/addInvoiceHeader/"+this.props.params.id);
    document.setTitle('编辑抬头');
  },
  //删除
  _delHeader(){
    this.props.invoiceAction.delInvoiceData(this.props.params.id);
  },
  contextTypes: {
    router: React.PropTypes.object
  },
  componentWillMount(){
    document.setTitle('抬头详情');
  },
  componentWillReceiveProps(nextProps){
    if(this.props.invoice != nextProps.invoice) {
      this.setState({
        invoice: nextProps.invoice
      });
    }
  },
  render(){
    return (
      <div className="headerDetail">
        <HeaderList flagType={false} type={false} {...this.state.invoice}></HeaderList>
        <div className="button_group">
          {/*<Button type="warning" inline onClick={this._shareHeader}>分享</Button>*/}
          <Button type="warning" inline onClick={this._editHeader}>编辑</Button>
          <Button inline onClick={this._delHeader}>删除</Button>
        </div>
        <div className="erweimaDiv">
          <span>让收银员扫此二维码，快速获得开票信息</span>
         <img src={window.API_URL+'/invoice/getInvoiceTitleQRcode.do?invoiceTitleId='+this.props.params.id}/>
        </div>
        <ShareRemind/>
      </div>
    )
  }
});
export  default createActionContainer({
  invoice:'invoice'
},{
  invoiceAction
})(InvoiceHeaderDetail);
