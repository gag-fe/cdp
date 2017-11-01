import Utils from '../utils/index';
import {Toast} from 'antd-mobile';
import Permission from '../components/permission/index';
import {hashHistory} from 'react-router';
const ajax = Utils.ajax;

const API = {
  List: '/my/mycolls.do',
  cancle: '/my/cancelcoll.do',
};
var shopList=[];
var goodsList=[];
const collectionsAction = {
  //我的收藏 商户
  loadShopsList(pageIndex, {setState, getState}){
    ajax({
      url: window.API_URL + API.List,
      data: {
        pageIndex: pageIndex,
        topicType: "E"
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

        if(data.pageIndex == 1){
          shopList = data.rows;
        }else{
          if(data.rows.length > 0){
            data.rows.map((item, idx) =>{
              shopList.push(item);
            });
          }
        }

        setState({
          shopObj: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            total: data.total,
            shopEntityList:shopList
          },
          pageFlag:true,
        })
      }
      else{
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

  //我的收藏 单品
  loadGoodsList(pageIndex, {setState, getState}){
    ajax({
      url: window.API_URL + API.List,
      data: {
        pageIndex: pageIndex,
        topicType: "G"
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
        if(data.pageIndex == 1){
          goodsList = data.rows;
        }else{
          if(data.rows.length > 0){
            data.rows.map((item, idx) =>{
              goodsList.push(item);
            });
          }
        }
        setState({
          goodsObj: {
            pageIndex: data.pageIndex,
            pageSize: data.pageSize,
            total: data.total,
            goodsList:goodsList,
          },
          pageFlag:true,
        })
      }
      else{
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

  //取消收藏
  cancelColl(id, {setState, getState}){
    ajax({
      url: window.API_URL + API.cancle,
      data: {
        id: id,
        topicType: 'G'
      },
      method: 'post',
      type: 'json',
      xhrFields: {
        withCredentials: true
      },
      crossDomain: true,
    }).then(resp => {
      if (resp.status == 'S') {
        Toast.info("已取消收藏!", '1',()=>{
        });
      }else{
        Toast.info("取消收藏失败!", '1');
      }
    })
  },
};
export  default collectionsAction;
