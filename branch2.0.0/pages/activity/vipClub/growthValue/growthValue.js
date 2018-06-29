// pages/activity/vipClub/growthValue/growthValue.js
var req = require('../../../../service/service');
var login = require('../../../../utils/login');
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubData: '',
    progress: 0,
    type: 0,
    vip_data: {},
    hasData: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var data = {};
    var type = options.type;
    if (type == 1) {
      // 妃鱼补贴
      var url = 'api/MyClubFans/getBTDetail';
      wx.setNavigationBarTitle({
        title: '返现补贴',
      })
    } else if (type == 2) {
      //好友消费
      var url = 'api/MyClubFans/getClubMyBuyDetail';
      wx.setNavigationBarTitle({
        title: '累积消费'
      })
    } else if (type == 3) {
      //成长值补贴
      var url = 'api/MyClubFans/getClubFaceLevel';
      wx.setNavigationBarTitle({
        title: '成长值',
      })
    }


    req.reqData(url, data, function (res) {
      var data = res.data.data;
      var vip_data = data.vip_data;
      // var progress = (present_value - lef_vale) / right_vale * 100;

      that.setData({
        clubData: data,
        progress: data.vip_data.progress,
        type: type,
        vip_data: vip_data,
        hasData: 1
      })

    }, function (res) {

    })
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