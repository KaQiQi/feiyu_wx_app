// pages/my/my.js
var req = require('../../service/service.js');
var login = require('../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    nick_name: '',
    avatar: '',
    mobile: '',
    show_return_money: '',
    return_money: '',
    return_score: '',
    isOnLoad: false,
    show_shop_query: '',
    myCoupons: [],
    favorite_count: 0,
    hasData: 0,
    myPageData: {},
    is_auth: "",
    inviter_member_id:'',
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
    var url = 'api/member/getMemberStatInfo';
    var data = {};
    req.reqData(url, data, function (res) {
      that.setData({
        mobile: res.data.data.mobile,
        show_return_money: res.data.data.show_return_money,
        return_money: res.data.data.return_money,
        return_score: res.data.data.return_score,
        show_shop_query: res.data.data.show_shop_query,
        myCoupons: res.data.data.myCoupons,
        favorite_count: res.data.data.favorite_count,
        hasData: 1,
        inviter_member_id: res.data.data.inviter_member_id,
        myPageData: res.data.data
      })
    }, function () {

    })
    if (that.data.is_auth) {
      var nick_name = wx.getStorageSync('wx_username');
      var avatar = wx.getStorageSync('wx_avatar');
      that.setData({
        nick_name: nick_name,
        avatar: avatar,
      })
    } else {
      that.setData({
        nick_name: '未登录',
        avatar: '/images/my/nologin.png',
      })
    }

  },
  jump_group: function (e) {
    var appurl = e.currentTarget.dataset.appurl;
    wx.navigateTo({
      url: '/' + appurl,
    })

  },
  btnTest: function () {
    wx.navigateTo({
      url: '/pages/guessing/guessing',
    })

  },
  jump_distribution: function (e) {
    var appurl = e.currentTarget.dataset.appurl;
    wx.navigateTo({
      url: '/' + appurl,
    })

  },
  btnSearch: function (e) {
    wx.navigateTo({
      url: '/pages/member/search/search',
    })
  },
  lookPay: function (e) {
    var order_status = e.currentTarget.dataset.id;
    var app = getApp();
    if (order_status == '-1') {
      app.aldstat.sendEvent('我-待付款', {
        'order_status': order_status,
      });
    } else if (order_status == '0') {
      app.aldstat.sendEvent('我-全部订单', {
        'order_status': order_status,
      });
    } else if (order_status == '2') {
      app.aldstat.sendEvent('我-待发货', {
        'order_status': order_status,
      });
    } else if (order_status == '8') {
      app.aldstat.sendEvent('我-待收货', {
        'order_status': order_status,
      });
    } else if (order_status == '11') {
      app.aldstat.sendEvent('我-待收货', {
        'order_status': order_status,
      });
    } else if (order_status == '13') {
      app.aldstat.sendEvent('我-退款/售后', {
        'order_status': order_status,
      });
    }
    wx.navigateTo({
      url: '/pages/my/myOrder/order?order_status=' + order_status,
    })
  },
  setInfo(e) {
    var that = this;
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
        wx.setStorageSync('is_auth', res.data.data.is_auth); //判断是否微信授权0:no
        wx.setStorageSync('wx_username', res.data.data.user_name);
        wx.setStorageSync('wx_avatar', res.data.data.headimgurl);
        that.setData({
          is_auth: res.data.data.is_auth,
          avatar: res.data.data.headimgurl,
          nick_name: res.data.data.user_name
        })
      })
    }
  },
  // 我的关注
  myFocus() {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('我-切换店铺');
    login.login(true, function () {
      wx.navigateTo({
        url: '../my/myFocus/myFocus',
      })
    }, function () { })
  },
  // 优惠券详情
  couDetail(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/myCoupon/limitedCoupon/limitedCoupon?coupon_id=' + id,
    })
  },
  // 我的收货地址
  myAddress() {
    var app = getApp();
    app.aldstat.sendEvent('我-我的收货地址');
    login.login(true, function () {
      wx.chooseAddress({
        success: function (res) {

        },
        fail: function (err) {
          var message_error = err.errMsg;

          if (message_error.indexOf('cancel') < 0) {
            wx.openSetting({
              success: (res) => {
                //console.log(res);
                // that.setData({
                //   is_setAddress: 1
                // })

              }
            })
          }
        }
      });
    }, function () { })
  },
  //售后
  btn_refund: function (e) {
    var order_status = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/afterSale/orderService?order_status=' + order_status,
    })
  },
  // 登录
  login() {
    var that = this;
    login.login(true, function () {
      var nick_name = wx.getStorageSync('wx_username');
      var avatar = wx.getStorageSync('wx_avatar');
      that.setData({
        nick_name: nick_name,
        avatar: avatar
      })
    }, function () { });
  },

  jump_club() {
    var that = this;
    wx.navigateTo({
      url: '/pages/qrcodeControler/qrcodeControler?isfromscan=-1'
    })
  },

  // 我的拼团
  toGroup() {
    wx.navigateTo({
      url: '../activity/shopGroup/shopGroup',
    })
  },

  myProfit(e) {
    var create_shop = e.currentTarget.dataset.create_shop;
    if (create_shop==1){
      wx.navigateTo({
        url: '/pages/distribution/completeInto/completeInto',
      })
  
    }else{
      wx.navigateTo({
        url: '/pages/distribution/myProfit/myProfit',
      })
    }
   
  },

  mykilner_charge(e) {
    var kilner_charge = e.currentTarget.dataset.kilner_charge;
    if (kilner_charge == 0) {
      wx.navigateTo({
        url: '/pages/distribution/myProfit/myProfit',
      })
    } else {
      wx.navigateTo({
        url: '/pages/distribution/getInvitation/getInvitation?from_member_id=' + this.data.inviter_member_id,
      })
    }

  },


  // 我的优惠券
  myCoupon() {
    var app = getApp();
    app.aldstat.sendEvent('我-我的优惠券');
    login.login(true, function () {
      wx.navigateTo({
        url: '../../pages/my/myCoupon/myCoupon',
      })
    }, function () { })
  },
  go_next(e){
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: url,
    })
  },

  // 跳转绑定手机号页面
  myPhone() {
    var that = this;
    var app = getApp();

    app.aldstat.sendEvent('我-绑定手机号（更换手机号）');
    login.login(true, function () {
      wx.navigateTo({
        url: '../myPhone/myPhone?mobile=' + that.data.mobile,
      })
    }, function () { })
  },

  // 存储formid
  sendFormId(e) {
    var that = this;
    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid: form_id
    };
    login.login(true, function () {
      req.reqData(url, data, function () { }, function () { })
    }, function () { })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  myScoreBack() {
    var that = this;

    if (that.data.mobile) {
      wx.navigateTo({
        url: '../../pages/my/myScore/myScore?return_score=' + that.data.return_score,
      })

      return;
    }
    wx.showModal({
      title: '查看积分需绑定手机号',
      content: '',
      confirmText: '立即绑定',
      success: function (res) {
        if (res.confirm) {
          var app = getApp();
          app.aldstat.sendEvent('我-绑定手机号（更换手机号）');
          login.login(true, function () {
            wx.navigateTo({
              url: '../myPhone/myPhone?mobile=' + that.data.mobile,
            })
          }, function () { })
        } else if (res.cancel) {

        }
      }
    })

  },
  myCashBack() {
    var that = this;
    if (that.data.mobile) {
      wx.navigateTo({
        url: '../../pages/my/myCashBack/myCashBack',
      })

      return;
    }
    wx.showModal({
      title: '领取返现需绑定手机号',
      content: '',
      confirmText: '立即绑定',
      success: function (res) {
        if (res.confirm) {
          var app = getApp();
          app.aldstat.sendEvent('我-绑定手机号（更换手机号）');
          login.login(true, function () {
            wx.navigateTo({
              url: '../myPhone/myPhone?mobile=' + that.data.mobile,
            })
          }, function () { })
        } else if (res.cancel) {

        }
      }
    })

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    var is_auth = wx.getStorageSync('is_auth');
    that.setData({
      is_auth: is_auth
    })
    var url = 'api/member/getMemberStatInfo';
    var data = {};
    req.reqData(url, data, function (res) {

      that.setData({
        mobile: res.data.data.mobile,
        show_return_money: res.data.data.show_return_money,
        return_money: res.data.data.return_money,
        return_score: res.data.data.return_score,
        show_shop_query: res.data.data.show_shop_query,
        myCoupons: res.data.data.myCoupons,
        favorite_count: res.data.data.favorite_count,
        hasData: 1,
        myPageData: res.data.data,
        inviter_member_id: res.data.data.inviter_member_id,
      })
    }, function () {

    })
    if (that.data.is_auth) {
      var nick_name = wx.getStorageSync('wx_username');
      var avatar = wx.getStorageSync('wx_avatar');
      that.setData({
        nick_name: nick_name,
        avatar: avatar,
      })
    } else {
      that.setData({
        nick_name: '未登录',
        avatar: '/images/my/nologin.png',
      })
    }

  },
  // 店铺搜索
  btn_myQuery: function (e) {
    wx.navigateTo({
      url: '/pages/index/search/search',
    })
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    // this.setData({
    //   hasData:0
    // })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },


  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // },

  /**
   * 列表按钮点击事件 0我的返现
   */
  listBtnClick: function (e) {
    var app_url = e.currentTarget.dataset.id;

    wx.navigateTo({
      url: app_url,
    })
  }


})