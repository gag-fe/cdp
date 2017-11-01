import Utils from '../utils/index';
const ajax = Utils.ajax;
import {hashHistory} from 'react-router';
import $ from 'jquery';
import Cookies from 'js-cookie';
const API = {
  billList: '/bill/getMysBillList.do', //全部订单
  goInvoice: '/invoice/goInvoiceByBillId.do', //开发票入口
  invoicedBillList: '/bill/getInvoicedBillList.do',  //已开发票list
  unInvoicedBillList: '/bill/getUnInvoiceBillList.do', //未开发票list
  checkPage:'/invoice/checkIfCombineInvoice.do',   //开发票还是合并开发票
  searchByParam:'/billSearch/selBillsByShop.do',   //搜索，筛选
};
var billList=[];
var myBillAll = [];
var invoicedBillList = [];

const myBillAction = {


  //开发票还是合并开发票
  checkPage(param, {setState, getState}){
    ajax({
      url: window.API_URL + API.checkPage,
      data: {
        shopEntityId: param.shopEntityId,
      },
      method: 'post',
      type: 'json',
    }).then(resp => {
      if(resp.data.combineFlag){
        hashHistory.push('/userCenter/unInvoiceBill/'+param.shopEntityId);
      }else{

        ajax({
          url: window.INVOICE_API_URL + API.goInvoice,
          data: {
            source: '6',
            tradeId: param.tradeId,
            isCombinedInvoice:'N',
          },
          method: 'post',
          type: 'json',
        }).then(resp => {
          if (resp.boo) {
            if (resp.object.hasHistory) {
              window.location.href = window.INVOICE_API + "/#/target/iHistory/id/" + param.tradeId + '/source/6';
            } else {
              if (resp.object.eleInvoiceChannel !== undefined && resp.object.eleInvoiceChannel === '2') {
                //航信
                window.location.href = resp.object.url;
              } else if (resp.object.eleInvoiceChannel !== undefined && (resp.object.eleInvoiceChannel === '1' || resp.object.eleInvoiceChannel === '3')) {
                //电子发票

                window.location.href = window.INVOICE_API + '/#/target/electronic-invoice/id/' + encodeURIComponent(param.tradeId) + '/source/6?isCom=N';
              } else {
                // 快开发票
                window.location.href = window.INVOICE_API + '/#/target/invoice/id/' + encodeURIComponent(param.tradeId) + '/source/6?isCom=N';
              }

            }

          } else {
            window.location.href = window.INVOICE_API + '/#/target/error/id/null';
          }

        })

      }
    });
  },

  //电子凭证列表（彩单历史账单列表）
  fetchBillList(pageNo, {setState, getState}){
    localStorage.setItem("unFlag","1");
    setState({
      pageFlag:false,
    });
    if (pageNo > 1) {
      setState({
        moreFlag: true
      });
    }

    ajax({
      url: window.API_URL + API.billList,
      data: {
        pageIndex: pageNo,
        pageSize: 10,
      },
      method: 'post',
      type: 'json',
      timeout :10000,
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        if (pageNo == 1) {
          myBillAll = data.billListDatas;
        } else {
          var rows = data.billListDatas;
          if (rows.length > 0) {
            rows.forEach((item, index) => {
              myBillAll.push(item);
            })
          }
        }
        setState({
          billList: {
            pageIndex: pageNo,
            pageSize: data.pageSize,
            total: data.total,
            billListDatas: myBillAll
          },
          moreFlag: false,
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



// 进行搜索、筛选
  searchByParam(param, {setState, getState}){
    if (param.pageIndex > 1) {
      setState({
        moreFlag: true
      });
    };
    setState({
      pageFlag:false,
    });
    ajax({
      url:window.API_URL+API.searchByParam,
      type:'JSON',
      data:{
        keyword:param.keyword,
        pageIndex:param.pageIndex,
        pageSize:10,
        searchType:param.searchType,
        invoiceStatus:param.status,
      },
      method:'post',
      timeout :10000,
    }).then(resp =>{
      if (resp.status == 'S') {
        let data = resp.data;
        if (param.pageIndex == 1) {
          billList = data.billListDatas;
        } else {
          var rows = data.billListDatas;
          if (rows.length > 0) {
            rows.forEach((item, index) => {
              billList.push(item);
            })
          }
        }
        setState({
          billList: {
            pageIndex: param.pageIndex,
            pageSize: data.pageSize,
            total: data.total,
            billListDatas: billList
          },
          moreFlag: false,
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

  //已开发票list
  getInvoicedList(pageNo, {setState, getState}){
    setState({
      pageFlag:false,
    });
    if (pageNo > 1) {
      setState({
        invoicedFlag: true
      });
    }
    ajax({
      url: window.API_URL + API.invoicedBillList,
      data: {
        pageIndex: pageNo,
        pageSize: 10,
      },
      method: 'post',
      type: 'json',
      timeout :10000,
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        if (pageNo == 1) {
          invoicedBillList = data.billListDatas;
        } else {
          var rows = data.billListDatas;
          if (rows.length > 0) {
            rows.forEach((item, index) => {
              invoicedBillList.push(item);
            })
          }
        }
        setState({
          invoicedBillList: {
            pageIndex: pageNo,
            pageSize: data.pageSize,
            total: data.total,
            rows: invoicedBillList
          },
          invoicedFlag: false,
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

  //未开发票账单列表

  getUnInvoicedList(pageNo, {setState, getState}){
    ajax({
      url: window.API_URL + API.unInvoicedBillList,
      data: {},
      method: 'post',
      type: 'json',
      timeout :10000,
    }).then(resp => {
      if (resp.status == 'S') {
        let data = resp.data;
        setState({
          unInvoicedBillList: data.unInvoiceBill,
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
export  default  myBillAction;

