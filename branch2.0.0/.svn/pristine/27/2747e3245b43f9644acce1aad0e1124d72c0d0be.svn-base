// pages/my/myCoupon/myCoupon.js
var login = require('../../../utils/login');
var req = require('../../../service/service');
function getData(url, status, that) {
  var data = {
    status: status
  }
  req.reqData(url, data, function (res) {
    // 成功回调
    that.setData({
      dataList: res.data.data,
      loaded: 1
    })
    if (!that.data.dataList[0]) {
      that.setData({
        isShow: 1,
      })
    } else {
      that.setData({
        isShow: 0,
      })
    }
  }, function (res) {
    wx.showToast({
      title: res.errMsg
    })
  });
}
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    dataList: [],
    isShow: 0,
    hasData: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var status = that.data.currentTab;
    var url = 'api/coupon/getMyCoupon';
    login.login(true, function () {
      that.setData({
        hasData: 1
      });
      getData(url, status, that);
    }, function () { })
  },
  // tab切换
  currentChange(e) {
    var current = e.currentTarget.dataset.current;
    this.setData({
      currentTab: current,
      dataList: [],
      isShow: 0,
    })
    var that = this;
    var status = that.data.currentTab;
    var url = 'api/coupon/getMyCoupon';
    login.login(true, function () {
      getData(url, status, that);
    }, function () { })
  },
  goToShop(e) {
    var appurl = e.currentTarget.dataset.appurl;
    if(!appurl){
      return;
    }
    wx.navigateTo({
      url: '/' + appurl,
    })
  },
  btn_goCoupon: function (e) {
    var app_url = e.currentTarget.dataset.appurl;
    if(!app_url){
      return;
    }
    wx.navigateTo({
      url: '/' + app_url,
    })
  },
  goIndex(e){
    // var app_url = e.currentTarget.dataset.appurl;
    wx.switchTab({
      url:'/pages/index/index',
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