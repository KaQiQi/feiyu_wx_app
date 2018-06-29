// pages/index/translate/translate.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login.js');
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

    console.log('onLoad');
    var that = this;
    var scene = decodeURIComponent(options.scene);
    var reg_shop_id = options.reg_shop_id;
    if (!reg_shop_id) {
      reg_shop_id = login.getQueryString('r', scene);
    }
    var from_member_id = options.from_member_id;
    if (!from_member_id) {
      from_member_id = login.getQueryString('f', scene);
    }
    var register_channel = options.register_channel;
    if (!register_channel) {
      register_channel = login.getQueryString('c', scene);
    }

    var from_user_id = options.from_user_id;
    if (!from_user_id) {
      from_user_id = login.getQueryString('u', scene);
    }
    var entity_type = options.entity_type;
    if (!entity_type) {
      entity_type = login.getQueryString('e', scene);
    }

    var entity_id = options.entity_id;
    if (!entity_id) {
      entity_id = login.getQueryString('v', scene);
    }

  

 
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
      var that = this;
      var user_id = wx.getStorageSync('wx_id');
      var url = '/api/wxapp/shareHomeRedirect';
      var data = {};
      data.entity_type = entity_type;
      data.entity_id = entity_id;
      data.user_id = user_id;
      req.reqData(url, data, function (res) {
        if (res.data.returnCode == 0) {
          if (res.data.data.gotopage == 1) {//分享的首页
            wx.switchTab({
              url: '/pages/index/index',
            })
          } else {
            wx.redirectTo({
              url: '/pages/index/shareIndex/shareIndex?entity_type=' + entity_type + '&entity_id=' + entity_id
            })
        

         
          }
        }
      }, function () {

      })
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