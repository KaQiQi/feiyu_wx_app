// pages/distribution/rules/rules.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: [],
    isShow: 0,
    fxData: '',
    isFx: 0,
    isView:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var reg_shop_id = options.reg_shop_id ? options.reg_shop_id : '';
    var shop_id = options.shop_id ? options.shop_id : '';
    var from_member_id = options.from_member_id ? options.from_member_id : '';
    var register_channel = options.register_channel;
    var from_user_id = options.from_user_id ? options.from_user_id : '';

    if (!from_member_id) {
      var scene = decodeURIComponent(options.scene);
      shop_id = login.getQueryString('i', scene) ? login.getQueryString('i', scene) : '';
      reg_shop_id = login.getQueryString('r', scene) ? login.getQueryString('r', scene) : '';
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
      from_user_id = login.getQueryString('u', scene);
    }
    if (from_member_id) {
      that.data.isFx = 1;
    }
    var entity_type = 'e_home';
    var entity_id = 134;
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
      var url = 'api/distribution/inviteFriendFx';
      var data = {};
      if (that.data.isFx == 1) {
        req.reqData(url, data, function (res) {
          var data = res.data.data;
          if (data.my_is_kilner == 1) {
            if (data.my_shop_id == 0) {
              that.data.isShow = 0;
              wx.redirectTo({
                url: '/pages/distribution/completeInto/completeInto',
              })
            } else { 
              that.data.isShow = 0;        
              wx.redirectTo({
                url: '/pages/distribution/myProfit/myProfit',
              })
            }
          } else if (data.my_is_kilner == -1 || data.my_is_kilner == 1 || data.my_is_kilner == 2 || data.my_is_kilner == 3) {  
            that.data.isShow = 0;      
            wx.redirectTo({
              url: '/pages/distribution/myProfit/myProfit',
            })
          }else{
            that.data.isShow=1
            wx.setNavigationBarTitle({
              title: '加入红酒分销',
            })
          }
        
          that.setData({
            images: data.rules,
            fxData: data,
            isShow: that.data.isShow,
            isFx: that.data.isFx
          })

        }, function () { })
      } else {
        var url = 'api/distribution/getDistributionRule';
        var data = {};
        req.reqData(url, data, function (res) {
          that.setData({
            images: res.data.fxRuleList,
            isShow: 1,
            isFx: that.data.isFx
          })
          wx.setNavigationBarTitle({
            title: '分销说明',
          })
        }, function () { })
      }
    });
  
  },

  getInvite(e) {
    var that = this;
    var url = 'api/distribution/friendAcceptFx';
    var data = {};
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        if (res.data.data.create_shop == 1) {
          wx.redirectTo({
            url: '/pages/distribution/completeInto/completeInto',
          })
        } else {
          wx.setStorageSync('my_home_flag', res.data.data.my_home_flag);
          wx.setStorageSync('my_home_id', res.data.data.my_home_id);
          wx.redirectTo({
            url: '/pages/distribution/myProfit/myProfit',
          })
        }
      } else if (res.data.returnCode == "5001") {
        wx.setStorageSync('my_home_flag', res.data.data.my_home_flag);
        wx.setStorageSync('my_home_id', res.data.data.my_home_id);
        wx.redirectTo({
          url: '/pages/distribution/myProfit/myProfit',
        })
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

  jump_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})