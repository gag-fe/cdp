import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import {Modal, Button} from 'antd-mobile';
import DishCarousel from './DishCarousel';

const DishModal = React.createClass({
  render() {
    return (
      <Modal
        closable
        maskClosable
        transparent
        visible={this.props.carouselModal}
      >
        <DishCarousel carouselPictures={this.props.carouselPictures}/>
      </Modal>
    );
  }
});

export default createContainer({
  carouselModal:'carouselModal',
  carouselPictures:'carouselPictures',
})(DishModal);
