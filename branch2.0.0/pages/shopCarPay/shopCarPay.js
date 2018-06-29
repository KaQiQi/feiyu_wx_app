const req = require('../../service/service.js');
const login = require('../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: '',
    send_to: '',
    send_to_mobile: '',
    total_money: '',
    top_order_no: '',
    order_id: '',
    interval: '',
    isShowPage: '0',
    cont:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    var that = this;
    that.setData({
      top_order_no:options.top_order_no
    })
    wx.showLoading({
      title: '支付中',
    })

  },

  PerRefresh(url, data) {

    req.reqData(url, data,
      function (res) {
        that.setData({
          address: res.data.data.address,
          send_to: res.data.data.send_to,
          total_money: res.data.data.total_money,

        });

      }, function (res) {

      });
  },



  go_back: function () {
    wx.switchTab({
      url:'../../pages/index/index'
    })
  },
  btn_IdCard: function (e) {
    console.log(e);
        wx.navigateTo({
          url: '/pages/myPhone/myPhone',
        })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that = this;
    var url = 'api/shopcart/checkPayStatus';
    var data = {
      top_order_no: that.data.top_order_no
    };
    data.top_order_no = that.data.top_order_no;
    that.data.interval = setInterval(function () {
      req.reqData(url, data,
        function (res) {

          if(res.data.returnCode == 0){
            clearInterval(that.data.interval)
            getApp().globalData.flag = true;
            getApp().globalData.isReloading = true;
            wx.hideLoading();
  
            var app = getApp();
            app.aldstat.sendEvent('支付成功', {});
            var isBindPhone;
            if (res.data.data.bind_mobile_tip) {
              isBindPhone = 1
            } else {
              isBindPhone = 0
            }
            that.setData({
              isBindPhone: isBindPhone,
              bind_mobile_tip: res.data.data.bind_mobile_tip,
              isShowPage: 1,
              address: res.data.data.address,
              send_to: res.data.data.send_to,
              total_money: res.data.data.total_money,
              order_id: res.data.data.order_id,
            });
          }else{
            that.data.cont ++;
            if(that.data.cont >= 3){
              wx.showToast({
                title:'支付失败'
              })
              clearInterval(that.data.interval);
              return;
            }
          }     
        }, function (res) {
          clearInterval(that.data.interval);
        });
    }, 2000);

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
    clearInterval(this.data.interval)
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


  lookPay: function (e) {
    var order_id = e.currentTarget.dataset.id;
    wx.redirectTo({
      url: '/pages/my/myOrder/order?order_status=0',
    })
  },

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})