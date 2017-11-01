import { createContainer, createRootContainer } from 'Roof';
import React from 'react';

import '../css/shareViewHeader.less';
const shopLogo = require("../../../img/shopLogo.jpg");
const shopbg = require("../../../img/shopbg.jpg");

const ShareViewHeader = React.createClass({
  render() {
    let tag='食',
      shopBackgroundImg_url=shopbg,//默认商铺背景
      shopEntityImg_url=shopLogo;//默认商铺LOGO;
    if(this.props.shareInfo.shopLogoImg)shopEntityImg_url=this.props.shareInfo.shopLogoImg;
    if(this.props.shareInfo.shopShowImg)shopBackgroundImg_url=this.props.shareInfo.shopShowImg;

    switch (this.props.shareInfo.shopTypeName){
      case '零售':tag='零';break;
      case '娱乐':tag='娱';break;
      case '美容':tag='美';break;
      case '餐饮':tag='食';break;
      case '生活':tag='杂';break;
      case '住行':tag='行';break;
    }

    return (
      <div>
        <div className="shareViewHeader">
            <img className="shopLogo" src={shopEntityImg_url}/>
            <span className="tagIcon">{tag}</span>
        </div>
        <div
        className="headerBg"
        style={{backgroundImage:"url("+shopBackgroundImg_url+")"}}
        ></div>
      </div>
    );
  }
});

export default createContainer({
})(ShareViewHeader);
