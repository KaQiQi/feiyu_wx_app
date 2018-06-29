// pages/my/myCoupon/limitedCoupon/limitedCoupon.js
var req = require('../../../../service/service');
var login = require('../../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    coupon_info:{},
    shop_info:{},
    shareMaskShow: 0,
    noscroll: 0,
    share_image_url:'',
    itemList:['保存图片到系统相册'],
    coupon_id:'',
    shop_id:'',
    hasData:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var reg_shop_id = options.reg_shop_id;
    that.data.coupon_id = options.coupon_id;
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;

    var from_user_id = options.from_user_id;
    if (!that.data.coupon_id) {
      var scene = decodeURIComponent(options.scene);
      that.data.coupon_id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
    
      from_user_id = login.getQueryString('u', scene);
    }

    var entity_type = 'coupon';
    var entity_id = that.data.coupon_id;
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id);
    
    var url = 'api/coupon/couponInfo';
    var data = {
      coupon_id:that.data.coupon_id
    }
    req.reqData(url,data,function(res){
      that.setData({
        coupon_info:res.data.data.coupon_info,
        shop_info:res.data.data.shop_info,
        share_image_url:res.data.data.coupon_info.share_image_url,
        hasData:1,
        bg_img: res.data.data.bg_img
      })
      wx.setNavigationBarTitle({
        title: that.data.shop_info.name+'的专用优惠券',
      })
    },function(){})
  },
// 领取优惠券
  getCoupon(e){
    var id = e.currentTarget.dataset.id;
    var that = this;
    var url = 'api/coupon/takeCoupon';
    var data = {
      id:id
    }
    login.login(true,function(){
      req.reqData(url,data,function(res){
        if(res.data.returnCode == 0){
          wx.showToast({
            title:'领取成功'
          })
          var list = that.data.coupon_info;
          list.is_taken = 1;
          that.setData({
            coupon_info:list
          })
        }
      },function(){})
    },function(){});
  },

  jump_index: function () {
    wx.switchTab({
      url: "../../../index/index"
    })
  },
  intoShop(e){
    var id = e.currentTarget.dataset.id;
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/' + url,
    })
  },
//长按保存图片
  saveImgToPhotosAlbumTap: function () {
    var that = this;
    wx.downloadFile({
      url: that.data.share_image_url,
      success: function (res) {
        // console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
          },
          fail: function (res) {
            // console.log(res)
            // console.log('fail')
            var str = res.errMsg;
            if (str.indexOf("saveImageToPhotosAlbum:fail auth deny")) {
              console.log("打开设置窗口");
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                    console.log("获取权限成功，再次点击图片保存到相册")
                  } else {
                    console.log("获取权限失败")
                  }
                }
              })
            }
          }
        })
      },
    fail: function () {
      // console.log('fail')
    }
  })

},


// 点击分享
intoShare() {
  this.setData({
    shareMaskShow: 1,
    noscroll: 1,
  })
},

  // 关闭二维码蒙层
  closeMask() {
    this.setData({
      shareMaskShow: 0,
      noscroll: 0,
    })
  },


  btnShare: function (e) {
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-分享到朋友圈', {
      'shop_id': this.data.shop_id,
    });
    this.setData({
      shareMaskShow: 1,
      noscroll: 1,
      couponMask:0,
      maskShow:0,
    })
  },
  close: function (e) {
    this.setData({
      noscroll: false,
      maskShow: false,
      couponMask: 0,
      shareMaskShow: 0,
      shareMask:0,
    })
  },
  
   
intoShare() {
  var that = this;
  var app = getApp();
  app.aldstat.sendEvent('店铺主页-分享', {
    'shop_id': that.data.shop_id,
  });
  that.setData({
    noscroll: true,
    maskShow: true,
    couponMask: 1,
    maskShow:1,
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
  onShareAppMessage: function () {
    var that=this;
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }
    this.setData({
      noscroll: 0,
      maskShow: 0,
      couponMask: 0,
      maskShow:0,
    })
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)

    // }


    var user_id = wx.getStorageSync('wx_id');
    return {
      title: that.data.shop_info.name,
      path: 'pages/my/myCoupon/limitedCoupon/limitedCoupon?from_member_id=' + member_id + '&coupon_id=' + that.data.coupon_id + '&register_channel=wxapp_share' +  '&from_user_id=' + user_id ,
      success: function (res) {
        // 转发成功
        // console.log('转发成功' + this.data.shop_id)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})