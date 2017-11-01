import { createContainer, createActionContainer } from 'Roof';
import React from 'react';
import { Drawer, List, NavBar,Button } from 'antd-mobile';
import Exponent from './components/Exponent';
import SearchHeader from './components/SearchHeader';
import ShopLists from './components/ShopLists';
import RecommendModal from './components/CommendModal';
import shopInfoActions from '../../actions/shop/myShop';
import consumeActions from '../../actions/shop/consume';

import './css/myshop.less';

const MyShop = React.createClass( {
  componentWillMount(){
    this.props.shopInfoActions.loadShopInfo({
      pageIndex:1,
      pageSize:10,
      appId:window.appId,
    });
  },

  componentDidMount(){
    //加载消费信息
    // this.props.consumeActions.loadConsumeData();

    this.props.setStoreState({
      outContainer:this.refs['outContainer']
    });
    document.setTitle('我的商家');
  },
  render() {
    const drawerProps = {
      docked: this.props.docked,
      open: this.props.docked,
      position: 'top'
    };
    return (
      <div>
        <div style={{ height: '100%' }}>
          <div ref='outContainer' style={{width:'100%',zIndex:10}}>
            <SearchHeader />
            <ShopLists />
          </div>
          {/*<div className="drawer-container" style={{display:this.props.docked?'block':'none'}}>*/}
            {/*<Drawer sidebar={<Exponent/>}*/}
                    {/*{...drawerProps}*/}
                    {/*sidebarStyle={{width:'100%',background:'#FF5F24',height:'100%'}}*/}
                    {/*className='exponent'*/}
            {/*>*/}
              {/*<div></div>*/}
            {/*</Drawer>*/}
          {/*</div>*/}
        </div>
        <RecommendModal/>
      </div>
    );
  },
});

export default createActionContainer({
  docked:'docked',
},{
  shopInfoActions,
  // consumeActions,
})(MyShop);



