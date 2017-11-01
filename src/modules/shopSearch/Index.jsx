import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import SearchBar from './components/SearchBar';
import SearchHistory from './components/SearchHistory';
import ShopLists from '../shop/components/ShopLists';
import searchActions from '../../actions/shop/search';

const ShopSearch = React.createClass({
  componentWillMount(){
    this.props.searchActions.searchHistory();
    //隐藏search的商家列表
    this.props.setStoreState({
      searchShow:false,
    })
  },

  componentDidMount(){
    document.setTitle('搜索店铺');
  },
  render() {
    return (
      <div>
        <SearchBar />
        <SearchHistory style={{display:this.props.searchShow?'none':'block'}}/>
        <ShopLists style={{display:this.props.searchShow?'block':'none'}}/>
      </div>
    )
  }
});

export default createActionContainer({
  searchShow:'searchShow'
},{
  searchActions,
})(ShopSearch);
