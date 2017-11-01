import React from 'react';
import {Button,List, TextareaItem,Toast} from 'antd-mobile';
import {createActionContainer} from 'Roof';
import  suggestAction from '../../../../actions/suggest';
import '../css/suggestions.less';

const Suggestions = React.createClass({
  _handleValue(e){
    this.props.setStoreState({
      content:e
    });
  },
  _submit(){
    if(this.props.content.replace(/\s+/g, "") == ''){
      Toast.info("请输入您反馈的内容",2);
      return;
    }
    this.props.suggestAction.addSuggestData();
  },
  componentWillMount(){
    this.props.setStoreState({
      content:''
    });
  },

  render(){
    return (
      <div className="suggest">
        <List>
          <TextareaItem  onChange={this._handleValue}  value={this.props.content}
                        placeholder="请描述您遇到的问题或对彩单支付的宝贵建议"
            rows={30} count={500}
          />
        </List>
        <Button className="gag_button" onClick={this._submit}>提交反馈</Button>
      </div>
    )
  },


});

export default createActionContainer({
content:'content'
},{
  suggestAction
})(Suggestions);

