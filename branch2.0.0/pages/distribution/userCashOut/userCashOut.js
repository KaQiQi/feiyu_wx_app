// pages/distribution/userCashOut/userCashOut.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnData: '',
    inputValue: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = '/api/distribution/getCanTakeMoney';
    var data = {};
    req.reqData(url, data, function (res) {

      that.setData({
        returnData: res.data.data,
      })
    }, function () {

    })
  },
  onBindding(e) {
    var that = this;
    console.log(e.detail.value)

    if (e.detail.value * 100 > Number(that.data.returnData.money)) {
      that.setData({
        inputValue: that.data.returnData.money / 100
      })
    } else {
      that.data.inputValue = e.detail.value;
    }
  },
  btn_all: function (e) {
    var that = this;
    that.setData({
      inputValue: that.data.returnData.money / 100
    })
  },

  btn_cashback: function () {
    var that = this;
    if (Number(that.data.inputValue) > 0) {
      console.log(that.data.inputValue);
      var url = '/api/distribution/takeMoney';
      var data = {};
      data.money = that.data.inputValue;
      req.reqData(url, data, function (res) {
        wx.showToast({
          title: '提现成功',
        })
        getApp().globalData.flag = true;
        setTimeout(function () {
          wx.navigateBack({
            delta: 1
          })
        }, 1000)

      }, function () {

      })

    } else {
      wx.showToast({
        title: '请输入提现金额',
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
  onShareAppMessage: function () {

  }
})