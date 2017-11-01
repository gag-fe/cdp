import Utils from '../../utils/index';
import Permission from '../../components/permission/index';
const ajax = Utils.ajax;

const API = {
  LOAD  :'/shop/getMyConsumStatisticData.do',
};

const consumeData = {
  //加载消费数据
  loadConsumeData(payload, {setState, getState}){
    ajax({
      url   :window.API_URL+API.LOAD,
      method:'post',
      type  :'json',
    }).then(resp=>{
      if(resp.status=='S'){
        let consumeData=resp.data.consumeData;
        let industryState='cloth';//业态 默认显示'服饰'
        let consumeList;//当前业态下的消费list
        //无消费记录
        if(JSON.stringify(consumeData)=='{}'){
          //无数据初始化
          consumeData={
            consumeCount:0,
            maxMount:0,
            saveMount:0,
            totalMount:0,
          };
          consumeList={
            consumePercent:0,
            consumeType:'服饰'
          };
        }else{//有记录
          //转化icon对应的图标名(英文)
          switch(consumeData.singleTypeConsumeDatas[0].consumeType){
            case '餐饮':industryState='dining';break;
            case '生活':industryState='consumable';break;
            case '零售':industryState='cloth';break;
            case '美容':industryState='facial';break;
            case '娱乐':industryState='entertainment';break;
            case '住行':industryState='tour';break;
          }
          consumeList=consumeData.singleTypeConsumeDatas[0];
        }

        setState({
          consumeData:consumeData,
          industryState:industryState,
          consumeList:consumeList,
        });
      }
    }).catch(err=>{
      Permission(err)
    });
  },
};

export default consumeData;
