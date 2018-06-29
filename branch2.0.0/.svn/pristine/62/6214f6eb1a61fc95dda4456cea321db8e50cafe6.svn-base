// pages/storePage/storePage/discountPage.js
const req = require('../../../service/service.js');
var login = require('../../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    couponMask: 1,
    discount_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var shop_id = options.shop_id;
    var that=this;
    var url = 'api/coupon/getShopCoupon';
    var data = {};
    data.shop_id = shop_id;
    login.login(true, function () {
      req.reqData(url, data, function (res) {

        that.setData({
          discount_list: res.data.data,
        })

      }, function (res) {

      })
    }, function () {

    },1)
  },


  // btn_getDiscount: function (e) {
  //   var that = this;
  //   var id = e.currentTarget.dataset.id;
  //   var position = e.currentTarget.dataset.position;
  //   var is_taken = e.currentTarget.dataset.is_taken;
  //   var limit_num = e.currentTarget.dataset.limit_num;
  //   var sendout_num = e.currentTarget.dataset.sendout_num;
    
  //   //  还没领取
  //   if (is_taken == 0 && Number(limit_num) > Number(sendout_num)) {
  //     var url = 'api/coupon/takeCoupon';
  //     var data = {};
  //     data.id = id;
  //     login.login(true, function () {
  //       req.reqData(url, data, function (res) {
  //         that.data.discount_list[position].is_taken = 1;
  //         that.setData({
  //           discount_list: that.data.discount_list,
  //         })
  //         wx.showToast({
  //           title: '领取成功',
  //         })
  //       }, function (res) {

  //       })
  //     }, function () {

  //     })
  //   } else if (is_taken == 0 && Number(limit_num) <= Number(sendout_num)) {
  //     wx.showToast({
  //       title: '领完了',
  //     })
  //   } 
  //   else if (is_taken == 1 && Number(limit_num) > Number(sendout_num)) {
  //     wx.showToast({
  //       title: '已领取',
  //     })
  //   } else {
  //     wx.showToast({
  //       title: '领完了',
  //     })
  //   }
  // },
   btn_getDiscount: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var position = e.currentTarget.dataset.position;
    var is_taken = e.currentTarget.dataset.is_taken;
    var limit_num = e.currentTarget.dataset.limit_num;
    var sendout_num = e.currentTarget.dataset.sendout_num;

    //  还没领取
    if (is_taken == 0 && Number(limit_num) > Number(sendout_num)) {
      var url = 'api/coupon/takeCoupon';
      var data = {};
      data.id = id;
      login.login(true, function () {
        req.reqData(url, data, function (res) {
          that.data.discount_list[position].is_taken = 1;
          that.setData({
            discount_list: that.data.discount_list,
          })
          wx.showToast({
            title: '领取成功',
          })
        }, function (res) {

        })
      }, function () {

      })
    } else if (is_taken == 1 && Number(limit_num) >= Number(sendout_num)) {
      wx.showToast({
        title: '已领取',
      })
    } else {
      wx.showToast({
        title: '已抢完',
      })
    }
  },
  // 完成
  btn_finish: function (e) {
    this.setData({
      couponMask: 0
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})