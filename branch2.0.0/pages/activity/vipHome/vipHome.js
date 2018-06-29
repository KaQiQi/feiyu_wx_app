// pages/activity/vipHome/vipHome.js
var req = require('../../../service/service');
var login = require('../../../utils/login');
var util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    clubData: {},
    isShow: 0,
    isRule:0,
    isClick:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var url = 'api/MyClub/getVipRightsInfo';
    var data = {

    };
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        clubData: data,
        isShow: 1,
      })
      wx.setNavigationBarTitle({
        title: data.nav_title,
      })
    }, function (res) {

    })

  },
  btnRule: function (e) {
    this.setData({
      isRule: 1,
      isClick:0,
    })
  },
  btnCloseRule:function(e){
    this.setData({
      isRule: 0,
    })
  },
  btnShop: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  jump_index: function (e) {

    wx.switchTab({
      url: '/pages/my/my',
    })
  },

  btnClick:function(e){
    var click = e.currentTarget.dataset.click;
    this.setData({
      isRule: 1,
      isClick:1,
      click: click,
    })
  },
  btn_VipRights: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },
  lookInfo: function (e) {
    var typeNum = e.currentTarget.dataset.type;
    console.log(typeNum);
    wx.navigateTo({
      url: '/pages/activity/vipClub/growthValue/growthValue?type=' + typeNum,
    })
  },
  btnGet: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var title = e.currentTarget.dataset.title;
    var index = e.currentTarget.dataset.index;
    var url = 'api/MyClub/getPrize';
    var data = {
      id: id,
      name: title
    };
    req.reqData(url, data, function (res) {
      var status = res.data.data.status;
      that.data.clubData.list[index].status = status;
      that.setData({
        clubData: that.data.clubData,
      })
      wx.showToast({
        title: '领取成功',
      })

    }, function (res) {

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
    var that = this;
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
    var url = 'api/MyClub/getVipRightsInfo';
    var data = {

    }
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        clubData: data,
        isShow: 1,
      })
      wx.setNavigationBarTitle({
        title: data.nav_title,
      })
    }, function (res) {

    })
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