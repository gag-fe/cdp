import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import searchActions from '../../../actions/shop/search';

const SearchAssociate =React.createClass({
  _onSearch(e){
    //清除联想
    this.props.setStoreState({
      searchAssociate:[],
    });

    //input赋值店名
    this.props.setInputValue(this.props.item.shopEntityName);

    e.stopPropagation();
    e.preventDefault();
    //搜索商家
    this.props.searchActions.searchShop({
      shopEntityId:this.props.item.shopEntityId,
      action:this.props.item.action,
      shareUserId:this.props.item.sharedFromUserId,
      shareId:this.props.item.sharedId,
      appId:window.appId,
    });
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  render(){
    return(
      <p onClick={this._onSearch}>{this.props.item.shopEntityName}</p>
    )
  }
});

export default createActionContainer({
},{
  searchActions
})(SearchAssociate);

