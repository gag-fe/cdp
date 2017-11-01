import React from 'react';
import ShareItem from './components/ShareItem';
import { createActionContainer } from 'Roof';
import shareDataAction from '../../../actions/share';
import CommonPage from '../../../components/commonPage/CommonPage';
import ClickMore from '../../../components/clickMore/ClickMore';
const Share=React.createClass({

  componentWillMount(){
    this.props.shareDataAction.shareListData(1);
    this.props.setStoreState({
      pageFlag:false,
    });
  },
  render(){
    document.setTitle('我的分享');
    if(this.props.shareList.retList ==undefined || this.props.shareList.retList =='' || this.props.shareList.retList == null ||  this.props.shareList.retList.length == 0 ){
      return <CommonPage/>;
    }
    return(
      <div>
        <ShareItem retList={this.props.shareList.retList}/>
        <ClickMore actionFunc={this.props.shareDataAction.shareListData} pageIndex={this.props.shareList.pageIndex} pageSize={this.props.shareList.pageSize} total={this.props.shareList.total} iconFlag={this.props.moreFlag}/>
      </div>
    )
  }
});
export  default createActionContainer({
  shareList:'shareList',
  pageFlag:'pageFlag',
  moreFlag:'moreFlag',
},{
  shareDataAction
}) (Share);
