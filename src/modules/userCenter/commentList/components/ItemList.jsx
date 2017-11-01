import React from 'react';
import '../css/itemList.less';

const ItemList=React.createClass({
   render(){
     return (<div className="itemList">
       <span>件单价:￥39</span>
       <span>回头指数:40%</span>
       <span>￥45/人</span>
     </div>)
   }
});
export  default  ItemList;
