// pages/distribution/payOrder/payOrder.js
var req = require('../../../service/service');
var login = require('../../../utils/login');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    price: '',
    num: '',
    allPrice: '',
    sku_id: '',
    specification:'',
    imageSelect:'',
    product_id:'',
    data_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.setData({
      balance: options.balance,
      name: options.name,
      imageSelect: options.imageSelect,
      num: options.num,
      price: options.price,
      sku_id: options.sku_id,
      allPrice: options.total,
      specification: options.specification,
      product_id:options.product_id,
      data_id:options.data_id
    })

  },


  btnPay(e) {
    var that = this;
    var url = '/api/distribution/storeGoods';
    var data = {};
    data.sku_id = that.data.sku_id;
    data.num = that.data.num;

    req.reqData(url, data, function (res) {
      var data = res.data.data;
     
        wx.showToast({
          title: '囤货成功',
        })

        wx.redirectTo({
          url: '/pages/distribution/getSuccess/getSuccess' + '?price=' + that.data.allPrice + '&num=' + that.data.num + '&name=' + that.data.name + '&specification=' + that.data.specification+ '&image=' + that.data.imageSelect + '&product_id=' + that.data.product_id + '&data_id=' + that.data.data_id,
        })
      
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})