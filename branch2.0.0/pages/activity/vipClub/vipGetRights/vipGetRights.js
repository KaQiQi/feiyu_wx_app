// pages/activity/vipClub/vipGetRights/vipGetRights.js
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
      var url = 'api/myClubInvitation/receive';
      var data = {};
      req.reqData(url, data, function (res) {
        var data = res.data.data;
        if (data.is_join == 0) {
          that.setData({
            clubData: data,
            isShow: 1,
          })
        } else {
          wx.redirectTo({
            url: '/pages/activity/vipHome/vipHome',
          })
        }
        wx.setNavigationBarTitle({
          title: data.share_title,
        })

      }, function (res) {

      })
    });




  },


  btnGet: function (e) {
    var that = this;

    var url = 'api/member/hasMobile';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      if (data == 0) {
      wx.navigateTo({
        url: '/pages/myPhone/myPhone?isClub=1',
      })
      } else {
        var url = 'api/myClubInvitation/join';
        var data = {};
        req.reqData(url, data, function (res) {
          var data = res.data.data;

          wx.showToast({
            title: '权益领取成功',
          })
          wx.redirectTo({
            url: '/pages/activity/vipHome/vipHome',
          })

        }, function (res) {

        })
      }

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

    if (getApp().globalData.isBindPhone==1){
    var that = this;
    var url = 'api/member/hasMobile';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      if (data == 0) {
        wx.navigateTo({
          url: '/pages/myPhone/myPhone?isClub=1',
        })
      } else {
        var url = 'api/myClubInvitation/join';
        var data = {};
        req.reqData(url, data, function (res) {
          var data = res.data.data;
          getApp().globalData.isBindPhone = 0;
          wx.showToast({
            title: '权益领取成功',
          })
          wx.redirectTo({
            url: '/pages/activity/vipHome/vipHome',
          })

        }, function (res) {

        })
      }

    }, function (res) {

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
  // onShareAppMessage: function () {

  // }
})