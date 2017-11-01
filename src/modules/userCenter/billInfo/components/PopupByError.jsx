import React from 'react';
import '../css/popupByError.less';
import {Popup} from 'antd-mobile';
import {hashHistory} from 'react-router';

const cmClose=require('../../../../img/cm-close.png');
const errorH=require('../../../../img/coupon-error@2x.png');
// const cmHeadert=require('../../../../img/cm-headt.png');

class PopupByError extends React.Component{
  constructor(props) {
    super(props);
    this.state = {

    }
  }
  onClose = (sel) => {
    this.setState({ sel });
    Popup.hide();
  };

  confirm=()=>{
    localStorage.setItem("scrollTop",document.getElementsByClassName('billInfos')[0].scrollTop);
    this.onClose();
    location.reload();
  };
  render(){
    var htmlstr='';

   if (this.props.code == '-1') {
     htmlstr=  <div className="am-modal-dialog">
       <div className="am-modal-hd">
         <a href="javascript: void(0)" className="am-close" onClick={this.onClose}>&times;</a>
       </div>
       <div className="modal-guide-error">
         <div className="error-one"><img src={errorH} /></div>
         <div className="error-two">服务器出错<br/>请稍候再试</div>
         <div className="am-g">
           <button type="button" className="am-login" onClick={this.confirm}>确定</button>
         </div>
       </div>
     </div>;
    }else if (this.props.code == '2') {
     htmlstr=  <div className="am-modal-dialog">
       <div className="am-modal-hd">
         <a href="javascript: void(0)" className="am-close" onClick={this.onClose}>&times;</a>
       </div>
       <div className="modal-guide-error">
         <div className="error-one"><img src={errorH} /></div>
         <div className="error-two">对不起，您来晚一步<br/>
           本优惠券已经被领光了</div>
         <div className="am-g">
           <button type="button" className="am-login" onClick={this.confirm}>确定</button>
         </div>
       </div>
     </div>;
    }else if (this.props.code == '3') {
     htmlstr=  <div className="am-modal-dialog">
       <div className="am-modal-hd">
         <a href="javascript: void(0)" className="am-close" onClick={this.onClose}>&times;</a>
       </div>
       <div className="modal-guide-error">
         <div className="error-one"><img src={errorH} /></div>
         <div className="error-two">您已达到单个用户最大领券个数<br/>感谢您的支持</div>
         <div className="am-g">
           <button type="button" className="am-login" onClick={this.confirm}>确定</button>
         </div>
       </div>
     </div>;

    }else if (this.props.code == '4') {
     htmlstr=  <div className="am-modal-dialog">
       <div className="am-modal-hd">
         <a href="javascript: void(0)" className="am-close" onClick={this.onClose}>&times;</a>
       </div>
       <div className="modal-guide-error">
         <div className="error-one"><img src={errorH} /></div>
         <div className="error-two">对不起，您来晚一步<br/>
           活动已经结束</div>
         <div className="am-g">
           <button type="button" className="am-login" onClick={this.confirm}>确定</button>
         </div>
       </div>
     </div>;
    }
    return (
      <div className="modal-coupon-error">
        {htmlstr}
      </div>
    )
  }
};

export default PopupByError;

