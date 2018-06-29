// pages/shopCar/shopCar.js
var req = require('../../../service/service');
var login = require('../../../utils/login');
const util = require('../../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    productInfo: {},
    shopList: [],
    shopcartData: '',
    currentShop: 6666,
    clickIndex: 6666,
    isSelect: 0,
    isFlag: true,
    isSelect: 0,
    currentChoose: -1,
    noscroll: false,
    bottom: false,
    maskShow: false,
    isShowSku: '',
    couponMask: 0,
    productSku: [],
    currentType: 666,
    images: [],
    currentIndex: 0,
    stock: 0,
    inputValue: 1,
    sku_id: '',
    ori_sku_id: '',
    discount_list: [],
    isReloading: false,
    isNone: 0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.isReloading = options.isReloading;
    var url = 'api/shopcart/listShopcart';
    var param = {};
    // 请求数据
    login.login(true, function () {
      // 登录成功
      req.reqData(url, param,
        function (res) {
          if (res.data.returnCode == 0) {
            that.setData({
              shopcartData: res.data.data,
              shopList: res.data.data.shop_skus,
              isNone: 1,
            })
          }
        },
        function (res) {

        }, 1);
    }, function () {

    })



  },

  // 跳转商品
  jumpProduct: util.throttle(function (e) {
    var productId = e.currentTarget.dataset.spu;
    var appurl = e.currentTarget.dataset.appurl;
    wx.navigateTo({
      url: '/' + appurl,
    })
  }, 1000),

  //点击多选
  btnEdit: function (e) {
    console.log(e);
    var that = this;
    var selectIndex = -1;
    var price = e.currentTarget.dataset.price;
    var index = e.currentTarget.dataset.index;
    var spu_id = e.currentTarget.dataset.spu;
    that.data.ori_sku_id = e.currentTarget.dataset.sku;
    var num = e.currentTarget.dataset.num;
    that.setData({
      inputValue: num,
    })


    var url = 'shopcart/getProductSkuInfo';
    var data = {};
    data.spu_id = spu_id;
    console.log(spu_id);
    login.login(true, function () {
      req.reqData(url, data, function (res) {

        that.setData({
          productInfo: res.data.data,
          images: res.data.data.main_images,
          productSku: res.data.data.skus,
          noscroll: true,
          bottom: true,
          maskShow: true,
        })
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
        } else {
          console.log(that.data.ori_sku_id);
          for (var i = 0; i < that.data.productSku.length; i++) {
            if (that.data.ori_sku_id == that.data.productSku[i].id) {
              that.setData({
                currentType: i,
                stock: list[i].stock,
                sku_id: list[i].id,
              })
            }
          }

        }
        that.setData({
          dataloaded: 1,
          price: price,
        })
      }, function (res) {

      }, 0)
    }, function () {

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
    that.setData({
      price: price,
      stock: stock,
      sku_id: id,
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
  btn_IdCard: function (e) {
    console.log(e);
    wx.navigateTo({
      url: '/pages/myPhone/myPhone',
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

  // // 减少数量
  // reduce() {
  //   var proNum = this.data.inputValue;
  //   proNum--;
  //   if (proNum < 1) {
  //     return;
  //   } else {
  //     this.setData({
  //       inputValue: proNum
  //     })
  //   }
  // },

  // // 点击+增加数量
  // increase() {
  //   if (!this.data.isShowSku.stock) {
  //     wx.showToast({
  //       title: '请先选择规格'
  //     })
  //     return;
  //   }
  //   var proNum = this.data.inputValue;
  //   console.log(this.data.isShowSku.stock + "sss" + this.data.inputValue);
  //   if (proNum >= this.data.isShowSku.stock) {
  //     // wx.showToast({
  //     //   title:'库存上限'+this.data.stock,
  //     // })
  //     return;
  //   }
  //   proNum++;
  //   this.setData({
  //     inputValue: proNum
  //   })
  // },

  // 确认购买
  confirmShop() {
    var that = this;
    if (!that.data.sku_id) {
      wx.showToast({
        title: '请先选择规格'
      })
      return;
    }



    console.log(that.data.inputValue);
    var url = 'api/shopcart/changeSku';
    var param = { //ori_sku_id 原sku id,sku_id 新的sku id
      ori_sku_id: that.data.ori_sku_id,
      sku_id: that.data.sku_id, //更换的sku
      num: that.data.inputValue
    };
    // console.log(param.sku_id);
    // 请求数据
    login.login(true, function () {
      // 登录成功
      req.reqData(url, param,
        function (res) {
          that.setData({
            shopcartData: res.data.data,
            shopList: res.data.data.shop_skus,
            noscroll: false,
            bottom: false,
            maskShow: false,
            couponMask: 0,
          })

        },
        function (res) {
          // login.login();
          console.log('没有登录');
        });
    }, function () {

    })

  },



  //选择一个店铺下的所以商品
  btnSelect: function (e) {
    console.log(e);
    var that = this;

    var sku_ids = '';
    var index = e.currentTarget.dataset.index;
    var ischeck = e.currentTarget.dataset.ischeck;
    if (that.data.shopList[index].is_checked == 0) {
      that.data.shopList[index].is_checked = 1;
      for (var i = 0; i < that.data.shopList[index].product_skus.length; i++) {
        that.data.shopList[index].product_skus[i].is_checked = 1;

      }
    } else {
      that.data.shopList[index].is_checked = 0;
      for (var i = 0; i < that.data.shopList[index].product_skus.length; i++) {
        that.data.shopList[index].product_skus[i].is_checked = 0;
      }
    }
    // that.setData({
    //   shopList: that.data.shopList,
    // })

    for (var i = 0; i < that.data.shopList.length; i++) {
      for (var j = 0; j < that.data.shopList[i].product_skus.length; j++) {
        if (that.data.shopList[i].product_skus[j].is_checked == 1) {
          sku_ids += that.data.shopList[i].product_skus[j].sku_id + ",";
        }
      }

    }

    var url = 'api/shopcart/selectedSku';
    var data = {};
    data.sku_ids = sku_ids;
    console.log(sku_ids);
    login.login(true, function () {
      req.reqData(url, data, function (res) {

        that.setData({
          shopcartData: res.data.data,
          shopList: res.data.data.shop_skus,
        })

      }, function (res) {

      })
    }, function () {

    })


  },
  btnDelete: function (e) {
    var that = this;

    console.log(e);
    var name = e.currentTarget.dataset.name;
    var sku_id = e.currentTarget.dataset.id;
    var url = 'api/shopcart/deleteSkuFromCart';
    var data = {
      sku_id: sku_id
    };
    wx.showModal({
      title: '确定要删除吗',
      content: '',
      success: function (res) {
        if (res.confirm) {
          login.login(true, function () {
            req.reqData(url, data, function (res) {

              that.setData({
                shopcartData: res.data.data,
                shopList: res.data.data.shop_skus,
              })
              wx.showToast({
                title: '删除成功',
              })
            }, function (res) {

            })
          }, function () {

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })



  },

  getCoupon: function (e) {
    console.log(e);
    var that = this;
    that.setData({
      noscroll: true,
      maskShow: true,
      couponMask: 1,
    })
    var that = this;
    var coupon_id = e.currentTarget.dataset.id;
    var url = 'api/coupon/getShopCoupon';
    var data = {
      shop_id: coupon_id
    };
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
    var position = e.currentTarget.dataset.position;
    var is_taken = e.currentTarget.dataset.is_taken;
    var limit_num = e.currentTarget.dataset.limit_num;
    var sendout_num = e.currentTarget.dataset.sendout_num;

    //  还没领取
    if (is_taken == 0 && Number(limit_num) > Number(sendout_num)) {
      var url = 'api/shopcart/takeCouponForCart';
      var data = {};
      data.coupon_id = id;
      login.login(true, function () {
        req.reqData(url, data, function (res) {
          that.data.discount_list[position].is_taken = 1;
          that.setData({
            discount_list: that.data.discount_list,
            noscroll: false,
            maskShow: false,
            couponMask: 0,
            shopcartData: res.data.data,
            shopList: res.data.data.shop_skus,
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
  btnPayOrder: function (e) {
    var that = this;
    var flag = false;
    console.log(that.data.shopList);
    for (var i = 0; i < that.data.shopList.length; i++) {
      for (var j = 0; j < that.data.shopList[i].product_skus.length; j++) {
        if (that.data.shopList[i].product_skus[j].is_checked == 1) {
          flag = true;
          console.log(j);
          break;
        }
      }
    }
    if (!flag) {
      wx.showToast({
        title: '请选择商品',
      })
      return;
    }
    wx.navigateTo({
      url: '../../../pages/settlement/settlement',
    })
  },
  close() {
    this.setData({
      noscroll: false,
      bottom: false,
      maskShow: false,
      couponMask: 0,
    })
  },
  // 点击店铺下的一个商品
  btnCheck: function (e) {
    console.log(e);
    var that = this;
    var sku_ids = '';
    var selectIndex = -1;
    var ischeck = e.currentTarget.dataset.ischeck;
    var id = e.currentTarget.dataset.id;

    for (var i = 0; i < that.data.shopList.length; i++) {
      for (var j = 0; j < that.data.shopList[i].product_skus.length; j++) {
        if (id == that.data.shopList[i].product_skus[j].sku_id) {
          selectIndex = i;
          if (ischeck == 0) {
            that.data.shopList[i].product_skus[j].is_checked = 1;
          } else {
            that.data.shopList[i].product_skus[j].is_checked = 0;
          }
          that.setData({
            shopList: that.data.shopList,
          })
          // return;
        }

      }
    }
    console.log(selectIndex);

    for (var i = 0; i < that.data.shopList[selectIndex].product_skus.length; i++) {
      console.log(that.data.isFlag);
      if (that.data.shopList[selectIndex].product_skus[i].is_checked == 0) {
        console.log(that.data.isFlag);
        // that.data.isFlag=false;
        that.data.shopList[selectIndex].is_checked = 0;
        break;
      } else {
        that.data.shopList[selectIndex].is_checked = 1;
      }

    }
    console.log(that.data.isFlag);
    // if (that.data.isFlag) {
    //   that.data.shopList[selectIndex].is_checked = 0;
    // }
    for (var i = 0; i < that.data.shopList.length; i++) {
      for (var j = 0; j < that.data.shopList[i].product_skus.length; j++) {
        if (that.data.shopList[i].product_skus[j].is_checked == 1) {
          sku_ids += that.data.shopList[i].product_skus[j].sku_id + ",";
        }
      }

    }

    var url = 'api/shopcart/selectedSku';
    var data = {};
    data.sku_ids = sku_ids;
    console.log(sku_ids);
    login.login(true, function () {
      req.reqData(url, data, function (res) {

        that.setData({
          shopcartData: res.data.data,
          shopList: res.data.data.shop_skus,
        })

      }, function (res) {

      })
    }, function () {

    })



  },
  // 进店
  goToShop: util.throttle(function (e) {
    var id = e.currentTarget.dataset.id;
    var shop_app_url = e.currentTarget.dataset.shop_app_url;
    wx.navigateTo({
      url: '/' + shop_app_url,
    })
  }, 1000),
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (getApp().globalData.isReloading) {
      var url = 'api/shopcart/listShopcart';
      var param = {};
      // 请求数据
      login.login(true, function () {
        // 登录成功
        req.reqData(url, param,
          function (res) {
            if (res.data.returnCode == 0) {

              that.setData({
                shopcartData: res.data.data,
                shopList: res.data.data.shop_skus,
              })
            }
          },
          function (res) {
            // login.login();
            console.log('没有登录');
          });
      }, function () {

      }, 0)
    }
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
    wx.stopPullDownRefresh();
    var that = this;
    var url = 'api/shopcart/listShopcart';
    var param = {};
    // 请求数据
    login.login(true, function () {
      // 登录成功
      req.reqData(url, param,
        function (res) {
          if (res.data.returnCode == 0) {

            that.setData({
              shopcartData: res.data.data,
              shopList: res.data.data.shop_skus,
            })
          }
        },
        function (res) {
          // login.login();
          console.log('没有登录');
        });
    }, function () {

    }, 0)
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