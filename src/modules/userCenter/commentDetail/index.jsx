import  React from 'react';
import CommentDetail from './components/CommentDetail';
import Violation from './components/Violation';

import '../../../utils/common.js';

const CommentDetailList=React.createClass({
  render(){
    document.setTitle('评价详情');
    return(
      <div>
        <CommentDetail  desc="价格合适"/>
        <CommentDetail />
        <CommentDetail  desc="价格合适"/>
        <CommentDetail />
        <CommentDetail  desc="价格合适"/>
        <CommentDetail />
        <CommentDetail  desc="价格合适"/>
        <CommentDetail />

        <Violation/>
      </div>
      )


  }
});
export  default  CommentDetailList;
