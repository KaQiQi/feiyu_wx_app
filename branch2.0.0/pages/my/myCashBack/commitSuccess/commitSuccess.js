// pages/my/myCashBack/commitSuccess/commitSuccess.js
var req = require('../../../../service/service.js');
var login = require('../../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var money = options.money;
    var duration = options.duration;
    that.setData({
      money: money,
      duration: duration
    })
  },
  // btn_success: function (e) {
  //   wx.navigateBack({
  //     delta: 1
  //   })
  // },




  // 存储formid
  sendFormId(e) {
    var that = this;
    console.log(e);

    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid: form_id
    };
    req.reqData(url, data, function () {
      // console.log('发送formid成功');
      wx.navigateBack({
        delta: 1
      })
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