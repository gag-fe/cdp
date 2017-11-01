import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import { Icon } from 'antd-mobile';
//引入样式
import '../css/searchHeader.less';

const SearchHeader =React.createClass({
  getInitialState(){
    return{
      docked:false,
    }
  },

  //跳转搜索页
  _search(){
    this.context.router.push("/shopSearch");
  },

  //下拉收缩toggle
  _onDock(){
    this.props.setStoreState({
      docked: !this.props.getStoreState().docked,
    });
    //禁止or允许 滑动
    this.props.getStoreState().outContainer.style.position=
      (this.props.getStoreState().docked)?'fixed':'static';
  },

  contextTypes: {
    router: React.PropTypes.object
  },

  render(){
    return (
      <div className='searchBarMain'>
        <div>
          <div  onClick={this._search}
                style={{display:this.props.docked?'none':'inline-block'}}
          >
            <span className="img"></span>
            <span>输入店铺名或品牌</span>
          </div>
        </div>
        {/*<span className="extends" onClick={this._onDock}>{this.props.docked?'收起指数':'消费指数'}</span>*/}
      </div>
  )
  }
});

export default createContainer({
  docked:'docked',
  outContainer:'outContainer',
})(SearchHeader);
