import React from 'react';
import '../css/button.less';
import {hashHistory} from 'react-router';
import {createActionContainer} from 'Roof';
import billSearchAction from '../../../../actions/billSearch';
var isHave=false;
const DZButton=React.createClass({
  getDefaultProps(){
    return{
      name:'',
      status:'',
      id:'',
    }
  },
  toFunc(status){
    this.props.setStoreState({
      searchVal:this.props.name,
    });
    if(status && status != 'search'){
      localStorage.setItem('iStatus', status);
      hashHistory.push('userCenter/myBill/S');
    }else if( status == 'search'){
      if (localStorage.getItem('name')) {
        var list = localStorage.getItem('name').split(",");
        list.map((value, k)=> {
          if (value === this.props.name) {
            isHave = true;
          }
        });
        if (!isHave) {
          list.push(this.props.name);
        }
        localStorage.setItem('name', list.join(","));
      } else {
        localStorage.setItem('name', this.props.name);
      }
      hashHistory.push('userCenter/myBill/K');
    }else{
      console.log('最近历史');
      hashHistory.push('userCenter/myBill/K');
    }

  },
   render(){
     return(
       <div className="bill_button" onClick={this.toFunc.bind(this,this.props.status)}>
         {this.props.name}
       </div>
     )
   }
});
export  default  createActionContainer({
  searchVal: 'searchVal',
},{
  billSearchAction
})(DZButton);
