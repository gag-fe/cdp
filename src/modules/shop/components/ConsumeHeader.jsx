import { createContainer } from 'Roof';
import React from 'react';

//引入样式
const consumable = require("../../../img/consumable.png");
const cloth = require("../../../img/cloth.png");
const facial = require("../../../img/facial.png");
const entertainment = require("../../../img/entertainment.png");
const tour = require("../../../img/tour.png");
const dining = require("../../../img/dining.png");

const ConsumeHeader =React.createClass({
  render(){
    let industryStateIcon;//业态icon
    switch (this.props.industryState){
      case 'consumable':industryStateIcon=consumable;break;
      case 'cloth':industryStateIcon=cloth;break;
      case 'facial':industryStateIcon=facial;break;
      case 'entertainment':industryStateIcon=entertainment;break;
      case 'tour':industryStateIcon=tour;break;
      case 'dining':industryStateIcon=dining;break;
    }
    return (
      <div className="shopTypeHeader">
        <div className="typeIcon" >
          <img src={industryStateIcon}/>
        </div>
        <span className="category">{this.props.consumeList.consumeType}</span>
        <span>{this.props.consumeList.consumePercent}%</span>
        <div className="price">
          <span>{this.props.consumeList.consumeMount}</span>
          <div className="img"/>
        </div>
      </div>
    )
  }
});

export default createContainer({
  industryState:'industryState',
  consumeList:'consumeList'
})(ConsumeHeader);
