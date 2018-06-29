//index.js
const md5 = require('../../../utils/md5.js');
const req = require('../../../service/service.js');
const login = require('../../../utils/login.js');

const util = require('../../../utils/util.js');
// var app=getApp();
Page({
  data: {
    feiyu_data: {},
    enterprise_data: {},
    page_control_data: 0,
    is_data_show: 0,
    is_login: 0,
    info:'',
    place1Data:'',
    indicatorDots: true,
    isHasStorage: 0,
    isShow: 0,
    liveSchedules: [],
    currentTab: 1,
    currentType: 0,
    coupons: [],
    otherIndexProducts: [],
    productTabData: [],
    liveTabData: [],
    activity: [],
    hasData: 0,
    mainData: [],
    isShow: 0,
    my_home_flag: '',
    entity_id:'',
    noStock:6666666,
    currentType: 6666666,
    noscroll: false,
    bottom: false,
    maskShow: false,
    inputValue: 1,
    couponMask: false,
    stock: 0,
    productSku: [],
    productInfo: {},
    currentIndex: 0,
    price: '',

    data_id: '',

    other_shareMaskShow: 0,
    other_noscroll: 0,
    other_shareMask: 0,
    other_maskShow: 0,
    share_image_url: '',
    share_title:'',
  },
  // 数据加载
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    var scene = decodeURIComponent(options.scene);
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
    var entity_type = options.entity_type;
    if (!entity_type) {
      entity_type = login.getQueryString('e', scene);
    }

    var entity_id = options.entity_id;
    if (!entity_id) {
      entity_id = login.getQueryString('v', scene);
    }
    that.data.entity_id = entity_id;
    if (entity_type == 'e_home') {
      that.data.my_home_flag = 1
    } if (entity_type == 's_home') {
      that.data.my_home_flag = 2
    } if (entity_type == 'm_home') {
      that.data.my_home_flag = 3
    }
   
      login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
        that.onLoadData();
      });



  },

  third_input_search: function (e) {
    wx.navigateTo({
      url: '/pages/index/search/search',
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
  formReset(e){
    console.log(e);
  },

  formIdAct(e) {
    console.log(e);
    var that = this;
    var pageurl = e.currentTarget.dataset.url;
    // console.log(url)
    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid: form_id
    };
    req.reqData(url, data, function () {
      wx.navigateTo({
        url: '/' + pageurl,
      })
    }, function () { })
  },
  // 人气好店进店
  feiyu_goToVenue: util.throttle(function (e) {
    console.log(e);
    var url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;

    wx.navigateTo({
      url: '../../../' + url,
    })
  }, 1000),
  jump_index: util.throttle(function () {
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
    wx.switchTab({
      url: '/pages/index/index',
    })

  }, 1000),
  jump_live: util.throttle(function (e) {
    // var url = e.currentTarget.dataset.url;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('首页直播', {
      'live_id': id,
      'index': index + '',
    });
    // console.log(url);
    var url = "api/liveSchedule/checkLiveStatus";
    var data = {};
    data.id = id;
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        wx.navigateTo({
          // 界面跳转并页面传值
          url: '../../../' + res.data.data.page_url
        })
      }
    }, function (res) {

    })
  }, 1000),

  feiyu_btnLive: util.throttle(function (e) {
    // var url = e.currentTarget.dataset.url;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('首页直播', {
      'live_id': id,
      'index': index + '',
    });
    // console.log(url);
    var url = "api/liveSchedule/checkLiveStatus";
    var data = {};
    data.id = id;
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        wx.navigateTo({
          // 界面跳转并页面传值
          url: '../../../' + res.data.data.page_url
        })
      }
    }, function (res) {

    })
  }, 1000),
  // 人气好店进店
  feiyu_goToShop: util.throttle(function (e) {
    console.log(e);
    var url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    console.log(index);
    var app = getApp();
    app.aldstat.sendEvent('推荐主播', {
      'index': index + '',
    });
    wx.navigateTo({
      url: '../../../' + url,
    })
  }, 1000),

  // 精选专题
  feiyu_btnSpecial: util.throttle(function (e) {
    var url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../../' + url,
    })
  }, 1000),

  // 潮流时尚
  feiyu_btnFashionals: util.throttle(function (e) {
    var url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    wx.navigateTo({
      url: '../../../' + url,
    })
  }, 1000),
  // 精选专题下的商品
  feiyu_btnSpecialDetail: util.throttle(function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../../../' + url,
    })
  }, 1000),
  //banner点击事件
  feiyu_onClickPath: util.throttle(function (e) {
    var app_url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('首页轮播图', {
      'index': index + '',
    });
    wx.navigateTo({
      url: '../../../' + app_url,
    })

  }, 1000),

  clickJump(e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../../../' + url,
    })

  },

  // 点击切换tab
  other_currentChange(e) {
    var that = this;
    var current = e.currentTarget.dataset.current;
    this.setData({
      currentTab: current,
    })
    var url = '';
    var data = {
      shop_id: that.data.shop_id
    }
    if (current == 2) {
      url = 'api/netred/getDataFlowV3';
      if (that.data.productTabData.length > 0) {
        return;
      } else {
        req.reqData(url, data, function (res) {
          that.setData({
            productTabData: res.data.data,
            hasData: 1
          })
        }, function () { }, 1);
      }

    } else if (current == 2) {
      // 直播tab
    }
  },

  // 点击提醒
  alert_btn(e) {
    var index = e.currentTarget.dataset.index;
    // var form_id = e.detail.formId;
    var live_id = e.currentTarget.dataset.id;
    var my_remind = e.currentTarget.dataset.my_remind;
    var that = this;
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 1,
        // formid: form_id,
      }
      req.reqData(url, data, function () {

        that.data.liveSchedules[index].my_remind = 1;
        that.setData({
          liveSchedules: that.data.liveSchedules
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
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 0,
        // formid: form_id,
      }
      req.reqData(url, data, function () {

        that.data.liveSchedules[index].my_remind = 0;
        that.setData({
          liveSchedules: that.data.liveSchedules
        })
        wx.showToast({
          title: '取消提醒成功'
        });
      }, function () {

      })
    }, function () {

    })
  },


  // 点击提醒
  feiyu_alert_btn(e) {
    var index = e.currentTarget.dataset.index;
    // var form_id = e.detail.formId;
    var live_id = e.currentTarget.dataset.id;
    var my_remind = e.currentTarget.dataset.my_remind;
    var live_data_id = e.currentTarget.dataset.live_data_id;
    var that = this;
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 1,
        // formid: form_id,
        live_data_id: live_data_id
      }
      req.reqData(url, data, function () {

        that.data.feiyu_data.lives.wx_lives[index].my_remind = 1;
        that.setData({
          feiyu_data: that.data.feiyu_data
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
  feiyu_cancelAlert(e) {
    var index = e.currentTarget.dataset.index;
    var live_id = e.currentTarget.dataset.id;
    // var form_id = e.detail.formId;
    var live_data_id = e.currentTarget.dataset.live_data_id;
    var that = this;
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 0,
        // formid: form_id,
        live_data_id: live_data_id
      }
      req.reqData(url, data, function () {

        that.data.feiyu_data.lives.wx_lives[index].my_remind = 0;
        that.setData({
          feiyu_data: that.data.feiyu_data
        })
        wx.showToast({
          title: '取消提醒成功'
        });
      }, function () {

      })
    }, function () {

    })
  },
  // 点击提醒
  feiyu_alert_btn_tb(e) {
    var index = e.currentTarget.dataset.index;
    // var form_id = e.detail.formId;
    var live_id = e.currentTarget.dataset.id;
    var my_remind = e.currentTarget.dataset.my_remind;
    var live_data_id = e.currentTarget.dataset.live_data_id;
    var that = this;
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 1,
        // formid: form_id,
        live_data_id: live_data_id
      }
      req.reqData(url, data, function () {

        that.data.feiyu_data.lives.tb_lives[index].my_remind = 1;
        that.setData({
          feiyu_data: that.data.feiyu_data
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
  feiyu_cancelAlert_tb(e) {
    var index = e.currentTarget.dataset.index;
    var live_id = e.currentTarget.dataset.id;
    // var form_id = e.detail.formId;
    var live_data_id = e.currentTarget.dataset.live_data_id;
    var that = this;
    login.login(true, function () {
      // 已登录
      var url = "api/remind/liveSchedule";
      var data = {
        id: live_id,
        status: 0,
        // formid: form_id,
        live_data_id: live_data_id
      }
      req.reqData(url, data, function () {

        that.data.feiyu_data.lives.tb_lives[index].my_remind = 0;
        that.setData({
          feiyu_data: that.data.feiyu_data
        })
        wx.showToast({
          title: '取消提醒成功'
        });
      }, function () {

      })
    }, function () {

    })
  },
  // 点击切换分类
  other_typeChange(e) {
    var current = e.currentTarget.dataset.current;
    this.setData({
      currentType: current,
    })
  },


  onLoadData() {
    var that = this;
    var my_home_flag = that.data.my_home_flag;
    console.log(my_home_flag);
    var data = {};
    var url;
    if (my_home_flag == 1) {//妃鱼首页
      url = "api/wxapp/ehome";

    } else if (my_home_flag == 2) {//其他首页
      var wx_id = wx.getStorageSync('wx_id');
      data.user_id = wx_id;
      data.shop_id = that.data.entity_id;
      url = "api/wxapp/shome";
    } else {
      url = "api/wxapp/mhome";
    }

    // login.login(true, function () {
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        if (my_home_flag == 1) {
          wx.setNavigationBarTitle({
            title: res.data.data.page_title,
          })
          that.data.share_title = res.data.data.page_title;
          that.data.page_control_data = 0;
          that.setData({
            info:res.data.data,
            place1Data:res.data.data.palace1,
            isShow: 0,
            isHasStorage: 1,
            feiyu_data: res.data.data,
            is_login: 1,
            is_data_show: 1,
            page_control_data: that.data.page_control_data,
          })
        } else if (my_home_flag == 2) {
          that.data.page_control_data = 1;
          that.setData({
            isShow: 0,
            isHasStorage: 1,
            enterprise_data: res.data.data,
            liveSchedules: res.data.data.liveSchedules,
            currentTab:1,
            productTabData:[],
            coupons: res.data.data.coupons,
            otherIndexProducts: res.data.data.onHomePageProduct,
            share_image_url: res.data.data.netred.share_image_url,
            shop_id: res.data.data.netred.id,
            activity: res.data.data.ads,
            is_login: 1,
            is_data_show: 1,
            page_control_data: that.data.page_control_data,
          })
          wx.setNavigationBarTitle({
            title: res.data.data.netred.name,
          })
          that.data.share_title = res.data.data.netred.name;
        } if (my_home_flag == 3) {
          that.data.page_control_data = 2;
          that.setData({
            isShow: 0,
            isHasStorage: 1,
            third_data: res.data.data,
            is_login: 1,
            is_data_show: 1,
            page_control_data: that.data.page_control_data,
          })
          wx.setNavigationBarTitle({
            title: res.data.data.title,
          })
        }

      }
    }, function (res) {
      console.log("请检查网络状况3" + res);
      if (res == "none") {//无网络
        that.setData({
          isShow: 3
        })
      }

    }, 1);
    // }, function () {
    //   that.setData({
    //     is_login: 1,
    //     is_data_show: 1,
    //   })
    // })

  },



  onPullDownRefresh: function () {
    wx.stopPullDownRefresh();
    var that = this;
    that.onLoadData();
  },

  btn_getCoupon: function (e) {
    var appurl = e.currentTarget.dataset.appurl;
    wx.navigateTo({
      url: '/' + appurl,
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
    app.aldstat.sendEvent('其他店铺首页', {
      'coupon_id': id,
      'index': position + '',
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
            var list = that.data.coupons;
            list[position].limit_num = 1;
            list[position].sendout_num = 1;
            that.setData({
              coupons: list
            })
            wx.showToast({
              title: res.data.message
            })

          } else {
            var list = that.data.coupons;
            list[position].is_take = 1;
            that.setData({
              coupons: list
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
      var list = that.data.coupons;
      list[position].limit_num = 1;
      list[position].sendout_num = 1;
      that.setData({
        coupons: list
      })
      wx.showToast({
        title: '该券已抢完！',
      })
    }
  },
  // 上拉加载回调接口
  onReachBottom: function () {

  },
  onShow: function () {
    var that = this;
    if (getApp().globalData.isLoginIndex) {
      getApp().globalData.isLoginIndex = false;
      that.onLoadData();
    }
  },

  onReady: function () {


  },

  onUnload: function () {

  },
  bindchange: function (e) {
    // console.log(e.detail.current)
    this.setData({ current: e.detail.current })

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
    // console.log(this.data.stock);
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
  close() {
    this.setData({
      noscroll: false,
      bottom: false,
      maskShow: false,
      confirmShow: 0,
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
        price: res.data.data.sku[0].price,
        images: res.data.data.sku[0].image,
      });
      console.log(res.data.data.sku[0].main_images);
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
        noscroll: true,
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
      data_id: that.data.data_id
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
              noscroll: false,
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
              duration: 2000
            })
            that.setData({
              other_maskShow: 0,
              other_shareMask: 0,
              other_shareMaskShow: 0,
              other_noscroll: 0,
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
  other_intoShare() {
    var that = this;

    that.setData({
      other_noscroll: true,
      other_maskShow: true,
      other_shareMask: 1,
    })
  },


  other_btnShare: function (e) {
    this.setData({
      other_shareMaskShow: 1,
      other_noscroll: 1,
      other_shareMask: 0,
      other_maskShow: 0,
    })
  },

  other_close: function (e) {
    this.setData({
      other_noscroll: 0,
      other_maskShow: 0,
      other_couponMask: 0,
      other_shareMask: 0,
      other_shareMaskShow: 0,
    })
  },
  // 关闭二维码蒙层
  other_closeMask() {
    this.setData({
      other_shareMaskShow: 0,
      other_noscroll: 0,
    })
  },






  
  onShareAppMessage: function (res) {
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }

    this.setData({
      other_noscroll: 0,
      other_maskShow: 0,
      other_shareMask: 0,
    })

    if (res.from === 'button') {
      // 来自页面内转发按钮
      // console.log(res.target)
      
    }
    var my_home_flag = this.data.my_home_flag;
    var entity_id = this.data.entity_id;
    var entity_type;
    if (!my_home_flag) {
       my_home_flag = wx.getStorageSync('my_home_flag');
       entity_id = wx.getStorageSync('my_home_id');
    }

    var user_id = wx.getStorageSync('wx_id');
    if (my_home_flag == 1) {
      entity_type = 'e_home'
    }
    if (my_home_flag == 2) {
      entity_type = 's_home'
    }
    if (my_home_flag == 3) {
      entity_type = 'm_home'
    }

    entity_type = entity_type ? entity_type : 'e_home';
    entity_id = entity_id ? entity_id : '134';
    
    return {
      path: 'pages/index/translate/translate?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&entity_type=' + entity_type + '&entity_id=' + entity_id + '&from_user_id=' + user_id,
      // imageUrl:'../../images/index/test.png',
      title: this.data.share_title,
      success: function (res) {
        // 转发成功
        console.log(res);
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})
