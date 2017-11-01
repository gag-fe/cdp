import React from 'react';
import {Button,List, TextareaItem,Toast} from 'antd-mobile';
import Score from '../../../../components/score/Score';
import  '../css/addComment.less';

const AddComment=React.createClass({
  getInitialState(){
    return {
      value:'',
    }
  },
  _handleChange(e){
    this.setState({value:e})
  },
  _submit(){
    console.log(this.state.value);
    Toast.success('评价成功!',2,()=>{
      this.context.router.push("/userCenter/myBill");
    });

  },
  contextTypes: {
    router: React.PropTypes.object
  },
  render(){
    return (
      <div className="addComment">
        <Score/>
        <List>
          <TextareaItem
            placeholder="点评一下商品或店铺吧，您的意见很重要"
            rows={20} onChange={this._handleChange}
          />
        </List>
        <Button className="gag_button" onClick={this._submit}>提交评价</Button>
      </div>
    )
  }
});
export  default AddComment;
