import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import { Accordion } from 'antd-mobile';

import '../css/pictureRoll.less';

const PictureRoll = React.createClass({

  //弹出滚动大图
  _showCarousel(){
    this.props.setStoreState({
      carouselModal: true,
      carouselPictures:this.props.dishes,
    });
  },

  render() {
    let pictures=[];
      this.props.dishes.forEach(({img,isConsume}, index)=> {
        pictures.push(
          <div key={index}>
            <img src={img}/>
            <span style={{display:isConsume?'inline-block':'none'}}>消费过</span>
          </div>
        );
      });

    return (
      <div className="pictureRoll">
        <p>{this.props.label}</p>
        <div className="pictureContainer" onClick={this._showCarousel}>
          {pictures}
        </div>
      </div>
    )
  }
});

export default createContainer({
})(PictureRoll);
