import React from 'react';
import StarShow from './StarShow';
import '../css/shopEntityList.less';
import ZheIcon from './ZheIcon';
import QuanIcon from './QuanIcon';
import { createContainer } from 'Roof';
const ShopEntityList=React.createClass({
  redirectShop(){
    this.context.router.push("/shopDetail/"+this.props.value.shopEntityId+'/111');
    this.props.setStoreState({
      keyFlag:true,
    })
  },
  contextTypes: {
    router: React.PropTypes.object
  },
 render(){
   if(this.props.value.score == undefined || this.props.value.score == null || this.props.value.score=='' || this.props.value.score <= 0){
     this.props.value.score=3;
   }
   return (
   <div className="shopEntityList"  onClick={this.redirectShop}>
     <div className="shopEntityImg">
       <img  src={this.props.value.shopLogoImg}/>
     </div>
     <div  className="shopEntityText">
       <h2>{this.props.value.shopEntityName}{this.props.value.discountSign ?<ZheIcon/>:''}{this.props.value.couponSign ? <QuanIcon/> : ''}</h2>
       <div>
         <StarShow count={this.props.value.score}/>
         <span className="avg">{this.props.value.averConsume ? '￥'+this.props.value.averConsume+'/人 ':''}</span>
       </div>
       <p>件单价:<span>{this.props.value.singlePrice ? '￥'+this.props.value.singlePrice :'未知'}</span>
         {/*回头指数:<label>{this.props.value.backIndex ? this.props.value.backIndex+'%' :''}</label>*/}
       </p>
     </div>

   </div>
   )
 }

});
export  default createContainer({
  keyFlag:'keyFlag',
})(ShopEntityList) ;
