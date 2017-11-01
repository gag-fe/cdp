import React from 'react';
import './css/emptyPage.less';

const emptyImg=require("../../../img/empty.png");
const EmptyPage=React.createClass({
   render(){
     return (
       <div className="empty_bg">
          <img src={emptyImg}/>
         <div>暂无内容</div>
       </div>
     )
   }

});
export  default EmptyPage;
