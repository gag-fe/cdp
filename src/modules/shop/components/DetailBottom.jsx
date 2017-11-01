import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import { Flex, Button, WingBlank, WhiteSpace } from 'antd-mobile';

import '../css/detailBottom.less';
//引入样式

const DetailBottom =React.createClass({
  render(){
    return(
      <div className="detailFooter">
        <div className="single">
          <div className="inSingle">
            <p>¥{this.props.consumeData.totalMount}</p>
            <p>累计消费</p>
          </div>
        </div>
        <div className="single">
          <div className="inSingle">
            <p>¥{this.props.consumeData.saveMount}</p>
            <p>为您节省</p>
          </div>
        </div>
        <div className="single">
          <div className="inSingle">
            <p>{this.props.consumeData.consumeCount}笔</p>
            <p>累计消费</p>
          </div>
        </div>
        <div className="single single-last">
          <div className="inSingle">
            <p>¥{this.props.consumeData.maxMount}</p>
            <p>最壕花销</p>
          </div>
        </div>
      </div>
    )
  }
});

export default createContainer({
  consumeData:'consumeData',
})(DetailBottom);

