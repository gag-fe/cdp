import React from 'react';
import Loading from '../loading/Loading';
import Empty from '../../modules/userCenter/emptyPage/EmptyPage';
import {createContainer} from 'Roof';
const CommonPage=React.createClass({
   render(){
       if(this.props.pageFlag){
         return (<Empty/>);
       }else{
         return (<Loading/>);
       }
   }
});

export default createContainer({
  pageFlag:'pageFlag',
})(CommonPage)
