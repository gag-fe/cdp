import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import searchActions from '../../../actions/shop/search';

const SingleHistory =React.createClass({
  _onSearch(){
    //加载联想
    this.props.searchActions.searchAssociate({keyWord:this.props.history});
  },

  render(){
    return(
      <span onClick={this._onSearch}>{this.props.history}</span>
    )
  }
});

export default createActionContainer({
},{
  searchActions
})(SingleHistory);

