import React from 'react';
import { createActionContainer } from  'Roof';
import userAction from '../../../../actions/userCenter';
import '../css/personal.less';

const Personal=React.createClass({
  componentWillMount(){
    this.props.userAction.showPersonData();
    document.setTitle('会员编码');
  },
  render(){
    return(
      <div className="personal">
         <div className="codeDiv">
          <div className="p_title">会员编码</div>
          <div className="p_cont">此编码于结账时出示</div>
          <img className="bar_img" src={this.props.barInfo.barCodePicUrl}></img>
          <div className="barcode">{this.props.barInfo.barCode}</div>
          </div>


       </div>
    )
  }
});
export default createActionContainer({
  barInfo:'barInfo'
},{
  userAction
})(Personal);
