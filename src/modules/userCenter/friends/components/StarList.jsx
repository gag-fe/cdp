import React from 'react';
import '../css/starList.less';
import RateShow from  '../../../../components/rateShow/RateShow';
//左边评分，右边日期组件
const StarList=React.createClass({
  getDefaultProps(){
    return{
      count:'3',
      dateName:'日期',
      date:'2016-12-12'
    }
  },
  render(){
    return (
      <div className="desc">
        <RateShow  count={this.props.count}/>
        <span className="date">{this.props.dateName}:{this.props.date}</span>
      </div>
    )
  }

});
export  default StarList;
