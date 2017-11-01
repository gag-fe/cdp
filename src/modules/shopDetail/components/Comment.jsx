import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import RateShow from '../../../components/rateShow/RateShow';

import '../css/commentContainer.less';

const Comment=React.createClass({
  render(){
    let label=this.props.comment.commenterMobile?this.props.comment.commenterMobile:
      (this.props.comment.commenterNickName?this.props.comment.commenterNickName:'匿名');
    return(
      <div className="comment">
        <img className="userIcon" src={this.props.comment.userHeadImg}/>
        <span className="phone">{label}</span>
        <span className="time">{this.props.comment.commentDate}</span>
        <RateShow count={this.props.comment.score}/>
        <p>{this.props.comment.commentContent}</p>
      </div>
    );
  }
});

export default createContainer({
})(Comment);
