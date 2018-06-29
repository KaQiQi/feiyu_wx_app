Page({

  /**
   * 页面的初始数据
   */
  data: {
    name:'',
    order_id:'',
    price:'',
    address:'',
    num:'',
    image:'',
    data_id:'',
    nick_name:'',
    specification:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var name = options.name;
    var order_id = options.order_id;
    var price = options.price;
    var address = options.address;
    var num = options.num;
    var specification = options.specification;
    var image = options.image;
    var product_id = product_id;
    var data_id = options.data_id;
    var nick_name = wx.getStorageSync('wx_username');
    that.setData({
      name,
      order_id,
      price,
      address,
      num,
      image,
      product_id,
      data_id,
      nick_name,
      specification
    })
  },

  goMyIndex(){
    wx.redirectTo({
      url: '../myProfit/myProfit',
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
    var that = this;
    var member_id = wx.getStorageSync('member_id');
    if (!member_id) {
      member_id = '';
    }
    var my_home_flag = wx.getStorageSync('my_home_flag');
    var user_id = wx.getStorageSync('wx_id');
    var entity_type;
    var entity_id;
    if (my_home_flag == 1) {
      entity_type = 'e_home'
    }
    if (my_home_flag == 2) {
      entity_type = 's_home'
    }
    if (my_home_flag == 3) {
      entity_type = 'm_home'
    }
    entity_id = wx.getStorageSync('my_home_id');
    if (!entity_id) {
      entity_id = 0;
    }

    return {
      title: that.data.name,
      imageUrl:that.data.image,
      path: 'pages/productDetail/productDetail?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id + '&productId=' + that.data.productId + '&data_id=' + that.data.data_id + '&entity_type=' + entity_type + '&entity_id=' + entity_id,
      success: function (res) {
        // 转发成功

      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})