import React from 'react';
import '../css/searchBar.less';
import searButton from '../../../../img/searchButton.png';
import searIcon from '../../../../img/searchIcon.png';
import search from '../../../../img/search@2x.png';
import { hashHistory } from 'react-router';
import {createContainer} from 'Roof';
const SearchBar=React.createClass({
  toSearch(){
    hashHistory.push('/userCenter/billSearch');
  },
  toKeySearch(){
    hashHistory.push('/userCenter/myConsume');
  },
   render(){
     return(
       <div>
         <div className="search">
           {/*<img src={searButton} onClick={this.toSearch}/>*/}
           <div onClick={this.toSearch}><img src={search}/><input value={this.props.searchVal} className="input" placeholder="请输入店铺名进行搜索"/></div>
           <img className="saixuan" src={searIcon} onClick={this.toKeySearch}/>
         </div>
       </div>
     )
   }
});
export  default createContainer({
  searchVal:'searchVal',
}) (SearchBar)
