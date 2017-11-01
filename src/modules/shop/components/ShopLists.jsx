import { createContainer } from 'Roof';
import React from 'react';
import { ListView } from 'antd-mobile';
import ShopList from './ShopList';
import EmptyPage from '../../userCenter/emptyPage/EmptyPage';


const ShopLists = React.createClass({
  render() {
    let shopLists=[];
    //加载我的商家列表
    if(this.props.myShopListInfo){//有数据
      this.props.myShopListInfo.forEach((item,index)=>{
        shopLists.push(
          <ShopList shopInfo={item} key={index}/>
        )
      })
    }else{
      shopLists.push(
        <EmptyPage key={1}/>
      )
    }
    return(
      <div style={this.props.style}>
        {shopLists}
      </div>
    )
  },
});

export default createContainer({
  myShopListInfo:'myShopListInfo',
})(ShopLists);
