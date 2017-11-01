import Utils from '../utils/index';
const ajax = Utils.ajax;
import {hashHistory} from 'react-router';
const API = {
  shopByKeyWord:'/billSearch/getShopOnKeyword.do',
  shopLists: '/billSearch/getShopOnConsume.do',
};

const BillSearch={
  //最近商家
  getShopOnConsume(param, {setState, getState}){
    ajax({
      url:window.API_URL+API.shopLists,
      type:'JSON',
      data:{
      },
      method:'post',
    }).then(resp =>{
      if(resp.status == 'S'){
        setState({
          shopRecordLists:resp.data.shopRecords,
        });
      }
    })
  },

  //搜索联想
  getShopOnKeyWords(param, {setState, getState}){
    ajax({
      url: window.API_URL + API.shopByKeyWord,
      type: 'JSON',
      data: {
        keyword:param
      },
      method: 'post',
    }).then(resp => {
      if (resp.status == 'S') {
        setState({
          searchRecords: resp.data.shopRecords,
          sDataFlag:true
        });
      }
    })
  },

};
export default BillSearch;
