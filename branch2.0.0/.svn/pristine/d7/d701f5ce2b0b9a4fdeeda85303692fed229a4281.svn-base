// pages/distribution/JoinMembers/JoinMembers.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    planData: '',
    isShow: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;


    var reg_shop_id = options.reg_shop_id ? options.reg_shop_id : '';
    var shop_id = options.shop_id ? options.shop_id : '';
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;
    var from_user_id = options.from_user_id ? options.from_user_id : '';
    if (!from_member_id) {
      console.log(from_member_id);
      var scene = decodeURIComponent(options.scene);
      shop_id = login.getQueryString('i', scene) ? login.getQueryString('i', scene) : '';
      reg_shop_id = login.getQueryString('r', scene) ? login.getQueryString('r', scene) : '';
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
      from_user_id = login.getQueryString('u', scene);
    }
    var entity_type = 'e_home';
    var entity_id = 134;

    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
      var url = '/api/distribution/changkePlan';
      var data = {};
      req.reqData(url, data, function (res) {
        var data = res.data.data;
        if (data.create_shop == 1) {
          wx.redirectTo({
            url: '/pages/distribution/completeInto/completeInto',
          })
        } else if (data.go_income == 1) {
          wx.redirectTo({
            url: '/pages/distribution/myProfit/myProfit',
          })
        } else {
          wx.setNavigationBarTitle({
            title: '加入尝家计划',
          })
          that.setData({
            planData: data,
            isShow: 1
          })
        }


      }, function () { })

    });


  },
  jump_index(e) {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  btnBuy(e) {
    var spu_id = e.currentTarget.dataset.spu_id;
    var data_id = e.currentTarget.dataset.data_id;
    wx.navigateTo({
      url: '/pages/productDetail/productDetail?productId=' + spu_id + '&data_id=' + data_id,
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
      title: '加入尝家计划',
      path: 'pages/distribution/JoinMembers/JoinMembers?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
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