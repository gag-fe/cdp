import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import DishViewContainer from './DishViewContainer';

import '../css/dishCommend.less';

const DishCommend = React.createClass({
  render() {
    let dishs=[];
    if(this.props.shareInfo.goods){
      this.props.shareInfo.goods.forEach((item,index)=>{
        dishs.push(<DishViewContainer dishInfo={item} key={index}/>)
      });
    }
    return (
      <div className="dishCommend">
        <p>推荐单品:</p>
        {dishs}
      </div>
    );
  }
});

export default createContainer({
})(DishCommend);
