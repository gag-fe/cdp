import React from 'react';
import {List, SwipeAction} from 'antd-mobile';
import '../css/kList.less';
import ShopNameList from  '../components/ShopNameList';
import StarList from  '../components/StarList';
import ContentDesc from  '../components/ContentDesc';

import { createActionContainer } from 'Roof';
import friendAction from '../../../../actions/friends';
const Item = List.Item;
const Brief = Item.Brief;
const defaultItem=require('../../../../img/defaultItem.png');
const KList = React.createClass({
  contextTypes: {
    router: React.PropTypes.object
  },
  openDelete(){
    this.refs.gagList.style.marginLeft = '-7.5rem';
  },
  closeDelete(){
    this.refs.gagList.style.marginLeft = '0rem';
    console.log(this.props.value.recommendId);
    this.props.friendAction.deleteFriendById(this.props.value.recommendId);
  },
  render(){
    if(this.props.value.shopImg ==''){
      this.props.value.shopImg=defaultItem;
    }
    const recommendGoodsName = this.props.value.recommendGoodsName;
    var goodsName = recommendGoodsName.map(function (item,index) {
      return (
      <span key={index}>{item}</span>
      );
    });
    return (
      <div className="kList">
        <List>
          <SwipeAction
            style={{backgroundColor: '#FC6121'}}
            autoClose
            right={[
              {
                text: '删除',
                onPress: () => console.log('删除'),
                style: {backgroundColor: '#FC6121', color: 'white'},
              },
            ]}
            onOpen={this.openDelete}
            onClose={this.closeDelete}>

            <div className="gagList" ref="gagList">
              <div>
                <ShopNameList  value={this.props.value.shopEntityName} img={this.props.value.shopImg} shopId={this.props.value.shopEntityId}></ShopNameList>
              </div>

              <StarList count={this.props.value.score} date={this.props.value.recommendDate} dateName="推荐日期"></StarList>
              <div className="row_1">
                推荐好友:<label>{this.props.value.recommendPersonName}</label>{this.props.value.averageConsume ? '￥'+this.props.value.averageConsume+'/人'  :''}
              </div>
              <ContentDesc desc={this.props.value.recommendWords}/>
              <div className="row_3">{goodsName}</div>
            </div>

          </SwipeAction>
        </List>
      </div>
    )
  }
});
export  default createActionContainer({},{
  friendAction
})(KList);
