import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
const ajax = Utils.ajax;

const API = {
  LOAD_ASSOCIATE:'/shop/searchMyShopInfo.do',
  LOAD_SHOP:'/shop/getMyShopSearchResult.do',
  LOAD_HISTORY:'/shop/getSearchHistory.do',
  CLEAR_HISTORY:'/shop/deleteSearchHistory.do',
};

const searchData = {
  //加载搜索联想
  searchAssociate(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD_ASSOCIATE,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        let searchAssociate=resp.data.myShopInfo?resp.data.myShopInfo:[];
        setState({
          searchAssociate:searchAssociate,
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },

  //搜索商家
  searchShop(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD_SHOP,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          myShopListInfo:resp.data.myShopInfo,
          searchShow:true,
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },

  //历史搜索记录
  searchHistory(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD_HISTORY,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          searchHistory:resp.data.searchHistory,
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },

  //清除历史搜索记录
  clearHistory(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.CLEAR_HISTORY,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          searchHistory:[],
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },
};

export default searchData;
