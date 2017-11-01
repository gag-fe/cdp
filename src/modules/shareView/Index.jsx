import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import {Button} from 'antd-mobile';
import ShareViewHeader from './components/ShareViewHeader';
import ShareViewDetail from './components/ShareViewDetail';
import CommentContainer from './components/CommentContainer';
import DishCommend from './components/DishCommend';
import shareActions from '../../actions/shop/share';

import Cookies from 'js-cookie';
import Jquery from 'jquery';
const API = {
  WX_AOAUTH: '/qwx/AJAXoauth.do'
};

const ShareView = React.createClass({
  componentWillMount(){
    document.setTitle('分享详情');
    //加载详情信息
    this.props.shareActions.loadShareDetail({shareId:this.props.params.shareId});
  },

  componentDidMount(){
    let self=this;
    // openid存在
    if(Cookies.get('openid')){
      self.props.shareActions.addFriendShare({
        shareId:self.props.params.shareId,
        openId:Cookies.get('openid'),
      });
    }else{//openid不存在，去获取openid
      let codeVal = window.GetRequest('code');
      if (codeVal) {
        Jquery.ajax({
          url: window.WX_URL + API.WX_AOAUTH,
          data: {
            appid: window.appId,
            code: codeVal,
            authType: '1'
          },
          method: 'post',
          type: 'json',
        }).then(resp => {
          let res = JSON.parse(resp);
          if (res.status == 'sucess') {
            Cookies.set('openid', res.openid);
            //添加好友力荐
            self.props.shareActions.addFriendShare({
              shareId:self.props.params.shareId,
              openId:res.openid,
            });
          }
        });
      }
    }
  },

  _onEnterShop(){
    this.context.router.push("/shopDetail/"+this.props.shareInfo.shopEntityId+'/111');
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  render() {
    if(JSON.stringify(this.props.shareInfo)=='{}'){
      return <div></div>;
    }else{
      return (
        <div>
          <ShareViewHeader shareInfo={this.props.shareInfo}/>
          <ShareViewDetail shareInfo={this.props.shareInfo}/>
          <CommentContainer shareInfo={this.props.shareInfo}/>
          <DishCommend shareInfo={this.props.shareInfo}/>
          <Button className="gag_button" onClick={this._onEnterShop}>进店看</Button>
        </div>
      );
    }
  }
});

export default createActionContainer({
  shareInfo:'shareInfo'
},{
  shareActions
})(ShareView);
