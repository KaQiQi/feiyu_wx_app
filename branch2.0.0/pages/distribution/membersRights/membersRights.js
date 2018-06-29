// pages/distribution/membersRights/membersRights.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pageData: {},
    isShow: 0,
    share_title: '',
    progress:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/distribution/myRights';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      var progress = (data.all_cost_money)/(data.kilner_min - data.dashi_min)*100;
      that.setData({
        isShow: 1,
        pageData: data,
        share_title: data.share_title,
        progress: progress
      })
    }, function () { })
  },

  // 存储formid
  sendFormId(e) {
    var that = this;
    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid: form_id
    };
    login.login(true, function () {
      req.reqData(url, data, function () {
      }, function () { })
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
  onShareAppMessage: function (res) {
    var member_id = wx.getStorageSync('member_id');
    console.log(member_id);
    if (!member_id) {
      member_id = '';
    }
    var user_id = wx.getStorageSync('wx_id');
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.share_title,
      path: 'pages/distribution/getInvitation/getInvitation?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
      success: function (res) {
        // 转发成功
        // console.log('转发成功' + this.data.shop_id)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})