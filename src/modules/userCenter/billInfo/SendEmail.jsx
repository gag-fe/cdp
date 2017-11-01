import React from 'react';
import {createActionContainer} from 'Roof';
import Footer from './components/Footer';
import './css/sendEmail.less';
import SendEmailAction from '../../../actions/sendEmail';
import { List, InputItem ,Toast} from 'antd-mobile';
const SendEmail = React.createClass({
  send(){
    var email=this.props.email.replace(/\s+/g, "");
    if(email){
      var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{1,4}|[0-9]{1,3})$/;
      if (!filter.test(email)) {
        Toast.info('请输入正确的邮箱地址',2)
      }else{
        this.props.SendEmailAction.sendEmail({'email':email,'centificateId':this.props.params.id});
      }
    }else{
      Toast.info('请输入邮箱地址',2)
    }
  },
  inputEmail(event){
    this.props.setStoreState({
      email: event
    });
  },
  render(){
    return (
      <div className="sendEmail">
        <div className="top">
          <List>
            <InputItem
              value={this.props.email}
              placeholder="请输入您的邮箱地址 如：simple@sample.com"
              onChange={this.inputEmail}
              maxLength="40"
            ></InputItem>
            </List>
          <div className="inst">
            我们会把电子凭证发送到您录入的邮箱中，请注意查收。
          </div>
        </div>

        <div onClick={this.send}>
          <Footer content="确认发送"/>
        </div>
      </div>
    )
  }
});
export default createActionContainer({
  email:'email',
}, {
  SendEmailAction
})(SendEmail);
