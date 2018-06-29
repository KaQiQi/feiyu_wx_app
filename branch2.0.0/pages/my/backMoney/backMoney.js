//index.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    my_return_money:'0',
    freez_return_money:'0',
    wechat:'',
    returnMoneyDetails: [],
    hasReq:false
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    var that = this;
    // 加载提示框
    wx.showLoading({
      title: '数据加载中',
      mask: true,
      success: function(res) {},
      fail: function(res) {},
      complete: function(res) {},
    })
    that.getDataReq();
    wx.hideLoading();
  },

  //下拉刷新
  onPullDownRefresh:function() {
    var that = this;
    wx.stopPullDownRefresh();
    that.getDataReq();
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
    that.getDataReq();
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

// 获取数据请求
  getDataReq:function () {
    var that = this;
    var url = "api/member/myReturnMoney";
    var param = {

    };
    req.reqData(url, param,
      function (res) {
        // 成功回调
        console.log(res);
        that.setData({
          hasReq: true,
          my_return_money: res.data.data.my_return_money,
          freez_return_money: res.data.data.freez_return_money,
          returnMoneyDetails: res.data.data.returnMoneyDetails,
          wechat: res.data.data.wechat
        });
      }, function (res) {
        //失败回调
        that.setData({
          hasReq: true,
        });
      });
  },

  /**
   * 立即提现按钮点击事件
   */
  instanceMoneyBtnClick:function(e) {
    console.log(e);
    var that = this;
    var totalMoney = e.currentTarget.dataset.id;
    var weChatNum  = that.data.wechat;
    console.log('可提现'+totalMoney);
    wx.navigateTo({
      // 界面传值(多个参数传值）
      url: '../../my/immediateMoney/immediateMoney?money=' + totalMoney + '&canMoney=' + parseInt(totalMoney / 20) * 20 + '&wechat=' + weChatNum

     //test
      // url:'../../my/myTest/myTest'

    })
  },

  /**
   * 确认收货按钮点击事件
   */
  sureReceiveBtnClick:function (){
    console.log('确认收货');
  }

})