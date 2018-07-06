// pages/integralDraw/integralDraw.js
const req = require('../../service/service');
const login = require('../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    showModel: 0,
    num: 1,
    show: 0,
    data: {},
    productList: [],
    popupData: {},
    btnNum: [],
    max_num: 0,
    min_num: 0,
    step: 0,
    id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/lotto/lotto';
    var data = {};
    req.reqData(url, data, function (res) {
      if (res.data.data.is_mobile == 1) {
        that.setData({
          data: res.data.data,
          show: 1,
          productList: res.data.data.lotto_products
        })
        wx.setNavigationBarTitle({
          title: '积分抽奖',
        })
      } else {
        wx.redirectTo({
          url: '/pages/myPhone/myPhone',
        })
      }
    })
  },

  startDraw(e) {
    var index = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var that = this;
    var list = that.data.productList[index];
    var step = Number(list.step_num);
    var arr = [step, step + 2, step + 4];
    if (list.max_num == 0) {
      list.max_num = 99999999999999;
    }
    that.setData({
      step: step,
      num: step,
      id: id,
      popupData: list,
      showModel: 1,
      btnNum: arr,
      max_num: list.max_num,
      min_num: list.min_num,
    })
  },
  closeModel() {
    var that = this;
    that.setData({
      showModel: 0
    })
  },

  reduce() {
    var num = this.data.num;
    num -= this.data.step;
    if (this.data.min_num > num) {
      return;
    } else {
      this.setData({
        num: num
      })
    }
  },
  increase() {
    var num = this.data.num;
    num += this.data.step;
    if (num > this.data.max_num) {
      return;
    } else {
      this.setData({
        num: num
      })
    }
  },
  chooseNum(e) {
    var that = this;
    var num = e.currentTarget.dataset.num;
    if (num == '-1') {
      num = Math.floor(that.data.data.score / 100);
      if (num == 0) {
        wx.showToast({
          title: '积分不足'
        })
        return;
      } else {
        this.setData({
          num: num
        })
      }
    } else {
      if (num > this.data.max_num) {
        wx.showToast({
          title: '超出最大数量'
        })
      } else {
        this.setData({
          num: num
        })
      }
    }

  },

  confirm() {
    var that = this;
    var url = 'api/lotto/buy';
    var data = {
      iid: that.data.id,
      num: that.data.num
    };
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        wx.navigateTo({
          url: './joinSucceed/joinSucceed?id=' + res.data.data.lotto_buy_recored_id,
        })
        that.setData({
          showModel: 0
        })
      }
    })
  },

  proDetail(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: './prizeDetail/prizeDetail?id='+id,
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
    if (getApp().globalData.back) {
      var url = 'api/lotto/lotto';
      var data = {};
      req.reqData(url, data, function (res) {
        if (res.data.data.is_mobile == 1) {
          that.setData({
            data: res.data.data,
            show: 1,
            productList: res.data.data.lotto_products
          })
          wx.setNavigationBarTitle({
            title: '积分抽奖',
          })
        } else {
          wx.redirectTo({
            url: '/pages/myPhone/myPhone',
          })
        }
        getApp().globalData.back = false;
      })
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
    var that = this;
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
    var url = 'api/lotto/lotto';
    var data = {};
    req.reqData(url, data, function (res) {
      if (res.data.data.is_mobile == 1) {
        that.setData({
          data: res.data.data,
          show: 1,
          productList: res.data.data.lotto_products
        })
        wx.setNavigationBarTitle({
          title: '积分抽奖',
        })
      } else {
        wx.redirectTo({
          url: '/pages/myPhone/myPhone',
        })
      }
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
  onShareAppMessage: function () {
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }
    if (res.from === 'button') {

    }
    return {
      title: this.data.live_info.title,
      path: 'pages/liveDetail/liveDetail?from_member_id=' + member_id + '&id=' + this.data.live_id + '&register_channel=wxapp_share',
      success: function (res) {
        // 转发成功
        // console.log('转发成功' + this.data.shop_id)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})