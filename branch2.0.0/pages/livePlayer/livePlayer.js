// pages/live/live.js
var uaChange = require('../../utils/head.js');
var Util = require('../../utils/util.js');
const req = require('../../service/service.js');
var login = require('../../utils/login.js');
var Paho = require('../../utils/paho-mqtt-min.js');
var client = null;
var app = getApp();
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
  // 总秒数
  var second = micro_second;
  // 天数
  var day = (Math.floor(second / 3600 / 24) >= 10 ? Math.floor(second / 3600 / 24) : '0' + Math.floor(second / 3600 / 24));
  // 小时
  var hr = (Math.floor(second / 3600 % 24) >= 10 ? Math.floor(second / 3600 % 24) : '0' + Math.floor(second / 3600 % 24));
  // 分钟
  var min = (Math.floor(second / 60 % 60) >= 10 ? Math.floor(second / 60 % 60) : '0' + Math.floor(second / 60 % 60));
  // 秒
  var sec = (Math.floor(second % 60) >= 10 ? Math.floor(second % 60) : '0' + Math.floor(second % 60));
  return (day > 0 ? day + ":" + hr + ":" + min + ":" + sec : hr + ":" + min + ":" + sec);
}
Page({
  /**
   * 页面的初始数据
   */
  data: {
    items: [
      { name: '0' },
    ],
    show_give_money_to_shop: '', //0代表不要显示直接打款提示  1: 代表要。
    phValue: "如有特殊需要，请在这里留言哦",
    living_title: '',
    couponMask: 0,
    is_show_discount: '',
    isCanBuy: 2,
    canMessage: "确定",
    currentItemColor: "1",
    currentItemType: "-1",
    winWidth: '',
    winHeight: '',
    live_url: '',
    live_url_real: '',
    rednet_name: '',
    join_user: '',
    location: '',
    avatar: '',
    is_say: 0,
    is_pro: 0,
    is_buy: 0,
    is_reduce: 0,
    is_add: 0,
    is_order: 0,
    is_discount: 0,
    is_show_coupon: 0,
    is_loading: 0,
    is_show_video: 0,
    is_animationend: 0,
    is_setAddress: 0,
    user_buy_list: [],
    list_length: '',
    check_index: '',
    check_id: '',
    videoTitle: '',
    productTtitle: '',
    productTitleIcon: '',
    productNum: '',
    video_product_list: [],
    product_num: '',
    room_id: '',
    shop_id: '',
    member_id: '',
    talkDetial: '',
    result: {},
    color_type_list: [],
    color_list: {},
    type_list: {},
    latest: [],
    content_list: [],
    content_length: '',
    length: '',
    live_num: '',
    live_status: '',
    total_price: '',
    sku: '',
    isBuy: '0',
    dataurl: {
      id: '',
      live_id: ''
    },
    listHeight: '',
    pro_num: 1,
    sku_num: '',
    sku_id: '',
    product_result: {},
    buy_user_name: '',
    buy_user_mobile: '',
    buy_user_address: '',
    address_id: '',
    room_height: 510,
    is_follow: 0,//0表示未关注，1关注
    live_id: '',
    is_login: 0,
    isShow: 0,
    main_image: '',
    payAddressUrl: {},
    isNumLimit: false,
    index: 0,
    product_type: '',
    isBuyRemind: '',
    sell_point: '',
    wxPayurl: {
      sku_id: '',
      address_id: '',
      customer_remark: '',
      num: '1',
      isSelectType: 0,
      member_coupon_id: '',
      show_give_money_to_shop: '',
      from_member_id: '',
    },
    animationData: {},
    discount_list: [],
    title: '',
    id: '',
    interval: '',
    detail_content: '',
    isRemind: '',
    id: '',
    isFollow: '',
    productId: '',
    isTimeOut: '0',
    stock_num: '',
    videoContext: '',
    is_show_play: '0',
    is_show_goods: 0,
    is_close_buy_goods: 0,
    is_buy_messge: 0,
    is_add_messge: 0,
    buy_user_names: '',
    goods_code: '',
    is_talk: 1,
    is_full_view: 0,
    is_close_discount_goods: 0,
    is_style_full_view: 0,
    is_go_order: 0,
    is_hide: false,
    is_add_shopcar: 0,
    need_procurement: '',
    isChoose: 0,
    imgalist: [],
    data_id: '',
    is_auth: 0,
    other_shareMaskShow: 0,
    other_noscroll: 0,
    other_shareMask: 0,
    other_maskShow: 0,
    share_image_url: '',
    live_data_id:'',
    member_g_coupon_id:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var is_auth = wx.getStorageSync('is_auth');
    that.setData({
      is_auth: is_auth
    })
    console.log(is_auth);
    wx.setKeepScreenOn({
      keepScreenOn: true,
    })
    var reg_shop_id = options.reg_shop_id;
    that.data.live_data_id = options.live_data_id ? options.live_data_id:'';

    var id = options.id;
    var app = getApp();
    app.aldstat.sendEvent('进入直播间', {
      'live_id': id + '',
    });
    that.data.id = options.id;
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;

    var from_user_id = options.from_user_id;
    if (!id) {
      var scene = decodeURIComponent(options.scene);
      id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);

      from_user_id = login.getQueryString('u', scene);
    }

    that.data.live_id = id;
    var entity_type = 'live';
    var entity_id = id;
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id);

    // that.setData({
    //   live_id: id,
    //   is_login: 1
    // });


    var ua = uaChange.getUseragent();
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight,
        });
        // console.log(res.windowWidth + "++++" + res.windowHeight);
      }
    })
    var data = {
      id: id,
    };

    //}
  },
  close_buy: function () {
    this.setData({
      is_buy: 0,
      is_loading: 0,
      is_show_video: 0,
      is_show_coupon: 0,
    })
  },
  contentInputEvent: function (e) {
    this.setData({
      talkDetial: e.detail.value
    })
  },
  close_pro: function () {
    var that = this;
    var is_pro = that.data.is_pro;
    if (is_pro == 1) {
      wx.getSystemInfo({
        success: function (res) {
          that.setData({
            winHeight: res.windowWidth,
            winHeight: res.windowHeight,
            is_pro: 0,
            is_say: 0,
            is_show_play: 0,
          });
        }
      })
    }
  },
  // 监听动画结束
  animationend: function () {
    this.setData({
      is_animationend: 0
    })
  },

  // onFocus: function (e) {
  //   this.setData({
  //     phValue: " "
  //   })
  // },
  // onBlur: function (e) {
  //   this.setData({
  //     phValue: "请输入要录入的单词"
  //   })
  // },
  // bindstatechange: function (e) {
  //   var that = this;
  //   var code = e.detail.code;
  //   var id = that.data.id;
  //   var rtmp = 'rtmp://pili-live-rtmp.topshopstv.com/topshopstv/s_' + id + "?t=" + (new Date().getTime());
  //   console.log("bindstatechange code:" + code) 
  //   if (code == -2301) {//断网
  //     that.setData({
  //       live_status: 2
  //     })
  //   } 
  //   else if (code == 2008) {//重新连接
  //     console.log("重新连接2008");
  //     this.setData({
  //       live_url_real: rtmp,
  //       live_status: 1
  //     }, function () {
  //       that.data.videoContext.stop();
  //       that.data.videoContext.play();
  //     });

  //   } else if (code == 2001) {//重新连接
  //     //console.log("重新连接2001");
  //     this.setData({
  //       live_url_real: rtmp,
  //       live_status: 1
  //     }, function () {
  //       that.data.videoContext.stop();
  //       that.data.videoContext.play();
  //     });

  //   }
  // },
  // netWork: function (e) {
  //   console.log(e.detail.code);

  // },

  error: function (e) {
    console.log(e);
  },



  //关注
  follow: function () {
    var that = this;
    var url = 'favorite/followNetredFromLiveRoom';
    var data = {
      live_id: '',
    };
    data.live_id = that.data.live_id,
      //console.log(that.data.shop_id),

      login.login(true, function () {
        req.reqData(url, data,
          function (res) {
            if (res.data.returnCode == 0) {
              that.setData({
                is_follow: 1
              })
              wx.showToast({
                title: '关注主播成功'
              })
            } else if (res.data.returnCode == '-1') {
              login.login();
            } else {
              wx.showToast({
                title: res.data.message
              })
            }
          }, function (res) {
            console.log('error')
          });
      }, function () {

      })

  },
  //首页点击提醒功能
  btn_remind: function (e) {
    //console.log(e);
    // var form_id = e.detail.formId;
    var that = this;
    var isRemind = e.currentTarget.dataset.isremind;
    var live_id = e.currentTarget.dataset.id;

    // console.log(isRemind);
    // console.log(live_id);
    var data = {};
    data.id = live_id;
    // data.formid = form_id;
    if (isRemind == "0") {//未提醒
      data.status = "1";
    } else {//已提醒
      data.status = "0";
    }
    // console.log(data.id);
    // console.log(data.status);
    login.login(true, function () {//成功回调
      var url = "api/remind/liveSchedule";

      req.reqData(url, data, function (res) {
        if (res.data.returnCode == 0) {
          var data = res.data.data;
          if (isRemind == "0") {
            that.data.isFollow = '提醒成功';
            isRemind = "1";
            that.setData({
              isRemind: isRemind,
            })

          } else {
            that.data.isFollow = '取消成功';
            isRemind = "0";
            that.setData({
              isRemind: isRemind,
            })

          }
          // console.log(that.data.live_list);
          wx.showToast({
            title: that.data.isFollow,
          })

        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }, function (res) {

      }, 0);

    }, function () {//失败回调

    })
  },

  btn_tuan: function (e) {
    var app_url = e.currentTarget.dataset.appurl;

    wx.navigateTo({
      url: '/' + app_url,
    })
  },

  // 直播块进店
  toShop: Util.throttle(function (e) {
    var app_url = e.currentTarget.dataset.app_url;

    wx.navigateTo({
      url: '../../' + app_url,
    })
  }, 1000),
  //订单留言
  getInput: function (e) {
    //console.log(e)
    this.setData({
      customer_remark: e.detail.value
    })
  },
  // 点击商品
  btn_buy: function (e) {
    var that = this;
    //console.log(e)
    var id = e.currentTarget.dataset.id;
    that.data.productId = id;
    var num = e.currentTarget.dataset.num;
    var index = e.currentTarget.dataset.index;
    //console.log(index);
    var app = getApp();
    app.aldstat.sendEvent('直播页点击商品', {
      'product_id': id,
      'live_id': that.data.live_id,
    });
    var check_id = that.data.check_id;
    that.setData({
      currentItemType: "-1",
      isSelectType: 0,
    })
    if (check_id == id) {
      that.setData({
        is_buy: 0,
        is_loading: 0,
        is_show_video: 0,
        check_id: '',
        pro_num: 1
      })
    } else {
      that.setData({
        is_pro: 0,
        is_say: 0,
        is_add: 0,
        is_order: 0,
        is_show_video: 1,
        isCanBuy: 2,
        is_loading: 1,
        pro_num: 1,
        is_reduce: 0,
        check_index: index,
        canMessage: '立即购买',
        total_price: '',
        result: '',
        currentItemColor: '',
        isBuy: '1',
        // color_list: [],
        type_list: [],
        check_id: id,
        is_buy: 0,
        noStock: 0,
      })

      that.data.dataurl.spu_id = id;
      that.data.dataurl.live_id = that.data.live_id;
      var url = "api/product/getProductDetailForApp";
      req.reqData(url, that.data.dataurl,
        function (res) {
          if (res.data.returnCode == 0) {
            that.setData({
              result: res.data.data,
              main_image: res.data.data.main_image,
              total_price: res.data.data.price,
              is_pro: 0,
              product_type: res.data.data.product_type,
              stock_num: res.data.data.stock_num,
            })
            //console.log(that.data.result)
            if (that.data.result.skus.stock == 0) {
              that.setData({
                noStock: 1
              })
            }
            if (res.data.data.product_type == 2) {
              that.setData({
                main_image: res.data.data.main_image,
                type_list: res.data.data.skus,
                is_buy: 1,
                isSelectType: 0,

              })
              //console.log(that.data.sku_num)
            } else {
              that.setData({
                is_add: 1,
                isCanBuy: 1,
                sku_num: res.data.data.stock,
                sku_id: res.data.data.sku_id,
                is_buy: 1,
                type_list: res.data.data.skus,
              })
            }
          } else if (res.data.returnCode == '-1') {
            login.login();
          } else {
            wx.showToast({
              title: res.data.message
            })
          }
        }, function (res) {

        });
    }
  },

  setInfo(e) {
    var that = this;
    if (e.detail.errMsg == "getUserInfo:ok") {
      var iv = e.detail.iv;
      var encryptedData = e.detail.encryptedData;
      var wx_id = wx.getStorageSync('wx_id');
      var url = 'api/wxapp/setUserInfov2';
      var data = {
        id: wx_id,
        iv: iv,
        encryptedData: encryptedData,
      };
      req.reqData(url, data, function (res) {
        wx.setStorageSync('is_auth', res.data.data.is_auth);//判断是否微信授权0:no
        wx.setStorageSync('wx_username', res.data.data.user_name);
        wx.setStorageSync('wx_avatar', res.data.data.headimgurl);
        that.setData({
          is_auth: res.data.data.is_auth,
        })
      })
    }
  },
  // 数量减
  reduce_num: function () {
    var pro_num = this.data.pro_num;
    var sku_num = this.data.sku_num;
    //console.log(this.data.product_type);
    if (this.data.product_type == 2) {
      if (this.data.currentItemType == "-1") {
        wx.showToast({
          title: '请选择规格',
          duration: 2000
        })
        return;
      }
    }
    if (pro_num <= sku_num) {
      this.setData({
        is_add: 1,
        isNumLimit: false,
      });
    }
    pro_num = pro_num - 1;
    if (pro_num <= 1) {
      this.setData({
        pro_num: 1,
        is_reduce: 0
      });
      return;
    } else {
      this.setData({
        pro_num: pro_num
      });
    }
  },
  // 数量加
  add_num: function () {
    var pro_num = this.data.pro_num;
    var sku_num = this.data.sku_num;
    // var isCanBuy = this.data.isCanBuy;
    //console.log(pro_num);
    if (this.data.product_type == 2) {
      if (this.data.currentItemType == "-1") {
        wx.showToast({
          title: '请选择规格',
          duration: 2000
        })
        return;
      }
    }

    pro_num = Number(pro_num) + 1;
    // if (isCanBuy == 2) {
    //   wx.showToast({
    //     title: '请选择颜色规格',
    //   })
    //   return;
    // }
    if (this.data.isNumLimit == true) {
      return;
    }

    if (pro_num > sku_num) {
      this.setData({
        is_add: 0,
        isNumLimit: true,
      })
      return;
    } else {
      this.setData({
        pro_num: pro_num,
        is_reduce: 1,
        is_add: 1
      });
    }
  },
  // 选择颜色
  change_color: function (e) {
    //console.log(e);
    var that = this;
    var isImage = false;
    var imageNum = e.currentTarget.dataset.image;
    // console.log(imageNum);
    if (imageNum == 1) {
      for (var i = 0; i < that.data.color_type_list.length; i++) {
        if (that.data.color_type_list[i].key.indexOf(e.currentTarget.dataset.id) != -1) {
          //console.log(i)
          isImage = true;
          break
        }
      }
      if (isImage) {
        that.setData({
          main_image: that.data.color_type_list[i].sku.image,
        })
      }
    }


    if (that.data.type_list == null) {
      //console.log('that.data.type_list');
      var isHas = false;
      var checked = e.currentTarget.dataset.id;
      for (var i = 0; i < that.data.color_type_list.length; i++) {
        if (checked == that.data.color_type_list[i].key) {
          that.data.total_price = that.data.color_type_list[i].sku.price,
            // that.data.result.main_image = that.data.color_type_list[i].sku.image,
            that.data.result.price = that.data.color_type_list[i].sku.price,
            that.data.sku_id = that.data.color_type_list[i].sku.sku_id,
            isHas = true;
          if (that.data.color_type_list[i].sku.stock > 0) {
            that.setData({
              is_add: 1
            })
          }
          that.setData({
            sku_num: that.data.color_type_list[i].sku.stock,
          })
          break;
        }
      }
      if (!isHas) {
        that.setData({//不可以购买
          isCanBuy: 0,
          canMessage: '已售罄',
          total_price: that.data.total_price,
          result: that.data.result,
        })
      } else {
        that.setData({
          isCanBuy: 1,
          canMessage: '确定',
          total_price: that.data.total_price,
          result: that.data.result,
        })
      }

    } else {
      if (this.data.currentItemType == 1) {
        this.setData({
          currentItemColor: e.currentTarget.dataset.id
        })
      } else {

        var checked = e.currentTarget.dataset.id + '_' + this.data.currentItemType;
        //console.log(checked);

        var isHas = false;
        for (var i = 0; i < that.data.color_type_list.length; i++) {
          if (checked == that.data.color_type_list[i].key) {
            that.data.total_price = that.data.color_type_list[i].sku.price,
              // that.data.result.main_image = that.data.color_type_list[i].sku.image,
              that.data.result.price = that.data.color_type_list[i].sku.price,
              that.data.sku_id = that.data.color_type_list[i].sku.sku_id,
              isHas = true;
            that.setData({
              sku_num: that.data.color_type_list[i].sku.stock,
            })
            break;
          }
        }
        if (!isHas) {
          that.setData({//不可以购买
            isCanBuy: 0,
            canMessage: '已售罄',
            total_price: that.data.total_price,
            result: that.data.result,
          })
        } else {
          that.setData({
            isCanBuy: 1,
            canMessage: '确定',
            total_price: that.data.total_price,
            result: that.data.result,
          })
        }
      }
    }
    this.setData({
      currentItemColor: e.currentTarget.dataset.id
    })


  },

  // 选择尺寸
  change_type: function (e) {
    //console.log(e);
    var that = this;
    that.data.sku_num = e.currentTarget.dataset.num;//商品数量
    that.data.index = e.currentTarget.dataset.index;//选择商品index
    //console.log(this.data.index);
    that.data.result.price = that.data.type_list[that.data.index].price;
    that.setData({
      currentItemType: e.currentTarget.dataset.id,
      isSelectType: 1,
      index: that.data.index,
      result: that.data.result,
    })

  },

  // bindinput:function(e){
  //   var num = e.detail.value;
  //   console.log(num);
  // },
  // 获取输入框的数量值
  bindChange: function (e) {
    var num = e.detail.value;
    //console.log(this.data.pro_num);
    this.setData({
      pro_num: num,
    });
  },

  checkboxChange: function (e) {
    var that = this;
    //console.log(e);
    var isSelect = e.detail.value[0];
    if (isSelect == 0) {//选中
      that.data.items[0].name = 1;

    } else {
      that.data.items[0].name = 0;
    }

  },
  // 购物车
  goToShopCar: Util.throttle(function (e) {
    wx.navigateTo({
      url: "../../pages/shopCar/shoppingCar/shoppingCar"
    })
    var app = getApp();
    app.aldstat.sendEvent('直播间-购物车', {
      'shop_id': that.data.shop_id + '',
      'live_id': that.data.live_id + '',
    });
  }, 1000),

  // 立即购买
  confirm_order: function () {
    var url = "api/product/checkSkuId";
    var that = this;
    var data = {
      live_id: that.data.live_id,
      data_id: that.data.data_id,
      live_data_id:that.data.live_data_id
    };
    //console.log(that.data.currentItemType);

    if (this.data.product_type == 2) {
      if (this.data.currentItemType == "-1") {
        wx.showToast({
          title: '请选择规格',
          duration: 2000
        })
        return;
      }
    } else {
      that.setData({
        currentItemType: that.data.type_list[0].id,
      })
    }


    data.sku_id = that.data.currentItemType;

    var app = getApp();
    app.aldstat.sendEvent('直播页点击购买', {
      'sku_id': that.data.currentItemType,
      'live_id': that.data.live_id,
    });
    data.num = that.data.pro_num;

    //console.log(that.data.pro_num);


    if (that.data.is_add_shopcar == 1) {//添加购物车
      var url = 'api/shopcart/addSkuToCart';
      data.live_id = that.data.live_id;
      data.data_id = that.data.data_id;
      data.live_data_id=that.data.live_data_id
      console.log(data);
      login.login(true, function () {
        // 登录成功
        req.reqData(url, data,
          function (res) {
            if (res.data.returnCode == 0) {
              that.setData({
                is_close_buy_goods: 0,
                is_show_goods: 0,
                is_show_play: 0,
                is_style_full_view: 0,
                is_go_order: 0,
                is_order: 0,

              })
              getApp().globalData.isReloading = true;
              wx.showToast({
                title: "添加购物车成功"
              })
              var app = getApp();
              app.aldstat.sendEvent('购物袋-加入购物车-确定', {
                'sku_id': that.data.currentItemType,
                'live_id': that.data.live_id,
              });
            }
          }, function (res) {
            console.log('没有登录');
          });
      }, function () {

      })
    } else {

      var app = getApp();
      app.aldstat.sendEvent('购物袋-立即购买-确定', {
        'sku_id': that.data.currentItemType,
        'live_id': that.data.live_id,
      });
      login.login(true, function () {
        req.reqData(url, data,
          function (res) {
            if (res.data.returnCode == 0) {

              if (res.data.data.show_give_money_to_shop == 0) {
                that.setData({
                  show_give_money_to_shop: 0,
                })
              } else {
                that.data.items[0].name = 0;
                that.setData({
                  show_give_money_to_shop: res.data.data.show_give_money_to_shop,
                  items: that.data.items,
                })
              }
              that.setData({
                need_procurement: res.data.data.need_procurement,
                product_result: res.data.data,
                buy_user_address: res.data.data.address,
                buy_user_mobile: res.data.data.mobile,
                buy_user_names: res.data.data.user_name,
                address_id: res.data.data.address_id,
                member_g_coupon_id: res.data.data.member_g_coupon_id
              })
              that.data.wxPayurl.sku_id = res.data.data.sku_id
              that.data.wxPayurl.address_id = res.data.data.address_id
              that.setData({
                is_order: 1,
                is_close_buy_goods: 1,
                is_go_order: 3,
              })
            } else if (res.data.returnCode == '-1') {
              login.login();
            } else {
              wx.showToast({
                title: res.data.message
              })
            }
          }, function (res) {

          });
      }, function () {

      })
    }


  },
  // 直播间领取优惠券
  btn_discount: function (e) {
    var that = this;
    //console.log(1111);

    this.setData({
      is_close_discount_goods: 1,
      is_show_play: 1,
      is_style_full_view: 1,

    })

    var app = getApp();
    app.aldstat.sendEvent('直播页打开优惠券', {
      'shop_id': that.data.shop_id,
    });

    var url = 'api/coupon/getShopCoupon';
    var data = {};
    data.shop_id = that.data.shop_id;
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
  // 强制选择
  choose_btn() {
    this.setData({
      isChoose: !this.data.isChoose
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
            duration: 2000
          })
        }, function (res) {

        })
      }, function () {

      })
    } else if (is_taken == 1 && Number(limit_num) > Number(sendout_num)) {
      wx.showToast({
        title: '已领取',
      })
    } else {
      wx.showToast({
        title: '已抢完',
        duration: 2000
      })
    }
  },
  // // 已领取
  // btn_getDiscounted: function (e) {

  // },
  // // 领完了 
  // btn_noDiscounted: function (e) {

  // },
  // 提交订单
  commit_order: Util.throttle(function () {
    var that = this;
    if (!that.data.isChoose && that.data.need_procurement == 1) {
      wx.showToast({
        title: '勾选支付采购金'
      })
      return;
    }

    var from_member_id = wx.getStorageSync('from_member_id');
    var url = "api/wxapp/wxpay";

    that.data.wxPayurl.customer_remark = that.data.customer_remark;
    that.data.wxPayurl.live_id = that.data.live_id;
    that.data.wxPayurl.num = that.data.pro_num;
    that.data.wxPayurl.show_give_money_to_shop = that.data.items[0].name;
    that.data.wxPayurl.from_member_id = from_member_id;
    that.data.wxPayurl.data_id = that.data.data_id;
    that.data.wxPayurl.live_data_id = that.data.live_data_id;
    that.data.wxPayurl.member_g_coupon_id = that.data.member_g_coupon_id;
    if (that.data.product_result.member_coupon_id) {
      that.data.wxPayurl.member_coupon_id = that.data.product_result.member_coupon_id;
    }
    var app = getApp();
    app.aldstat.sendEvent('购物袋-立即购买-确定-提交订单', {
      'sku_id': that.data.wxPayurl.sku_id,
      'num': that.data.pro_num + '',
      'live_id': that.data.live_id
    });
    console.log(that.data.wxPayurl);
    req.reqData(url, that.data.wxPayurl,
      function (res) {
        if (res.data.returnCode == 0) {
          //console.log(res);
          wx.requestPayment({//调起微信支付
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (ress) {

              var app = getApp();
              app.aldstat.sendEvent('购物袋-立即购买-确定-提交订单-直播间支付成功', {
                'sku_id': that.data.wxPayurl.sku_id,
                'num': that.data.pro_num + '',
                'live_id': that.data.live_id
              });
              wx.navigateTo({
                url: '../live/orderStatus/orderStatus?order_no=' + res.data.data.order_no,
              })
              that.setData({
                is_close_buy_goods: 0,
                is_show_goods: 0,
                is_show_play: 0,
                is_style_full_view: 0,
                is_go_order: 0,
                is_order: 0,

              })

            },
            'fail': function (res) {
              //console.log(res);
              wx.showToast({
                title: '支付取消',
                duration: 2000
              })
            }
          })
        } else if (res.data.returnCode == '-1') {
          login.login();
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }, function (res) {

      });
  }, 1000),
  // 关闭order 
  close_order: function () {
    this.setData({
      is_order: 0,
      is_go_order: 1,
      is_close_buy_goods: 0,
    })
  },

  // 关闭xorder 
  close_x_order: function () {
    console.log(22222)
    this.setData({
      is_close_buy_goods: 0,
      is_show_goods: 0,
      is_show_play: 0,
      is_style_full_view: 0,
      is_go_order: 0,
      is_order: 0,

    })
    console.log(111111)
  },

  //close_goods列表
  close_goods: function () {
    this.setData({
      is_show_goods: 0,
      is_show_play: 0,
      is_style_full_view: 0,
      is_go_order: 0,
    })
  },



  //立即购买
  btn_buy_goods: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.data.data_id = e.currentTarget.dataset.data_id;
    that.data.productId = id;
   
    var app = getApp();
    app.aldstat.sendEvent('购物袋-立即购买', {
      'product_id': id,
      'live_id': that.data.live_id,
    });
    var check_id = that.data.check_id;
    that.setData({
      currentItemType: "-1",
      isSelectType: 0,
    })
    that.data.dataurl.spu_id = id;
    that.data.dataurl.live_id = that.data.live_id;
    that.data.dataurl.data_id = that.data.data_id;
    that.data.dataurl.live_data_id = that.data.live_data_id;
    var url = "api/product/getProductDetailForApp";
    req.reqData(url, that.data.dataurl,
      function (res) {
        if (res.data.returnCode == 0) {
          that.setData({
            is_close_buy_goods: 1,
            is_buy: 1,
            is_go_order: 2,
            is_add_shopcar: 0,
          })
          that.setData({
            result: res.data.data,
            main_image: res.data.data.main_image,
            total_price: res.data.data.price,
            is_pro: 0,
            product_type: res.data.data.product_type,
            stock_num: res.data.data.stock_num
          })
          //console.log(that.data.result)
          if (that.data.result.skus.stock == 0) {
            that.setData({
              noStock: 1
            })
          }
          if (res.data.data.product_type == 2) {
            that.setData({
              main_image: res.data.data.main_image,
              type_list: res.data.data.skus,
              is_buy: 1,
              isSelectType: 0,

            })
            //console.log(that.data.sku_num)
          } else {
            that.setData({
              is_add: 1,
              isCanBuy: 1,
              sku_num: res.data.data.stock,
              sku_id: res.data.data.sku_id,
              is_buy: 1,
              type_list: res.data.data.skus,
            })
          }
        } else if (res.data.returnCode == '-1') {
          login.login();
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }, function (res) {

      });


  },




  //加入购物车
  btn_add_goods: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    that.data.data_id = e.currentTarget.dataset.data_id;
    that.data.productId = id;
  
    var app = getApp();
    app.aldstat.sendEvent('购物袋-加入购物车', {
      'product_id': id,
      'live_id': that.data.live_id,
    });
    var check_id = that.data.check_id;
    that.setData({
      currentItemType: "-1",
      isSelectType: 0,
    })
    that.data.dataurl.spu_id = id;
    that.data.dataurl.live_id = that.data.live_id;
    that.data.dataurl.data_id = that.data.data_id;
    that.data.dataurl.live_data_id = that.data.live_data_id;
    var url = "api/product/getProductDetailForApp";
    req.reqData(url, that.data.dataurl,
      function (res) {
        if (res.data.returnCode == 0) {
          that.setData({
            is_close_buy_goods: 1,
            is_buy: 1,
            is_go_order: 2,
            is_add_shopcar: 1,
          })
          that.setData({
            result: res.data.data,
            main_image: res.data.data.main_image,
            total_price: res.data.data.price,
            is_pro: 0,
            product_type: res.data.data.product_type,
            stock_num: res.data.data.stock_num
          })
          //console.log(that.data.result)
          if (that.data.result.skus.stock == 0) {
            that.setData({
              noStock: 1
            })
          }
          if (res.data.data.product_type == 2) {
            that.setData({
              main_image: res.data.data.main_image,
              type_list: res.data.data.skus,
              is_buy: 1,
              isSelectType: 0,

            })
            //console.log(that.data.sku_num)
          } else {
            that.setData({
              is_add: 1,
              isCanBuy: 1,
              sku_num: res.data.data.stock,
              sku_id: res.data.data.sku_id,
              is_buy: 1,
              type_list: res.data.data.skus,
            })
          }
        } else if (res.data.returnCode == '-1') {
          login.login();
        } else {
          wx.showToast({
            title: res.data.message
          })
        }
      }, function (res) {

      });


  },

  //close_goods列表
  close_buy_goods: function () {
    this.setData({
      is_close_buy_goods: 0,
      is_buy: 0,
      is_go_order: 1,
    })
  },


  //close_goods优惠券列表
  close_dicount_goods: function () {
    this.setData({
      is_close_discount_goods: 0,
      is_buy: 0,
      is_show_play: 0,
      is_style_full_view: 0,
    })
  },

  wx_address: function () {
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
          buy_user_names: res.userName,
          buy_user_mobile: res.telNumber
        })
        req.reqData(url, that.data.payAddressUrl,
          function (res) {
            if (res.data.returnCode == 0) {
              that.data.wxPayurl.address_id = res.data.data;
              that.setData({
                address_id: res.data.data
              })
            } else if (res.data.returnCode == '-1') {
              login.login();
            } else {
              wx.showToast({
                title: res.data.message
              })
            }
          }, function (res) {

          });
      },
      fail: function (err) {
        console.log("用户不允许" + err.errMsg);
        var message_error = err.errMsg;
        // wx.redirectTo ({
        //   url: '../use/use'
        // })
        // wx.showModal({
        //   title: '警告',
        //   content: '您点击了拒绝授权，将无法正常使用收货地址。请10分钟后再次点击授权，或者删除小程序重新进入。',
        //   success: function (res) {
        //     if (res.confirm) {
        //       console.log('用户点击确定')
        //     } 
        //   }
        // })
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
  say_talk: function () {
    var that = this;
    login.login(true, function () {
      that.setData({
        is_say: 1,
        room_height: 510
      })
    }, function () {

    });


  },
  check_send: function (e) {
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('输入留言-发送');
    var room_id = that.data.room_id;
    var member_id = that.data.member_id;
    var talkDetial = that.data.talkDetial;
    var room_id = that.data.room_id;
    var user_name = wx.getStorageSync('wx_username');
    var ua = uaChange.getUseragent();

    // login.login(true, function () {
    wx.request({
      url: getApp().globalData.imBaseUrl + '/send',
      data: {
        rid: room_id,
        uid: member_id,
        content: talkDetial,
        user_name: user_name
      },
      method: "POST",
      header: {
        'feiyu-useragent': ua
      },
      success: function (res) {
        if (!client || !client.isConnected()) {
          var list = [];
          var result = {
            'content': talkDetial, 'user_name': user_name
          };
          list[0] = result;
          var length = that.data.latest.length;

          that.setData({
            latest: that.data.latest.concat(list).slice(-5, [length]),
            length: length,

          })
        }
        // console.log(res);
        that.setData({
          talkDetial: '',
          content: '',
          is_say: 0,
          is_full_view: 0,
          is_show_play: 0,
        });
      },
      fail: function (res) {
        wx.showToast({
          title: res.data,
        })
      }
    });
    // }, function () {

    // })

  },


  btn_talk: function () {//点击聊天
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('直播间点击留言');
    that.setData({
      is_show_play: 2,
      is_say: 1,
      is_talk: 1,
      is_full_view: 1,
    })
  },

  btn_goods: function () {//点击商品
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('直播间购物袋', {
      'live_id': that.data.id,
    });
    that.setData({
      is_show_play: 1,
      is_show_goods: 1,
      is_style_full_view: 1,
      is_go_order: 1,
    })
    var url = "api/product/gotoBuyForLive";
    var data = {};
    data.live_id = that.data.id,
      req.reqData(url, data, function (res) {
      }, function (fail) {
      })

  },


  btn_full: function () {//点击视频全屏
    var that = this;
    that.setData({
      is_show_play: 0,
      is_full_view: 0,
      is_say: 0,
    })
  },
  close_talk: function () {
    var that = this;
    that.setData({
      // is_say: 0,
      // is_show_play: 0,
      is_show_goods: 0,
      is_full_view: 1,
    })
  },
  //添加支付人信息便于清关
  btn_AddIdCard: function (e) {
    // wx.navigateTo({
    //   url: '/pages/order/idCard/idCard',
    // })
    wx.navigateTo({
      url: '/pages/order/editIdCard/editIdCard',
    })
  },
  //直播点击商品详情
  productDetail: Util.throttle(function (e) {
    // console.log(e);
    var that = this;
    var id = that.data.productId;
    var app_url = e.currentTarget.dataset.app_url;
    console.log(app_url);
    var app = getApp();
    app.aldstat.sendEvent('直播商品', {
      'product_id': id,
    });
    wx.navigateTo({
      url: '/' + app_url
    })
  }, 1000),


  //直播点击商品列表查看商品详情
  btn_productDetail(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var app = getApp();
    app.aldstat.sendEvent('直播商品', {
      'product_id': id,
      'live_id': that.data.live_id,
    });
    wx.navigateTo({
      url: '../productDetail/productDetail' + "?productId=" + id + '&live_id=' + that.data.live_id,
    })
  },
  jump_index: Util.throttle(function () {
    if (client && client.isConnected()) {
      client.disconnect();
    }
    var app = getApp();
    app.aldstat.sendEvent('回到首页', {
      'live_id': this.data.live_id,
    });

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
      url: "/pages/index/index"
    })
  }, 1000),
  // 重试按钮
  retry_page: function () {
    wx.showToast({
      title: '正在重试...',
    })
  },
  // 分享
  share_live: function () {

  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var url = "api/LiveSchedule/liveDetailForShow"
    var that = this;

    var ua = uaChange.getUseragent();
    var id = that.data.id;


    // var live_url_real = 'rtmp://pili-live-rtmp.topshopstv.com/topshopstv/s_' + id;

    // that.data.videoContext = wx.createLivePlayerContext("video-livePlayer");

    // that.setData({
    //   live_url: live_url_real,
    // }, function () {
    //   that.data.videoContext.stop();
    //   that.data.videoContext.play();
    // });

    var data = {
      id: id,
      live_data_id:that.data.live_data_id
    };

    //成功回调
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        //console.log(res);
        var member_id = wx.getStorageSync('member_id');
        var user_name = wx.getStorageSync('wx_username');
        if (!user_name) {
          user_name = '路人';
        }
        if (!member_id) {
          member_id = 'w' + wx.getStorageSync('wx_id');
          user_name = '路人';
        }
        if (!member_id) {
          member_id = 'r' + new Date().getTime() + Math.random() * 10;
          user_name = '路人';
        }
        if (client && client.isConnected()) {

        } else {
          client = new Paho.Client(getApp().globalData.client, getApp().globalData.port, "clientId_" + member_id + "_" + id);
        }

        var live_url;
        if (res.data.data.live_info.live_status == 3) {
          that.data.living_title = '直播已结束',
            live_url = res.data.data.live_info.mp4_url;

          wx.setNavigationBarTitle({
            title: '直播已结束'//页面标题为路由参数
          });
          that.setData({
            live_url: live_url,
          })
        } else if (res.data.data.live_info.live_status == 1 || res.data.data.live_info.live_status == 2) {
          that.data.living_title = '正在直播',
            wx.setNavigationBarTitle({
              title: '正在直播'//页面标题为路由参数
            })
          // live_url = res.data.data.live_info.hls_live_url;
          live_url = res.data.data.live_info.rtmp_live_url;
          //console.log(live_url);
          that.setData({
            live_url: live_url
          })
        } else {
          that.data.living_title = '直播未开始',
            wx.setNavigationBarTitle({
              title: '直播未开始'//页面标题为路由参数
            })
          var total_micro_second = res.data.data.live_info.start_time_duration;
          // var total_micro_second = 0;
          if (Number(total_micro_second) <= 0) {
            that.setData({
              isTimeOut: 0,
            });
          } else {

            that.data.interval = setInterval(function () {
              total_micro_second -= 1;
              if (total_micro_second < 0) {
                //console.log('时间到了');
                clearInterval(that.data.interval);
                // updata(that.data.url, { id: that.data.id }, that);
                that.setData({
                  isTimeOut: 0,
                });
              } else {
                that.setData({
                  clock: dateformat(total_micro_second),
                  isTimeOut: 1,
                });
              }
            }, 1000);
          }


          live_url = res.data.data.live_info.rtmp_live_url;
        }

        that.setData({
          video_product_list: res.data.data.product_info,
          mid: res.data.data.live_info.netred_id,
          live_info: res.data.data.live_info,
          live_status: res.data.data.live_info.live_status,
          room_id: res.data.data.live_info.room_id,
          sell_point: res.data.data.live_info.sell_point,
          detail_content: res.data.data.live_info.desc,
          avatar: res.data.data.netred.avatar_full,
          netred: res.data.data.netred,
          share_image_url: res.data.data.live_info.qrcode,
          rednet_name: res.data.data.netred.name,
          location: res.data.data.netred.location,
          is_follow: res.data.data.netred.is_follow,
          isRemind: res.data.data.live_info.is_remind,
          id: res.data.data.live_info.id,
          member_id: member_id,
          shop_id: res.data.data.live_info.shop_id,
          is_show_discount: res.data.data.live_info.coupon_count,
          isShow: 1,
          title: res.data.data.live_info.title
        })
        // if (res.data.data.live_info.live_status == 1) {
        //console.log(live_url);
        console.log(res.data.data.netred.share_image_url);
        // }
        if (res.data.data.live_info.live_status == 3) {
          console.log(live_url);
          that.setData({
            live_url: live_url,
            live_status: 7
          })
        }
        var room_id = res.data.data.live_info.room_id;
        //console.log(res);
        var vip = res.data.data.vip;
        // console.log(vip)
        wx.request({
          url: getApp().globalData.imBaseUrl + '/join',
          data: {
            rid: room_id,
            uid: member_id,
            mid: res.data.data.live_info.netred_id,
            user_name: user_name,
            vip: vip,
          },
          method: "GET",
          header: {
            'topshopstv-useragent': ua
          },
          success: function (res) {

            // console.log(1111111);
            console.log(res);
            var length = res.data.data.latest.length;
            that.setData({
              content_list: res.data.data.latest,
              content_length: length - 1,
              latest: res.data.data.latest.slice(-6, [length]),
              length: length - 1,
            })

            function onConnect() {
              client.subscribe(room_id, { qos: 0 });
            }

            function onFail(responseObject) {
            }
            // console.log('connect ...')
            client.connect({
              useSSL: getApp().globalData.useSSL,
              userName: 'topshopstv',
              password: 'topshopstv',
              reconnect: true,
              timeout: 10,
              keepAliveInterval: 8,
              cleanSession: false,
              mqttVersion: 3,
              onSuccess: function (data) {
                client.subscribe(room_id, { qos: 0 })

              },
              onFailure: function (msg) {

              }
            })
            client.onMessageArrived = function (msg) {

              var length = that.data.latest.length;
              var content_length = that.data.content_list.length;
              var result = JSON.parse(msg.payloadString);

              if (result.type == 5) {
                console.log(result);
                var str = result.content;
                var join_user = result.user_name;
                var live_num = str.split(',')[1];
                that.setData({
                  live_num: live_num,
                  join_user: join_user,
                  isBuyRemind: 3,
                  is_buy_messge: 1,
                })
                setTimeout(function () {
                  that.setData({
                    is_buy_messge: 0,
                  })
                }, 3000)

              } else if (result.type == 8) {//重新连接
                live_url = live_url + "?t=" + (new Date().getTime());
                setTimeout(function () {
                  that.setData({
                    live_url: live_url,
                    live_status: 1
                  }, )
                }, 1000)

                // wx.redirectTo({
                //   url: '/pages/live/live?id=' + id,
                // })
                // wx.navigateTo({
                //   // 界面跳转并页面传值
                //   url: '/pages/live/live?id=' + id
                // })
              } else if (result.type == 6) {//中途退出

                var live_status = that.data.live_status;
                if (live_status == 7) {
                  return
                } else {
                  console.log("中途退出");
                  that.setData({

                    live_status: 2
                  })
                }
              } else if (result.type == 7) {//已结束

                that.setData({
                  live_url: '',
                  live_status: 7
                })
                wx.redirectTo({
                  url: '../../pages/liveDetail/liveDetail?id=' + that.data.id + '&live_data_id=' +that.data.live_data_idthat.data.live_data_id,
                })

              } else if (result.type == 13) {

                var video_product_list = that.data.video_product_list;
                console.log(result)
                var content = JSON.parse(result.content);
                var is_update = 0;
                for (var i = 0; i < video_product_list.length; i++) {
                  if (video_product_list[i].id == content.id) {
                    is_update = 1;

                    var main_image = 'video_product_list[' + i + '].main_image';
                    var ori_main_image = 'video_product_list[' + i + '].ori_main_image';
                    var min_price = 'video_product_list[' + i + '].min_price';
                    var name = 'video_product_list[' + i + '].name';
                    var price = 'video_product_list[' + i + '].price';
                    var sequence_number = 'video_product_list[' + i + '].sequence_number';
                    var data_id = 'video_product_list[' + i + '].data_id';
                    console.log(content.ori_main_image);
                    that.setData({
                      [ori_main_image]: content.ori_main_image,
                      [main_image]: content.main_image,
                      [min_price]: content.min_price,
                      [name]: content.name,
                      [price]: content.price,
                      [data_id]: content.data_id,
                      [sequence_number]: content.sequence_number
                    })
                    break;
                  }

                }
                //console.log(video_product_list);
                //console.log(is_update);
                if (is_update == 0) {
                  var result_list = [];
                  result_list[0] = content;
                  var result = result_list.concat(video_product_list);
                  that.setData({
                    video_product_list: result,
                    is_add_messge: 1,
                  })
                }
                setTimeout(function () {
                  that.setData({
                    is_add_messge: 0,
                  })
                }, 4000)

              } else if (result.type == 14) {//正在去买
                // var num = parseInt(Math.random(0, 11));
                var user_name = result.user_name;
                that.setData({
                  isBuyRemind: 1,
                  is_buy_messge: 1,
                  buy_user_name: user_name,
                  // num: num,
                })
                setTimeout(function () {
                  that.setData({
                    is_buy_messge: 0,
                  })
                }, 3000)

              } else if (result.type == 11) {//关注

                var user_name = result.user_name;
                that.setData({
                  isBuyRemind: 0,
                  is_buy_messge: 1,
                  buy_user_name: user_name,

                })
                setTimeout(function () {
                  that.setData({
                    is_buy_messge: 0,
                  })
                }, 3000)

              } else if (result.type == 12) {//购买了

                var user_name = result.user_name;
                var content = result.content;
                that.setData({
                  goods_code: content,
                  isBuyRemind: 2,
                  is_buy_messge: 1,
                  buy_user_name: user_name,
                })
                setTimeout(function () {
                  that.setData({
                    is_buy_messge: 0,
                  })
                }, 3000)

              } else {
                var list = [];
                list[0] = result;
                //console.log(result);

                that.setData({
                  content_list: that.data.content_list.concat(list),
                  content_length: content_length,
                  latest: that.data.latest.concat(list).slice(-6, [length + 1]),
                  length: length
                })
              }
            }
            client.onConnectionLost = function (responseObject) {
              //console.log("onConnectionLost:" + responseObject);
              var temp
              for (temp in responseObject) {
                //console.log("onConnectionLost:" + responseObject[temp]);
              }

            }
            //console.log('finish !!!')
          }
        });
      } else {
        that.setData({
          is_login: 0
        })
      }
    }, function (res) {

    });
    //console.log(that.data.room_id);

    // console.log(that.data.living_title);
    // if (that.data.living_title = '直播已结束') {
    //   that.setData({
    //     live_status: 7
    //   })
    // }

  },
  look_img(e) {
    var img = e.currentTarget.dataset.img;
    this.data.imgalist[0] = img;
    wx.previewImage({
      current: img, // 当前显示图片的http链接  
      urls: this.data.imgalist // 需要预览的图片http链接列表  
    })
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var that = this;
    if (getApp().globalData.flag) {
      this.setData({
        is_order: 0,
      })
    }
    that.setData({
      is_hide: false,
    })
    getApp().globalData.flag = false;
    /** 
    if (getApp().globalData.isRunningBack) {
      var data = {
        id: that.data.live_id,
      };

      var url = "api/LiveSchedule/liveDetailForShow"

      req.reqData(url, data, function (res) {
        // var live_url = res.data.data.live_info.hls_live_url + "?t=" + (new Date().getTime())
        var live_url = '';
        //console.log(live_url);
        if (res.data.data.live_info.live_status == 3) {
          live_url = res.data.data.live_info.mp4_url + "?t=" + (new Date().getTime());
        } else {
          live_url = res.data.data.live_info.rtmp_live_url + "?t=" + (new Date().getTime());
        }


        // setTimeout(function () {
        that.setData({
          live_url: live_url,
          live_status: res.data.data.live_info.live_status
        })
        // }, 10000)
      }, function () {

      })
    }
    */

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    //this.data.videoContext.stop();
    getApp().globalData.isRunningBack = true;
    getApp().globalData.live_status = this.data.live_status;

    this.setData({
      is_hide: true,
    })

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

    if (client && client.isConnected()) {
      client.disconnect();
    }
    var that = this;

    that.setData({
      is_hide: true,
    });
    var room_id = that.data.room_id;
    var member_id = that.data.member_id;
    var ua = uaChange.getUseragent();
    wx.request({
      url: getApp().globalData.imBaseUrl + '/leave',
      data: {
        rid: room_id,
        uid: member_id
      },
      method: "GET",
      header: {
        'feiyu-useragent': ua
      },
      success: function (res) {
        //console.log(res);
      }
    });

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

  // 存储formid
  sendFormId(e) {
    var that = this;
    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid: form_id
    };
    req.reqData(url, data, function () {
      //console.log('发送formid成功');
    }, function () {
      //console.log('发送formid失败');
    })
    login.login(true, function () {

    }, function () { })
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
            console.log(res);
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
        console.log('fail')
      }
    })

  },
  // 点击分享
  other_intoShare() {
    var that = this;
    console.log(222);
    that.setData({
      is_show_play: 2,
      other_noscroll: true,
      other_maskShow: true,
      other_shareMask: 1,
    })
  },


  other_btnShare: function (e) {
    this.setData({
      is_show_play: 0,
      other_shareMaskShow: 1,
      other_noscroll: 1,
      other_shareMask: 0,
      other_maskShow: 0,
    })
  },

  other_close: function (e) {

    this.setData({
      is_show_play: 0,
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
      is_show_play: 0,
      other_shareMaskShow: 0,
      other_noscroll: 0,
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
    that.setData({
      other_noscroll: 0,
      other_maskShow: 0,
      other_shareMask: 0,
      is_show_play: 0,
    })

    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }


    var user_id = wx.getStorageSync('wx_id');
    return {
      title: that.data.title,
      path: 'pages/liveDetail/liveDetail?from_member_id=' + member_id + '&id=' + that.data.id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id + '&data_id=' + that.data.live_data_id,
      success: function (res) {

        //console.log('转发成功' + that.data.id);
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})