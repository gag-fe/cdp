import  React from 'react';
import {createActionContainer} from 'Roof';
import myBillAction from '../../../actions/myBill';
import './css/myBill.less';
import BillItem from './components/BillItem';
import SearchBar from './components/SearchBar';
import CommonPage from '../../../components/commonPage/CommonPage';
import ClickMore from '../../../components/clickMore/ClickMore';
import {Popup} from 'antd-mobile';
const MyBill = React.createClass({
  componentWillMount(){
    Popup.hide();
     if(this.props.params.type == 'A'){
       this.props.myBillAction.fetchBillList('1');
     }else if(this.props.params.type == 'S'){
      //开发票状态筛选
       this.props.myBillAction.searchByParam({'keyword':'','pageIndex':'1','searchType':'1','status':localStorage.getItem('iStatus')});
     }else if(this.props.params.type == 'K'){
       //搜索
       this.props.myBillAction.searchByParam({'keyword':this.props.searchVal,'pageIndex':'1','searchType':'0','status':''});
     }
    _hmt.push(['_trackPageview', '/mygoo/billList']);
  },
  render(){

    document.setTitle('我的电子凭证');
    var listItem=[];
    if (this.props.billList && this.props.billList.billListDatas &&  this.props.billList.billListDatas.length > 0) {
      var billListDatas = this.props.billList.billListDatas;
      billListDatas.map((item, idx)=> {
        listItem.push(<BillItem item={item} key={idx}/>)
      })
    } else {
      return (
         <div>
           <SearchBar/>
           <CommonPage></CommonPage>
         </div>
        )
    }

      return (
        <div className="eleCert">
          <SearchBar/>
          {listItem}
          <ClickMore pageIndex={this.props.billList.pageIndex} pageSize={this.props.billList.pageSize}
                     total={this.props.billList.total} actionFunc={this.props.params.type == 'A' ? this.props.myBillAction.fetchBillList :this.props.myBillAction.searchByParam}
                     iconFlag={this.props.moreFlag} type={this.props.params.type}/>
        </div>)
  }
});
export  default createActionContainer({
  billList: 'billList',
  moreFlag: 'moreFlag',
  pageFlag:'pageFlag',
  searchVal: 'searchVal',
},{
  myBillAction
})(MyBill)
