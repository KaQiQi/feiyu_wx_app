// pages/distribution/searchResult/searchResult.js
const req = require('../../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    pageData: {},
    show: 0,
    mobile: '',
    is_who: 0,
    in_wxapp: 0,
    nick_name: '',
    money: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/member/getMemberVipInfoForApp';
    var is_who = options.is_who;
    var data = {
      search_word: options.value
    };
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        pageData: data,
        show: 1,
        is_who: is_who,
        mobile: data.mobile,
        in_wxapp: data.in_wxapp,
        nick_name: data.from_nick_name,
        money: data.total_money
      })
    }, function () {

    })
  },

  takeMoney() {
    wx.navigateTo({
      url: '/pages/member/bindMobile/bindMobile?mobile=' + this.data.mobile,
    })
  },
  // 存储formid
  sendFormId(e) {
    var that = this;
    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid: form_id
    };
    req.reqData(url, data, function () {
      // console.log('发送formid成功');
    }, function () {})
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
  jump_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }
    var user_id = wx.getStorageSync('wx_id');
    return {
      title: that.data.nick_name + '在妃鱼还有' + that.data.money + '元返现,快来提现吧~',
      path: 'pages/member/centerTruck/centerTruck?from_member_id=' + member_id + '&register_channel=return_money' + '&from_user_id=' + user_id + '&is_who=' + that.data.is_who + '&mobile=' + that.data.mobile,
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})