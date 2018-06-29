// pages/activity/vipHome/getInvitation/getInvitation.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    resultData: '',
    pay_info: '',
    payMoney: '',
    interval: '',
    cont: 0,
    invitee_pay_desc: '',
    shop_id: '',
    isShow: 0,
    is_auth: ""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var is_auth = wx.getStorageSync('is_auth');
    that.setData({
      is_auth: is_auth
    })
    var reg_shop_id = options.reg_shop_id ? options.reg_shop_id : '';
    var shop_id = options.shop_id ? options.shop_id : '';
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;
    var from_user_id = options.from_user_id ? options.from_user_id : '';
    if (!from_member_id) {
      console.log(from_member_id);
      var scene = decodeURIComponent(options.scene);
      shop_id = login.getQueryString('i', scene) ? login.getQueryString('i', scene) : '';
      reg_shop_id = login.getQueryString('r', scene) ? login.getQueryString('r', scene) : '';
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
      from_user_id = login.getQueryString('u', scene);
    }
    var entity_type = 'e_home';
    var entity_id = 134;

    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
      var url = 'api/distribution/friendAccept';
      var data = {};
      req.reqData(url, data, function (res) {
        var data = res.data.data;
        if (data.go == 0) {//0收益1继续充值2开店
          that.setData({
            // isShow: 1,
            resultData: data,
            pay_info: data.pay_info,
            invitee_pay_desc: data.invitee_pay_desc,
          })

          wx.setStorageSync('my_home_flag', data.my_home_flag);
          wx.setStorageSync('my_home_id', data.my_home_id);

          wx.redirectTo({
            url: '/pages/distribution/myProfit/myProfit',
          })
        } else if (data.go == -1) {
          wx.showToast({
            title: data.message,
          })
          setTimeout(function () {
            wx.switchTab({
              url: '/pages/my/my',
            })
          }, 1000)
       
        }
        else if (data.go == 2) {//店铺正在创建中
          that.setData({
            // isShow: 1,
            resultData: data,
            pay_info: data.pay_info,
            invitee_pay_desc: data.invitee_pay_desc,
          })
          wx.redirectTo({
            url: '/pages/distribution/completeInto/completeInto',
          })

        } else {//需要继续充值用户
          that.setData({
            isShow: 1,
            resultData: data,
            pay_info: data.pay_info,
            invitee_pay_desc: data.invitee_pay_desc,
          })
        }
        ;

      }, function () { })
    });
  },
  setInfo(e) {
    var that = this;
    console.log(e);
    if (e.detail.errMsg == "getUserInfo:ok") {
      var iv = e.detail.iv;
      var encryptedData = e.detail.encryptedData;
      var wx_id = wx.getStorageSync('wx_id');
      var url = 'api/wxapp/setUserInfov2';
      var data = {
        id: wx_id,
        iv: iv,
        encryptedData: encryptedData,
      };
      req.reqData(url, data, function (res) {
        wx.setStorageSync('is_auth', res.data.data.is_auth);//判断是否微信授权0:no
        wx.setStorageSync('wx_username', res.data.data.user_name);
        wx.setStorageSync('wx_avatar', res.data.data.headimgurl);
        that.setData({
          is_auth: res.data.data.is_auth,
        })
      })
    }
  },
  btnSelect: function (e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    for (var i = 0; i < that.data.pay_info.length; i++) {
      if (index == i) {
        that.data.pay_info[i].selected = 1;
      } else {
        that.data.pay_info[i].selected = 0;
      }
    }
    that.setData({
      pay_info: that.data.pay_info,
    })

  },
  jump_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  btnPay: util.throttle(function (e) {
    var that = this;
    console.log(e);
    for (var i = 0; i < that.data.pay_info.length; i++) {
      if (that.data.pay_info[i].selected == 1) {
        that.data.payMoney = that.data.pay_info[i].money;
      }
    }
    console.log(that.data.payMoney);
    if (that.data.payMoney) {
      var url = 'api/distribution/wxpay';
      var data = {};
      data.money = that.data.payMoney;
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
                        wx.redirectTo({
                          url: '/pages/distribution/completeInto/completeInto',
                        })
                      } else if (data.shop_status == "5001") {
                        wx.switchTab({
                          url: '/pages/index/index',
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
  }, 1000),



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