import React from 'react';
import SearchBar from './components/SearchBar';
import DZButton from './components/DZButton';
import './css/myConsume.less';
import {createContainer} from 'Roof';
const MyConsume=React.createClass({
   componentWillMount(){
     document.setTitle('我的消费');
     this.props.setStoreState({
       searchVal:'',
     })
   },
   render(){
     return(
       <div className="myConsume">
         <SearchBar></SearchBar>
         <div className="title">发票状态</div>
         <DZButton name="全部" status="A"></DZButton>
         <DZButton name="已开发票" status="1"></DZButton>
         <DZButton name="未开发票" status="0"></DZButton>
         <DZButton name="超过开票期限" status="2"></DZButton>

       </div>
     )
   }
});
export  default createContainer({
  searchVal:'searchVal',
})(MyConsume);
