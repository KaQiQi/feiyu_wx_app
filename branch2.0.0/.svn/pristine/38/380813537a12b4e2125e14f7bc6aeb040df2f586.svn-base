// pages/order/idCard/idCard.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputName: '',
    inputIdCard: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
   //身份证号和姓名
  upload_idcard: function (e) {
    var that = this;
    var inputName = that.data.inputName;
    var inputIdCard = that.data.inputIdCard;
    if (!inputName) {
      wx.showToast({
        title: '请输入姓名',
      })
      return;
    }
    if (!inputIdCard){
      wx.showToast({
        title: '请输入身份证号码',
      })
      return;
    }
  },

  getInputName: function (e) {
    this.setData({
      inputName: e.detail.value
    })
  },
  getInputIdCard: function (e) {
    this.setData({
      inputIdCard: e.detail.value
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