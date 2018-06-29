// pages/my/myCashBack/myCashBack.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnData:'',
    hasData:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  // 存储formid
  sendFormId(e) {
      var that = this;
      // console.log(e)
      var pageurl = e.currentTarget.dataset.url;
      // console.log(pageurl)
      var form_id = e.detail.formId;
      var url = 'api/log/emptynull';
      var data = {
        formid: form_id
      };
      req.reqData(url, data, function () {
        wx.navigateTo({
          url: pageurl,
        })
      }, function () { })
    },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var url = '/api/member/getSumReturnMoney';
    var data = {};
    req.reqData(url, data, function (res) {

      that.setData({
        returnData: res.data.data,
        hasData:1
      })
    }, function () {

    })
  },
  // btnGetCash:function(e){
  //   wx.navigateTo({
  //     url: '../../my/myCashBack/cashBackDetail/cashBackDetail',
  //   })
  // },
  btn_getSure:function(e){
  wx.navigateTo({
    url: '/pages/my/myOrder/order?order_status=' + 0,
  })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {
  
  // }
})