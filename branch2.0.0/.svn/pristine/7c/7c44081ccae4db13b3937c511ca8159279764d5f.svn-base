// pages/distribution/centerTruck/centerTruck.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login');
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
    var url = 'api/member/moblieIsInWxapp';
    var that = this;
    var scene = decodeURIComponent(options.scene);
    var mobile = options.mobile;
    var register_channel = options.register_channel;
    register_channel = register_channel ? register_channel : '';

    var from_member_id = options.from_member_id;
    from_member_id = from_member_id ? from_member_id : '';
    var entity_type = 'e_home';
    var entity_id = "134";
    var data = {
      mobile: mobile
    };

    login.processRegShopId(0, from_member_id, register_channel, 0, entity_type, entity_id, function () {
      req.reqData(url, data, function (res) {
        if (res.data.returnCode == 2) {
          wx.switchTab({
            url: '/pages/my/my',
          })
        } else if (res.data.returnCode == 3) {
          wx.redirectTo({
            url: '/pages/member/searchResult/searchResult?is_who=1&value=' + mobile,
          })
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