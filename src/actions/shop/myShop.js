import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
const ajax = Utils.ajax;

const API = {
  LOAD  :'/shop/getMyShopInfo.do',
};

const shopInfoData = {
  //加载消费数据
  loadShopInfo(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD,
      data  :payload,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        setState({
          myShopListInfo:resp.data.myShopInfo,
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },
};

export default shopInfoData;
