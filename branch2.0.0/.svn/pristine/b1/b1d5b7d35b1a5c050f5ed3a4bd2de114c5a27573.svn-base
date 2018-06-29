// pages/distribution/accountDetail/accountDetail.js
var req = require('../../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    model: 0,
    pageData: {},
    show: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var model = options.model;
    var url = '';
    var data = {};
    this.setData({
      model: model
    })
    if (model == 1) {
      url = 'api/distribution/getAlreadyIncomeDetail'
      wx.setNavigationBarTitle({
        title: '已到账',
      })
    } else if (model == 2) {
      url = 'api/distribution/getWaitIncomeDetail'
      wx.setNavigationBarTitle({
        title: '待到账',
      })
    }
    req.reqData(url, data, function (res) {
      that.setData({
        pageData: res.data.data,
        show: 1
      })
    })
  },


  takeMoney() {
    wx.navigateTo({
      url: '/pages/distribution/userCashOut/userCashOut',
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
    var that = this;
    if (getApp().globalData.flag) {
      getApp().globalData.flag = false;
      var url = '';
      var data = {};
      if (that.data.model == 1) {
        url = 'api/distribution/getAlreadyIncomeDetail'
        wx.setNavigationBarTitle({
          title: '已到账',
        })
      } else if (that.data.model == 2) {
        url = 'api/distribution/getWaitIncomeDetail'
        wx.setNavigationBarTitle({
          title: '待到账',
        })
      }
      req.reqData(url, data, function (res) {
        that.setData({
          pageData: res.data.data,
          show: 1
        })
      })

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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 300)
    var that = this;
    var url = '';
    var data = {};
    if (that.data.model == 1) {
      url = 'api/distribution/getAlreadyIncomeDetail'
      wx.setNavigationBarTitle({
        title: '已到账',
      })
    } else if (that.data.model == 2) {
      url = 'api/distribution/getWaitIncomeDetail'
      wx.setNavigationBarTitle({
        title: '待到账',
      })
    }
    req.reqData(url, data, function (res) {
      that.setData({
        pageData: res.data.data,
        show: 1
      })
    })
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