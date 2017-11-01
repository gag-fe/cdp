import React from 'react';
import { NavBar, Icon ,ActionSheet,Toast} from 'antd-mobile';
import '../css/goodsList.less';
import { createActionContainer } from 'Roof';
import collectionsAction from  '../../../../actions/collecttions';
const GoodsList=React.createClass({
  getInitialState() {
    return {
      clicked: 'none',
    };
  },
  showActionSheet(){
    const BUTTONS = ['去店铺', '取消收藏',  '取消'];
    ActionSheet.showActionSheetWithOptions({
        options: BUTTONS,
        // destructiveButtonIndex:DESTRUCTIVE_INDEX, //删除
        // cancelButtonIndex: CANCEL_INDEX,  //  取消
        // title: '标题',
        // message: '我是描述我是描述',
        maskClosable: true,
        'data-seed': 'logId',
      },
       (buttonIndex) => {
         if(buttonIndex == '0'){
           this.context.router.push("/shopDetail/"+this.props.value.shopEntityId+'/111');
         }else if(buttonIndex =='1'){
           this.props.collectionsAction.cancelColl(this.props.value.id);
         }
       // this.setState({ clicked: BUTTONS[buttonIndex] });

      });

  },
  contextTypes: {
    router: React.PropTypes.object
  },
  render(){
    return(
      <div className="goodList">
        <div  className="goodText"  onClick={this.showActionSheet}>
          <h2>{this.props.value.goodName}</h2>
          <p>{this.props.value.cutDesc}</p>
          <span><label>{this.props.value.goodPrice ? '￥'+this.props.value.goodPrice :''}</label><Icon type="ellipsis" className="icon"/></span>
        </div>
        <div className="goodImg"></div>
      </div>
    )
  }
});
export  default createActionContainer({

},{
  collectionsAction
})(GoodsList);
