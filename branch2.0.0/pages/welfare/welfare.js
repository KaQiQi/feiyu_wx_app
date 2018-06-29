// pages/welfare/welfare.js
const md5 = require('../../utils/md5.js');
const req = require('../../service/service.js');
const login = require('../../utils/login.js');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    welfareData: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/welfare/index';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;

      var progress = (data.header.current_face_score - data.header.face_score_min) / (data.header.face_score_max - data.header.face_score_min)*100;
      console.log(data.header.avater);
      that.setData({
        welfareData: data,
        progress: progress
      })


    }, function () { })
  },
  btnRechange(e) {
    wx.navigateTo({
      url: '/pages/welfare/productDetail/productDetail',
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
  onShareAppMessage: function () {

  }
})