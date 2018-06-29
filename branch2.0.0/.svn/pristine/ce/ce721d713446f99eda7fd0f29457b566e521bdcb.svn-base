// pages/productDetail/productDetail.js
var req = require('../../../service/service');
var login = require('../../../utils/login');
const util = require('../../../utils/util.js');
Page({
  // 初始化数据
  data: {
    items: [{
      name: '0'
    },],
    dataloaded: 0,
    indicatorDots: true,
    autoplay: true,
    interval: 4500,
    duration: 500,
    noscroll: false,
    bottom: false,
    maskShow: false,
    productInfo: {},
    isCommit: 0,
    inputValue: 1,
    currentType: 0,
    images: [],
    productSku: [],
    currentIndex: 0,
    stock: 0,
    shopbtm: false,
    commitShow: false,
    payAddressUrl: {},
    sku_id: '',
    imageSelect: '',
    address_id: '',
    price: '',
    my_sku: [],
    fy_sku: [],
    shop_id: '',
    orderInfo: {},
    shopImg: '',
    buy_user_address: '',
    buy_user_name: '',
    buy_user_mobile: '',
    customer_remark: '',
    wxPayurl: {
      sku_id: '',
      address_id: '',
      customer_remark: '',
      num: '1',
    },
    // 是否有地址
    is_setAddress: 0,
    clickFlag: true,
    discount_list: [],
    productId: '',
    name: '',
    live_id: '',
    is_add_shopcar: 0,
    itemList: ['分享给好友', '分享到朋友圈'],
    shareMaskShow: 0,
    need_procurement: '',
    isChoose: 0,
    confirmShow: 0,
    data_id: '',
    itemMask: 0,
    share_image_url: '',
    takeGoods: '',
    specification: '',
    is_kilner:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var reg_shop_id = options.reg_shop_id;
    that.data.live_id = options.live_id ? options.live_id : '';
    console.log(that.data.live_id);
    // 获取地址栏中商品id参数
    var productId = options.productId;
    var data_id = options.data_id ? options.data_id : '';
    var is_bought = options.is_bought;
    var from_member_id = options.from_member_id ? options.from_member_id : '';
    var register_channel = options.register_channel;

    var from_user_id = options.from_user_id;
    if (!productId) {
      var scene = decodeURIComponent(options.scene);
      productId = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);

      from_user_id = login.getQueryString('u', scene);
      data_id = login.getQueryString('a', scene);
    }
    var entity_type = 'product';
    var entity_id = productId;

    that.data.data_id = data_id;
    that.data.productId = productId;
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {
      var url = 'api/distribution/getFxProductDetail';
      var param = {
        is_bought: is_bought,
        spu_id: productId,
        data_id: data_id,
        live_id: that.data.live_id
      };
      req.reqData(url, param,
        function (res) {
          var data = res.data.data;
          if (res.data.returnCode == 0) {
            var data = res.data.data;
            wx.setNavigationBarTitle({
              title: data.name
            })
            that.setData({
              productInfo: data,
              images: data.main_images,
              my_sku: data.skus,
              fy_sku: data.fy_skus,
              shopImg: data.skus[0].image,
              price: data.skus[0].price,
              shop_id: data.shop_id,
              shop_name: data.shop_name,
              share_image_url: data.qrcode,
              dataloaded: 1,
              is_bought: is_bought,
              is_kilner:data.is_kilner,
              productId:productId,
              data_id:data_id
            });
          }
        },
        function (res) {

        });

    }, data_id);
  },

  //长按保存图片
  saveImgToPhotosAlbumTap: function () {
    var that = this;
    wx.downloadFile({
      url: that.data.share_image_url,
      success: function (res) {
        wx.saveImageToPhotosAlbum({
          filePath: res.tempFilePath,
          success: function (res) {
            wx.showToast({
              title: '保存成功',
            })
            that.setData({
              noscroll: false,
              maskShow: false,
              itemMask: 0,
              shareMaskShow: 0,
              shareMask: 0,
            });
          },
          fail: function (res) {
            var str = res.errMsg;
            if (str.indexOf("saveImageToPhotosAlbum:fail auth deny")) {
              wx.openSetting({
                success(settingdata) {
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


  jump_index: util.throttle(function () {
    var my_home_flag = wx.getStorageSync('my_home_flag');
    var entity_type;
    var entity_id;
    if (my_home_flag == 1) {
      entity_type = 'e_home'
    }
    if (my_home_flag == 2) {
      entity_type = 's_home'
    }
    if (my_home_flag == 3) {
      entity_type = 'm_home'
    }
    entity_id = wx.getStorageSync('my_home_id');
    if (!entity_id) {
      entity_id = 0;
    }
    wx.navigateTo({
      url: '/pages/index/translate/translate?entity_type=' + entity_type + '&entity_id=' + entity_id,
    })

  }, 1000),

  // 点击分享
  jump_share: function (e) {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('分销商品详情-分享', {
      'shop_id': that.data.shop_id,
    });
    that.setData({
      noscroll: true,
      maskShow: true,
      itemMask: 1,
    })

  },
  // 点击店铺详情跳转
  shopDetail: util.throttle(function (e) {
    var shop_id = e.currentTarget.dataset.id
    console.log(shop_id);
    wx.navigateTo({
      url: '../storePage/storePage?shop_id=' + shop_id,
    })
  }, 1000),

  // 进店
  clickJump: util.throttle(function (e) {
    var id = this.data.shop_id;
    var app = getApp();
    app.aldstat.sendEvent('分销商品详情页进店', {
      'id': id + '',
    });
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: '../../../' + url,
    })

  }, 1000),

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  // 立即购买弹窗
  shop: function (e) {
    var that = this;
    var takeGoods = e.currentTarget.dataset.takegoods;
    if (takeGoods == 1) {
      that.setData({
        productSku: that.data.my_sku
      })
    } else {
      that.setData({
        productSku: that.data.fy_sku
      })
    }
    var list = that.data.productSku;
    if (list[0].stock == 0) {
      that.setData({
        noStock: 0
      })
    }
    this.setData({
      stock: list[0].stock,
      sku_id: list[0].id,
      specification: list[0].specification,
      imageSelect: list[0].image,
      takeGoods: takeGoods,
      is_add_shopcar: 0,
      noscroll: true,
      bottom: true,
      maskShow: true,
      confirmShow: 1,
    })
  },

  confirmBuy() {
    var that = this;
    if (that.data.fy_sku[0].stock == 0) {
      wx.showToast({
        title: '库存不足'
      })
      return;
    }
    if (!that.data.sku_id) {
      wx.showToast({
        title: '请先选择规格'
      })
      return;
    }
    var url = 'api/distribution/storeGoodsCheck';
    var data = {};
    data.sku_id = that.data.sku_id;
    data.num = that.data.inputValue;
    // console.log(that.data.specification);
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      if (data.status == 0) {
        that.setData({
          noscroll: false,
          bottom: false,
          maskShow: false,
          shopbtm: false,
          isCommit: 0,
          confirmShow: 0,
          itemMask: 0,
        })
        wx.navigateTo({
          url: '/pages/distribution/payOrder/payOrder?balance=' + data.balance + '&specification=' + that.data.specification + '&product_id=' + that.data.productId + '&data_id=' + that.data.data_id + '&total=' + data.total + '&sku_id=' + that.data.sku_id + '&name=' + that.data.productInfo.name + '&num=' + that.data.inputValue + '&price=' + that.data.price + '&imageSelect=' + that.data.imageSelect,
        })
        // wx.navigateTo({
        //   url: '/pages/distribution/consumeDetail/consumeDetail',
        // })
      } else if (data.status == '-2001') { //余额不足

        wx.showModal({
          title: '提示',
          content: '账户余额不足无法囤酒',
          confirmText: '余额充值',
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
              wx.navigateTo({
                url: '/pages/distribution/consumeDetail/consumeDetail',
              })
            } else if (res.cancel) {
              console.log('用户点击取消')
            }
          }
        })
      } else if (data.status == '-2002') { //库存不足
        wx.showToast({
          title: '库存不足',
        })
      } else if (data.status == '-2003') { //商品不存在
        wx.showToast({
          title: '商品不存在',
        })
      }

    }, function () { })
  },



  // 关闭弹窗
  close() {
    this.setData({
      noscroll: false,
      bottom: false,
      maskShow: false,
      shopbtm: false,
      isCommit: 0,
      confirmShow: 0,
      itemMask: 0,
    })
  },
  // 选择规格
  chooseType(e) {
    var that = this;
    var stock = e.currentTarget.dataset.stock;
    var id = e.currentTarget.dataset.skuid;
    var currentId = e.currentTarget.dataset.id;
    var img = e.currentTarget.dataset.image;
    var price = e.currentTarget.dataset.price;
    var specification = e.currentTarget.dataset.specification;
    that.setData({
      price: price,
      stock: stock,
      sku_id: id,
      imageSelect: img,
      currentIndex: currentId,
      specification: specification
    })
    // console.log(img);
    this.setData({
      inputValue: 1,
      currentType: currentId,
      currentIndex: currentId,
      stock: stock,
      sku_id: id,
      shopImg: img
    })
    // console.log(this.data.stock);
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
      return;
    }
    proNum++;
    this.setData({
      inputValue: proNum
    })
  },
  checkboxChange: function (e) {
    var that = this;
    var isSelect = e.detail.value[0];
    if (isSelect == 0) { //选中
      that.data.items[0].name = 1;

    } else {
      that.data.items[0].name = 0;
    }

  },
  // 确认购买
  confirmShop() {
    var that = this;
    if (!that.data.sku_id) {
      wx.showToast({
        title: '请先选择规格'
      })
      return;
    }
    that.setData({
      noscroll: true,
      bottom: false,
      maskShow: true,
      shopbtm: true,
      isCommit: 1
    })
    var url = 'api/distribution/checkMyFxStore';
    var param = {
      sku_id: that.data.sku_id,
      num: that.data.inputValue,
      data_id: that.data.data_id,
    };
    // 请求数据
    login.login(true, function () {
      // 登录成功
      req.reqData(url, param,
        function (res) {
          var data = res.data.data;
          that.setData({
            address_id: data.address_id,
            orderInfo: data,
            buy_user_address: data.address,
            buy_user_mobile: data.mobile,
            buy_user_name: data.user_name,
          })
          that.data.wxPayurl.address_id = that.data.address_id;
          if (that.data.address_id) {
            that.setData({
              is_setAddress: 1
            })
          }
        },
        function (res) {
          // login.login();
          console.log('没有登录');
        });
    }, function () {

    })
  },
  // 添加地址
  addAdress: function () {
    var that = this;
    var url = "api/address/addAddress";
    wx.chooseAddress({
      success: function (res) {
        that.data.payAddressUrl.userName = res.userName;
        that.data.payAddressUrl.postalCode = res.postalCode;
        that.data.payAddressUrl.provinceName = res.provinceName;
        that.data.payAddressUrl.cityName = res.cityName;
        that.data.payAddressUrl.countyName = res.countyName;
        that.data.payAddressUrl.detailInfo = res.detailInfo;
        that.data.payAddressUrl.nationalCode = res.nationalCode;
        that.data.payAddressUrl.telNumber = res.telNumber;
        that.setData({
          buy_user_address: res.provinceName + res.cityName + res.countyName + res.detailInfo,
          buy_user_name: res.userName,
          buy_user_mobile: res.telNumber
        })
        login.login(true, function () {
          req.reqData(url, that.data.payAddressUrl,
            function (res) {
              // console.log(res);
              if (res.data.returnCode == 0) {
                that.data.wxPayurl.address_id = res.data.data;
                that.setData({
                  address_id: res.data.data,
                  is_setAddress: 1
                })
              } else if (res.data.returnCode == '-1') {
                login.login();
              } else {
                wx.showToast({
                  title: res.data.message
                })
              }
            },
            function (res) {

            });
        }, function () {
          //  没有登录
          console.log('未登录');
        })
      },
      fail: function (err) {
        console.log("用户不允许");
        var message_error = err.errMsg;
        if (message_error.indexOf('cancel') < 0) {
          wx.openSetting({
            success: (res) => {
              //console.log(res);
              that.setData({
                is_setAddress: 1
              })

            }
          })
        }
      }
    })
  },
  // 留言信息
  getInput: function (e) {


    this.setData({
      customer_remark: e.detail.value
    })
  },
  // 提交订单支付
  commit_order: util.throttle(function () {
    var that = this;
    var url = "api/distribution/pickupGoods";
    var data = that.data.wxPayurl;
    data.num = that.data.inputValue;
    data.sku_id = that.data.sku_id;

    data.data_id = that.data.data_id;
    data.customer_remark = that.data.customer_remark;

    if (!this.data.wxPayurl.address_id) {
      wx.showToast({
        title: '请选择地址'
      })
      return;
    }
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        noscroll: false,
        bottom: false,
        maskShow: false,
        shopbtm: false,
        isCommit: 0,
        confirmShow: 0
      })
      wx.navigateTo({
        url: '/pages/distribution/payResult/payResult?isTake=1&name=' + data.send_to + '&price=' + data.total_price + '&address=' + data.send_address + '&order_id=' + data.order_id,
      })
    })
  }, 1000),

  // 强制选择
  choose_btn() {
    this.setData({
      isChoose: !this.data.isChoose
    })
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
  contact() {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('详情页-客服', {
      'shop_id': that.data.shop_id + '',
      'product_id': that.data.productId + '',
    });
  },

  btnShare: function (e) {
    var app = getApp();
    app.aldstat.sendEvent('商品详情-分享到朋友圈', {
      'shop_id': this.data.shop_id,
    });
    this.setData({
      shareMaskShow: 1,
      noscroll: 1,
      itemMask: 0,
      maskShow: 0,
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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }
    this.setData({
      noscroll: false,
      maskShow: false,
      itemMask: 0,
    })

    var my_home_flag = wx.getStorageSync('my_home_flag');
    var user_id = wx.getStorageSync('wx_id');
    var entity_type;
    var entity_id;
    if (my_home_flag == 1) {
      entity_type = 'e_home'
    }
    if (my_home_flag == 2) {
      entity_type = 's_home'
    }
    if (my_home_flag == 3) {
      entity_type = 'm_home'
    }
    entity_id = wx.getStorageSync('my_home_id');
    if (!entity_id) {
      entity_id = 0;
    }

    return {
      title: that.data.productInfo.name,
      path: 'pages/productDetail/productDetail?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id + '&productId=' + that.data.productId + '&data_id=' + that.data.data_id + '&entity_type=' + entity_type + '&entity_id=' + entity_id,
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})