// pages/distribution/payResult/payResult.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    order_id:'',
    price:'',
    address:'',
    num:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var name = options.name;
    var order_id = options.order_id;
    var price = options.price;
    var address = options.address;
    var num = options.num;
    that.setData({
      name,
      order_id,
      price,
      address,
      num,
    })
  },

  btnLookMyWine(){
    wx.redirectTo({
      url: '/pages/distribution/moreWine/moreWine?my_wine=1',
    })
  },

  goWine(){
    wx.redirectTo({
      url: '/pages/distribution/moreWine/moreWine?my_wine=0',
    })
  },
  goMyWine() {
    wx.redirectTo({
      url: '/pages/distribution/moreWine/moreWine?my_wine=1',
    })
  },
  lookOrder(e){
    wx.redirectTo({
      url: '/pages/order/orderDetial/detial?id='+this.data.order_id,
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
  onShareAppMessage: function () {

  }
})