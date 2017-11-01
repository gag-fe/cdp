import React from 'react';
import {Tabs, WhiteSpace} from 'antd-mobile';
import GoodsList from './GoodsList';
import  ShopEntityList from './ShopEntityList';
import '../css/collectionList.less';
import  EmptyPage from '../../emptyPage/EmptyPage';
import {createContainer} from 'Roof';

const TabPane = Tabs.TabPane;

const CollectionList = React.createClass({

  componentWillReceiveProps(nextProps) {
    this.props.setStoreState({
      keyFlag: false,
    });

    if(this.props.goodsObj != nextProps.goodsObj){
      this.setState({
        goodsObj: nextProps.goodsObj
      });
    }
  },
  render(){
    console.log(this.props.goodsObj.goodsList.length);
    let goodsList = [];
    if (this.props.goodsObj.goodsList != '' && this.props.goodsObj.goodsList != null && this.props.goodsObj.goodsList != undefined && this.props.goodsObj.goodsList.length > 0) {
      this.props.goodsObj.goodsList.forEach((value, index)=> {
        goodsList.push(<GoodsList key={index} value={value}/>)
      })
    } else {
      goodsList.push(<EmptyPage key={1}/>)
    }
    let shopList = [];
    if (this.props.shopObj.shopEntityList != '' && this.props.shopObj.shopEntityList != null && this.props.shopObj.shopEntityList != undefined && this.props.shopObj.shopEntityList.length > 0) {
      this.props.shopObj.shopEntityList.forEach((value, index)=> {
        shopList.push(<ShopEntityList key={index} value={value}/>)
      })
    } else {
      shopList.push(<EmptyPage key={1}/>)
    }
    return (
      <div className="gagTabs">
        <WhiteSpace />
        <Tabs defaultActiveKey={this.props.keyFlag ? '2' : '1'} animated={false} onChange={this.callback}>
          <TabPane tab="收藏商品" key="1">
            <div>
              {goodsList}
            </div>
          </TabPane>
          <TabPane tab="收藏店铺" key="2">
            <div >
              {shopList}
            </div>
          </TabPane>
        </Tabs>
        <WhiteSpace />
      </div>
    )
  }
});
export  default createContainer({
  //收藏商品
  goodsObj: 'goodsObj',
  //收藏店铺
  shopObj: 'shopObj',
  keyFlag: 'keyFlag',
})(CollectionList);
