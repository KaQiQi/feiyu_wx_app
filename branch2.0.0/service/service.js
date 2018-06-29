const headjs = require('../utils/head.js');
//var baseurl = "http://apitest.topshopstv.com/";
// 'feiyu-useragent': ua
function reqData(url, data, doSuccess, fail,pageParameter) {
  var ua = headjs.getUseragent();
  var requrl = getApp().globalData.baseurl + url;
  var from_user_id = wx.getStorageSync('from_user_id');
  var user_id = wx.getStorageSync('wx_id');
  var from_member_id = wx.getStorageSync('from_member_id');
  var register_channel = wx.getStorageSync('register_channel');
  var member_id = wx.getStorageSync('member_id');
  // console.log(member_id);
  if (!from_user_id){
    from_user_id=''
  }
  if (!from_member_id) {
    from_member_id = ''
  }
  if (!register_channel) {
    register_channel = ''
  }
  if (!user_id) {
    user_id = ''
  }
  data.user_id = user_id;
  data.from_user_id = from_user_id;
  data.from_member_id = from_member_id; 
  // data.from_member_id = "13699";
  data.register_channel = register_channel;
  data.topshopstv_appid = 3;
  if (pageParameter==1) {//1页面请求数据
    wx.showLoading({
      title: '加载中',
    })
  };
  wx.request({
    url: requrl,
    method: 'GET',
    data: data,
    header: {
      'topshopstv-useragent': ua,
    },
    success: function (res) {
      console.log(res);
      if (pageParameter == 1){
        wx.hideLoading();
      }
      if (res.data.returnCode == 0) {
        doSuccess(res);
      } else if (res.data.returnCode == 1) {
        doSuccess(res);
      }else if (res.data.returnCode == 2) {
        doSuccess(res);
      }else if (res.data.returnCode == 3) {
        doSuccess(res);
      } else if(res.data.returnCode == "-1000003"){
        doSuccess(res);
      }else if (res.data.returnCode == 200){
        doSuccess(res)
      } else if (res.data.returnCode == "5001") {//用户已经是窖主
        doSuccess(res)
      } else if (res.data.returnCode == "5002") {//店铺正在创建中
        doSuccess(res)
      } else{
        wx.showToast({
          title: res.data.message
        })
      }
    },
    fail: function (failRes) {
      wx.hideLoading();
      
      wx.getNetworkType({
        success: function (res) {
          // 返回网络类型, 有效值：
          // wifi/2g/3g/4g/unknown(Android下不常见的网络类型)/none(无网络)
          var networkType = res.networkType
          console.log(networkType);
          if (networkType == "none") {
            console.log("请检查网络状况3" + networkType);
            
            fail(networkType)
          }else{
            fail(failRes)
          }
        },
      })

     
    }
  })

}

module.exports = {
  reqData: reqData,
}