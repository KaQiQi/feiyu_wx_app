//index.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataloaded:0,
    focus_list:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    wx.showLoading();
    var that = this;
    login.login(true,function(){
      // 我的关注url请求
      var url = 'api/member/myFavoriteV3';
      var param = {};
      req.reqData(url, param,
        function (res) {
          
          that.setData({
            focus_list:res.data.data,
            dataloaded:1,
          })
          wx.hideLoading();
        }, function (res) {
  
        });
    },function(){})
  },

  btnIndex: function (e) {
    console.log(e);
    var that = this;
    var my_home_flag = e.currentTarget.dataset.my_home_flag;
    var my_home_id = e.currentTarget.dataset.my_home_id;
    login.login(true, function () {
      var url = '/api/netred/setHome';
      var data = {};

      data.my_home_id = my_home_id;
      data.my_home_flag = my_home_flag;
      req.reqData(url, data, function (res) {
        wx.setStorageSync('my_home_flag', my_home_flag);
        wx.setStorageSync('my_home_id', my_home_id);

        getApp().globalData.isLoginIndex = true;
        wx.switchTab({
          url: '/pages/index/index',
        })

      }, function () {

      })

    }, function () {

    })

  },

  // 点击跳转
  toShop(e){
    var shop_id = e.currentTarget.dataset.id;

    var app = getApp();
    app.aldstat.sendEvent('我的关注进店', {
      'shop_id': shop_id,
    });
    wx.navigateTo({
      url: '../../storePage/storePage?shop_id='+shop_id,
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {
    
  // },

  /**
   * 关注按钮点击事件
   */
  focusBtnClick:function (e) {
    console.log(e);
    
  }

})