// pages/distribution/saleRecord/saleRecord.js
var req = require('../../../service/service.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentIndex:0,
    topData:{},
    list:[],
    allList:[],
    centerTab:[],
    rightTab:[],
    id:'',
    show:0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var id = options.id;
    var url = 'api/distribution/getConsumeRecords';
    var data = {
      spu_id:id
    }
    req.reqData(url,data,function(res){
      var data = res.data.data;
      that.setData({
        topData:data.prodctDetail,
        list:data.consumeList,
        allList:data.consumeList,
        id:id,
        show:1
      })
      for(var i = 0; i< data.consumeList.length; i++){
        if(data.consumeList[i].type == 1){
          that.data.rightTab.push(data.consumeList[i]);
        }else{
          that.data.centerTab.push(data.consumeList[i]);
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  changeTab(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var data = {
      spu_id:that.data.id
    };
    
    if(index == that.data.currentIndex){
      return
    }else if(index == 0){
      that.setData({
        currentIndex:index,
        list:that.data.allList
      })
    }else if(index == '-1'){
      that.setData({
        currentIndex:index,
        list:that.data.centerTab
      })
    }else if(index == '1'){
      that.setData({
        currentIndex:index,
        list:that.data.rightTab
      })
    }
    
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
  onShareAppMessage: function () {
  
  }
})