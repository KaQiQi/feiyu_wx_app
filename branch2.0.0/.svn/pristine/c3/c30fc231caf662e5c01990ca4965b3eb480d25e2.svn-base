// pages/distribution/accountRecharge/accountRecharge.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    money: '',
    interval: '',
    cont: 0,
    isWxPay: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.money = options.accountBalance ? options.accountBalance : '';
    that.setData({
      money: that.data.money,
      isWxPay: options.isWxPay,
    })

  },
  /**
   * 监听输入金额
   */
  getInputNum(e) {
    var that = this;
    if (that.data.isWxPay == 1) {//微信充值
      that.data.inputValue = e.detail.value;
    } else {
      if (e.detail.value > Number(that.data.money)) {
        that.setData({
          inputValue: that.data.money
        })
      } else {
        that.data.inputValue = e.detail.value;
      }
    }

    console.log(that.data.inputValue);
  },

  btnAllRecharge: function (e) {
    var that = this;
    that.setData({
      inputValue: that.data.money
    })
  },

  btnRecharge: function (e) {
    var that = this;

    if (!that.data.inputValue) {
      wx.showToast({
        title: '请输入金额',
      })
      return;
    }
    if (that.data.isWxPay == 0) {
      var url = '/api/distribution/transfer';
      var data = {
        money: that.data.inputValue,
      };
      wx.showLoading({
        title: '支付中',
      })
      req.reqData(url, data, function (res) {
        getApp().globalData.flag = true;

        wx.showToast({
          title: "充值成功",
        })
        setTimeout(function () {
          wx.navigateBack({
            delta: 1,
          })
        }, 1000)


      }, function () { });

    } else {
      var url = 'api/distribution/wxpay';
      var data = {};
      data.money = that.data.inputValue;
      console.log(this.data.inputValue);
      console.log(data);
      req.reqData(url, data, function (res) {
        if (res.data.returnCode == 0) {
          wx.requestPayment({//调起微信支付
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (ress) {
              var url = 'api/distribution/checkPayStatus';
              var data = {};
              wx.showLoading({
                title: '支付中',
              })
              data.order_no = res.data.data.order_no;
              that.data.interval = setInterval(function () {
                req.reqData(url, data,
                  function (res) {
                    var data = res.data.data;
                    if (res.data.returnCode == 0) {
                      clearInterval(that.data.interval);
                      wx.hideLoading();
                      wx.showToast({
                        title: data.shop_message,
                      })
                      that.setData({
                        invitee_pay_desc: data.invitee_pay_desc,
                      })
                      if (data.shop_status == "5002") {//店铺正在创建中
                        getApp().globalData.flag = true;
                        wx.navigateBack({
                          delta: 2,
                        })
                      } else if (data.shop_status == "5001") {
                        getApp().globalData.flag = true;
                        wx.navigateBack({
                          delta: 1,
                        })
                      } else {
                        getApp().globalData.flag = true;
                        wx.navigateBack({
                          delta: 1,
                        })
                      }

                    } else {
                      wx.hideLoading();
                      that.data.cont++;
                      if (that.data.cont >= 3) {
                        wx.showToast({
                          title: '支付失败'
                        })
                        clearInterval(that.data.interval);
                        return;
                      }
                    }

                  }, function (res) {
                    wx.hideLoading();
                    clearInterval(that.data.interval)
                  });
              }, 3000);

            },
            'fail': function (res) {
              console.log(res);
              wx.hideLoading();
              wx.showToast({
                title: '支付取消',
              })
            }
          })
        }

      }, function () { })
    }
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