import  React from 'react';
//内容组件
import '../css/contentDesc.less';
const ContentDesc=React.createClass({
  getDefaultProps(){
    return {
      desc:''
    }
  },
  render(){
    return(
      <div className="row_2">{this.props.desc}</div>
    )
  }
});
export  default ContentDesc;
