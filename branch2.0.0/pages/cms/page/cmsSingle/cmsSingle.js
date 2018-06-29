// pages/index/specialProduct/specialProduct.js

const req = require('../../../../service/service.js');
const login = require('../../../../utils/login.js');

const util = require('../../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    blocks: [],
    share_info: '',
    id: '',
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
    confirmShow:'',
    noStock:6666666,
    currentType: 6666666,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // var url = 'api/cms/cmsTest';
    // var data = {};
    var id = options.id;
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;

    var from_user_id = options.from_user_id;
    var reg_shop_id = options.reg_shop_id;
    if (!id) {
      var scene = decodeURIComponent(options.scene);
      id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);

      from_user_id = login.getQueryString('u', scene);
    }
    that.data.id = id;

    var entity_type = 'scms';
    var entity_id = id;

    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id);

    var url = 'api/cms/index';
    var data = {};
    data.id = that.data.id;
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        blocks: data.blocks,
        title: data.title,
        share_info: data.share_info,
      })
      // console.log(data.blocks);
      wx.setNavigationBarTitle({
        title: that.data.title
      })
    }, function () { }, 1)
  },

  //头部image
  feiyu_btn_imageHead: util.throttle(function (e) {
    console.log(e);
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/' + url,
    })
  }, 1000),

  btnTextImage:function(e){
    var url = e.currentTarget.dataset.appurl;
    console.log(url);
    wx.navigateTo({
      url: '/' + url,
    })
  },
  // 商品
  clickJump: util.throttle(function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '/' + url,
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
    var entity_type = e.currentTarget.dataset.entity_type;
    that.data.data_id = e.currentTarget.dataset.data_id;

    var url = "api/product/getProductSkus";
    var data = {};
    data.entity_id = id;
    data.entity_type = entity_type;
    that.setData({
      noStock:6666666,
      currentType: 6666666,
    })
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
  // onPullDownRefresh: function () {
  //   wx.stopPullDownRefresh();
  //   var that = this;
  //   // var url = 'api/cms/cmsTest';
  //   // var data = {};
  //   var url = 'api/cms/index';
  //   var data = {};
  //   data.id = that.data.id;
  //   data.reload = 1;
  //   req.reqData(url, data, function (res) {
  //     var data = res.data.data;
  //     that.setData({
  //       blocks: data.blocks,
  //       title: data.title,
  //       share_info: data.share_info,
  //     })
  //     // console.log(data.blocks);
  //     wx.setNavigationBarTitle({
  //       title: that.data.title
  //     })
  //   }, function () { })
  // },

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
    var entity_type = 'scms';
    var entity_id = that.data.id;
    var user_id = wx.getStorageSync('wx_id');
    return {
      path: 'pages/cms/page/cmsSingle/cmsSingle?from_member_id=' + member_id + '&id=' + that.data.id + '&register_channel=wxapp_share' + '&entity_type=' + entity_type + '&entity_id=' + entity_id + '&from_user_id=' + user_id,
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