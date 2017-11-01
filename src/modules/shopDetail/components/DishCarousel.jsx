import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import { Carousel } from 'antd-mobile';
import SingleContainer from './DishSingle';

import '../css/dishCarousel.less';

const DishCarousel = React.createClass({

  componentDidMount(){
     document.getElementById("carouselId").parentNode.parentNode.style.borderRadius= '0';
  },
  render() {
    let singleContainers=[];
    this.props.carouselPictures.forEach((item,index)=>{
      singleContainers.push(<SingleContainer picture={item} key={index}/>)
    });
    return (
      <div className="dishCarousel" id="carouselId">
        <Carousel>
          {singleContainers}
        </Carousel>
      </div>
    )
  }
});

export default createContainer({
})(DishCarousel);
