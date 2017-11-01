import  React from 'react';
import {SwipeAction} from 'antd-mobile';
import {createContainer, createActionContainer} from 'Roof';
import ShopNameList from  '../../friends/components/ShopNameList';
import StarList from  '../../friends/components/StarList';
import ContentDesc from  '../../friends/components/ContentDesc';
import '../../friends/css/kList.less';
import shareDataAction from '../../../../actions/share';

const shareDefItem = require('../../../../img/shopLogo.jpg');
const ShareItem = React.createClass({

  _clickShopName(shopEntityId){
    if(shopEntityId !=null && shopEntityId !='' && shopEntityId!=undefined){
      this.context.router.push("/shopDetail/"+shopEntityId+'/111');
    }
  },
  contextTypes: {
    router: React.PropTypes.object
  },

  render(){
    var allItems=[];
    var retListData = this.props.retList;
    if (retListData != null && retListData != '' && retListData != undefined && retListData.length > 0) {
      retListData.map((item, index) => {
        var goodsName = [];
        if (item.goodsInfo && item.goodsInfo.length > 0) {
          item.goodsInfo.map((list, idx) => {
            goodsName.push(<span key={idx}>{list.goodsName}</span>);
          });
        }
        if (item.shopLogImg == '' ||item.shopLogImg == null ||item.shopLogImg == undefined) {
          item['shopLogImg'] = shareDefItem;
        }

        allItems.push(
          <div key={index} className="kList" style={{borderBottom: '0.1rem solid #f2f2f2'}} onClick={this._clickShopName.bind(this,item.shopEntityId)}>
            <div className="gagList">
              <ShopNameList value={item.shopEntityName} img={item.shopLogImg} shopId={item.shopEntityId}/>
              <StarList count={item.score} date={item.operateDate} dateName="分享日期"></StarList>
              <div className="row_1">
                {item.averConsume ? '￥' + item.averConsume + '/人' : ''}
              </div>
              <ContentDesc desc={item.content}/>
              <div className="row_3">{goodsName}</div>
            </div>
          </div>
        );
      });
    }

    return (
      <div>
        {allItems}
      </div>
    )
  }
});
export  default createActionContainer({
  shareList: 'shareList'
}, {
  shareDataAction
})(ShareItem);
