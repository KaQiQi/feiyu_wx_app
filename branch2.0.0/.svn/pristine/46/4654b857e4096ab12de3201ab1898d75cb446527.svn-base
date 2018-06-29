//index.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    result:{},
    // 提现微信号
    wechatNum:'',
    // 提现金额
    cashMoney:'',
    // 是否被加过微信 1加过 0没加
    is_add_to_company:'',
    // 二维码图片
    codeImage:''
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    var that = this;
    that.setData({
      wechatNum: options.wechat,
      cashMoney: options.cashMoney,
      is_add_to_company: options.hasAdd,
      codeImage: options.code_image
    });
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
    
  },

// 我要极速到账按钮点击事件
  nextBtnClick:function () {
    var that = this;
    // 传官方信息字段 
    var wechat_num   = that.data.wechatNum;
    var codeImageURL = that.data.codeImage;
    // wx.navigateTo({
    //   // 去极速到账界面
    //   url: '../../my/speedBack/speedBack?wechatNum=' + wechat_num +  '&codeImageURL=' + codeImageURL
    // })

    // 调用自己写的方法
    that.backToMyMoney();
  },


  backToMyMoney:function () {
    var that = this;
    // 传官方信息字段 
    // var wechat_num = that.data.wechatNum;
    // var codeImageURL = that.data.codeImage;
    // wx.navigateTo({
    //   url: '../../my/speedBack/speedBack?wechatNum=' + wechat_num + '&codeImageURL=' + codeImageURL,
    //   success: function(res) {},
    //   fail: function(res) {},
    //   complete: function(res) {},
    // })

    //关闭当前页面,返回到 我的返现 界面
    wx.navigateBack({
      delta: 2,
    })

    // wx.switchTab({
    //   url: '/pages/my/my',
    //   success: function (res) { },
    //   fail: function (res) { },
    //   complete: function (res) { },
    // })
  }
})