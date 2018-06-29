const req = require('../../../../service/service');
const login = require('../../../../utils/login');
const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,
    nodata: [],
    navgationbars: {},
    blocks: {},
    currentBlock: [],
    share_info: '',
    id: '',
    hasData: 0,

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
    confirmShow: '',
    data_id: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var page_id = options.id;
    var that = this;

    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;
    var reg_shop_id = options.reg_shop_id;
    var from_user_id = options.from_user_id;
    if (!page_id) {
      var scene = decodeURIComponent(options.scene);
      page_id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);

      from_user_id = login.getQueryString('u', scene);
    }
    that.data.id = page_id;

    var entity_type = 'mcms';
    var entity_id = page_id;

    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id);



    var url = 'api/cms/index';
    var data = {
      id: page_id
    }
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        navgationbars: data.blocks[0],
        title: data.title,
        share_info: data.share_info,
        hasData: 1
      })
      // wx.setNavigationBarTitle({
      //   title: that.data.title
      // })
      data.blocks.splice(0, 1);
      that.data.blocks[page_id] = data.blocks;
      that.data.navgationbars.currentTab = page_id;
      that.setData({
        currentBlock: that.data.blocks[page_id],
        navgationbars: that.data.navgationbars,
        index: 1
      })

    }, function () { });
    // console.log(that.data.navgationbars);
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
  jump_live: util.throttle(function (e) {
    // var page_url = e.currentTarget.dataset.url;
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
          url: '/' + res.data.data.page_url
        })
      }
    }, function (res) {

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

  btnReviewLiving(e) {
    console.log(e);
    
    var appUrl=e.currentTarget.dataset.app_url;
    wx.navigateTo({
      url: '/' + appUrl,
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
  // 关闭弹窗
  close() {
    this.setData({
      noscroll: false,
      bottom: false,
      maskShow: false,
      confirmShow: 0,
    })
  },
  btnAddShopCar: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.data.data_id = e.currentTarget.dataset.data_id;
    var entity_type = e.currentTarget.dataset.entity_type;
    that.setData({
      noStock: 6666666,
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
        noscroll: true,
        bottom: true,
        maskShow: true,
        confirmShow: 1,
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
    login.login(true, function () {
      // 登录成功
      that.setData({
        noscroll: false,
        bottom: false,
        maskShow: false,
        confirmShow: false,
      })
      req.reqData(url, param,
        function (res) {
          if (res.data.returnCode == 0) {
            var app = getApp();
            app.aldstat.sendEvent('商品详情页-添加购物车', {
              'shop_id': that.data.shop_id + '',
              'product_id': that.data.productId + '',
            });
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
  // 点击切换tab
  currentChange(e) {
    var that = this;
    var page_id = e.currentTarget.dataset.pageid;
    var url = 'api/cms/index';
    var data = {
      id: page_id
    }
    that.data.navgationbars.currentTab = page_id;
    this.setData({
      currentBlock: [],
      navgationbars: that.data.navgationbars
    })

    if (that.data.blocks[page_id]) {
      that.setData({
        currentBlock: that.data.blocks[page_id]
      });
      return;
    } else {
      // console.log(that.data.blocks);
      req.reqData(url, data, function (res) {
        var data = res.data.data;
        data.blocks.splice(0, 1);
        that.data.blocks[page_id] = data.blocks;
        that.setData({
          currentBlock: that.data.blocks[page_id]
        })
        // console.log(that.data.currentBlock);
      }, function () { })
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
        //  console.log(that.data.currentBlock);
        var block = that.data.currentBlock;
        for (var i = 0; i < block.length; i++) {
          if (block[i].name == "livedata_default") {
            block[i].data.data[index].my_remind = 1;
            that.setData({
              currentBlock: block
            })
            wx.showToast({
              title: '提醒成功'
            });
            break;
          }
        }
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
        var block = that.data.currentBlock;
        for (var i = 0; i < block.length; i++) {
          if (block[i].name == "livedata_default") {
            block[i].data.data[index].my_remind = 0;
            that.setData({
              currentBlock: block
            })
            wx.showToast({
              title: '取消成功'
            });
            break;
          }
        }
      }, function () {

      })
    }, function () {

    })
  },

  clickJump(e) {
    var url = e.currentTarget.dataset.url;
    if (!url) {
      return;
    }
    wx.navigateTo({
      url: '/' + url,
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
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }

    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   // console.log(res.target)
    // }


    var user_id = wx.getStorageSync('wx_id');
    return {
      path: 'pages/cms/page/cmsMany/cmsMany?from_member_id=' + member_id + '&id=' + that.data.id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
      title: that.data.share_info.share_desc,
      imageUrl: that.data.share_info.share_image,
      // desc: that.data.share_info.share_desc, 
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }


})