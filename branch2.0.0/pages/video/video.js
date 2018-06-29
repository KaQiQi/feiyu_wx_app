// pages/video/video.js
var req = require('../../service/service');
var login = require('../../utils/login');
const util = require('../../utils/util.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataloaded:0,
    isShow:true,
    isCrossScreen:true,
    videoHeight:100,
    shopInfo:{},
    products:[],
    is_follow:8,
    shop_id:'',
    flag:true,
    title:'',
    video_id:'',
    data_id:'',
  },

  isShow:function(){
    this.setData({
      isShow:!this.data.isShow,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var reg_shop_id = options.reg_shop_id;
    var video_id = options.video_id;
    var app = getApp();
    app.aldstat.sendEvent('进入视频页', {
      'video_id': video_id + '',
    });
    var data_id = options.data_id ? options.data_id : '';
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;

    var from_user_id = options.from_user_id;
    if (!video_id) {
      var scene = decodeURIComponent(options.scene);
      video_id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);

      from_user_id = login.getQueryString('u', scene);
      data_id = login.getQueryString('a', scene);
    }
    var entity_type = 'video';
    var entity_id = video_id;
    that.data.video_id = video_id;
    that.data.data_id = data_id;
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, null, data_id);
  
    // if (wx.canIUse('video')){
    //   console.log("zhichi")
    // }else{
    //   console.log("buzhichi")
    // }
   
    
  },
  productDetail(e){
    // console.log(e);
    var id = e.currentTarget.dataset.id;
    var app_url = e.currentTarget.dataset.app_url;
    console.log(app_url);
    var app = getApp();
    app.aldstat.sendEvent('视频商品', {
      'product_id': id,
      'video_id': this.data.video_id,
    });
    wx.navigateTo({
      url: '/' + app_url
    })
  
  },

  // 点击关注
  formSubmit(e){
    console.log(e);
    var form_id = e.detail.formId;
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('视频页-关注', {});
    login.login(true,function(){
      // 已登录
      var url = 'api/favorite/followShop';
      var data = {
        id:that.data.shop_id,
        status:1,
        formid:form_id,
      }
      req.reqData(url,data,function(){
        // console.log('已关注');
        wx.showToast({
          title:'关注成功'
        });
        that.setData({
          is_follow:1,
        });
      },function(){

      })
    },function(){

    })
  },
  follow(e){
    console.log(e);
    var that = this;
    login.login(true,function(){
      // 已登录
      var url = 'api/favorite/followShop';
      var data = {
        id:that.data.shop_id,
        status:1,
      }
      req.reqData(url,data,function(){
       
        wx.showToast({
          title:'关注成功'
        })
        that.setData({
          is_follow:1,
        })
      },function(){

      })
    },function(){

    })
  },
  cancelFollowAll(e){
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('视频页-取消关注', {});
    login.login(true,function(){
      // 已登录
      var url = 'api/favorite/followShop';
      var data = {
        id:that.data.shop_id,
        status:0,
      }
      req.reqData(url,data,function(){
       
        wx.showToast({
          title:'取消成功'
        })
        that.setData({
          is_follow:0,
        })
      },function(){

      })
    },function(){

    })
  },
  // 取消关注
  cancelFollow(e){
    console.log(e);
    var form_id = e.detail.formId;
    var that = this;
    login.login(true,function(){
      // 已登录
      var url = 'api/favorite/followShop';
      var data = {
        id:that.data.shop_id,
        status:0,
        formid:form_id,
      }
      req.reqData(url,data,function(){
       
        wx.showToast({
          title:'取消成功'
        })
        that.setData({
          is_follow:0,
        })
      },function(){

      })
    },function(){

    })
  },
// 点击头像跳转店铺页
  toShop(e){
    var shop_id = this.data.shop_id;
    var url = e.currentTarget.dataset.url;
    var app = getApp();
    app.aldstat.sendEvent('视频进店铺', {
      'shop_id': shop_id,
    });
    wx.navigateTo({
      url: '../../'+url
    })
  },

  // 存储formid
  sendFormId(e){
    var that = this;
    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid:form_id
    };
    login.login(true,function(){
      req.reqData(url,data,function(){
        // console.log('发送formid成功');
      },function(){})
    },function(){})
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
var that=this;
    var url = 'api/video/getVideoForApp';
    var param = {
      video_id: that.data.video_id,
      data_id:that.data.data_id
    };
    req.reqData(url, param,
      function (res) {
        console.log(res);
        wx.setNavigationBarTitle({
          title: res.data.data.title
        })
        if (res.data.data.video_type == 2) {
          that.setData({
            isCrossScreen: false,
          })
        }
        that.setData({
          shopInfo: res.data.data,
          products: res.data.data.products.splice(0, 2),
          is_follow: res.data.data.is_follow,
          shop_id: res.data.data.shop_id,
          title: res.data.data.title,
          dataloaded: 1,
        });

      }, function (res) {

      });  
  },

  videoErrorCallback: function (e) {
    console.log('视频错误信息:' + e.detail.errMsg);
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
  jump_index: util.throttle(function () {
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
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    var that=this;
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }

    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }

  
    var user_id = wx.getStorageSync('wx_id');
    return {
      title: that.data.title,
      path: 'pages/video/video?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id + '&video_id=' + that.data.video_id + '&data_id=' + that.data.data_id,
      success: function (res) {
        // 转发成功
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})