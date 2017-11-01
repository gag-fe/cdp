import React from 'react';

import ShopNameList from '../../friends/components/ShopNameList';
import StarList from '../../friends/components/StarList';
import ItemList from './../components/ItemList';
import ContentDesc from '../../friends/components/ContentDesc';
import '../css/commentList.less'
import { createContainer } from 'Roof';
const List=React.createClass({
  render(){
    document.setTitle('我的评价');
    return(
      <div className="listDiv">
        <ShopNameList/>
        <StarList count={3}/>
        <ItemList/>
        <ContentDesc desc="价格合适，菜好吃，河蟹和炸鸡味道很好。尤其是辣味炸鸡，酱简
          直了！"/>
      </div>
    )
  }
});
export  default createContainer({

})(List);
