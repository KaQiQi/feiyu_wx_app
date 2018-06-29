// pages/order/orderDetial/detial.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login');
const util = require('../../../utils/util.js')
// const cutDown = require('../../../utils/time.js');
// 初始化请求数据封装
function updata (url,data,that){
  req.reqData(url, data,
    function (res) {
      console.log(res);
      var total_micro_second = res.data.data.duration;
      if (res.data.data.last_ship_time==''){
        that.data.isOrder=0
      }else{
        that.data.isOrder = 1
      }
      that.setData({
        total_micro_second: total_micro_second,
        result: res.data.data,
        status_str: res.data.data.status_str,
        status: res.data.data.status,
        id:res.data.data.id,
        last_ship_info:res.data.data.last_ship_info,
        last_ship_time: res.data.data.last_ship_time,
        shop_confirm: res.data.data.shop_confirm,
        isShow:1,
        isOrder: that.data.isOrder,
      })
    })
}
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(micro_second) {
  // 总秒数
  var second = micro_second;
  // 天数
  // var day = Math.floor(second / 3600 / 24);
  // // 小时
  // var hr = Math.floor(second / 3600 % 24);
  // 分钟
  var min = Math.floor(second / 60 % 60);
  // 秒
  var sec = Math.floor(second % 60);
  return min + "分钟" + sec + "秒";
}


Page({

  /**
   * 页面的初始数据
   */
  data: {
    isShow:0,
    result: {},
    status: '',
    status_str:'',//订单的描述
    shop_confirm:'',
    total_micro_second: '',
    clock: '',
    interval: '',
    id:'',
    isOrder:'1',
    itemList:['我不想买了', '地址填写错误', '卖家缺货', '其他原因'],
    cancelReason:['卖家发错货', '质量问题', '假冒品牌', '其他原因'],
    last_ship_info:'',
    url:'api/order/orderDetail',
  },
 
  clickJump: util.throttle(function (e) {
    var url = e.currentTarget.dataset.url;
    var index = e.currentTarget.dataset.index;
    var app = getApp();
    app.aldstat.sendEvent('主播商品-商品', {
      'index': index + '',
      'shop_id': this.data.shop_id,
    });
    wx.navigateTo({
      url: '/'+url,
    })
  }, 1000),
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    getApp().globalData.flag = true;
    var id = options.id;
    var that = this;
    var url = this.data.url;
    var data = {
      id: id,
    };
    req.reqData(url, data,
      function (res) {
        console.log(res);
        var total_micro_second = res.data.data.duration;
        if (res.data.data.last_ship_time==''){
          that.data.isOrder=0
        }else{
          that.data.isOrder = 1
        }
        that.setData({
          total_micro_second: total_micro_second,
          result: res.data.data,
          status_str: res.data.data.status_str,
          status: res.data.data.status,
          id:res.data.data.id,
          last_ship_info:res.data.data.last_ship_info,
          last_ship_time: res.data.data.last_ship_time,
          shop_confirm: res.data.data.shop_confirm,
          isShow:1,
          isOrder: that.data.isOrder,
          shop_id: res.data.data.shop_id,
          shop_name: res.data.data.shop_name
        })

        that.data.interval = setInterval(function () {
          total_micro_second -= 1;
          if (total_micro_second < 0) {
            console.log('时间到了');
            clearInterval(that.data.interval);
            updata(that.data.url,{id:that.data.id},that);
          } else {
            that.setData({
              clock: dateformat(total_micro_second),
            });
          }
        }, 1000);
      }, function () {

      },1);
    //调用上面定义的递归函数，一秒一刷新时间
    console.log(that.data.total_micro_second)
    // countdown(that, that.data.total_micro_second);


  },
  copyOrder: function (e) {
    var order = e.currentTarget.dataset.order;
    wx.setClipboardData({
      data: order,
      success: function (res) {
        wx.getClipboardData({
          success: function (res) {
            // console.log(res.data)
            // wx.showToast({
            //   title: '复制成功',
            // })
          }
        })
      }
    })
  },
  contact(){
    var that = this;
    var app = getApp();
    app.aldstat.sendEvent('订单详情-联系客服', {
      'id':that.data.id
    });
  },
  // 确认收货
  btn_sure:function(e){
    var that=this;
    var id = e.currentTarget.dataset.id;
    console.log(e);
    var url = 'api/order/finishedOrderForApp';
    var data = {};
    data.id = id;
    wx.showModal({
      title: '提示',
      content: '确定要收货吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {

          req.reqData(url, data, function (res) {
            if (res.data.returnCode == 0) {
              wx.showToast({
                title:'确认收货成功'
              })
              updata(that.data.url,{id:that.data.id},that);
            }
          }, function () {

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  

 //申请退款
  btn_refund:function(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var order_status=13;
    console.log(e);
    wx.showActionSheet({
      itemColor: "#666666",
      itemList: that.data.cancelReason,
      success: function (res) {
        if(res.cancel){
          return;
        }
        var cancel_reason = that.data.cancelReason[res.tapIndex];
        var data = {
          id: id,
          cancel_reason: cancel_reason
        }
        var url = 'api/order/gotoServiceForApp';
        req.reqData(url, data, function (res) {
          console.log(res);
          // 申请退款成功
          wx.showToast({
            title:'发起售后成功'
          })
          updata(that.data.url,{id:that.data.id},that);

        }, function () {

        })

      },
      fail: function (res) {
        // console.log(res.errMsg)
      }
    })
  },

  onOrderClick: function (e) {
    console.log(e)
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/my/myLogistics/myLogistics?id='+id,
    })
  },

  // 查看物流
  toLogistic(e) {
    var id = this.data.id;
    wx.navigateTo({
      url: '../../my/myLogistics/myLogistics?id=' + id,
    })
  },

  // 立即支付
  PayAtOnce(e) {
    var order_id = this.data.id;
    var that = this;
    login.login(true, function () {
      var data = {
        order_id: order_id
      }
      var url = 'api/wxapp/rewxpay'
      req.reqData(url, data, function (res) {
        console.log(res);
        if (res.data.returnCode == 0) {
          wx.requestPayment({//调起微信支付
            'timeStamp': res.data.data.timeStamp,
            'nonceStr': res.data.data.nonceStr,
            'package': res.data.data.package,
            'signType': 'MD5',
            'paySign': res.data.data.paySign,
            'success': function (ress) {
                // 付款成功
                updata(that.data.url,{id:that.data.id},that);
            },
            'fail': function (res) {
              console.log(res);
              wx.showToast({
                title: '支付取消',
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

      }, function () {

      })
    }, function () {
      // 未登录
    })
  },

  // 删除订单
  deleteOrder(e){
    var that = this;
    var id = this.data.id;
    var url = 'api/order/deleteOrder';
    var data = {
      id:id
    }
    wx.showModal({
      content: '是否删除此订单?',
      cancelText: '取消',
      confirmText: '确定',
      success: function (res) {
        if (res.confirm) {
          wx.showToast({
            title:'订单删除成功'
          })
          setTimeout(function(){
            req.reqData(url, data, function (res) {
              if (res.data.returnCode == 0) {
                wx.redirectTo({
                  url: '../../my/myOrder/order?order_status=0',
                })
              }
            }, function () {
  
            })
          },500)
         
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })


   
  },

  // 取消订单
  cancelOrder:function (e) {
    var that = this;
    var id = this.data.id;
    console.log(id);
    var order_status = this.data.status;
    
    wx.showActionSheet({
      itemColor: "#666666",
      itemList: that.data.itemList,
      success: function (res) {
        var app = getApp();
        app.aldstat.sendEvent('订单详情-取消订单-理由选择', {
          'shop_id': that.data.shop_id,
        });
          if(res.cancel){
            return;
          }
          
          var cancel_reason = that.data.itemList[res.tapIndex];
          var data = {
            id:id,
            cancel_reason:cancel_reason
          }
          console.log(data.cancel_reason);
          var url = 'api/order/cancelOrder'
          req.reqData(url,data,function(info){
            updata(that.data.url,{id:that.data.id},that);
            wx.showToast({
              title:'订单取消成功'
            })
          },function(){
      
          },1)
        
      },
      fail: function (res) {
        // console.log(res.errMsg)
      }
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
    clearInterval(this.interval)
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})