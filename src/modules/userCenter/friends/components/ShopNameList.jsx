import React from 'react';
import {List, SwipeAction} from 'antd-mobile';
import  '../css/shopNameList.less';

const Item = List.Item;
const Brief = Item.Brief;
const defaultItem=require('../../../../img/shopLogo.jpg');
const ShopNameList=React.createClass({
   getDefaultProps(){
     return {
       value: '未知',
       img:defaultItem,
       shopId:'',
     }
   },
  _clickShopName(){
    if(this.props.shopId !=null && this.props.shopId !='' && this.props.shopId!=undefined){
      this.context.router.push("/shopDetail/"+this.props.shopId+'/111');
    }
  },
  contextTypes: {
    router: React.PropTypes.object
  },
   render(){
     return(
       <div className="shopNameList" onClick={this._clickShopName}>
         <List>
           <Item thumb={this.props.img} >{this.props.value}</Item>
           {/*arrow="horizontal"*/}
         </List>
       </div>
     )
   }
});
export  default ShopNameList;
