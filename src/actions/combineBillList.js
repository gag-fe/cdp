import Utils from '../utils/index';
const ajax = Utils.ajax;
const API={
  combineBillListUrl:'/invoice/getCombineUnInvoiceBillList.do',
  goInvoice: '/invoice/goInvoiceByBillId.do', //开发票入口
};
const combineBillAction={
  combineBillList(param,{setState,getState}){
    ajax({
      url:window.API_URL+API.combineBillListUrl,
      type:'JSON',
      data:{
        shopEntityId:param,
      },
      method:'post',
    }).then(resp =>{
      if(resp.status == 'S'){
        setState({
          combineList:resp.data.billListDatas,
        });
      }
    })
  },


  //开发票入口
  goInvoice(param, {setState, getState}){
    ajax({
      url: window.INVOICE_API_URL + API.goInvoice,
      data: {
        source: '6',
        tradeId: param.tradeId,
        isCombinedInvoice: param.isCombinedInvoice,
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

            window.location.href = window.INVOICE_API + '/#/target/electronic-invoice/id/' + encodeURIComponent(param.tradeId) + '/source/6?isCom=' + param.isCombinedInvoice;
          } else {
            // 快开发票
            window.location.href = window.INVOICE_API + '/#/target/invoice/id/' + encodeURIComponent(param.tradeId) + '/source/6?isCom=' + param.isCombinedInvoice;
          }

        }

      } else {
        window.location.href = window.INVOICE_API + '/#/target/error/id/null';
      }

    })
  },

};
export default combineBillAction;
