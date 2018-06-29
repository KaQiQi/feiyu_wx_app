// pages/distribution/completeInto/completeInto.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    ishow: 0,
    avater: '',
    shopName: '',
    inputContent: '',
    banner: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/distribution/getShopDetail';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        ishow: 1,
        avater: data.avater,
        shopName: data.nick_name,
        banner: data.banner,
      })
    }, function () { })
  },

  /**
   * 监听店铺名称输入
   */
  listenerNameInput: function (e) {
    this.data.shopName = e.detail.value;

  },

  /**
   * 监听店铺描述输入
   */
  listenerContentInput: function (e) {
    this.data.inputContent = e.detail.value;
  },

  getAvater: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1, // 默认9
      sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success: function (res) {
        // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        var tempFilePaths = res.tempFilePaths
        that.setData({
          avater: tempFilePaths,
        })
      }
    })
  },

  btnCreateShop: function () {
    if (!this.data.shopName) {
      wx.showToast({
        title: '请输入店铺名',
      })
    }
    var that = this;
    var url = 'api/distribution/createShop';
    var data = {};
    // data.avatar = this.data.avater;
    data.name = this.data.shopName;
    data.desc = this.data.inputContent;
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      if (res.data.returnCode == 0) {
        wx.setStorageSync('my_home_flag', data.my_home_flag);
        wx.setStorageSync('my_home_id', data.my_home_id);
        // wx.switchTab({
        //   url: '/pages/index/index',
        // })
        getApp().globalData.isLoginIndex=true;
        wx.redirectTo({
          url: '/pages/distribution/myProfit/myProfit',
        })
        
      } else if (res.data.returnCode == "5001") {
        wx.setStorageSync('my_home_flag', data.my_home_flag);
        wx.setStorageSync('my_home_id', data.my_home_id);
        // wx.switchTab({
        //   url: '/pages/index/index',
        // })
        getApp().globalData.isLoginIndex = true;
        wx.redirectTo({
          url: '/pages/distribution/myProfit/myProfit',
        })
      }
      else if (res.data.returnCode == "5002") {
        wx.showToast({
          title: res.data.message,
        })
        setTimeout(function () {
          wx.navigateTo({
            url: "/pages/member/bindMobile/bindMobile?isCompleInfo=1",
          })
        }, 500)
      }
    }, function () { })
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