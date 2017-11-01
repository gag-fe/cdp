import React from 'react';

import List from './components/CommentList';

import { createContainer } from 'Roof';
const CommentList=React.createClass({
  render(){
    document.setTitle('我的评价');
    return(
      <div>
        <List/>
        <List/>
        <List/>
      </div>
    )
  }
});
export  default createContainer({

})(CommentList);
