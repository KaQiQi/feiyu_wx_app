// pages/integralDraw/prizeDetail/prizeDetail.js
const req = require('../../../service/service');
const login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {},
    show: 0,
    id:3,
    lottoProductInstance:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/lotto/productDetail';
    var data = {
      iid: 3
    }
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        data: data,
        lottoProductInstance: data.lottoProductInstance
      })
    })
  },

  startDraw() {
    var that = this;
    var obj = that.data.lottoProductInstance;
    var step = Number(obj.step_num);
    var arr = [step, step + 2, step + 4];
    if (obj.max_num == 0) {
      obj.max_num = 99999999999999;
    }
    that.setData({
      step: step,
      num: step,
      showModel: 1,
      btnNum: arr,
      max_num: obj.max_num,
      min_num: obj.min_num,
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