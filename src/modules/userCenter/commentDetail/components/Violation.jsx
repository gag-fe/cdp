import  React from 'react';
import '../css/violation.less';

const Violation=React.createClass({
  render(){
    return (<div className="violation">
      您的评论涉及违规内容，已被下线
    </div>)
  }
});
export default Violation;
