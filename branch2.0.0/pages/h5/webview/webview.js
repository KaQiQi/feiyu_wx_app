// pages/h5/webview/webview.js
var req = require('../../../service/service');
var login = require('../../../utils/login');
const util = require('../../../utils/util.js');
const headjs = require('../../../utils/head.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // url: 'file:///Users/zhangdongdong/Desktop/feiyu_php/php_workplace/Application/H5/View/index.html',
    // url: 'file:///Users/zhangdongdong/Desktop/feiyu_php/php_workplace/Application/H5/index.html'
    url:'',
    share_title:'',
    from_member_id:'',
    register_channel:'',
    from_user_id:'',
    reg_shop_id:'',
    is_login:'',
    path:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url='';

    if (options.url){
      url = decodeURIComponent(options.url);
    }
    getApp().globalData.isLoginIndex = true;
    console.log(url);
    that.data.is_login = options.is_login;
    that.data.share_title = decodeURIComponent(options.sharetitle);
    console.log(that.data.share_title);

    var reg_shop_id = options.reg_shop_id;
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;
   
    var from_user_id = options.from_user_id;
    if (!url) {
  
      var scene = decodeURIComponent(options.scene);
      var id = login.getQueryString('i', scene);
      reg_shop_id = login.getQueryString('r', scene);
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
      from_user_id = login.getQueryString('u', scene);

      var h = login.getQueryString('h', scene);
      if (h == 'g') {
        url = "https://m.topshopstv.com/index.php/h5/group/detail1/from_install_share/1/group_id/"+id;
      }

    }
    that.data.url = url;
   

    var entity_type = 'e_home';
    var entity_id = '134';
    console.log(that.data.url);
    var topshopstv_appid = 3;
    var ua = headjs.getUseragent();

    var topshopstv_ua = encodeURIComponent(ua);
    var str = that.data.url.indexOf('?') != -1 ? '&' : '?';
    that.data.path = url;
    // if (that.data.url.indexOf('topshopstv_ua') == -1) {
      that.data.path = that.data.url + str + 'topshopstv_ua=' + topshopstv_ua + '&topshopstv_appid=' + topshopstv_appid;

    // }
   
    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () { });
    
 
    if (that.data.is_login == 1) {
      login.login(true, function () {
        console.log(that.data.url);
        that.setData({
          path: that.data.path,
        })

      }, function () {
        wx.navigateBack({ delta: 1 })

        // wx.navigateTo({
        //   url: '/pages/h5/loginAuthorized/loginAuthorized',
        // })
        // that.setData({
        //   path: path,
        // })
      })

    } else {


      that.setData({
        path: that.data.path,
      })
    }

  },


  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  btnMessage: function (e) {
    console.log(e);
    console.log(e.detail);
    this.data.share_title = e.detail.data[0].sharetitle;
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log("onShowwebview");
    var that=this;
    
    if (getApp().globalData.isH5Login){
      getApp().globalData.isH5Login = false;
    that.setData({
      path: '',
    })

      var topshopstv_appid = 3;
      var ua = headjs.getUseragent();

      var topshopstv_ua = encodeURIComponent(ua);
      var str = that.data.url.indexOf('?') != -1 ? '&' : '?';
      that.data.path = that.data.url + str + 'topshopstv_ua=' + topshopstv_ua + '&topshopstv_appid=' + topshopstv_appid;
      if (that.data.is_login == 1) {
        login.login(true, function () {
          console.log(that.data.url);
          that.setData({
            path: that.data.path,
          })

        }, function () {
          wx.navigateBack({ delta: 1 })

          // wx.navigateTo({
          //   url: '/pages/h5/loginAuthorized/loginAuthorized',
          // })
          // that.setData({
          //   path: path,
          // })
        })

      } 
      else {


        that.setData({
          path: that.data.path,
        })
      }
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
    console.log('onPullDownRefresh')
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log('onPullDownRefresh')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (options) {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    console.log(that.data.share_title);
    var sharetitle = encodeURIComponent(that.data.share_title);
    
    var webViewUrl = options.webViewUrl;
    
    webViewUrl = util.delUrlParam(webViewUrl, 'topshopstv_ua');
    webViewUrl = util.delUrlParam(webViewUrl, 'topshopstv_appid');
    console.log(webViewUrl);
    

    if (webViewUrl.indexOf('from_install_share') == -1){
      var str = webViewUrl.indexOf('?') != -1 ? '&' : '?';
       webViewUrl = webViewUrl + str + 'from_install_share=1';
    }


   

    webViewUrl=encodeURIComponent(webViewUrl);

    if (!member_id) {
      member_id = '';
    }

    var user_id = wx.getStorageSync('wx_id');
    // if (res.from === 'button') {
    //   // 来自页面内转发按钮
    //   console.log(res.target)
    // }

    return {
      title: that.data.share_title,
      path: 'pages/h5/webview/webview?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id + '&url=' +webViewUrl + '&sharetitle=' + sharetitle,
      // imageUrl:'/images/index/redbag.png',
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})