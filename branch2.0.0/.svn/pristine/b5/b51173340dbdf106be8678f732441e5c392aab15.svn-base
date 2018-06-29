// pages/my/myCashBack/cashBackDetail/cashBackDetail.js
var req = require('../../../../service/service.js');
var login = require('../../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnData: '',
    inputValue:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var url = '/api/member/getSumReturnMoney';
    var data = {};
    req.reqData(url, data, function (res) {

      that.setData({
        returnData: res.data.data,
      })
    }, function () {

    })
  },
  onBindding(e) {
    var that=this;
    console.log(e.detail.value)
   
    if (e.detail.value >Number(that.data.returnData.my_return_money)){
      that.setData({
        inputValue: that.data.returnData.my_return_money
      })
    }else{
      that.data.inputValue = e.detail.value;
    }
  },
  // 存储formid
  sendFormId(e) {
    var that = this;
    console.log(e);

    var form_id = e.detail.formId;
    var url = 'api/log/emptynull';
    var data = {
      formid: form_id
    };
    req.reqData(url, data, function () {
      // console.log('发送formid成功');
    }, function () { })
  },
  btn_all: function (e) {
    var that = this;
    that.setData({
      inputValue: that.data.returnData.my_return_money
    })
  },

  btn_cashback:function(){
    var that=this;
    if ( Number(that.data.inputValue)>0){
      console.log(that.data.inputValue);
      var url = '/api/member/takeMoney';
      var data = {};
      data.money = that.data.inputValue;
      req.reqData(url, data, function (res) {
        var data=res.data.data;
        wx.redirectTo({
          url: '../../myCashBack/commitSuccess/commitSuccess?money=' + data.money + '&duration=' + data.duration,
        })
       
      }, function () {

      })
   
    }else{
      wx.showToast({
        title: '请输入提现金额',
      })
    }
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

  /**
   * 用户点击右上角分享
   */
  // onShareAppMessage: function () {

  // }
})