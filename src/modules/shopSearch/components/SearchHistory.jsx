import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import searchActions from '../../../actions/shop/search';
import SingleHistory from './SingleHistory';

import '../css/searchHistory.less';

const SearchHistory =React.createClass({
  _onClear(){
    //清除历史
    this.props.setStoreState({
      searchHistory:[]
    });
    this.props.searchActions.clearHistory();
  },

  render(){
    let historyLists=[];
    if(this.props.searchHistory.length==0){
      return <div></div>;
    }
    this.props.searchHistory.forEach((history,index)=>{
      historyLists.push(<SingleHistory key={index} history={history}></SingleHistory>)
    });
    return(
      <div className="searchHistory" style={this.props.style}>
        <div>
          <span>历史记录</span>
          <span className="img" onClick={this._onClear}></span>
        </div>
        <div className="historyLists">
          {historyLists}
        </div>
      </div>
    )
  }
});

export default createActionContainer({
  searchHistory:'searchHistory'
},{
  searchActions,
})(SearchHistory);
