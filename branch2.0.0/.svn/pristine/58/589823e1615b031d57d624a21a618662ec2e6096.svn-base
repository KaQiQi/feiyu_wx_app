// pages/settlement/settlement.js
var req = require('../../service/service');
var login = require('../../utils/login');
var util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 是否有地址
    is_setAddress: 0,
    customer_remark: '',
    wxPayurl: {
      sku_id: '',
      address_id: '',
      customer_remark: '',
      live_id: '',
      num: '1',
      member_coupon_id: '',
      show_give_money_to_shop: '',
      from_member_id: '',
    },
    address_id: '',
    buy_user_address: '',
    buy_user_name: '',
    buy_user_mobile: '',
    orderInfo: {},
    shop_products: '',
    top_order_no: '',
    payData: {},
    showPage: 0,
    payAddressUrl: {},
    allChoose: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/shopcart/gotoBuy';
    var param = {};
    // 请求数据
    login.login(true, function () {
      // 登录成功
      req.reqData(url, param,
        function (res) {
          var data = res.data.data;
          if (res.data.returnCode == 0) {

            that.setData({
              address_id: data.address.address_id,
              buy_user_address: data.address.address,
              buy_user_mobile: data.address.mobile,
              buy_user_name: data.address.user_name,
              orderInfo: data,
              shop_products: data.shop_skus,
              top_order_no: data.top_order_no,
              showPage: 1,
              member_g_coupon_id:data.member_g_coupon_id,
              member_coupon_id:data.member_coupon_id
            })
            that.data.wxPayurl.address_id = that.data.address_id;
            if (that.data.address_id) {
              that.setData({
                is_setAddress: 1
              })
            }
          }
        },
        function (res) {
          // login.login();
          // console.log('没有登录');
        }, 1);
    }, function () {

    })
  },
  // 添加地址
  addAdress: function () {
    var that = this;
    var url = "api/address/addAddress";
    var app = getApp();
    app.aldstat.sendEvent('购物车结算-地址', {});
    wx.chooseAddress({
      success: function (res) {
        that.data.payAddressUrl.userName = res.userName;
        that.data.payAddressUrl.postalCode = res.postalCode;
        that.data.payAddressUrl.provinceName = res.provinceName;
        that.data.payAddressUrl.cityName = res.cityName;
        that.data.payAddressUrl.countyName = res.countyName;
        that.data.payAddressUrl.detailInfo = res.detailInfo;
        that.data.payAddressUrl.nationalCode = res.nationalCode;
        that.data.payAddressUrl.telNumber = res.telNumber;
        that.setData({
          buy_user_address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          buy_user_name: res.userName,
          buy_user_mobile: res.telNumber
        })
        login.login(true, function () {
          req.reqData(url, that.data.payAddressUrl,
            function (res) {
              console.log(res);
              if (res.data.returnCode == 0) {
                that.data.wxPayurl.address_id = res.data.data;
                that.setData({
                  address_id: res.data.data,
                  is_setAddress: 1
                })
              } else if (res.data.returnCode == '-1') {
                login.login();
              } else {
                wx.showToast({
                  title: res.data.message
                })
              }
            },
            function (res) {

            });
        }, function () {
          //  没有登录
          // console.log('未登录');
        })
      },
      fail: function (err) {
        // console.log("用户不允许");
        var message_error = err.errMsg;
        if (message_error.indexOf('cancel') < 0) {
          wx.openSetting({
            success: (res) => {
              //console.log(res);
              that.setData({
                is_setAddress: 1
              })

            }
          })
        }
      }
    })
  },

  // 买家留言
  getInput: function (e) {
    // console.log(e);
    var that = this;
    var value = e.detail.value;
    var id = e.currentTarget.dataset.id;
    var keyName = "memo_" + id;
    that.data.payData[keyName] = value;
    var app = getApp();
    app.aldstat.sendEvent('购物车结算页留言', {
      'value': value + '',
      'id': id + '',
    });
  },
  commit_order: util.throttle(function () {
    var that = this;
    var list = that.data.shop_products;
    var flag = true; //假设全选了
    var app = getApp();
    app.aldstat.sendEvent('购物车结算-提交订单', {});
    for (var i = 0; i < list.length; i++) {
      for (var n = 0; n < list[i].product_skus.length; n++) {
        var item = list[i].product_skus[n];
        if (item.is_checked_procurement == 0 && item.need_procurement == 1) {
          flag = false;
          break;
        }
      }
      if (flag) {
        flag = true;
      }
    }
    if (!flag) {
      wx.showToast({
        title: '勾选支付采购金'
      })
      return;
    }
    var url = "api/shopcart/payShopCart";
    that.data.payData.address_id = that.data.address_id;
    that.data.payData.member_g_coupon_id = that.data.member_g_coupon_id?that.data.member_g_coupon_id:'';
    that.data.payData.top_order_no = that.data.top_order_no;
    console.log(that.data.payData);
    var from_member_id = wx.getStorageSync('from_member_id');
    if (!this.data.address_id) {
      wx.showToast({
        title: '请选择地址'
      })
      return;
    }
    login.login(true, function () {
      // 用户授权
      req.reqData(url, that.data.payData,
        function (res) {
          if (res.data.returnCode == 0) {
            wx.requestPayment({ //调起微信支付
              'timeStamp': res.data.data.timeStamp,
              'nonceStr': res.data.data.nonceStr,
              'package': res.data.data.package,
              'signType': 'MD5',
              'paySign': res.data.data.paySign,
              'success': function (ress) {
                var app = getApp();
                app.aldstat.sendEvent('购物车结算-支付成功', {});
                wx.redirectTo({
                  url: '../../pages/shopCarPay/shopCarPay?top_order_no=' + that.data.top_order_no
                })
              },
              'fail': function (res) {
                var app = getApp();
                app.aldstat.sendEvent('购物车结算-取消支付', {});
                // console.log(res);
                wx.showToast({
                  title: '支付取消',
                })
              }
            })
          } else if (res.data.returnCode == '-1') {
            login.login();
          } else {
            wx.showToast({
              title: res.data.message
            })
          }
        },
        function (res) {

        });
    }, function () {
      // 用户不授权
    })

  }, 1000),
  // 勾选按钮
  choose_btn(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var sku_id = e.currentTarget.dataset.skuid;
    var list = that.data.shop_products;
    for (var i = 0; i < list.length; i++) {
      for (var n = 0; n < list[i].product_skus.length; n++) {
        if (list[i].product_skus[n].sku_id == sku_id) {
          list[i].product_skus[n].is_checked_procurement = !list[i].product_skus[n].is_checked_procurement;
          that.setData({
            shop_products: list
          })
        }
      }
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