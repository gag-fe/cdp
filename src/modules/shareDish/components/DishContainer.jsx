import { createContainer, createRootContainer } from 'Roof';
import React from 'react';

import '../css/dishContainer.less';

const DishContainer = React.createClass({
  getInitialState(){
    return{
      select:false,
    }
  },

  //全选
  componentWillReceiveProps(nextProps){
    if(this.props.allSelect!=nextProps.allSelect){
      this.setState({
        select:true,
      });
    }
  },

  //选择单品/取消 切换
  _onSelect(){
    this.setState({
      select:!this.state.select,
    });

    if(this.state.select){
      let i=0;
      this.props.getStoreState().shareProducts.forEach((item)=>{
        if(item.goodsId==this.props.dish.goodsId){
          this.props.getStoreState().shareProducts.splice(i,1);
        }
        i++;
      }
      );
    }else{
      this.props.getStoreState().shareProducts.push({
        goodsId:this.props.dish.goodsId,
        goodsName:this.props.dish.goodsName,
      });
    }
  },

  render() {
    return (
        <div className="dishContainer" onClick={this._onSelect}>
          <img className="dish" src={this.props.dish.goodsImg}/>
          <div className={this.state.select?'selected':'select'}/>
          <p>{this.props.dish.goodsName}</p>
          <p>¥{this.props.dish.price}</p>
        </div>
    );
  }
});

export default createContainer({
})(DishContainer);
