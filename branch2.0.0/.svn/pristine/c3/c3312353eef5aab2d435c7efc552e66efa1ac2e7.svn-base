// pages/live_demo/liveDetail/liveDetail.js
const req = require('../../service/service');
const login = require('../../utils/login');
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(second) {
  // 天数
  var day = Math.floor(second / 3600 / 24);
  if (day < 10) {
    day = "0" + day;
  }
  // 小时
  var hr = Math.floor(second / 3600 % 24);
  if (hr < 10) {
    hr = "0" + hr;
  }
  // 分钟
  var min = Math.floor(second / 60 % 60);
  if (min < 10) {
    min = "0" + min;
  }
  // 秒
  var sec = Math.floor(second % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return {
    day: day,
    hr: hr,
    min: min,
    sec: sec
  }
}
Page({
  // 数据初始化
  data: {
    indicatorDots: true,
    autoplay: true,
    interval: 4500,
    duration: 500,
    circular: true,
    coupon_num: '',
    coupon_info: [],
    live_status: '',
    live_info: {},
    itemList: ['保存图片到系统相册'],
    netred: {},
    productList: [],
    start_time: '',
    timer: '',
    timeData: {},
    live_id: '',
    is_start: 0,
    banner_images: [],
    hasData: 0,
    shareMaskShow: 0,
    noscroll: 0,
    share_image_url: '',
    coupons: [],
    noscroll: false,
    couponMask: false,
    maskShow: false,
    discount_list: [],
    shareMask: 0,
    publish_wxapp: '',
    taobo_password: '',
    starting: 0,
    live_data_id: '',
    isShow: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var reg_shop_id = options.reg_shop_id;
    that.data.live_id = options.id;
    var live_data_id = options.data_id ? options.data_id : '';
    var from_member_id = options.from_member_id;
    var from_user_id = options.from_user_id;
    var register_channel = options.register_channel;
    if (!that.data.live_id) {
      var scene = decodeURIComponent(options.scene);
      that.data.live_id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
      from_user_id = login.getQueryString('u', scene);
      live_data_id = login.getQueryString('a', scene);
    }

    that.data.live_data_id = live_data_id;
    var entity_type = 'live';
    var entity_id = that.data.live_id;
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id);
    var url = 'api/LiveSchedule/liveDetailForPreShow';
    var data = {
      id: that.data.live_id,
      live_data_id: live_data_id
    }
    console.log(that.data.live_data_id);
    req.reqData(url, data, function (res) {
      // console.log(res);
      var data = res.data.data;
      if (data.live_info.live_status == 3 && data.live_info.mp4_url) {
        that.setData({
          isShow: 0
        })
      }
      that.setData({
        netred: data.netred,
        coupon_info: data.coupons,
        coupon_num: data.coupons.length,
        live_info: data.live_info,
        productList: data.product_info,
        start_time: data.live_info.start_time_duration,
        live_status: data.live_info.live_status,
        live_id: data.live_info.id,
        banner_images: data.live_info.banner_images,
        share_image_url: data.live_info.share_image_url,
        coupons: data.coupons,
        publish_wxapp: data.live_info.publish_wxapp,
        taobo_password: data.live_info.taobo_password,
      })


      if (that.data.live_status == 1 && that.data.publish_wxapp == 1) {
        // 直播开始 小程序这边直播
        wx.redirectTo({
          url: '../../pages/livePlayer/livePlayer?id=' + that.data.live_id + '&live_data_id=' + that.data.live_data_id,
        })
      } else if (that.data.live_status == 3) {

        if (data.live_info.mp4_url) {
          wx.redirectTo({
            url: '/pages/livePlayer/videoPlayer/videoPlayer?id=' + data.live_info.id,
          })

        }
        // 直播结束
        that.setData({
          hasData: 1,
        })
        wx.setNavigationBarTitle({
          title: '直播结束'
        })
      } else if (that.data.live_status == 1 && that.data.publish_wxapp == 0) {
        // 直播开始且是淘宝直播
        wx.setNavigationBarTitle({
          title: '直播已开始'
        })
        that.setData({
          hasData: 1,
          is_taobao: 1
        });

      } else if (that.data.live_status == 0) {
        // 预告状态
        wx.setNavigationBarTitle({
          title: '直播预告'
        })
        // 开启倒计时
        clearInterval(that.data.timer);
        that.data.timer = setInterval(function () {
          that.data.start_time--;
          // console.log(that.data.start_time)
          var timeData = dateformat(that.data.start_time);
          that.setData({
            timeData: timeData,
            hasData: 1,
          })
          if (that.data.start_time <= 0) {//倒计时结束
            clearInterval(that.data.timer);
            var url = 'api/liveSchedule/checkLiveStatus';
            var data = {
              id: that.data.live_id
            }
            if (that.data.publish_wxapp == 0) {
              that.setData({
                is_taobao: 1
              });
              wx.setNavigationBarTitle({
                title: '直播已开始'
              })
            } else {
              req.reqData(url, data, function (res) {
                var data = res.data.data;
                if (data.page_type == 1) {
                  wx.redirectTo({
                    // 界面跳转并页面传值
                    url: '../../' + data.page_url
                  })
                } else if (data.page_type == 0) {
                  that.setData({
                    is_start: 1
                  })
                }
              })
            }
          }
        }, 1000)
      }
    }, function () { })

  },
  btnCopy(e) {
    var that = this;
    wx.setClipboardData({
      data: that.data.taobo_password,
      complete: function () {
        wx.hideToast();
      },
      success: function () {
        wx.showModal({
          title: '请打开淘宝APP进入直播间',
          content: '复制淘口令成功',
          showCancel: false,
        });
      }
    })
  },
  productDetail(e) {
    var app_url = e.currentTarget.dataset.app_url;
    wx.navigateTo({
      url: '/' + app_url,
    })
  },
  // 优惠券
  couponShow(e) {
    var id = e.currentTarget.dataset.id;
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('直播预告点优惠券', {
      'id': id + '',
    });

    this.setData({
      noscroll: true,
      couponMask: true,
      maskShow: true,
    })
    var url = 'api/coupon/getShopCoupon';
    var data = {};
    data.shop_id = id;
    login.login(true, function () {
      req.reqData(url, data, function (res) {

        that.setData({
          discount_list: res.data.data,
        })

      }, function (res) {

      })
    }, function () {

    })
  },

  btn_getDiscount: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var app = getApp();
    app.aldstat.sendEvent('商品详情页领优惠券', {
      'id': id + '',
    });
    var position = e.currentTarget.dataset.position;
    var is_taken = e.currentTarget.dataset.is_taken;
    var limit_num = e.currentTarget.dataset.limit_num;
    var sendout_num = e.currentTarget.dataset.sendout_num;

    //  还没领取
    if (is_taken == 0 && Number(limit_num) > Number(sendout_num)) {
      var url = 'api/coupon/takeCoupon';
      var data = {};
      data.id = id;
      login.login(true, function () {
        req.reqData(url, data, function (res) {
          that.data.discount_list[position].is_taken = 1;
          that.setData({
            discount_list: that.data.discount_list,
          })
          wx.showToast({
            title: '领取成功',
          })
        }, function (res) {

        })
      }, function () {

      })
    } else if (is_taken == 1 && Number(limit_num) >= Number(sendout_num)) {
      wx.showToast({
        title: '已领取',
      })
    } else {
      wx.showToast({
        title: '已抢完',
      })
    }
  },
  // 关闭弹窗
  close() {
    this.setData({
      noscroll: false,
      maskShow: false,
      couponMask: false,
    })
  },
  goToShop(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../../' + url
    })
  },
  // 点击关注
  follow: function (e) {
    var that = this;
    var url = 'favorite/followNetred';
    var id = e.currentTarget.dataset.id;
    var obj = {
      id: id,
      status: 1
    }
    req.reqData(url, obj,
      function (res) {
        that.setData({
          isFollow: 1,
        });
      }, function (res) {

      });
  },

  // 点击提醒
  alert_btn(e) {
    var that = this;
    var live_id = that.data.live_id;
    var app = getApp();
    app.aldstat.sendEvent('直播预告-点击提醒', {
      id: live_id + ''
    });
    login.login(true, function () {
      // 已登录
      var list = that.data.live_info;
      list.is_remind = 1;
      that.data.live_info.like_num = parseInt(that.data.live_info.like_num) + 1;
      that.setData({
        live_info: list,
      })
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 1,
        live_data_id: that.data.live_data_id
        // formid: form_id,
      }
      req.reqData(url, data, function (res) {
        if (res.data.returnCode == 0) {

          wx.showToast({
            title: '提醒成功',
            duration: 2000
          });
        }
      }, function () {

      })
    }, 0)
  },
  // 取消
  cancelAlert(e) {
    var that = this;
    var live_id = that.data.live_id;
    var list = that.data.live_info;
    var app = getApp();
    app.aldstat.sendEvent('直播预告-取消提醒', {
      id: live_id + ''
    });
    list.is_remind = 0;
    that.data.live_info.like_num = parseInt(that.data.live_info.like_num) - 1;
    that.setData({
      live_info: list
    })
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 0,
        live_data_id: that.data.live_data_id
      }
      req.reqData(url, data, function () {

        wx.showToast({
          title: '取消提醒成功',
          duration: 2000
        });
      }, function () {

      })
    }, function () {

    })
  },

  jump_index: function () {
    var app = getApp();
    app.aldstat.sendEvent('直播预告-回到首页');
    wx.switchTab({
      url: "../../pages/index/index"
    })
  },
  //长按保存图片
  saveImgToPhotosAlbumTap: function () {
    var that = this;
    // wx.showActionSheet({
    //   itemColor: "#666666",
    //   itemList: that.data.itemList,
    //   success: function (result) {
    wx.downloadFile({
      url: that.data.share_image_url,
      success: function (res) {
        // console.log(res)
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            var app = getApp();
            app.aldstat.sendEvent('直播预告-保存二维码图片');
            wx.showToast({
              title: '保存成功',
              duration: 2000
            })
            that.setData({
              maskShow: 0,
              shareMask: 0,
              shareMaskShow: 0,
              noscroll: 0,
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

    //   },
    //   fail: function (res) {
    //     // console.log(res.errMsg)
    //   }
    // })

  },

  // 点击分享
  intoShare() {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('直播预告-分享');
    that.setData({
      noscroll: true,
      maskShow: true,
      shareMask: 1,
    })
  },


  btnShare: function (e) {
    var app = getApp();
    app.aldstat.sendEvent('直播预告-分享到朋友圈');
    this.setData({
      shareMaskShow: 1,
      noscroll: 1,
      shareMask: 0,
      maskShow: 0,
    })
  },

  close: function (e) {
    this.setData({
      noscroll: 0,
      maskShow: 0,
      couponMask: 0,
      shareMask: 0,
      shareMaskShow: 0,
    })
  },
  // 关闭二维码蒙层
  closeMask() {
    this.setData({
      shareMaskShow: 0,
      noscroll: 0,
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
        // console.log('发送formid成功');
      }, function () { })
    }, function () { })
  },

  // 复制淘口令
  copyPassWord() {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('直播预告-复制淘口令');
    wx.setClipboardData({
      data: that.data.taobo_password,
      complete: function () {
        wx.hideToast();
      },
      success: function () {
        wx.showModal({
          title: '复制淘口令成功',
          content: '请打开淘宝APP进入直播间',
          showCancel: false,
        });
      }
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
    var that = this;
    setTimeout(() => {
      wx.stopPullDownRefresh();
    }, 500);
    var url = 'api/LiveSchedule/liveDetailForPreShow';
    var data = {
      id: that.data.live_id,
      live_data_id: that.data.live_data_id
    }
    req.reqData(url, data, function (res) {
      // console.log(res);
      var data = res.data.data;
      that.setData({
        netred: data.netred,
        coupon_info: data.coupons,
        coupon_num: data.coupons.length,
        live_info: data.live_info,
        productList: data.product_info,
        start_time: data.live_info.start_time_duration,
        live_status: data.live_info.live_status,
        live_id: data.live_info.id,
        banner_images: data.live_info.banner_images,
        share_image_url: data.live_info.share_image_url,
        coupons: data.coupons,
        publish_wxapp: data.live_info.publish_wxapp,
        taobo_password: data.live_info.taobo_password,
      })

      if (that.data.live_status == 1 && that.data.publish_wxapp == 1) {
        // 直播开始 小程序这边直播
        wx.redirectTo({
          url: '../../pages/livePlayer/livePlayer?id=' + that.data.live_id + '&live_data_id=' + that.data.live_data_id,
        })
      } else if (that.data.live_status == 3) {
        if (data.live_info.mp4_url) {
          wx.redirectTo({
            url: '/pages/livePlayer/videoPlayer/videoPlayer?id=' + data.live_info.id,
          })

        }
        // 直播结束
        that.setData({
          hasData: 1,
        })
        wx.setNavigationBarTitle({
          title: '直播结束'
        })
      } else if (that.data.live_status == 1 && that.data.publish_wxapp == 0) {
        // 直播开始且是淘宝直播
        wx.setNavigationBarTitle({
          title: '直播已开始'
        })
        that.setData({
          hasData: 1,
          is_taobao: 1
        });
        // wx.setClipboardData({
        //   data:that.data.taobo_password,
        //   complete:function(){
        //     wx.hideToast();
        //   },
        //   success:function(){
        //     wx.showModal({
        //       title:'请打开淘宝APP进入直播间',
        //       content:'复制淘口令成功',
        //       showCancel:false,
        //     });
        //   }
        // })
      } else if (that.data.live_status == 0) {
        // 预告状态
        wx.setNavigationBarTitle({
          title: '直播预告'
        })
        // 开启倒计时
        clearInterval(that.data.timer);
        that.data.timer = setInterval(function () {
          that.data.start_time--;
          // console.log(that.data.start_time)
          var timeData = dateformat(that.data.start_time);
          that.setData({
            timeData: timeData,
            hasData: 1,
          })
          if (that.data.start_time <= 0) {//倒计时结束
            clearInterval(that.data.timer);
            var url = 'api/liveSchedule/checkLiveStatus';
            var data = {
              id: that.data.live_id
            }
            if (that.data.publish_wxapp == 0) {
              that.setData({
                is_taobao: 1
              });
              wx.setNavigationBarTitle({
                title: '直播已开始'
              })
            } else {
              req.reqData(url, data, function (res) {
                var data = res.data.data;
                if (data.page_type == 1) {
                  wx.redirectTo({
                    // 界面跳转并页面传值
                    url: '../../' + data.page_url
                  })
                } else if (data.page_type == 0) {
                  that.setData({
                    is_start: 1
                  })
                }
              })
            }
          }
        }, 1000)
      }
    }, function () { })

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
    if (!member_id) {
      member_id = '';
    }

    if (res.from === 'button') {
      // 来自页面内转发按钮
      this.setData({
        noscroll: false,
        maskShow: false,
        couponMask: 0,
        shareMask: 0,
      })
    }
    return {
      title: this.data.live_info.title,
      path: 'pages/liveDetail/liveDetail?from_member_id=' + member_id + '&id=' + this.data.live_id + '&register_channel=wxapp_share',
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