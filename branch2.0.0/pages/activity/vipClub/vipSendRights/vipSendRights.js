// pages/activity/vipClub/vipSendRights/vipSendRights.js
var req = require('../../../../service/service');
var login = require('../../../../utils/login');
var util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubData: '',
    isShow: 0,
    is_share:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    var entity_type = 'e_home';
    var entity_id = "134";

    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
      var url = 'api/myClubInvitation/give';
      var data = {

      }
      req.reqData(url, data, function (res) {
        var data = res.data.data;
        that.setData({
          clubData: data,
          isShow: 1,
        })
        wx.setNavigationBarTitle({
          title: data.share_title,
        })
      }, function (res) {

      })
    });
  },

  btnSend(e){
    var that=this;
    var url = 'api/myClubInvitation/validGive';
    var data = {};
    req.reqData(url, data, function (res) {
      that.setData({
        is_share: 1,
      })

    }, function (res) {

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
  onShareAppMessage: function (res) {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }

    var user_id = wx.getStorageSync('wx_id');
    if (res.from === 'button') {
      // 来自页面内转发按钮
      console.log(res.target)
    }
    return {
      title: that.data.clubData.share_title,
      imageUrl: that.data.clubData.share_image,
      path: 'pages/activity/vipClub/vipGetRights/vipGetRights?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})