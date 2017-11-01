import React from 'react';
import '../css/footer.less';
const Footer =React.createClass({
  getDefaultProps(){
  return{
    content:'default'
  }
},
   render(){
     return(
       <div className="bfooter">
         <div className="footerBtn">{this.props.content}</div>
       </div>
     )
   }
});
export default Footer;
