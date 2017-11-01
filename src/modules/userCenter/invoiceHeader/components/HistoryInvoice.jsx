import  React from 'react';
import '../css/historyInvoice.less';
import  '../../../../utils/index';
import { createActionContainer } from 'Roof';
import EmptyPage from '../../emptyPage/EmptyPage';
import  CommonPage from '../../../../components/commonPage/CommonPage';
import invoiceAction from '../../../../actions/invoice';
const seal=require("../../../../img/seal@2x.png");
const seeElec=require("../../../../img/see_elec@2x.png");
const hisImg=require("../../../../img/his-right@2x.png");
const HistoryInvoice = React.createClass({
  seePdf(url){
    window.location.href = url;
  },
  detail_FT(item){
    window.location.href = window.INVOICE_API  + '/#/target/electronic-detail/id/'+encodeURIComponent(item.invoiceUrl)+'?invoiceId='+item.invoiceId;
  },
  componentWillMount(){
    this.props.invoiceAction.invoiceHistoryData();
    document.setTitle('开票历史');
    this.props.setStoreState({
      pageFlag:false,
    });
  },
  render(){
    let invHisList='';
    let returnList=[];
      if(this.props.invoiceHistoryList!=null && this.props.invoiceHistoryList!='' && this.props.invoiceHistoryList.length>0){
        invHisList=this.props.invoiceHistoryList;
        invHisList.forEach((item,index)=>{
          returnList.push(
            <div className="am_hisBg" key={index}>
              <div className="gag_row">
                <span>{item.shopEntityName}</span>
                <label>{item.createTime}</label>
              </div>
              <div className="ihisbg">

                <img className="sealtwobg" src={seal}/>
                <div className="bg_text">
                  <div>发票抬头：<span className="bg_text_right">{item.custName}</span>
                    {(item.eleInvoiceChannel!=undefined && item.eleInvoiceChannel!=null && item.eleInvoiceChannel!='' && item.invoiceStatus == "1") ? (item.eleInvoiceChannel == '3' ? (<span className="see_FT" onClick={this.detail_FT.bind(this,item)}>查看<img style={{"backgroundSize":"8px 16px",'width':'8px',"height":'16px',"position":'relative','top':'3px'}} src={hisImg} /></span>) : (<span className="see_FT" onClick={this.seePdf.bind(this,item.invoiceUrl)}>查看<img style={{"backgroundSize":"8px 16px",'width':'8px',"height":'16px',"position":'relative','top':'3px'}} src={hisImg} /></span>) ) : ''}
                  </div>
                  <div>发票类型：<span className="bg_text_right">{item.invoiceType =='000001' ?'增值税专用发票': (item.invoiceType =='000000'?'增值税普通发票' :'增值税电子发票')}</span></div>
                  <div>发票内容：<span className="bg_text_right">{item.detail}</span></div>
                  <div>开票金额：¥<span className="bg_text_right">{item.invoiceAmount}</span></div>
                  <div>发票状态：<span className="bg_text_right">{(item.invoiceStatus == '0' ||item.invoiceStatus == '9' )? '申请中' :(item.invoiceStatus == '2' ?'开票失败' :(item.invoiceStatus == '3' ? '开票中' :'开票成功'))}</span></div>
                  {item.invoiceType == '000002' ? '' : <div>取票号码：<span className="bg_text_right">{item.verificationCode!=undefined ?item.verificationCode :''}</span></div>}
                  <div>发票代码：<span className="bg_text_right">{item.invoiceCode}</span></div>
                  <div>发票号码：<span className="bg_text_right">{item.invoiceNo}</span></div>
                </div>

              </div>
            </div>
          )

        })
      }else{
        returnList.push(<CommonPage key={1}/>)
      }

    return (
      <div>
        {returnList}
      </div>
    )
  }
});
export default createActionContainer({
  invoiceFlag:'invoiceFlag',
  invoiceHistoryList:'invoiceHistoryList',
  pageFlag:'pageFlag'
},{
  invoiceAction
})(HistoryInvoice);
