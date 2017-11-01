import  React from 'react'
import { Button , Toast} from 'antd-mobile';
import HeaderList from '../invoiceHeaderDetail/components/HeaderList';
import { createActionContainer } from 'Roof';
import invoiceAction from '../../../actions/invoice';

const AddHeader = React.createClass({

  _saveHeader(){
    let invoiceType=this.props.invoice.invoiceType;
    let custName = this.props.invoice.custName;
    let custTaxNo = this.props.invoice.custTaxNo;
    let custAdress = this.props.invoice.custAdress;
    let mobile =this.props.invoice.mobile;
    let custBank =this.props.invoice.custBank;
    let custBankAccount = this.props.invoice.custBankAccount;
    this.props.setStoreState({
      invoice:{
        invoiceTitleId:this.props.params.id,
        invoiceType:invoiceType,
        custAdress: '',
        custBank: '',
        custBankAccount: '',//开户行账号
        custName: custName,//发票抬头、发票信息
        custTaxNo:'',//识别号、税号
        mobile: '',//联系电话
      }
    });

    if (custName == undefined || custName == null || custName == '') {
      Toast.info('请输入发票抬头','1');
      return;
    }
    if (custName.indexOf('<') >= 0 || custName.indexOf('>') >=0 ) {
      Toast.info('名称有非法字符，请重新输入','1');
      return;
    }
    if(invoiceType == '000001'){

      this.props.setStoreState({
        invoice:{
          invoiceTitleId:this.props.params.id,
          invoiceType:invoiceType,
          custAdress: custAdress,
          custBank: custBank,
          custBankAccount: custBankAccount,//开户行账号
          custName: custName,//发票抬头、发票信息
          custTaxNo:custTaxNo,//识别号、税号
          mobile: mobile,//联系电话
        }
      });

    if (custTaxNo == undefined || custTaxNo == null || custTaxNo == '') {
      Toast.info('请输入纳税人识别号','1');
      return;
    }
    if(custTaxNo != undefined  &&  custTaxNo != null && custTaxNo != "" ){
      let texreg = /^([0-9a-zA-Z]{15}|[0-9a-zA-Z]{18}|[0-9a-zA-Z]{20})$/;
      if (!texreg.test(custTaxNo)) {
        Toast.info('识别号格式不正确','1');
        return;
      }
    }
    if (custAdress == undefined || custAdress == null || custAdress == '') {
      Toast.info('请输入注册地址','1');
      return;
    }
    if(custAdress != undefined && custAdress != null && custAdress != ''){
      if (custAdress.indexOf('<') >= 0 || custAdress.indexOf('>') >=0 ) {
        Toast.info('注册地址有非法字符，请重新输入','1');
        return;
      }
    }
    if (mobile === undefined || mobile === null || mobile === "") {
      Toast.info('请输入联系电话','1');
      return;
    }
    if(mobile != undefined  &&  mobile != null && mobile != '' ){
      let mobileReg=/^((0\d{2,3}-\d{7,8})|(0\d{2,3}\d{7,8})|^1\d{10})$/;
      if(!mobileReg.test(mobile)){
        Toast.info('请输入正确的联系电话','1');
        return;
      }
    }

    if (custBank === undefined || custBank === null || custBank === "") {
      Toast.info('请输入开户行','1');
      return;
    }

    if(custBank !=undefined && custBank!=null && custBank!=''){
      if (custBank.indexOf('<') >= 0 || custBank.indexOf('>') >= 0) {
        Toast.info('开户行有非法字符，请重新输入','1');
        return;
      }
    }
    if (custBankAccount === undefined || custBankAccount === null || custBankAccount === "") {
      Toast.info('请输入开户行账号','1');
      return;
    }
    if(custBankAccount != undefined  &&  custBankAccount != null && custBankAccount != ''){
      let custBankReg = /^(\d{12}|\d{15}|\d{16}|\d{17}|\d{19}\d{20})$/;
      if (!custBankReg.test(custBankAccount)) {
        Toast.info('开户行账号格式不正确','1');
        return;
      }
    }
    }
    this.props.invoiceAction.updateInvoiceData(this.props.params.id);


  },
  contextTypes: {
    router: React.PropTypes.object
  },
  render(){
    return (
      <div className="addIn" style={{'marginBottom':'5rem'}}>
        <HeaderList/>
        <Button className="gag_button" onClick={this._saveHeader}>保存</Button>
      </div>
    )
  }
});
export  default createActionContainer({
  invoice:'invoice',
},{
  invoiceAction
})(AddHeader);
