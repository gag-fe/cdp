import React from 'react';
import {Popup, List, InputItem, WhiteSpace, Toast} from 'antd-mobile';
import './css/billSearch.less';
import {createActionContainer} from 'Roof';
import billSearchAction from '../../../actions/billSearch';
import DZButton from './components/DZButton';
import {hashHistory}  from 'react-router';
const delIcon = require('../../../img/delete@4x.png');
var isHave = false;

const BillSearch = React.createClass({
  getInitialState(){
    return {
      temp: true,
    }
  },
  componentWillMount(){
    this.props.billSearchAction.getShopOnConsume();
    document.setTitle('电子凭证');
    this.props.setStoreState({
      searchVal: "",
      sDataFlag: false,
    })
  },
  inputVal(event){
    if(event){
      // 查询企业信息
      if (this.props.searchVal !== event) {
        this.props.billSearchAction.getShopOnKeyWords(event);
      }
      this.props.setStoreState({
        searchVal: event
      });
    }else{
      this.props.setStoreState({
        searchVal:'',
        sDataFlag: false
      });
      var oInput = document.getElementsByTagName('input')[0];
      oInput.focus();
    }
  },

  search(){
    if (this.props.searchVal) {
      if (localStorage.getItem('name')) {
        var list = localStorage.getItem('name').split(",");
        list.map((value, k)=> {
          if (value === this.props.searchVal) {
            isHave = true;
          }
        });
        if (!isHave) {
          list.push(this.props.searchVal);
        }
        localStorage.setItem('name', list.join(","));
      } else {
        localStorage.setItem('name', this.props.searchVal);
      }
      hashHistory.push('userCenter/myBill/K');
    } else {
      Toast.info('请输入搜索的店铺名', 2);

    }
  },
  delSearch(){
    Popup.show(<div className="dzPopup">
      <div className="title">温馨提示</div>
      <div className="cont">确认删除全部历史记录？</div>
      <div className="btn_group">
        <div className="btn" onClick={this.onClose}>取消</div>
        <div className="btn delete" onClick={this.deleleFunc}>确认</div>
      </div>
    </div>, {maskClosable: false});

  },
  onClose(){
    Popup.hide();
  },
  deleleFunc(){
    localStorage.clear();
    this.setState({
      temp: false,
    });
    Popup.hide();
  },

  getCon(data){
    this.props.setStoreState({
      searchVal: data.shopName
    });
    this.props.setStoreState({
      sDataFlag: false,
    });
    if (localStorage.getItem('name')) {
      var list = localStorage.getItem('name').split(",");
      list.map((value, k)=> {
        if (value === data.shopName) {
          isHave = true;
        }
      });
      if (!isHave) {
        list.push(data.shopName);
      }

      localStorage.setItem('name', list.join(","));
    } else {
      localStorage.setItem('name', data.shopName);
    }
    hashHistory.push('userCenter/myBill/K');
  },

  render(){
    // 联想
    var slist = [];
    if (this.props.searchRecords) {
      this.props.searchRecords.map((item, idx)=> {
        if (item.shopName != '') {
          slist.push(<div className='item' key={item.shopId} onClick={this.getCon.bind(this, item)}>
            <span>{item.shopName}</span>
          </div>)
        }

      })
    }

    var searchStr = '';
    var searchList = [];
    var shopstr = '';
    var shopList = [];
    if (this.props.shopRecordLists && this.props.shopRecordLists.length > 0) {
      this.props.shopRecordLists.map((item, index)=> {
        shopList.push(<DZButton name={item.shopName} key={index} id={item.shopId} status="search"/>)
      });
      shopstr = <div className="shopList">
        <div className="title">最近商家</div>
        {shopList}
      </div>
    }

    // 历史搜索
    if (localStorage.getItem('name')) {
      var tempList = localStorage.getItem('name').split(",");
      tempList.map((value, k)=> {
        searchList.push(<DZButton name={value} key={k}/>)
      });
      searchStr = <div className="search_history">
        <div className="title"><span>历史搜索</span> <img src={delIcon} className="delIcon" onClick={this.delSearch}/></div>
        {searchList}
      </div>
    }
    return (
      <div className="billSearch">
        <div>
          <List>
            <InputItem
              value={this.props.searchVal}
              clear
              placeholder="请输入店铺名进行搜索"
              onChange={this.inputVal}
              autoFocus
            ></InputItem>
          </List>
          <span className="searchBtn" onClick={this.search}>搜索</span>
        </div>
        <div className="append" style={{'display': this.props.sDataFlag ? 'block' : 'none'}}>
          {slist}
        </div>

        {searchStr}
        {shopstr}
      </div>
    )
  }
});
export  default createActionContainer({
  searchVal: 'searchVal',
  shopRecordLists: 'shopRecordLists',
  searchRecords: 'searchRecords',
  sDataFlag: 'sDataFlag',
}, {
  billSearchAction
})(BillSearch);
