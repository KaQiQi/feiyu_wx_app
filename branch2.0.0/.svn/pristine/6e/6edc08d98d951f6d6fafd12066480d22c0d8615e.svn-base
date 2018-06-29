// pages/productDetail/payOrderDetail/payOrderDetail.js
const req = require('../../../service/service');
const login = require('../../../utils/login');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    buy_user_address: '',
    buy_user_mobile: '',
    buy_user_name: '',
    address_id: '',
    num: '',
    orderInfo: '',
    customer_remark: '',
    payData: {},
    show: 0,
    payAddressUrl:{},
    member_g_coupon_id: '',
    member_coupon_id: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/product/checkSkuId';
    var reqData = {
      sku_id: options.sku_id,
      num: options.num,
      data_id: options.data_id,
      live_id: options.live_id,
    };
    // var reqData = {
    //   sku_id: 7512,
    //   num: 2,
    //   data_id: 5694,
    //   live_id: options.live_id,
    // };
    req.reqData(url, reqData,
      function (res) {
        var data = res.data.data;
        that.setData({
          address_id: data.address_id,
          orderInfo: data,
          payData: reqData,
          show: 1,
          num: reqData.num,
          buy_user_address: data.address,
          buy_user_mobile: data.mobile,
          buy_user_name: data.user_name,
          member_g_coupon_id: data.member_g_coupon_id,
          member_coupon_id: data.member_coupon_id
        })
        if (that.data.address_id) {
          that.setData({
            is_setAddress: 1
          })
        }
      });
  },

  // 提交订单支付
  commit_order: util.throttle(function () {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('商品详情页-提交订单', {
      'shop_id': that.data.shop_id + '',
      'product_id': that.data.productId + '',
    });
    if (!that.data.isChoose && that.data.need_procurement == 1) {
      wx.showToast({
        title: '勾选支付采购金'
      })
      return;
    }
    var url = "api/wxapp/wxpay";
    var from_member_id = wx.getStorageSync('from_member_id');
    that.data.payData.customer_remark = that.data.customer_remark;
    that.data.payData.from_member_id = from_member_id;
    that.data.payData.address_id = that.data.address_id;
    that.data.payData.member_g_coupon_id = that.data.member_g_coupon_id;
    that.data.payData.member_coupon_id = that.data.member_coupon_id;
    if (!that.data.address_id) {
      wx.showToast({
        title: '请选择地址'
      })
      return;
    }
    login.login(true, function () {

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
                app.aldstat.sendEvent('商品详情页-提交订单-支付成功', {
                  'shop_id': that.data.shop_id + '',
                  'product_id': that.data.productId + '',
                });
                wx.navigateTo({
                  url: '/pages/live/orderStatus/orderStatus?order_no=' + res.data.data.order_no,
                })
              },
              'fail': function (res) {
                app.aldstat.sendEvent('商品详情页-提交订单-取消支付', {
                  'shop_id': that.data.shop_id + '',
                  'product_id': that.data.productId + '',
                });
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

  // 留言信息
  getInput: function (e) {
    this.setData({
      customer_remark: e.detail.value
    })
    if (customer_remark) {
      var app = getApp();
      app.aldstat.sendEvent('商品详情页-立即购买-确定-输入留言');
    }
  },

  // 添加地址
  addAdress: function () {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('商品详情页-立即购买-确定-更换收货地址', {
      'productId': that.data.productId,
    });
    var url = "api/address/addAddress";
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
              // console.log(res);
              if (res.data.returnCode == 0) {
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
          console.log('未登录');
        })
      },
      fail: function (err) {
        console.log("用户不允许");
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