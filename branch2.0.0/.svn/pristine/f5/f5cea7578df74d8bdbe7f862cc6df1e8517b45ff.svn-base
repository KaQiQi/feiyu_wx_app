//index.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    adressList: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    var order_id = options.id;

    var that = this;
    // 物流查询 
    var url = 'api/order/expressDetail';
    var parma = { 
      id: order_id
     };

    if (!order_id) {
      return;
    }

    req.reqData(url, parma,
      function (res) {
        console.log(res);
        that.setData({
          adressList: res.data.data,
        });
      }, function (res) {
        console.log('请求失败');
      });
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
    // 界面出现就会调用，类似viewWillApper
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
  onShareAppMessage: function () {

  },

  // 复制按钮点击事件
  copyBtnPressed: function (e) {
    var num = e.currentTarget.dataset.id;
    console.log('快递单号' + num)
    wx.setClipboardData({
      data: num,
      success: function (res) {
        wx.showToast({
          title: '复制成功',
        })
      },
      fail: function (res) { },
      complete: function (res) { },
    })
  },

  // 查询按钮点击事件
  searchBtnPressed: function (e) {
    var num = e.currentTarget.dataset.id;
    wx.showToast({
      title: '查询成功',
    })
  }

})