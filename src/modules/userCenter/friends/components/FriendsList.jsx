import React from 'react';
import KList from './KList';
import friendAction from '../../../../actions/friends';
import {createActionContainer } from 'Roof';
import CommonPage from '../../../../components/commonPage/CommonPage';
import ClickMore from '../../../../components/clickMore/ClickMore';
const FriendsList=React.createClass({
    componentWillMount(){
      this.props.setStoreState({
        pageFlag:false,
      });
    },
    render(){

      let list=[];
      if(this.props.friendList.recommendDatas!= '' && this.props.friendList.recommendDatas!=null && this.props.friendList.recommendDatas.length >0){
        this.props.friendList.recommendDatas.forEach((item,index)=>{
          list.push(<KList key={index} value={item} />);
        });
      }else{
        list.push(<CommonPage key={1}/>)
      }
        return(
          <div>
            {list}
           <ClickMore actionFunc={this.props.friendAction.friendsListData} pageIndex={this.props.friendList.pageIndex} pageSize={this.props.friendList.pageSize} total={this.props.friendList.total} iconFlag={this.props.moreFlag}></ClickMore>
          </div>

        )
    }
});
export default createActionContainer({
  friendList:'friendList',
  pageFlag:'pageFlag',
  moreFlag:'moreFlag'
},{
  friendAction,
})(FriendsList);
