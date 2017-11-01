import React from 'react';
import FriendsList  from  './components/FriendsList';
import { createActionContainer } from 'Roof';
import friendAction from '../../../actions/friends';
const Friends=React.createClass({
  componentWillMount(){
    this.props.friendAction.friendsListData(1);
  },
  render(){
    document.setTitle('好友力荐');
    return(
      <div><FriendsList/></div>
    )
  }
});
export default createActionContainer({
},{
  friendAction,
})(Friends);
