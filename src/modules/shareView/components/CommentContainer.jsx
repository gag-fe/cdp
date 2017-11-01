import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import RateShow from '../../../components/rateShow/RateShow';

import '../css/commentContainer.less';

const CommentContainer = React.createClass({
  render() {
    return (
      <div className="commentContainer">
        <span className="comment">好友评分:</span>
        <RateShow count={this.props.shareInfo.shareScore}/>
        <p>好友评分:&nbsp;&nbsp;{this.props.shareInfo.recommedWords}</p>
      </div>
    );
  }
});

export default createContainer({
})(CommentContainer);
