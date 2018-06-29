// pages/distribution/myProfit/myProfit.js
var req = require('../../../service/service.js');
var login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    show: 0,
    flag: 0,
    fyList: [],
    myList: [],
    pageData: {},
    showPage: 0,
    myCustomer: [],
    maskShow: false,
    couponMask: false,
    share_title: '',
    selected: 0,
    list: [],
    allList: [],
    isToast:0,
    shop_id:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = 'api/distribution/myIncome';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      var arr = data.myCustomer;
      for (var i = 0; i < arr.length; i++) {
        if (arr[i].is_kilner == 0) {
          that.data.list.push(arr[i]);
        }
      }
      // console.log(that.data.list)
      var progress = (data.my_total_take_money) / (data.right_min - data.left_min) * 100;
      console.log(progress)
      that.setData({
        pageData: data,
        fyList: data.not_bought,
        myList: data.is_bought,
        showPage: 1,
        myCustomer: data.myCustomer,
        allList: data.myCustomer,
        share_title: data.share_title,
        isToast: data.create_shop,
        progress: progress,
        shop_id:data.my_shop_id,
        share_image:data.share_bg
      })

    }, function () { })

  },

  
  go_index(){
    wx.switchTab({
      url: '/pages/index/index',
    })
  },
  shareMyShop() {
    if (!this.data.show) {
      this.setData({
        show: 1
      })
    } else {
      // 处理分享
    }

  },

  lookMore(e) {
    var my_wine = e.currentTarget.dataset.mywine;
    var title = e.currentTarget.dataset.title;
    if (title) {
      wx.navigateTo({
        url: '/pages/distribution/moreWine/moreWine?my_wine=' + my_wine + '&title=' + title,
      })
    } else {
      wx.navigateTo({
        url: '/pages/distribution/moreWine/moreWine?my_wine=' + my_wine,
      })
    }

  },

  choose() {
    this.setData({
      selected: !this.data.selected
    })
    if (this.data.selected) {
      this.setData({
        myCustomer: this.data.list
      })
    } else {
      this.setData({
        myCustomer: this.data.allList
      })
    }
  },

  getConsumeDetail(e) {

    wx.navigateTo({
      url: '/pages/distribution/consumeDetail/consumeDetail',
    })
  },

  incomeDetail(e) {
    wx.navigateTo({
      url: '/pages/distribution/incomeDetail/incomeDetail',
    })
  },
  btnLevel(e) {
    wx.navigateTo({
      url: '/pages/distribution/membersRights/membersRights',
    })
  },

  btnRuler(e) {
    wx.navigateTo({
      url: '/pages/distribution/rules/rules',
    })
  },
  productDetail(e) {
    var is_bought = e.currentTarget.dataset.is_bought;
    var id = e.currentTarget.dataset.id;
    var n = e.currentTarget.dataset.n;
    wx.navigateTo({
      url: '/pages/distribution/productDetail/productDetail?productId=' + id + '&data_id=' + n + '&is_bought=' + is_bought,
    })
  },

  jump_next(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/distribution/accountDetail/accountDetail?model=' + id,
    })
  },
  record(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/distribution/saleRecord/saleRecord?id=' + id,
    })
  },
  btnClose() {
    this.setData({
      isToast: 0,
    })
  },

  btnCreate(e) {
    this.setData({
      isToast: 0,
    })
    wx.navigateTo({
      url: '/pages/distribution/completeInto/completeInto',
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
    var that = this;
    var url = 'api/distribution/myIncome';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      console.log(data)
      that.setData({
        pageData: data,
        is_kilner: data.is_kilner,
        fyList: data.not_bought,
        myList: data.is_bought,
        showPage: 1,
        myCustomer: data.myCustomer
      })
    }, function () { })
  },

  jump_index() {
    var my_home_flag = 2;
    var my_home_id = this.data.shop_id;
    login.login(true, function () {
      var url = '/api/netred/setHome';
      var data = {
        my_home_id:my_home_id,
        my_home_flag:my_home_flag,
      };
      req.reqData(url, data, function (res) {
        var data = res.data.data;
        wx.setStorageSync('my_home_flag', data.my_home_flag);
        wx.setStorageSync('my_home_id', data.my_home_id);
        getApp().globalData.isLoginIndex = true;
        wx.switchTab({
          url: '/pages/index/index',
        })

      }, function () {

      })

    }, function () {

    })


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
    var that = this;
    setTimeout(function () {
      wx.stopPullDownRefresh();
    }, 300)

    var url = 'api/distribution/myIncome';
    var data = {};
    req.reqData(url, data, function (res) {
      var data = res.data.data;
      that.setData({
        pageData: data,
        fyList: data.not_bought,
        myList: data.is_bought,
        showPage: 1,
        myCustomer: data.myCustomer,
        isToast: data.create_shop
      })
    }, function () { })

  },

  stop() {
    return;
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onPageScroll: function (e) {
    if (e.scrollTop > 192) {
      this.setData({
        show: 1,
        flag: 1
      })
    } else {
      if (this.data.show == 1 && this.data.flag == 0) {
        return;
      } else {
        this.setData({
          show: 0,
          flag: 0
        })
      }
    }
  },
  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function (e) {
  //   var user_id = wx.getStorageSync('wx_id');
  //   var member_id = wx.getStorageSync('member_id');
  //     if (!member_id) {
  //       member_id = '';
  //     }

  //   if(e.from == "menu"){
  //     return {
  //       title: '分销规则',
  //       path: 'pages/distribution/rules/rules?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
  //       success: function (res) {
  //         // 转发成功
  //       },
  //       fail: function (res) {
  //         // 转发失败
  //       }
  //     }
  //   }else{
  //     var name = e.target.dataset.name;
  //     var id = e.target.dataset.id;
  //     var data_id = e.target.dataset.data_id;
  //     return {
  //       title: name,
  //       path: 'pages/productDetail/productDetail?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id + '&productId=' + id + '&data_id=' + data_id,
  //       success: function (res) {
  //         // 转发成功
  //       },
  //       fail: function (res) {
  //         // 转发失败
  //       }
  //     }
  //   } 
  // }

  /**
  * 用户点击右上角分享
  */
  onShareAppMessage: function (res) {
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    // console.log(member_id);
    if (!member_id) {
      member_id = '';
    }
    var user_id = wx.getStorageSync('wx_id');
    if (res.from === 'button') {
      return {
        title: this.data.share_title,
        imageUrl:that.data.share_image,
        path: 'pages/distribution/rules/rules?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
        success: function (res) {

        },
        fail: function (res) {
          // 转发失败
        }
      }
    }else{
      return {
        title: '分销说明',
        imageUrl:that.data.share_image,
        path: 'pages/distribution/rules/rules?register_channel=wxapp_share' + '&from_user_id=' + user_id,
        success: function (res) {

        },
        fail: function (res) {

        }
      }
    }

  }
})