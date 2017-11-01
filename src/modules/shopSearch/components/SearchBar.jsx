import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import {InputItem} from 'antd-mobile';
import SearchAssociate from './SearchAssociate';
import searchActions from '../../../actions/shop/search';

import '../css/searchBar.less';

const SearchBar =React.createClass({
  getInitialState(){
    return{
      value:'',
    }
  },
  _input(e){
    this.setState({
      value:e
    });

    let currentStream;
    let _self = this;

    if(currentStream){
      clearTimeout(currentStream);
    }

    if(!currentStream){
      currentStream = setTimeout(()=>{
        if(e==''){
          this.props.setStoreState({
            searchAssociate:[],
          });
        }else{
          //加载联想
          _self.props.searchActions.searchAssociate({keyWord:e});
        }
      },300);
    }
  },

  _cancel(e){
    e.stopPropagation();
    e.preventDefault();
    this.context.router.push('/shop');
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  // 点击联想，赋值input
  _setInputValue(value){
    this.setState({
      value:value,
    });
  },

  render(){
    let searchAssociate=[];
    if(this.props.searchAssociate.length!=0){
      this.props.searchAssociate.forEach((item,index)=>{
        searchAssociate.push(<SearchAssociate item={item} key={index} setInputValue={this._setInputValue}/>)
      })
    }
    return(
      <div className="shopSearchPage">
        <InputItem
          value={this.state.value}
          onChange={this._input}
          onFocus={this._input}
          clear
          placeholder="输入店铺名或品牌"
          autoFocus={true}
        >
          <div className="imgSearch"/>
        </InputItem>
        <span onClick={this._cancel}>取消</span>
        <div className="searchAssociate" style={{display:(this.props.searchAssociate.length==0)?'none':'block'}}>
          {searchAssociate}
        </div>
      </div>
    )
  }
});

export default createActionContainer({
  searchAssociate:'searchAssociate'
},{
  searchActions
})(SearchBar);
