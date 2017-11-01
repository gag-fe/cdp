/**
 * Created by kana on 16/11/29.
 */
import Utils from '../utils/index';
const ajax = Utils.ajax;
const API={
  shareList:'/my/myshare.do'
};
var tempList = [];
const shareDataAction = {
  //我的分享列表
  shareListData(pageNo, {setState, getState}){
    if (pageNo > 1) {
      setState({
        moreFlag: true
      });
    }
    ajax({
      url: window.API_URL+API.shareList,
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
        let data =  resp.data;
        if(pageNo == 1){
          tempList = data.rows;
        }else{
          if(data.rows.length >0){
            data.rows.map((item, idx) =>{
              tempList.push(item);
            });
          }
        }
        console.log(tempList);
        setState({
          shareList:{
            pageIndex: pageNo,
            pageSize: data.pageSize,
            total: data.total,
            retList:tempList,
          },
          pageFlag:true,
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
  }
};
export  default shareDataAction;
