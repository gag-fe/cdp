import React from 'react';

import '../css/StarShow.less';
const Star_hui=require('../../../../img/Star_hui@2x.png');
const Star_ban=require('../../../../img/banxing.png');
const Star=require('../../../../img/Star.png');
const StarShow = React.createClass({
  getDefaultProps(){
    return{
      count:3
    }
  },
  render() {
    let imgs=[];
    for(let i=0;i<5;i++){
      i<=this.props.count-1?
        imgs.push(<img src={Star_hui} key={i}/>):
        this.props.count==(i+0.5)?
          imgs.push(<img src={Star_ban} key={i}/>):
          imgs.push(<img src={Star} key={i}/>);
    }
    return (
      <div className="starShow">
        {imgs}
      </div>
    )
  }
});

export default StarShow;
