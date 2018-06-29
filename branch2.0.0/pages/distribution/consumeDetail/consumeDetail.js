// pages/distribution/consumeDetail/consumeDetail.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex: 0,
    page: 0,
    maskShow: false,
    couponMask: false,
    tab1: 0,
    tab2: 0,
    data: {},
    list: [],
    tabShow: 0,
    totalCount: 0,
    totalCount1: 0,
    totalCount2: 0,
    showPage: 0,
    accountBalance: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/distribution/getAccountBalanceList';
    var data = {
      direction: that.data.currentIndex,
      page: that.data.page,
    }
    req.reqData(url, data, function (res) {
      that.setData({
        data: res.data.fxsRechargeList,
        accountBalance: res.data.fxsRechargeList.availableIncome,
        list: res.data.fxsRechargeList.data,
        totalCount: res.data.fxsRechargeList.totalCount,
        showPage: 1,
        tabShow: 1
      })
      console.log(that.data.accountBalance);
    }, function () { });
    console.log(1111);

  },

  changeTab(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    if (index == that.data.currentIndex) {
      return;
    }
    var url = 'api/distribution/getAccountBalanceList';
    this.setData({
      tabShow: 0,
      currentIndex: index,
      tab1: 0,
      tab2: 0,
      page: 0
    })
    if (that.data.currentIndex == 0) {
      var data = {
        direction: index,
        page: that.data.page,
      }
      req.reqData(url, data, function (res) {
        that.setData({
          totalCount: res.data.fxsRechargeList.totalCount,
          list: res.data.fxsRechargeList.data,
          tabShow: 1
        })
      })
    } else if (that.data.currentIndex == 1) {
      var data = {
        direction: index,
        page: that.data.tab1
      }
      req.reqData(url, data, function (res) {
        that.setData({
          totalCount1: res.data.fxsRechargeList.totalCount,
          list: res.data.fxsRechargeList.data,
          tabShow: 1
        })
      }, function () { });
    } else if (that.data.currentIndex == 2) {
      var data = {
        direction: index,
        page: that.data.tab1
      }
      req.reqData(url, data, function (res) {
        that.setData({
          totalCount2: res.data.fxsRechargeList.totalCount,
          list: res.data.fxsRechargeList.data,
          tabShow: 1
        })
      }, function () { });
    }
  },


  btnBalanceRecharge(e) {
    if (this.data.accountBalance <= 0) {
      wx.showToast({
        title: '可用金额为0',
      })
      this.setData({
        maskShow: false,
        couponMask: 0,
      })
      return;
    }
    wx.navigateTo({
      url: '/pages/distribution/accountRecharge/accountRecharge?accountBalance=' + this.data.accountBalance + "&isWxPay=0",
    })
    this.setData({
      maskShow: false,
      couponMask: 0,
    })
  },
  btnWxRecharge() {
    wx.navigateTo({
      url: '/pages/distribution/accountRecharge/accountRecharge?accountBalance=' + this.data.accountBalance + "&isWxPay=1",
    })
    this.setData({
      maskShow: false,
      couponMask: 0,
    })
  },

  intoShare() {
    var that = this;
    that.setData({
      maskShow: true,
      couponMask: 1,
    })
  },

  // 关闭弹窗
  closeView() {
    this.setData({
      maskShow: false,
      couponMask: 0,
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
    var that = this;
    if (getApp().globalData.flag) {
      getApp().globalData.flag = false;
      var url = 'api/distribution/getAccountBalanceList';
      var data = {
        direction: that.data.currentIndex,
        page: that.data.page,
      }
      req.reqData(url, data, function (res) {
        that.setData({
          data: res.data.fxsRechargeList,
          accountBalance: res.data.fxsRechargeList.availableIncome,
          list: res.data.fxsRechargeList.data,
          totalCount: res.data.fxsRechargeList.totalCount,
          showPage: 1,
          tabShow: 1
        })
      }, function () { });
    }
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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 300)
    var that = this;
    var url = 'api/distribution/getAccountBalanceList';
    var data = {
      direction: that.data.currentIndex,
      page: that.data.page,
    }
    req.reqData(url, data, function (res) {
      that.setData({
        data: res.data.fxsRechargeList,
        accountBalance: res.data.fxsRechargeList.availableIncome,
        list: res.data.fxsRechargeList.data,
        totalCount: res.data.fxsRechargeList.totalCount,
        showPage: 1,
        tabShow: 1
      })
    }, function () { });
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    var that = this;
    var current = that.data.currentIndex;
    var url = 'api/distribution/getAccountBalanceList';
    var data = {
      direction: that.data.currentIndex,
    }
    if (current == 0) {
      that.data.page++;
      data.page = that.data.page;
      if (that.data.page >= (that.data.totalCount / 10)) {
        return;
      }
    } else if (current == 1) {
      that.data.tab1++;
      data.page = that.data.tab1;
      if (that.data.tab1 >= (that.data.totalCount1 / 10)) {
        return;
      }
    } else if (current == 2) {
      that.data.tab2++;
      data.page = that.data.tab2;
      if (that.data.tab2 >= (that.data.totalCount2 / 10)) {
        return;
      }
    }

    req.reqData(url, data, function (res) {
      that.setData({
        list: res.data.fxsRechargeList.data,
      })
    }, function () { });
  },

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})