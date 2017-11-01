import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
const ajax = Utils.ajax;

const API = {
  LOAD  :'/shop/getMyShopEntityDetail.do',
  ADD_COLLECT:'/my/addcoll.do',
  CANCLE_COLLECT:'/my/cancelcoll.do',
};

const shopDetailData = {
  //加载商家详情
  loadShopDetail(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          shopDetail:resp.data.shopEntityDetail,
          isLogin:resp.data.isLogin,
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },

  //收藏店铺 or 单品
  collectShop(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.ADD_COLLECT,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        //收藏商家
        if(payload.topicType=='E'){
          setState({
            shopDetail:Object.assign({},getState().shopDetail,{
              collectId:resp.data.ret,
              hasCollected:true,
            })
          });
        }
        //收藏单品
        if(payload.topicType=='G'){
          let carouselPictures=[];
          getState().carouselPictures.forEach((item)=>{
            if(item.goodsId==payload.goodId){
              item=Object.assign({},item,{
                collectId:resp.data.ret,
                isCollected:true,
              })
            }
            carouselPictures.push(item);
          });

          setState({
            carouselPictures:carouselPictures,
            })
        }
      }
    }).catch(err=>{
      if(err.status=='F'){
        return err.msg;
      }
      if(err.status=='T'){
        return err.msg;
      }
    });
  },

  //取消收藏
  cancelCollect(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.CANCLE_COLLECT,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        //取消商家
        if(payload.topicType=='E'){
          setState({
            shopDetail:Object.assign({},getState().shopDetail,{
              hasCollected:false,
            })
          });
        }

        //取消单品
        if(payload.topicType=='G'){
          let carouselPictures=[];
          getState().carouselPictures.forEach((item)=>{
            if(item.goodsId==payload.goodId){
              item=Object.assign({},item,{
                isCollected:false,
              })
            }
            carouselPictures.push(item);
          });
          setState({
            carouselPictures:carouselPictures,
          });
        }
      }
    }).catch(err=>{
      if(err.status=='F'){
        return err.msg;
      }
      if(err.status=='T'){
        return err.msg;
      }
    });
  },

};

export default shopDetailData;
