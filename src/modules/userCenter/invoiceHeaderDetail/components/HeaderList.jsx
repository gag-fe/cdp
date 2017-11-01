import React from 'react';
import {List, InputItem, Checkbox, Radio, Button, Toast} from 'antd-mobile';
import '../css/HeaderList.less';
import {createActionContainer} from 'Roof'
import invoiceAction from '../../../../actions/invoice';
const CheckboxItem = Checkbox.CheckboxItem;
const RadioItem = Radio.RadioItem;
const HeaderList = React.createClass({
  getDefaultProps(){
    return {
      type: true,
      flagType: true,
    }
  },
  getInitialState(){
    return {
      check_A: (this.props.invoice.invoiceType == '000000' ? true : false),
      check_B: (this.props.invoice.invoiceType == '000001' ? true : false),
    }
  },
  componentWillMount(){
    this.props.setStoreState({
      dataList: [],
    })
  },
  //监听inputName 变化
  _inputChangeName(name, event){
    let obj = {};
    obj[name] = event;
    var myReg = /^[\u4e00-\u9fa5]+$/;


    this.props.setStoreState({
      invoice: Object.assign({}, this.props.getStoreState().invoice, {
        custName: obj[name],
      })
    });

    if (myReg.test(obj[name])) {
      // 查询企业信息
      if (obj[name].length > 1 && this.props.invoice.custName !== obj[name]) {
        this.props.invoiceAction.searchAssociate(obj[name]);
      }
    }

  },
  //监听input变化
  _inputChange(name, event){
    let obj = {};
    obj[name] = event;
    this.props.setStoreState({
      invoice: Object.assign({}, this.props.getStoreState().invoice, obj)
    });
  },
  _onChangeType(value) {
    this.props.setStoreState({
      invoice: Object.assign({}, this.props.getStoreState().invoice, {
        invoiceType: value,
      })
    });

    value == '000000' ? (//选择普票
      this.setState({
        check_A: true,
        check_B: false,
      })
    ) : (
      this.setState({
        check_B: true,
        check_A: false,
      })
    );

  },
  getCon(data){
    this.props.setStoreState({
      invoice: Object.assign({}, this.props.getStoreState().invoice, {
        custName: data.custName,
        custTaxNo: data.custTaxNo,//识别号、税号
        custAdress: data.custAdress,//付款方地址、注册地址
        mobile: data.mobile,//联系电话
        custBank: data.custBank,//付款方银行、开户行
        custBankAccount: data.custBankAccount,//开户行账号
      })
    });
    this.props.setStoreState({
      dataFlag: false,
    });
    console.log(this.props.invoice);
  },
  hide(){
    this.props.setStoreState({
      dataFlag: false,
    })
  },
  show(){
    this.props.setStoreState({
      dataFlag: true,
    })
  },
  render(){

    var list = [];
    if (this.props.dataList) {
      this.props.dataList.map((item, idx)=> {
         if(item.custName !=''){
           list.push(<div className='item' key={idx} onClick={this.getCon.bind(this, item)}><span>{item.custName}</span>
           </div>)
         }

      })
    }
    return (<div className="headerList">
      <List>
        <div style={{display: this.props.flagType ? 'block' : 'none'}}>
          <InputItem disabled="true"
          >发票类型<span style={{color: 'red'}}>*</span></InputItem>
          <CheckboxItem key={1} checked={this.state.check_A ? true : false} onChange={() => {
            this._onChangeType('000000')
          } }>
            增值税普通发票
          </CheckboxItem>
          <CheckboxItem key={2} checked={this.state.check_B ? true : false} onChange={() => {
            this._onChangeType('000001')
          } }>
            增值税专用发票
          </CheckboxItem>
        </div>
        <InputItem
          value={this.props.invoice.custName}
          name="custName"
          editable={this.props.type}
          placeholder="营业执照上的法定名称"
          onChange={this._inputChangeName.bind(this, 'custName')}
        >企业名称<span style={{color: 'red'}}>*</span></InputItem>
        <div className="append" style={{'display': this.props.dataFlag ? 'block' : 'none'}}>
          {list}
        </div>
        <div style={{display: this.state.check_B ? 'block' : 'none'}}>
          <InputItem
            value={this.props.invoice.custTaxNo}
            name="custTaxNo"
            editable={this.props.type}
            placeholder="纳税人识别号"
            onChange={this._inputChange.bind(this, 'custTaxNo')}
            onFocus={this.hide}
          >识别号<span style={{color: 'red'}}>*</span></InputItem>
          <InputItem
            value={this.props.invoice.custAdress}
            name="custAdress"
            editable={this.props.type}
            placeholder="公司注册地址"
            onChange={this._inputChange.bind(this, 'custAdress')}
          >注册地址<span style={{color: 'red'}}>*</span></InputItem>
          <InputItem
            value={this.props.invoice.mobile}
            name="mobile"
            editable={this.props.type}
            placeholder="区号-总机"
            onChange={this._inputChange.bind(this, 'mobile')}
          >联系电话<span style={{color: 'red'}}>*</span></InputItem>
          <InputItem
            value={this.props.invoice.custBank}
            name="custBank"
            editable={this.props.type}
            placeholder="对外付款的开户行"
            onChange={this._inputChange.bind(this, 'custBank')}
          >开户行<span style={{color: 'red'}}>*</span></InputItem>
          <InputItem
            value={this.props.invoice.custBankAccount}
            name="custBankAccount"
            editable={this.props.type}
            placeholder="对外付款的银行账号"
            onChange={this._inputChange.bind(this, 'custBankAccount')}
          >开户账号<span style={{color: 'red'}}>*</span></InputItem>
        </div>
      </List>
    </div>)
  }
});
export  default createActionContainer({
  invoice: 'invoice',
  dataList: 'dataList',
  dataFlag: 'dataFlag'
}, {
  invoiceAction
})(HeaderList);
