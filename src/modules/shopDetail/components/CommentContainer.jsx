import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import { Accordion } from 'antd-mobile';
import Comment from './Comment';

import '../css/commentContainer.less';

const CommentContainer = React.createClass({
  getInitialState(){
    return{
      hideComment:true,//隐藏评论
    }
  },

  //查看全部评论
  _showAllComment(){
   this.setState({
     hideComment:false,
   });
  },

  //评论少与两条，不显示'显示全部'
  componentDidMount(){
    if(this.props.commentDatas.length<=2){
      this.setState({
        hideComment:false,
      });
    }
  },

  render() {
    let comments=[];
    this.props.commentDatas.forEach((item,index)=>{
      comments.push(<Comment comment={item} key={index}/>);
    });

    //显示两条评论
    if(this.state.hideComment){
      comments.splice(2);
    }

    return (
      <div className="commentContainer">
        <Accordion defaultActiveKey="0">
          <Accordion.Panel header={<div>用户评价</div>}>
            {comments}
            <p className="loadAll" onClick={this._showAllComment}
               style={{display:this.state.hideComment?'block':'none'}}>
              查看全部用户
            </p>
          </Accordion.Panel>
        </Accordion>
      </div>
    )
  }
});

export default createContainer({
})(CommentContainer);
