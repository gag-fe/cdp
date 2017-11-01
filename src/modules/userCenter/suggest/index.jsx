import React from 'react';
import  Suggestions from './components/Suggestions'
const Suggest=React.createClass({
  render(){
    document.setTitle('反馈建议');
    return(
      <div><Suggestions></Suggestions></div>
    )
  }
});
export  default Suggest;
