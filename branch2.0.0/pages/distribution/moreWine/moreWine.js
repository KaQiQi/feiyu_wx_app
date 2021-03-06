// pages/distribution/moreWine/moreWine.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[],
    my_wine:0,
    showPage:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/distribution/productList'
    var my_wine = options.my_wine;
    var title = options.title;
    title = title ? title : '酒库'
    if(my_wine==1){
      wx.setNavigationBarTitle({
        title: '我的酒窖',
      })
    }else{
      wx.setNavigationBarTitle({
        title: title,
      })
    }
    var data = {
      type:my_wine
    }
    req.reqData(url,data,function(res){
      var data = res.data.data;
      console.log(res)
      that.setData({
        list:data.data,
        my_wine:my_wine,
        showPage:1
      })
    })
  },

  btnProDetail(e){
    var productId = e.currentTarget.dataset.id;
    var data_id = e.currentTarget.dataset.dataid;
    var is_bought = e.currentTarget.dataset.is_bought;
    
    console.log(data_id);
    wx.navigateTo({
      url: '/pages/distribution/productDetail/productDetail?productId=' + productId + '&data_id=' + data_id + '&is_bought=' + is_bought,
    })
  },

  record(e){
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/distribution/saleRecord/saleRecord?id='+id,
    })
  },
  stop(){
    return;
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
    var that = this;
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);

    var url = 'api/distribution/productList'
    var my_wine = options.my_wine;
    var title = options.title;
    title = title ? title : '妃鱼的酒'
    if (my_wine == 1) {
      wx.setNavigationBarTitle({
        title: '我的酒',
      })
    } else {
      wx.setNavigationBarTitle({
        title: title,
      })
    }
    var data = {
      type: my_wine
    }
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      console.log(res)
      that.setData({
        list: data.data,
        my_wine: my_wine,
        showPage: 1
      })
    })
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
  //   var user_id = wx.getStorageSync('wx_id');
  //   var member_id = wx.getStorageSync('member_id');
  //     if (!member_id) {
  //       member_id = '';
  //     }
      
  //   if(e.from == "menu"){
  //     return {
  //       title: '分销规则',
  //       path: 'pages/distribution/rules/rules?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
  //       success: function (res) {
  //         // 转发成功
  //       },
  //       fail: function (res) {
  //         // 转发失败
  //       }
  //     }
  //   }else{
  //     var name = e.target.dataset.name;
  //     var id = e.target.dataset.id;
  //     var data_id = e.target.dataset.data_id;
  //     return {
  //       title: name,
  //       path: 'pages/productDetail/productDetail?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id + '&productId=' + id + '&data_id=' + data_id,
  //       success: function (res) {
  //         // 转发成功
  //       },
  //       fail: function (res) {
  //         // 转发失败
  //       }
  //     }
  //   }
  // }
})