import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import DishContainer from '../../shareDish/components/DishContainer';
import EmptyPage from '../../userCenter/emptyPage/EmptyPage';

import '../css/dishContainer1.less';

const ShareDish = React.createClass({
  getInitialState(){
    return{
      allSelect:false,
    }
  },

  //全选
  _selectAll(){
    this.setState({
      allSelect:!this.state.allSelect,
    });
    //全选
    let shareProducts=[];
    this.props.goodsData.forEach(({goodsId,goodsName})=>{
      shareProducts.push({
        goodsId,
        goodsName,
      });
    });
    this.props.setStoreState({
      shareProducts:shareProducts,
    });
  },

  componentWillMount(){
    //清空缓存
    this.props.setStoreState({
      shareProducts:[],
      score:5,
    });
  },

  render() {
    let dishs=[];
    if(this.props.goodsData.length!=0){
      this.props.goodsData.forEach((item,index)=>{
        dishs.push(<DishContainer dish={item} key={index} allSelect={this.state.allSelect}/>);
      });
    }else{
      dishs.push(
        <EmptyPage key={1}/>
      )
    }

    return (
      <div className="shareDish1">
        <div className="dishHeader">你消费过的<span onClick={this._selectAll}>全选</span></div>
        {dishs}
      </div>
    );
  }
});

export default createActionContainer({
  goodsData:'goodsData',
},{
})(ShareDish);
