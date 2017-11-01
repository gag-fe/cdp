import { createContainer, createRootContainer } from 'Roof';
import React from 'react';

import '../css/dishViewContainer.less';
const eatTime = require("../../../img/eatTime@2x.png");

const DishViewContainer = React.createClass({

  render() {
    return (
      <div className="dishViewContainer">
        <div className="pictureContainer">
          <img className="dish" src={this.props.dishInfo.goodsImg}/>
          <div className="commend">
            <img src={eatTime}/>
            <span>{this.props.dishInfo.tatolSale}</span>
          </div>
          <span className="consumeCount">Ta吃过{this.props.dishInfo.eatTimes}次</span>
        </div>
        <p>{this.props.dishInfo.goodsName}</p>
        <p><span>¥</span>{this.props.dishInfo.price}</p>
      </div>
    );
  }
});

export default createContainer({
})(DishViewContainer);
