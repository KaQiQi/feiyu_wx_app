// pages/activity/vipClub/vipClub.js
var req = require('../../../service/service');
var login = require('../../../utils/login');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sendding:0,
    time:59,
    timer:'',
    mobileNumber:'',
    cardNum:'',
    code:'',
    pageData:{},
    hasData:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = 'api/MyClub/getClubDes';
    var data = {};
    var that = this;
    that.data.refresh = options.refresh;
    req.reqData(url,data,function(res){
      that.setData({
        pageData:res.data.data,
        hasData:1,
        unBindMobile:res.data.data.unBindMobile,
      })
    },function(){})
  },
  
  jump_index(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  jump_next(){
    var that = this;
    if(that.data.unBindMobile == 1){
      // 没绑定手机号
      wx.redirectTo({
        url: '/pages/myPhone/myPhone?club=1',
      })
    }else{
      var url = 'api/ClubVipApply/applyVip';
      var data = {}
      req.reqData(url,data,function(){
        wx.redirectTo({
          url:'./applyResult/applyResult'
        })
      })
    }
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var refresh = getApp().globalData.phoneToClub;
    if( refresh == 1){
      var url = 'api/MyClub/getClubDes';
      var data = {};
      var that = this;
      req.reqData(url,data,function(res){
        that.setData({
          pageData:res.data.data,
          hasData:1,
          unBindMobile:res.data.data.unBindMobile
        })
        console.log('onshow刷新成功')
        getApp().globalData.phoneToClub = 0;
      },function(){})
    }
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