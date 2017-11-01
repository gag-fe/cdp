import { createContainer, createRootContainer } from 'Roof';
import React from 'react';

//引入样式
import '../css/consumeLists.less'

const ConsumeLists =React.createClass({

  render(){
    let consumeLists=[];
    let id=0;
    if(this.props.getStoreState().consumeList.consumeProducts){
      this.props.getStoreState().consumeList.consumeProducts.forEach(({name, price})=> {
        id++;
        consumeLists.push(
        <div className="consumeList" key={id}>
          <span className="listId">{id}</span>
          <span className="describe">{name}</span>
          <span className="price">{price}</span>
        </div>)
      });
      id=0;
    }

    return(
      <div className="mainLists">
        <p>{this.props.consumeList.consumeType}消费排行榜</p>
        {consumeLists}
      </div>
    )
  }
});

export default createContainer({
  consumeList:'consumeList'
})(ConsumeLists);

