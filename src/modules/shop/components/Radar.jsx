import { createContainer, createRootContainer } from 'Roof';
import React from 'react';
import echarts from 'echarts';
import IndustryState from './IndustryState';
//引入样式
import '../css/radar.less';

const Radar =React.createClass({

  componentDidMount(){
    let max=100;
    let radar =echarts.init(this.refs['radar']);
    let option = {
      tooltip: {
        show: false,
      },
      radar: {
        radius:'100%',
        name: {
          show: false,
          textStyle: {
            color: '#fff',
            fontStyle: 'normal',
            fontFamily: 'sans-serif',
            fontSize:0,
          },
        },
        splitNumber:1,
        z:0,
        indicator: [
          { name: '购物', max: max},
          { name: '娱乐', max: max},
          { name: '丽人', max: max},
          { name: '美食', max: max},
          { name: '生活', max: max},
          { name: '旅游', max: max},
        ],

        axisLine: {
          show: true,
          lineStyle: {
            color: '#ff9468',
            width: 1,
            type: 'solid',
          },
        },

        splitLine: {
          show: true,
          lineStyle: {
            color: ['#ff9468'],
            width: 1,
            type: 'solid',
          },
        },

        splitArea: {
          show: true,
          areaStyle: {
                opacity:0,
            },
        },
      },
      series: [{
        type: 'radar',
        lineStyle:{
          normal:{
            color:'#ff9468'
          }
        },
        data : [
          {
            value : [0, 0, 0, 0, 0,0],
            name : '消费占比',
            symbol:'circle',
            symbolSize:0,
            lineStyle: {
            normal: {
              color: '#000',
              width: 0,
            }
            },
            areaStyle: {
              normal: {
                opacity: 0.3,
                color: '#fff'
              }
            },
            silent:true,
          }
        ]
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    radar.setOption(option);
  },

  render(){
    return(
      <div className="radarContainer">
        <div>
          <div ref="radar" className="radar"></div>
          <IndustryState
            className="icon icon1"
            name="餐饮" iconName="dining"
          />
          <IndustryState
            className="icon icon2"
            name="生活" iconName="consumable"
          />
          <IndustryState
            className="icon icon3"
            name="零售" iconName="cloth"
          />
          <IndustryState
            className="icon icon4"
            name="美容" iconName="facial"
          />
          <IndustryState
            className="icon icon5"
            name="娱乐" iconName="entertainment"
          />
          <IndustryState
            className="icon icon6"
            name="住行" iconName="tour"
          />
          <p className="total">¥{this.props.consumeData.totalMount}</p>
        </div>
      </div>
    )
  }
});

export default createContainer({
  consumeData:'consumeData',
})(Radar);
