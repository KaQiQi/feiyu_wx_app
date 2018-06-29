// pages/distribution/search/search.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    returnDataList: '',
    result: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onBindding(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  search() {
    var that = this;
    var url = 'api/member/getMemberVipInfoForApp';
    var data = {};
    var value = that.data.inputValue;
    if (!value) {
      wx.showToast({
        title: '请输入搜索内容'
      })
      return;
    }
    data.search_word = value;
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {

        wx.navigateTo({
          url: '/pages/member/searchResult/searchResult?is_who=0&value=' + res.data.data.mobile
        })
      }
    }, function () {

    })

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