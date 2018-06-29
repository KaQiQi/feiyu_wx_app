// pages/h5/loginAuthorized/loginAuthorized.js
var req = require('../../../service/service');
var login = require('../../../utils/login');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow: 0,

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

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },


  setInfo(e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      var iv = e.detail.iv;
      var encryptedData = e.detail.encryptedData;
      var wx_id = wx.getStorageSync('wx_id');
      var url = 'api/wxapp/setUserInfov2';
      var data = {
        id: wx_id,
        iv: iv,
        encryptedData: encryptedData,
      };
      req.reqData(url, data, function (res) {
        console.log(res)
        wx.setStorageSync('is_auth', res.data.data.is_auth);//判断是否微信授权0:no
        wx.setStorageSync('wx_username', res.data.data.user_name);
        wx.setStorageSync('wx_avatar', res.data.data.headimgurl);
        that.setData({
          is_auth: res.data.data.is_auth,
          avatar: res.data.data.headimgurl,
          nick_name: res.data.data.user_name,
       
        })
        getApp().globalData.isH5Login = true;
        wx.navigateBack({
          delta: 1,
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