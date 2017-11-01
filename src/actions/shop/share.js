import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
const ajax = Utils.ajax;

const API = {
  LOAD  :'/share/getShareDetail.do',
  LOAD_DISH:'/share/initShareGoods.do',
  SHARE:'/share/addShare.do',
  ADDSHARE:'/recommend/addRecommend.do',
};

const shareData = {
  //加载分享详情落地页
  loadShareDetail(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          shareInfo:resp.data.shareInfo,
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },

  //加载可以分享的单品
  loadShareDish(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD_DISH,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        let goodsData;
        if(resp.data.goodsData){
          goodsData=resp.data.goodsData;
        }else{
          goodsData=[];
        }
        setState({
          goodsData:goodsData
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },

  //分享的单品or心得or店铺
  share(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.SHARE,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      console.log(resp.status);
    }).catch(err=>{
      Permission(err)
    });
  },


  //添加好友力荐
  addFriendShare(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.ADDSHARE,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      console.log(resp.status);
    }).catch(err=>{
      Permission(err)
    });
  },
};

export default shareData;
