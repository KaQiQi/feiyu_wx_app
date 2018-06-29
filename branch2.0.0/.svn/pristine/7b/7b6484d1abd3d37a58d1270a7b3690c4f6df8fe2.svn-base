// pages/activity/vipClub/applyResult/applyResult.js
var req = require('../.././../../service/service');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    status: '',
    hasData: 0,
    sendding: 0,
    time: 59,
    timer: '',
    mobileNumber: '',
    cardNum: '',
    code: '',
    pageData: {},
    isfromscan: '',
    is_auth: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var is_auth = wx.getStorageSync('is_auth');
    var url = 'api/ClubVipApply/getApplyInfo';
    var isfromscan = options.isfromscan;
    var data = {}
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        is_auth: is_auth,
        status: data.status,
        hasData: 1,
        pageData: data,
        mobileNumber: data.mobile,
        isfromscan: isfromscan
      })
      console.log(that.data.status);
      if (that.data.status == 0) {
        wx.setNavigationBarTitle({
          title: '报名成功',
        })
      } else if (that.data.status == '-1') {
        wx.setNavigationBarTitle({
          title: '报名失败',
        })
      } else {
        wx.setNavigationBarTitle({
          title: '激活您的权益',
        })
      }
    }, function () {

    })


  },

  jump_index() {
    wx.switchTab({
      url: '/pages/index/index',
    })
  },

  // 获取验证码
  getCode() {
    var that = this;
    var url = 'api/ClubVipApply/sendCode';
    var data = {
      mobile: that.data.mobileNumber
    }

    if (!(/^1[3|4|5|7|8][0-9]\d{4,8}$/.test(data.mobile))) {
      wx.showToast({
        title: '手机号格式有误'
      })
      return;
    } else {
      // 获取验证码请求
      req.reqData(url, data, function (res) {
        that.setData({
          sendding: 1,
        })
        wx.showToast({
          title: "验证码已发送"
        });
      }, function () {
        // console.log('获取验证码失败');
      });

      // 开启定时器
      that.data.timer = setInterval(function () {
        that.data.time -= 1;
        if (that.data.time <= 0) {
          clearInterval(that.data.timer);
          that.setData({
            sendding: 0,
            time: 59,
          })
        } else {
          that.setData({
            time: that.data.time
          })
        }
      }, 1000)
    }

  },
  cardNum(e) {
    this.data.cardNum = e.detail.value;
  },
  get_code(e) {
    this.data.code = e.detail.value;
  },
  mobile(e) {
    this.data.mobileNumber = e.detail.value;
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

  // 立即激活
  activation() {
    var that = this;
    var url = 'api/ClubVipApply/joinClub';
    var data = {
      mobile: that.data.mobileNumber,
      card_no: that.data.cardNum,
      code: that.data.code
    }
    if (!that.data.cardNum) {
      wx.showToast({
        title: '请填写卡号'
      })
      return;
    } else if (!that.data.mobileNumber) {
      wx.showToast({
        title: '请填写手机号码'
      })
      return;
    } else if (!that.data.code) {
      wx.showToast({
        title: '验证码'
      })
      return;
    }
    req.reqData(url, data, function (res) {
      wx.redirectTo({
        url: '/pages/activity/vipHome/vipHome'
      })
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