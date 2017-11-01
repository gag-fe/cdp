import React from 'react';
import './clickMore.less';
import {Icon} from 'antd-mobile';
import { createContainer , createActionContainer} from  'Roof';
var i=1;
class ClickMore extends React.Component{
  static  propTypes = {
    actionFunc: React.PropTypes.func,
  };
  static defaultProps = {
    type:　'',
    shopEntityId:'',
  };
  constructor(props) {
    super(props);
  }

  more=()=>{
    i=this.props.pageIndex;
    i++;
    if(this.props.type == 'A'){
      this.props.actionFunc(i);
    }else if(this.props.type == 'S'){
      this.props.actionFunc({'keyword':'','pageIndex':i,'searchType':'1','status':localStorage.getItem('iStatus')});
    }else if(this.props.type == 'K'){
      this.props.actionFunc({'keyword':this.props.searchVal,'pageIndex':i,'searchType':'0','status':''});
    }else if(this.props.type == 'couponPage'){
      this.props.actionFunc({'shopEntityId':this.props.shopEntityId,'pageIndex':i});
    }else{
      this.props.actionFunc(i);

    }


  };
  render(){
    let str='';
    if(parseInt(this.props.pageIndex) * parseInt(this.props.pageSize) < parseInt(this.props.total)){
      str=<div className="clickMore" onClick={this.more}>{this.props.iconFlag ? <Icon type="loading"/> : '点击加载更多'}</div>;
    }else {
      str=<div className="noMore">没有更多啦</div>;
    }
    return(
      <div>{str}</div>
    )
  }
}
export default createActionContainer({
  searchVal: 'searchVal',
},{
}) (ClickMore);
