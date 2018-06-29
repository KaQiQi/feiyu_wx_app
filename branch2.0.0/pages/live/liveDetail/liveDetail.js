// pages/live_demo/liveDetail/liveDetail.js
const req = require('../../../service/service');
const login = require('../../../utils/login');
// 时间格式化输出，如11:03 25:19 每1s都会调用一次
function dateformat(second) {
  // 天数
  var day = Math.floor(second / 3600 / 24);
  if (day < 10) {
    day = "0" + day;
  }
  // 小时
  var hr = Math.floor(second / 3600 % 24);
  if (hr < 10) {
    hr = "0" + hr;
  }
  // 分钟
  var min = Math.floor(second / 60 % 60);
  if (min < 10) {
    min = "0" + min;
  }
  // 秒
  var sec = Math.floor(second % 60);
  if (sec < 10) {
    sec = "0" + sec;
  }
  return {
    day: day,
    hr: hr,
    min: min,
    sec: sec
  }
}
Page({
  // 数据初始化
  data: {
    indicatorDots: false,
    autoplay: true,
    interval: 4500,
    duration: 500,
    circular: true,
    banner: [],
    brand: {},
    netred: {},
    productList: [],
    rule: {},
    btm: {},
    share_url: '',
    countDown: '',
    isFollow: '',
    startRemind: '',
    is_like_live: '',
    like_num: '',
    live_status: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    var live_id = 733;
    var that = this;
    var url = 'liveSchedule/livePreview';
    var param = {
      live_id: live_id
    };
    req.reqData(url, param,
      function (res) {
        var data = res.data.data;
        var second = data.return_data_btm.time;
        console.log(res);
        that.setData({
          brand: data.return_data_brand,
          banner: data.return_data_banner,
          netred: data.return_data_netred,
          productList: data.return_data_product,
          rules: data.return_data_rule,
          share_url: data.share_url,
          btm: data.return_data_btm,
          isFollow: data.return_data_netred.is_follow_netred,
          startRemind: data.return_data_btm.my_remind,
          is_like_live: data.return_data_btm.is_like_live,
          like_num: data.return_data_btm.like_num,
          live_status: data.return_data_btm.live_status,
        });
        // 倒计时
        that.interval = setInterval(function () {
          second--;
          if (second < 0) {
            clearInterval(this.interval);
            that.setData({
              live_status: 1
            });
          } else {
            that.setData({
              countDown: dateformat(second)
            });
          }
        }, 1000);
      },
      function (res) {

      });
  },

  // 点击关注
  follow: function (e) {
    var that = this;
    var url = 'favorite/followNetred';
    // 获取主播id
    var id = e.currentTarget.dataset.id;
    var obj = {
      id: id,
      status: 1
    }
    req.reqData(url, obj,
      function (res) {
        that.setData({
          isFollow: 1,
        });
      },
      function (res) {

      });
  },

  // 开播提醒
  startRemind: function (e) {
    var that = this;
    var url = 'remind/liveSchedule';
    var id = e.currentTarget.dataset.id;
    var obj = {
      id: id,
      status: 1
    }
    req.reqData(url, obj,
      function (res) {
        that.setData({
          startRemind: 1,
          like_num: parseInt(that.data.like_num) + 1
        });
      },
      function (res) {

      });
  },
  // 视频播放
  playVideo: function (e) {
    var url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url: "../../live_demo/playVideo/playVideo" + "?videoUrl=" + url,
      success: function (res) {
        // success
        // console.log(111);
      },
      fail: function () {
        // fail
      },
      complete: function () {
        // complete
      }
    })
  },

  // 取消提醒
  cancelRemind: function (e) {
    var that = this;
    var url = 'remind/liveSchedule';
    var id = e.currentTarget.dataset.id;
    var obj = {
      id: id,
      status: 0
    }
    req.reqData(url, obj,
      function (res) {
        that.setData({
          startRemind: 0,
          like_num: parseInt(that.data.like_num) - 1
        });
      },
      function (res) {

      });
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

  // /**
  //  * 用户点击右上角分享
  //  */
  // onShareAppMessage: function () {

  // }
})