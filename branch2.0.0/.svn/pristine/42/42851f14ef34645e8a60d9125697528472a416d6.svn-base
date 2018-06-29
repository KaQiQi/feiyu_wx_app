// pages/qrcodeControler/qrcodeControler.js
var login = require('../../utils/login');
var req = require('../../service/service');
Page({

  /**
   * 页面的初始数据
   */
  data: { },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var scene = decodeURIComponent(options.scene);
  
    console.log(wx.getStorageSync('member_id'));
    var isfromscan = options.isfromscan;
    isfromscan= isfromscan ? isfromscan : '1';
  
    var reg_shop_id = options.reg_shop_id;
    if (!reg_shop_id) {
      reg_shop_id = login.getQueryString('r', scene);
    }
    var from_member_id = options.from_member_id;
    if (!from_member_id) {
      from_member_id = login.getQueryString('f', scene);
    }
    var register_channel = options.register_channel;
    if (!register_channel) {
      register_channel = login.getQueryString('c', scene);
    }

    var from_user_id = options.from_user_id;
    if (!from_user_id) {
      from_user_id = login.getQueryString('u', scene);
    }
    var entity_type = 'e_home';
    var entity_id = "134";

      login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
        var url = 'api/QrcodeJoinClub/qrScan';
        var data = {
          isfromscan:isfromscan
        };
        req.reqData(url,data,function(res){
          var status = res.data.data.status;
          if(status == '-2'){
            // 还未报名
            wx.redirectTo({
              url: '/pages/activity/vipClub/vipClub',
            })
          }else if(status == '4'){
            // 手机号未绑定
            if(isfromscan == 1){
              // 扫码进来没有手机号
              wx.redirectTo({
                url: '/pages/activity/vipClub/applyResult/applyResult?isfromscan=' + isfromscan,
              })
            }else if(isfromscan == '-1'){
              // 不是扫码进来且没有手机号
              wx.redirectTo({
                url: '/pages/activity/vipClub/vipClub',
              })
            }
          }else if(status == '3'){
            // 已激活成功
            wx.redirectTo({
              url: '/pages/activity/vipHome/vipHome',
            })
          }else if(status == '5'){
            // 已加入club
            wx.redirectTo({
              url: '/pages/activity/vipHome/vipHome',
            })
          }else{
            wx.redirectTo({
              url: '/pages/activity/vipClub/applyResult/applyResult?isfromscan='+isfromscan,
            })
          }
        },function(){})
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
  // onShareAppMessage: function () {
  
  // }
})