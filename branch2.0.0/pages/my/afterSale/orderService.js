// pages/my/afterSale/orderService.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login');
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataList: [],
    isHasData: 0,//0表示没有
    isShows: 1,//0表示没有
    order_status:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    var that=this;
    that.setData({
      order_status:options.order_status
    })
    console.log(options.order_status);
    var status= options.order_status;
    var data = {};
    data.order_status =status;
    var url = "api/order/getOrders";
    req.reqData(url, data,
      function (res) {
        if (res.data.returnCode == 0) {
          var data = res.data.data;
          console.log(data);
          that.setData({
            dataList: data,
          })

        } else {
          wx.showToast({
            title: res.data.message
          })
        }
        // 判断空状态
        if (that.data.dataList.length == 0) {
          that.setData({
            isHasData: 0,
            isShows: 0
          })
        } else {
          that.setData({
            isHasData: 1,
            isShows: 1
          })
        }

      }, function (res) {

      }, 1);
  },
// 商品详情
  onDetailClick: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/orderDetial/detial?id=' + id,
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
    if(getApp().globalData.flag){
      var that=this;
      var status= that.data.order_status;
      var data = {};
      data.order_status =status;
      var url = "api/order/getOrders";
      req.reqData(url, data,
        function (res) {
          if (res.data.returnCode == 0) {
            var data = res.data.data;
            console.log(data);
            that.setData({
              dataList: data,
            })
  
          } else {
            wx.showToast({
              title: res.data.message
            })
          }
          // 判断空状态
          if (that.data.dataList.length == 0) {
            that.setData({
              isHasData: 0,
              isShows: 0
            })
          } else {
            that.setData({
              isHasData: 1,
              isShows: 1
            })
          }
        }, function (res) {
  
        }, 1);
    }
    getApp().globalData.flag = false;
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