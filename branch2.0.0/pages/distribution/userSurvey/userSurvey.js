// pages/distribution/userSurvey/userSurvey.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    returnDataList: '',
    questionsList: '',
    isShow: 0,
    Value: [],
    indexSelect: '',
    is_anwsered: 0,
    selectValue:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;

    var reg_shop_id = options.reg_shop_id ? options.reg_shop_id : '';
    var shop_id = options.shop_id ? options.shop_id : '';
    var from_member_id = options.from_member_id;
    var register_channel = options.register_channel;
    var from_user_id = options.from_user_id ? options.from_user_id : '';
    if (!from_member_id) {
      console.log(from_member_id);
      var scene = decodeURIComponent(options.scene);
      shop_id = login.getQueryString('i', scene) ? login.getQueryString('i', scene) : '';
      reg_shop_id = login.getQueryString('r', scene) ? login.getQueryString('r', scene) : '';
      from_member_id = login.getQueryString('f', scene);
      register_channel = login.getQueryString('c', scene);
      from_user_id = login.getQueryString('u', scene);
    }
    var entity_type = 'e_home';
    var entity_id = 134;

    login.processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, function () {

      var url = '/api/survey/question';
      var data = {};
      req.reqData(url, data, function (res) {
        if (res.data.data.is_anwsered == 1) {
          that.data.is_anwsered = 0;
        }
        that.setData({
          returnDataList: res.data.data,
          questionsList: res.data.data.questions,
          isShow: 1,
          is_anwsered: that.data.is_anwsered
        })

        wx.setNavigationBarTitle({
          title: res.data.data.title,
        })


        for (var i = 0; i < that.data.questionsList.length; i++) {
          that.data.Value.push('')
        }
      }, function () {

      })
    });
  },
  onBindding(e) {
    var that = this;

    var index = e.currentTarget.dataset.index;
    var value = e.detail.value;
    that.data.Value[index] = e.detail.value;
    console.log(index);
    console.log(that.data.Value);
  },

  selectValue(e) {
    var that = this;
    var index = e.currentTarget.dataset.index;
    var value = e.detail.value;
    that.data.Value[that.data.indexSelect] = e.detail.value;
    console.log(index);
    console.log(that.data.Value);
  },

  btnCommit: function (e) {
    var that = this;
    var data = {};
    for (var j = 0; j < that.data.questionsList.length; j++) {
      if (that.data.questionsList[j].flag == 1) {
        var select='';
        for (var i = 0; i < that.data.questionsList[j].items.length; i++) {
          if (that.data.questionsList[j].items[i].selected == 1) {
            select+= that.data.questionsList[j].items[i].name + ',';
            data['q' + (j + 1)] = select + that.data.Value[j];
            // that.data.Value[j]=' '
          }
        };
      
      }

    }
   
    console.log(that.data.Value);
    
    console.log(data);
    // for (var j = 0; j < that.data.questionsList.length; j++) {
    //   // if (that.data.questionsList[j].type == 1) {//表示单选      
    //     if (!that.data.Value[j]) {
    //       wx.showToast({
    //         title: '有问题未填写'
    //       })
    //       return;

    //     // }
    //   }
    // }
  
    for (var i = 0; i < that.data.Value.length; i++) {
      // if (that.data.questionsList[id]=that.data.inputValue[i+1])
      if (that.data.questionsList[i].type == 1) {
        data['q' + (i + 1)] = that.data.Value[i] ? that.data.Value[i] : ''
      }

    }

    var url = '/api/survey/submit';
    console.log(data);
    req.reqData(url, data, function (res) {
      if (res.data.returnCode == 0) {
        that.data.is_anwsered = 1;
        that.setData({
          is_anwsered: that.data.is_anwsered
        })
        wx.setNavigationBarTitle({
          title: '谢谢你的参与',
        })
        wx.showToast({
          title: res.data.data.success_tip,
        })
      }

    }, function () {

    })

  },
  // 存储formid
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
  btnSelect: function (e) {
    console.log(e);
    var that = this;
    var id = e.currentTarget.dataset.id;
    var selected = e.currentTarget.dataset.selected;
    var index = e.currentTarget.dataset.index;
    that.data.indexSelect = index;
    console.log(that.data.questionsList[index].items);
    console.log(id);
    for (var i = 0; i < that.data.questionsList[index].items.length; i++) {
      if (that.data.questionsList[index].items[i].id == id) {
        if (selected == 0) {
          that.data.questionsList[index].items[i].selected = 1;
          that.data.questionsList[index].flag = 1;
        } else {
          that.data.questionsList[index].items[i].selected = 0;
          that.data.questionsList[index].flag = 0;
        }
      }
    }

    // for (var i = 0; i < that.data.questionsList[index].items.length; i++) {
    //   if (that.data.questionsList[index].items[i].selected == 1) {
    //     that.data.questionsList[index].flag=1
    //   }else{
    //     that.data.questionsList[index].flag= 0
    //   }
    // }


    console.log(that.data.questionsList);
    that.setData({
      questionsList: that.data.questionsList,
    })

  },

  jumpIndex(e) {
    wx.switchTab({
      url: '/pages/index/index',
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
    var member_id = wx.getStorageSync('member_id');
    console.log(member_id);
    if (!member_id) {
      member_id = '';
    }
    var user_id = wx.getStorageSync('wx_id');
    if (res.from === 'button') {
      // 来自页面内转发按钮
    }
    return {
      title: "邀请好友直升窖主",
      path: 'pages/distribution/userSurvey/userSurvey?from_member_id=' + member_id + '&register_channel=wxapp_share' + '&from_user_id=' + user_id,
      success: function (res) {
        // 转发成功
        // console.log('转发成功' + this.data.shop_id)
      },
      fail: function (res) {
        // 转发失败
      }
    }
  }
})