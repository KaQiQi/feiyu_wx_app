// pages/storePage/anchor/anchorDetail.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login.js');

const util = require('../../../utils/util.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 1,
    shop_info: '',
    netredDynamics: '',//主播动态
    liveSchedules: '',//主播直播排期
    dataflows: '',//主播商品
    page_num: 2,
    is_show:0,
    is_currentTab2:0,
    id:'',

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
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    that.data.id = options.id;

    var url = 'api/netred/homeForClientV3';
    var data = {
      id: that.data.id
    }
    req.reqData(url, data, function (res) {
      // console.log(res);
      var data = res.data.data;
      that.setData({
        shop_info: data.shop_info,
        netredDynamics: data.netredDynamics.data,
        liveSchedules: data.liveSchedules,
        is_show: 1,
      })

    }, function () {})
  },

  // 点击切换tab
  currentChange(e) {
    var that = this;
    var current = e.currentTarget.dataset.current;
    this.setData({
      currentTab: current,
    })
    if (current == 2) {
      var url = 'api/netred/getProductV3';
      var data = {
        id: that.data.id
      }
      req.reqData(url, data, function (res) {
        // console.log(res);
        var data = res.data.data;
        that.setData({
          dataflows: data.dataflows,
          is_currentTab2:1,
        })

      }, function () { }, 0)
    }
  },
  look_img(e) {
    console.log(e);
    var that=this;
    var img_index = e.currentTarget.dataset.index;
    var listIndex = e.currentTarget.dataset.listindex;
    var img_list = that.data.netredDynamics[listIndex].medias;
    var imageList=[];

    for (var i = 0; i < img_list.length;i++){
      imageList.push(img_list[i].ori_image_url)
    }
    console.log(imageList);
    wx.previewImage({
      current: img_list[img_index].ori_image_url, // 当前显示图片的http链接  
      urls: imageList // 需要预览的图片http链接列表  
    })
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
      currentIndex: currentId
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
    console.log(id);
    var url = "api/product/getProductSkus";
    var data = {};
    data.entity_id = id;
    data.entity_type = 2;

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
      num: that.data.inputValue
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
  // 跳转商品
  jumpProduct: util.throttle(function (e) {
    var url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('主播商品-商品', {
      'index': index + '',
      'shop_id': this.data.shop_id,
    });
    console.log(url)
    wx.navigateTo({
      url: '../../../' + url,

    })
  }, 1000),
  // 跳转视频
  jumpVideo: util.throttle(function (e) {
    var url = e.currentTarget.dataset.pageurl;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('主播动态-视频', {
      'index': index + '',
      'shop_id': this.data.shop_id,
    });
    wx.navigateTo({
      url: '../../../' + url,

    })
  }, 1000),
  // 进入直播
  intoLive: util.throttle(function (e) {
    var live_id = e.currentTarget.dataset.id;
    // var app_url = e.currentTarget.dataset.app_url;
    var url = "api/liveSchedule/checkLiveStatus";
    var data = {};
    data.id = live_id;
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
    wx.stopPullDownRefresh();
    var that = this;
    if (that.data.currentTab == 2) {
      var url = 'api/netred/getProductV3';
      var data = {
        id: that.data.id
      }
      req.reqData(url, data, function (res) {
        // console.log(res);
        var data = res.data.data;
        that.setData({
          dataflows: data.dataflows
        })

      }, function () { }, 1)
    } else {
      var url = 'api/netred/homeForClientV3';
      var data = {
        id: that.data.id
      }
      req.reqData(url, data, function (res) {
        // console.log(res);
        var data = res.data.data;
        that.setData({
          isStop: false,
          page_num: 2,
          shop_info: data.shop_info,
          netredDynamics: data.netredDynamics.data,
          liveSchedules: data.liveSchedules,
        })

      }, function () { }, 0)
    }
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log("页面上拉触底事件的处理函数")
    var that = this;

    var data = {};
    if (that.data.isStop) {
      return;
    }
    data.id = that.data.id;
    data.page = that.data.page_num;
    console.log(data);
    var url = "api/netred/getDynamicByPage";
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        var data = res.data.data;
        if (data.netredDynamics.data.length <= 0) {
          that.setData({
            isStop: true,
          })
        } else {
          var num = that.data.page_num + 1;
          that.setData({
            page_num: num,
            isStop: false,
          })
        }
        for (var i = 0; i < data.netredDynamics.data.length; i++) {
          that.data.netredDynamics.push(data.netredDynamics.data[i]);
        }
        // console.log(that.data.videos_list);
        that.setData({
          netredDynamics: that.data.netredDynamics,
        })
      } else if (res.data.returnCode == '-1') {
        login.login();
        that.setData({
          is_login: 0
        })
      } else {
        wx.showToast({
          title: res.data.message
        })
      }
    }, function (res) {

    }, 0);
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

    var entity_type = 'netred';
    var entity_id = that.data.id;
    var user_id = wx.getStorageSync('wx_id');
    return {
      path: 'pages/storePage/anchorDetail/anchorDetail?from_member_id=' + member_id + '&id=' + that.data.id + '&register_channel=wxapp_share' + '&entity_type=' + entity_type + '&entity_id=' + entity_id + '&from_user_id=' + user_id,
      title: that.data.shop_info.desc,
      // imageUrl: that.data.share_info.share_image,
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