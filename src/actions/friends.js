/**
 * Created by kana on 16/11/29.
 */
import Utils from '../utils/index';
import { Toast} from 'antd-mobile';
const ajax = Utils.ajax;
const API={
  friendList:'/recommend/getRecommendByUserId.do',
  delFridendById:'/recommend/deleteRecommendByRecommendId.do'
};
var friLists = [];
const friendsData={
  //好久力荐列表
  friendsListData(pageNo, {setState, getState}){
    if (pageNo > 1) {
      setState({
        moreFlag: true
      });
    }
    ajax({
      url: window.API_URL+API.friendList,
      data: {
        pageIndex:pageNo,
        pageSize:5,
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
      timeout:10000,
    }).then(resp => {

      if (resp.status == 'S') {
        let data = resp.data;
        if (pageNo == 1) {
          friLists = data.recommendDatas;
        } else {
          var rows = data.recommendDatas;
          if (rows.length > 0) {
            rows.forEach((item, index) => {
              friLists.push(item);
            });
          }
        }
        setState({
          friendList:{
            pageIndex:pageNo,
            pageSize: data.pageSize,
            total: data.total,
            recommendDatas: friLists
          },
          pageFlag:true,
          moreFlag: false,
        });
      }else{
        setState({
          pageFlag:true,
        });
      }
    }).catch(()=>{
      setState({
        pageFlag:true,
      });
    })
  },

  //删除好友力荐
  deleteFriendById(id,{setState,getState}){
    ajax({
      url: window.API_URL+API.delFridendById,
      data:{
        recommendId:id,
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        Toast.info("删除成功",'1');
      }else{
        Toast.info("删除失败",'1');
      }
    })
  },

};
export  default friendsData;
