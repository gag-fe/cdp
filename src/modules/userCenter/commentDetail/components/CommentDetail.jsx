import  React from 'react';
import ShopNameList from '../../friends/components/ShopNameList';
import StarList from '../../friends/components/StarList';
import ContentDesc from '../../friends/components/ContentDesc';
import  '../css/commentDetail.less';

const CommentDetail=React.createClass({
  render(){
    return(
      <div className="commentDetail">
        <ShopNameList/>
        <StarList count={4} date="2016/11/03"/>
        <ContentDesc desc={this.props.desc}/>
      </div>
    )


  }
});
export  default  CommentDetail;
