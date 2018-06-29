// pages/storeIndex/storeIndex.js
const req = require('../../service/service.js');
const login = require('../../utils/login.js');

const util = require('../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    hasTab: 0,
    shareMaskShow: 0,
    noscroll: 0,
    itemList: ['保存图片到相册'],
    share_image_url: '',
    isFollow: 0,
    shop_id: '',
    is_show: '',
    shop_info: {},
    coupon_num: '',
    coupon_info: [],
    live_info: [],
    productList: [],
    hasData: 0,
    more: 0,
    shareItemList: ['分享好友', '分享朋友圈'],
    noStock:6666666,
    currentType: 6666666,
    noscrollview: false,
    bottom: false,
    maskShow: false,
    inputValue: 1,
    couponMask: false,
    stock: 0,
    productSku: [],
    productInfo: {},
    currentIndex: 0,
    price: '',
    data_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var reg_shop_id = options.reg_shop_id;
    that.data.shop_id = options.shop_id;
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;
    var from_user_id = options.from_user_id;
    if (!that.data.shop_id) {
      var scene = decodeURIComponent(options.scene);
      that.data.shop_id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
      from_user_id = login.getQueryString('u', scene);
    }
    var entity_type = 'shop';
    var entity_id = that.data.shop_id;

    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id);
    var url = 'api/netred/homeForClient';
    var data = {
      shop_id: that.data.shop_id
    }
    req.reqData(url, data, function (res) {
      // console.log(res);
      var data = res.data.data;
      that.setData({
        shop_info: data.shop_info,
        share_image_url: data.shop_info.share_image_url,
        isFollow: data.shop_info.is_favorite,
        coupon_num: data.coupon_info.length,
        coupon_info: data.coupon_info,
        is_show: data.is_show,
        live_info: data.live_info,
        isAlert: data.live_info.my_remind,
        productList: data.new_entity,
        hasData: 1,
      })
      wx.setNavigationBarTitle({
        title: that.data.shop_info.name
      })
    }, function () { })
  },
  // 点击切换tab
  // currentChange(e){
  //   var current = e.currentTarget.dataset.current;
  //   this.setData({
  //     currentTab:current,
  //   })
  // },
  // 分享店铺
  intoShare() {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-分享', {
      'shop_id': that.data.shop_id,
    });
    that.setData({
      maskShow: true,
      couponMask: 1,
    })

    // wx.showActionSheet({
    //   itemColor: "#666666",
    //   itemList: that.data.shareItemList,
    //   success: function (res) {
    //     if (res.cancel) {
    //       return;
    //     }

    //     console.log(res);
    //     var index = res.tapIndex;
    //     var cancel_reason = that.data.shareItemList[index];
    //     if (index == 0) {

    //     } else {
    //       that.setData({
    //         shareMaskShow: 1,
    //         noscroll: 1,
    //       })
    //     }

    //   },
    //   fail: function (res) {
    //     // console.log(res.errMsg)
    //   }
    // })


  },
    // 跳转商品
  clickJump: util.throttle(function (e) {
    var url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('主播商品-商品', {
      'index': index + '',
      'shop_id': this.data.shop_id,
    });
    wx.navigateTo({
      url: '../../'+url,
    })
  }, 1000),
  
  btnShare: function (e) {
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-分享到朋友圈', {
      'shop_id': this.data.shop_id,
    });
    this.setData({
      shareMaskShow: 1,
      noscroll: 1,
      itemMask:0,
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
  moreWords() {
    this.setData({
      more: !this.data.more
    })
  },
  // 关闭二维码蒙层
  closeMask() {
    this.setData({
      shareMaskShow: 0,
      noscroll: 0,
      maskShow: false,
    })
  },
  // 领取优惠券
  getCoupon(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var position = e.currentTarget.dataset.index;
    var is_taken = e.currentTarget.dataset.is_taken;
    var limit_num = e.currentTarget.dataset.limit_num;
    var sendout_num = e.currentTarget.dataset.sendout_num;

    var app = getApp();
    app.aldstat.sendEvent('店铺主页-优惠券', {
      'coupon_id': id,
      'index': position+'',
    });
    //  还没领取
    if (is_taken == 0 && Number(limit_num) > Number(sendout_num)) {
      var url = 'api/coupon/takeCoupon';
      var data = {};
      data.id = id;
      login.login(true, function () {
        req.reqData(url, data, function (res) {
          console.log(res);
          if (res.data.returnCode == "-1000003") {
            console.log(222);
            wx.showToast({
              title: res.data.message
            })
            var url = 'api/netred/homeForClient';
            var data = {
              shop_id: that.data.shop_id
            }
            req.reqData(url, data, function (res) {
              var data = res.data.data;
              that.setData({
                coupon_info: data.coupon_info,
              })
            }, function () { })
          } else {
            var list = that.data.coupon_info;
            list[position].is_take = 1;
            that.setData({
              coupon_info: list
            })
            wx.showToast({
              title: '领取成功',
            })
          }

        }, function (ress) {

        })
      }, function () {

      })
    } else if (is_taken == 1 && Number(limit_num) >= Number(sendout_num)) {
      wx.showToast({
        title: '已经领过啦！',
      })
    } else {
      wx.showToast({
        title: '该券已抢完！',
      })
    }
  },
  // 进入直播
  intoLive: util.throttle(function (e) {
    var live_id = e.currentTarget.dataset.id;
    // var app_url = e.currentTarget.dataset.app_url;
    console.log(live_id);

    var app = getApp();
    app.aldstat.sendEvent('店铺主页-直播', {
      'live_id': live_id,
    });
    var url = "api/liveSchedule/checkLiveStatus";
    var data = {};
    data.id = live_id;
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        wx.navigateTo({
          // 界面跳转并页面传值
          url: '../../' + res.data.data.page_url
        })
      }
    }, function (res) {

    })
  }, 1000),
  //长按保存图片
  saveImgToPhotosAlbumTap: function () {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-转发到朋友圈-保存图片', {
      'shop_id': that.data.shop_id,
    });
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
                wx.showToast({
                  title: '保存成功',
                })
                that.setData({
                  noscroll: false,
                  maskShow: false,
                  couponMask: 0,
                  shareMaskShow: 0,
                  shareMask:0,
                });
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

  // 点击提醒
  alert_btn(e) {
    var index = e.currentTarget.dataset.index;
    // var form_id = e.detail.formId;
    var live_id = e.currentTarget.dataset.id;
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-直播设置开播提醒', {
      'live_id': live_id,
      'index': index+''
    });

    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 1,
        // formid: form_id,
      }
      req.reqData(url, data, function () {
        var list = that.data.live_info;
        list[index].my_remind = 1;
        that.setData({
          live_info: list
        })
        wx.showToast({
          title: '提醒成功'
        });
      }, function () {

      })
    }, function () {

    })
  },
  // 取消
  cancelAlert(e) {
    var index = e.currentTarget.dataset.index;
    var live_id = e.currentTarget.dataset.id;
    // var form_id = e.detail.formId;
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-直播取消开播提醒', {
      'live_id': live_id,
      'index': index + ''
    });
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 0,
        // formid: form_id,
      }
      req.reqData(url, data, function () {
        var list = that.data.live_info;
        list[index].my_remind = 0;
        that.setData({
          live_info: list
        })
        wx.showToast({
          title: '取消提醒成功'
        });
      }, function () {

      })
    }, function () {

    })
  },
  // 点击关注
  follow_btn(e) {
    // console.log(e);
    var form_id = e.detail.formId;
    var that = this;
    login.login(true, function () {
      // 已登录
      var url = 'api/favorite/followShop';
      var data = {
        id: that.data.shop_id,
        status: 1,
        formid: form_id,
      }

      var app = getApp();
      app.aldstat.sendEvent('店铺主页-关注', {
        'shop_id': that.data.shop_id,
      });
      req.reqData(url, data, function () {
        // console.log('已关注');
        wx.showToast({
          title: '关注成功'
        });
        that.setData({
          isFollow: 1,
        });
      }, function () {

      })
    }, function () {

    })
  },
  // 发送formid
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
  // 取消关注
  cancelFollow(e) {
    // console.log(e);
    var form_id = e.detail.formId;
    var that = this;
    login.login(true, function () {
      // 已登录
      var url = 'api/favorite/followShop';
      var data = {
        id: that.data.shop_id,
        status: 0,
        formid: form_id,
      }
      var app = getApp();
      app.aldstat.sendEvent('店铺主页-取消关注', {
        'shop_id': that.data.shop_id,
      });
      req.reqData(url, data, function () {

        wx.showToast({
          title: '取消关注成功'
        })
        that.setData({
          isFollow: 0,
        })
      }, function () {

      })
    }, function () {

    })
  },

  // 跳转商品
  jumpProduct: util.throttle(function (e) {
    var url = e.currentTarget.dataset.pageurl;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-商品', {
      'index': index+'',
      'shop_id': this.data.shop_id,
    });
    console.log(url)
    wx.navigateTo({
      url: '/' + url,

    })
  }, 1000),
  // 跳转视频
  jumpVideo: util.throttle(function (e) {
    var url = e.currentTarget.dataset.pageurl;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-视频', {
      'index': index + '',
      'shop_id': this.data.shop_id,
    });
    wx.navigateTo({
      url: '../../' + url,

    })
  }, 1000),
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  // 跳转首页
  jump_index: util.throttle(function () {
    var app = getApp();
    app.aldstat.sendEvent('店铺主页-主页');
    wx.switchTab({
      url: "/pages/index/index"
    })

    // var my_home_flag = wx.getStorageSync('my_home_flag');
    // var entity_type;
    // var entity_id;
    // if (my_home_flag == 1) {
    //   entity_type = 'e_home'
    // }
    // if (my_home_flag == 2) {
    //   entity_type = 's_home'
    // }
    // if (my_home_flag == 3) {
    //   entity_type = 'm_home'
    // }
    // entity_id = wx.getStorageSync('my_home_id');
    // if (!entity_id) {
    //   entity_id = 0;
    // }
    // wx.navigateTo({
    //   url: '/pages/index/translate/translate?entity_type=' + entity_type + '&entity_id=' + entity_id,
    // })
  }, 1000),

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
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 600)
    var that = this;
    var url = 'api/netred/homeForClient';
    var data = {
      shop_id: that.data.shop_id
    }
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        shop_info: data.shop_info,
        share_image_url: data.shop_info.share_image_url,
        isFollow: data.shop_info.is_favorite,
        coupon_num: data.coupon_info.length,
        coupon_info: data.coupon_info,
        is_take: data.coupon_info.is_take,
        is_show: data.is_show,
        live_info: data.live_info,
        isAlert: data.live_info.my_remind,
        productList: data.new_entity,
      })
      console.log('下拉刷新成功');
    }, function () { })
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },


  // 选择规格
  chooseType(e) {
    var that = this;
    var stock = e.currentTarget.dataset.stock;
    var id = e.currentTarget.dataset.skuid;
    var currentId = e.currentTarget.dataset.id;
    var img = e.currentTarget.dataset.image;
    var price = e.currentTarget.dataset.price;
    that.setData({
      price: price,
      stock: stock,
      sku_id: id,
      currentIndex: currentId,
      inputValue: 1,
      currentType: currentId,
      images: img
    })
  },

  // 点击+增加数量
  increase() {
    if (!this.data.stock) {
      wx.showToast({
        title: '请先选择规格'
      })
      return;
    }
    var proNum = this.data.inputValue;
    if (proNum >= this.data.stock) {
      // wx.showToast({
      //   title:'库存上限'+this.data.stock,
      // })
      return;
    }
    proNum++;
    this.setData({
      inputValue: proNum
    })
  },
  // 关闭弹窗
  closeView() {
    this.setData({
      noscrollview: false,
      bottom: false,
      maskShow: false,
      confirmShow: 0,
      shareMaskShow:0,
      shareMask:0,
      noscroll: false,
      couponMask: 0,
    })
  },

  // 减少数量
  reduce() {
    var proNum = this.data.inputValue;
    proNum--;
    if (proNum < 1) {
      return;
    } else {
      this.setData({
        inputValue: proNum
      })
    }
  },
  btnAddShopCar: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var entity_type = e.currentTarget.dataset.entity_type;
    that.data.data_id = e.currentTarget.dataset.data_id;
    that.setData({
      noStock:6666666,
      currentType: 6666666,
    })
    var url = "api/product/getProductSkus";
    var data = {};
    data.entity_id = id;
    data.entity_type = entity_type;

    req.reqData(url, data, function (res) {

      that.setData({
        productInfo: res.data.data,
        productSku: res.data.data.sku,
        price: res.data.data.price,
      });
      var list = that.data.productSku;
      if (list.length == 1) {
        that.setData({
          currentType: 0,
          stock: list[0].stock,
          sku_id: list[0].id,
        })
        if (list[0].stock == 0) {
          that.setData({
            noStock: 0
          })
        }
      }
      that.setData({
        noscrollview: true,
        bottom: true,
        maskShow: true,
        confirmShow: 1,
      })
    }, function () { }, 0)


  },

  // 确认购买
  confirmShop() {
    var that = this
    if (that.data.productInfo.stock_num == 0) {
      wx.showToast({
        title: '已售罄'
      })
      return;
    }
    if (!that.data.sku_id) {
      wx.showToast({
        title: '请先选择规格'
      })
      return;
    }
    var url = 'api/shopcart/addSkuToCart';
    var param = {
      sku_id: that.data.sku_id,
      num: that.data.inputValue,
      data_id: that.data.data_id,
    };
    console.log(param);
    login.login(true, function () {
      // 登录成功
      req.reqData(url, param,
        function (res) {
          if (res.data.returnCode == 0) {
            var app = getApp();
            app.aldstat.sendEvent('商品详情页-添加购物车', {
              'shop_id': that.data.shop_id + '',
              'product_id': that.data.productId + '',
            });
            that.setData({
              noscrollview: false,
              bottom: false,
              maskShow: false,
              confirmShow: false,
            })
            getApp().globalData.isReloading = true;
            wx.showToast({
              title: "添加购物车成功"
            })
          }
        }, function (res) {
          console.log('没有登录');
        });
    }, function () {

    })
  },
  // // 跳转直播预告
  // intoLiveDetail(e){
  //   var id = e.currentTarget.dataset.id;
  //   wx.navigateTo({
  //     url: '../../pages/liveDetail/liveDetail?id='+id,
  //   })
  // },
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
      console.log("来自页面内转发按钮"+res.target)
      var app = getApp();
      app.aldstat.sendEvent('店铺主页-分享到微信好友', {
        'shop_id': this.data.shop_id,
      });
      this.setData({
        noscroll: false,
        maskShow: false,
        couponMask: 0,
      })
    }
    return {
      title: this.data.shop_info.name,
      path: 'pages/storePage/storePage?from_member_id=' + member_id + '&shop_id=' + this.data.shop_id + '&register_channel=wxapp_share',
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