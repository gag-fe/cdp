import { createContainer, createRootContainer } from 'Roof';
import React from 'react';

//图片
const consumable = require("../../../img/consumable.png");
const cloth = require("../../../img/cloth.png");
const facial = require("../../../img/facial.png");
const entertainment = require("../../../img/entertainment.png");
const tour = require("../../../img/tour.png");
const dining = require("../../../img/dining.png");

const consumable_light = require("../../../img/consumable-light.png");
const cloth_light = require("../../../img/cloth-light.png");
const facial_light = require("../../../img/facial-light.png");
const entertainment_light = require("../../../img/entertainment-light.png");
const tour_light = require("../../../img/tour-light.png");
const dining_light = require("../../../img/dining-light.png");

const IndustryState = React.createClass( {
  getInitialState(){
    return {
      icon_url:`/src/img/${this.props.iconName}.png`,
    }
  },

  //点击icon高亮切换，加载相应业态数据
  _clickIcon(){
    //无数据显示0
    let consumeList={
      consumePercent:0,
      consumeType:this.props.name,
    };

    //有数据
    if(this.props.getStoreState().consumeData.singleTypeConsumeDatas){
      this.props.getStoreState().consumeData.singleTypeConsumeDatas.forEach((item)=>{
        //加载相应业态数据
        if(item.consumeType==this.props.name){
          consumeList=item;
        }
      });
    }

    //切换数据header的icon
    this.props.setStoreState({
      industryState:this.props.iconName,
      consumeType:this.props.name,
      consumeList:consumeList,
    });
  },

  render() {
    let industryStateIcon,industryStateIcon_light;//业态icon
    switch (this.props.iconName){
      case 'consumable':
        industryStateIcon=consumable;
        industryStateIcon_light=consumable_light;
        break;
      case 'cloth':
        industryStateIcon=cloth;
        industryStateIcon_light=cloth_light;
        break;
      case 'facial':
        industryStateIcon=facial;
        industryStateIcon_light=facial_light;
        break;
      case 'entertainment':
        industryStateIcon=entertainment;
        industryStateIcon_light=entertainment_light;
        break;
      case 'tour':
        industryStateIcon=tour;
        industryStateIcon_light=tour_light;
        break;
      case 'dining':
        industryStateIcon=dining;
        industryStateIcon_light=dining_light;
        break;
    }
    return (
      <div className={this.props.className} onClick={this._clickIcon}>
        <img src={(this.props.industryState==this.props.iconName)?
          industryStateIcon_light :industryStateIcon
        }/>
        <p>{this.props.name}</p>
      </div>
    );
  },
});

export default createContainer({
  industryState:'industryState'
})(IndustryState);










