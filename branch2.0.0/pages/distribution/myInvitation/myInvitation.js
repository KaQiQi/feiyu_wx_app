// pages/activity/vipHome/myInvitation/myInvitation.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcode_image:'',
    pageData:{},
    invitationList:[],
    isShow:0,
    images:[],
    share_title:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/distribution/inviteFriend';
    var data = {};
    req.reqData(url,data,function(res){
      var data = res.data.data;
      that.setData({
        isShow:1,
        pageData:data,
        images:data.list.image,
        qrcode_image: data.share_qrcode,
        invitationList:data.list.data,
        share_title: data.share_title
      })
    },function(){})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
// 保存图片
  saveImgToPhotosAlbumTap: function () {
    var that = this;
    console.log(that.data.pageData.qrcode);
    console.log(that.data.qrcode_image);
    wx.downloadFile({
      url: that.data.qrcode_image,
      // url: that.data.pageData.qrcode,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            var app = getApp();
            app.aldstat.sendEvent('我的分销-保存二维码图片');
            wx.showToast({
              title: '保存成功',
              duration: 2000
            })
          },
          fail: function (res) {
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
            else if (str === "saveImageToPhotosAlbum:fail auth deny") {
              console.log("打开设置窗口");
              wx.openSetting({
                success(settingdata) {
                  console.log(settingdata)
                  if (settingdata.authSetting["scope.writePhotosAlbum"]) {
                    console.log("获取权限成功，再次点击图片保存到相册1")
                  } else {
                    console.log("获取权限失败1")
                  }
                }
              })
            }
          }
        })
      },
      fail: function (res) {
        console.log(res)
        console.log('fail')
      }
    })
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
      req.reqData(url, data, function () {
      }, function () { })
    }, function () { })
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
  onShareAppMessage: function (res) {
    var member_id = wx.getStorageSync('member_id');
    console.log(member_id);
    if (!member_id) {
      member_id = '';
    }
    var user_id = wx.getStorageSync('wx_id');
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: this.data.share_title,
      path: 'pages/distribution/getInvitation/getInvitation?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
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