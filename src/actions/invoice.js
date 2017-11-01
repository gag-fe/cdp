/**
 * Created by kana on 16/11/29.
 */
import Utils from '../utils/index';
import {Toast} from 'antd-mobile';
import { hashHistory } from 'react-router';
const ajax = Utils.ajax;
const API={
  invoiceListUrl:'/invoice/getMyInvoiceTitleList.do',
  invoiceHistoryUrl:'/invoice/getInvoiceHistory.do',
  invoiceDetail:'/invoice/getInvoiceTitleDetail.do',
  delUrl:'/invoice/delInvoiceTitle.do',
  addInvoiceUrl:'/invoice/addInvoiceTitle.do',
  editInvoiceUrl:'/invoice/updateInvoiceTitle.do',
  associateUrl:'/invoice/associate.do',
};
const  invoiceAction={
  //发票抬头列表
  invoiceTitleData(pageNo, {setState, getState}){
    ajax({
      url: window.API_URL+API.invoiceListUrl,
      data:{},
      method: 'post',
      type: 'json',
      timeout:10000,
    }).then(resp => {
      if (resp.status == 'S') {

        let titleP = resp.data.invoiceTitleDataP;
        let titleZ = resp.data.invoiceTitleDataZ;
        setState({
          invoiceTitleListP:titleP,
          invoiceTitleListZ:titleZ,
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
  },

  //发票历史列表
  invoiceHistoryData(pageNo,{setState,getState}){
    ajax({
      url: window.API_URL+API.invoiceHistoryUrl,
      data:{},
      method: 'post',
      type: 'json',
      timeout:10000
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data.invoiceHistoryData;
        setState({
          invoiceHistoryList:data,
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
  },

  //发票详情
  invoiceDetailData(id,{setState,getState}){
      ajax({
        url: window.API_URL+API.invoiceDetail+'?invoiceTitleId='+id,
        data:{},
        method: 'post',
        type: 'json',
      }).then(resp => {
        if (resp.status == 'S') {
          let data = resp.data.invoiceData;
          setState({
            invoice:data,
          });
          hashHistory.push("/userCenter/invoiceHeaderDetail/"+id);
          document.setTitle('抬头详情');
        }
      })
  },
  //删除发票抬头
  delInvoiceData(id,{setState,getState}){
    ajax({
      url: window.API_URL+API.delUrl,
      data:{
        invoiceTitleId:id
      },
      method: 'post',
      type: 'json',
    }).then(resp => {
      if (resp.status == 'S') {
        Toast.info('删除成功',1,()=>{
          hashHistory.push("/userCenter/invoiceHeader");
          document.setTitle('管理抬头');
        });
      }
    })
  },
  //添加修改发票抬头
  updateInvoiceData(id,{setState,getState}){
    console.log(getState().invoice);
    if(id !='0'){
      ajax({
        url: window.API_URL+API.editInvoiceUrl,
        data:getState().invoice,
        method: 'post',
        type: 'json',
      }).then(resp => {
        if (resp.status == 'S') {
          Toast.info('修改成功',1,()=>{
            hashHistory.push("/userCenter/invoiceHeaderDetail/"+id);
            document.setTitle('管理抬头');
          });
        }
      })
    }else{
      ajax({
        url:window.API_URL+ API.addInvoiceUrl,
        data:getState().invoice,
        method: 'post',
        type: 'json',
      }).then(resp => {
        if (resp.status == 'S') {
          Toast.info('添加成功',1,()=>{
            hashHistory.push("/userCenter/invoiceHeaderDetail/"+resp.data.InvoiceTitleId);
            document.setTitle('管理抬头');
          });
        }
      })
    }

  },

  //联想接口
  searchAssociate(name,{setState,getState}){
     ajax({
       url:window.INVOICE_API_URL+API.associateUrl,
       type:'JSON',
       data:{
         custName:name,
       },
       method:'post',
     }).then(resp =>{
       if(resp.status == 'S'){
         setState({
           dataList:resp.data,
           dataFlag:true
         });
       }
     })
  },
};
export  default  invoiceAction;
