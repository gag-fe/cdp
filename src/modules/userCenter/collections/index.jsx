import React from 'react';
import CollectionList  from  './components/CollectionList';
import { createActionContainer } from 'Roof';
import collectionsAction from  '../../../actions/collecttions';

const Collection=React.createClass({
  componentWillMount(){
    this.props.collectionsAction.loadGoodsList(1);
    this.props.collectionsAction.loadShopsList(1);
  },
   render(){
     document.setTitle('我的收藏');
     return(
       <div><CollectionList></CollectionList></div>
     )
   }
});
export  default  createActionContainer({
},{
  collectionsAction
})(Collection);
