import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import { SearchBar,List,Button,Icon } from 'antd-mobile';
import Radar from './Radar';
import  DetailBottom from './DetailBottom';
import ConsumeLists from './ConsumeLists';
import ConsumeHeader from './ConsumeHeader';

//引入样式
import '../css/exponent.less';

const Exponent =React.createClass({
  render(){
    return (
      <div className="exponentMain">
        <Radar/>
        <ConsumeHeader/>
        <ConsumeLists/>
        <DetailBottom/>
      </div>)
  }
});

export default Exponent;
