import React from 'react';
import './css/print.less';
import $ from 'jquery';
const Print=React.createClass({
  componentDidMount(){
    $('html,body').animate({
      scrollTop: '0px'
    }, 200);
  },
   render(){
     document.setTitle('打印说明');
     return(
       <div className="print">
       </div>
     )
   }
});
export  default  Print;
