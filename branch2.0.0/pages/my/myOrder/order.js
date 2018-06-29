// pages/my/myOrder/order.js
const req = require('../../../service/service.js');
const login = require('../../../utils/login');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dataloaded: 0,
    currentTab: 888888,
    winWidth: '',
    winHeight: '',
    dataList: [],
    allList: [],//全部
    noPayList: [],//待付款
    noDispatchList: [],//待发货
    noReciverList: [],//待收货
    finishList: [],//已完成
    itemList: ['我不想买了', '地址填写错误', '卖家缺货', '其他原因'],
    hasData:0,
    // url: 'api/order/getOrders',
    // status: {
    //   order_status: '',
    // },
    isShow: 0,//0表示没有
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    login.processRegShopId(options.reg_shop_id);
    var that = this;
    var order_status = options.order_status;
    if (order_status == 0) {
      that.setData({
        currentTab: 0
      });
    } else if (order_status == -1) {
      that.setData({
        currentTab: 1
      });
    }
    else if (order_status == 2) {
      that.setData({
        currentTab: 2
      });
    }
    else if (order_status == 8) {
      that.setData({
        currentTab: 3
      });
    }
    else {
      that.setData({
        currentTab: 4
      });
    }

    var reqData = {};
    reqData.order_status = 0;
    var url = "api/order/getOrders";

    req.reqData(url, reqData,
      function (res) {
        if (res.data.returnCode == 0) {
          var data = res.data.data;
          that.data.allList = data;
          for (var i = 0; i < data.length; i++) {

            if (data[i].status == "-1") {//待付款
              that.data.noPayList.push(data[i]);
            } else if (data[i].status == "2") {//s待发货

              that.data.noDispatchList.push(data[i]);
            } else if (data[i].status == "8") {//待收货
              that.data.noReciverList.push(data[i]);
            } else if (data[i].status == "11") {//已完成
              that.data.finishList.push(data[i]);
            }
          }
          if (that.data.currentTab == 0) {//全部
            that.setData({
              dataList: that.data.allList,
              hasData:1
            })
          } else if (that.data.currentTab == 1) {//待付款
            that.setData({
              dataList: that.data.noPayList,
              hasData:1
            })
          } else if (that.data.currentTab == 2) {//s待发货
            that.setData({
              dataList: that.data.noDispatchList,
              hasData:1
            })
          } else if (that.data.currentTab == 3) {//待收货
            that.setData({
              dataList: that.data.noReciverList,
              hasData:1
            })
          } else {//已完成
            that.setData({
              dataList: that.data.finishList,
              hasData:1
            })
          }

        } else {
          wx.showToast({
            title: res.data.message
          })
        }
        that.setData({
          dataloaded:1
        })
        // 判断空状态
        if (that.data.dataList.length == 0) {
          that.setData({
            isShow: 1
          })
        } else {
          that.setData({
            isShow: 0
          })
        }

      }, function (res) {

      },1);
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          winWidth: res.windowWidth,
          winHeight: res.windowHeight
        });
      }
    });
  },
  // 滑动切换tab 
  bindChange: function (e) {
    var that = this;
    that.setData({
      currentTab: e.detail.current
    });
    if (that.data.currentTab == 0) {
      that.setData({
        dataList: that.data.allList,
      })
    } else if (that.data.currentTab == 1) {
      that.setData({
        dataList: that.data.noPayList,
      })
    } else if (that.data.currentTab == 2) {
      that.setData({
        dataList: that.data.noDispatchList,
      })
    } else if (that.data.currentTab == 3) {
      that.setData({
        dataList: that.data.noReciverList,
      })
    } else {
      that.setData({
        dataList: that.data.finishList,
      })
    }
    if (that.data.dataList.length == 0) {
      that.setData({
        isShow: 1
      })
    } else {
      that.setData({
        isShow: 0
      })
    }
  },
  // 点击tab切换 
  swichNav: function (e) {
    // console.log(e)
    var that = this;
    var app = getApp();
    if (this.data.currentTab === e.currentTarget.dataset.current) {
      return false;
    } else {

      that.setData({
        currentTab: e.currentTarget.dataset.current
      })

      if (that.data.currentTab == 0) {
        that.setData({
          dataList: that.data.allList,
        })
        app.aldstat.sendEvent('全部订单页-全部', {});
      } else if (that.data.currentTab == 1) {
        that.setData({
          dataList: that.data.noPayList,
        })
        app.aldstat.sendEvent('全部订单页-待付款', {});
      } else if (that.data.currentTab == 2) {
        that.setData({
          dataList: that.data.noDispatchList,
        })
        app.aldstat.sendEvent('全部订单页-待发货', {});
      } else if (that.data.currentTab == 3) {
        that.setData({
          dataList: that.data.noReciverList,
        })
        app.aldstat.sendEvent('全部订单页-待收货', {});
      } else {
        that.setData({
          dataList: that.data.finishList,
        })
        app.aldstat.sendEvent('全部订单页-已完成', {});
      }
      if (that.data.dataList.length == 0) {
        that.setData({
          isShow: 1
        })
      } else {
        that.setData({
          isShow: 0
        })
      }
    }
  },


  //  订单详情
  onDetailClick: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/order/orderDetial/detial?id=' + id,
    })
  },

  // 全部页面立即付款
  PayAtOnce(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var noPayList = this.data.noPayList;
    var that = this;
    login.login(true, function () {
      var data = {
        order_id: id
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
              wx.navigateTo({
                url: '../../live/orderStatus/orderStatus?order_no=' + res.data.data.order_no,
              })

              that.data.allList[index].status = 2;
              that.data.noDispatchList.unshift(that.data.allList[index]);
              that.setData({
                 dataList:that.data.allList
              })
              for (var i = 0; i < noPayList.length; i++) {
                if (noPayList[i].id == id) {
                  noPayList.splice(i,1);
                }
              }
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

  // 待付款页面立即付款
  payNow(e) {
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var allList = this.data.allList;
    var that = this;
    var noDispatchList = that.data.noDispatchList;
    login.login(true, function () {
      var data = {
        order_id: id
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
              // 支付成功跳转支付成功页面
              wx.navigateTo({
                url: '../../live/orderStatus/orderStatus?order_no=' + res.data.data.order_no,
              })
              // 本地更新数据
              var noDispatch = that.data.noPayList.splice(index,1)[0];
              noDispatch.status = 2;
              that.setData({
                dataList:that.data.noPayList
             })
              noDispatchList.unshift(noDispatch);

              if (that.data.dataList.length == 0) {
                that.setData({
                  isShow: 1
                })
              } else {
                that.setData({
                  isShow: 0
                })
              }
              // 更新全部列表内动态
              for (var i = 0; i < allList.length; i++) {
                if (allList[i].id == id) {
                  allList[i].status = 2;
                }
              }  
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

  // 全部页删除订单
  deleteOrder(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var url = 'api/order/deleteOrder';
    var data = {
      id: id
    }
    var finishList = that.data.finishList;
    wx.showModal({
      content: '是否确认删除订单',
      success: function (res) {
        if (res.confirm) {
          req.reqData(url, data, function (res) {
            if (res.data.returnCode == 0) {
              wx.showToast({
                title:'订单删除成功'
              })
              that.data.allList.splice(index, 1);
              that.setData({
                dataList: that.data.allList,
              })
              for (var i = 0; i < finishList.length; i++) {
                if (finishList[i].id == id) {
                  finishList.splice(i, 1);
                }
              }
              if (that.data.dataList.length == 0) {
                that.setData({
                  isShow: 1
                })
              } else {
                that.setData({
                  isShow: 0
                })
              }
            }
          }, function () {

          })
        }
      }
    })
  },

  // 已完成页面删除

  deleteOrderFinish(e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var index = e.currentTarget.dataset.index;
    var url = 'api/order/deleteOrder';
    var allList = that.data.allList;
    var data = {
      id: id
    }
    wx.showModal({
      content: '是否确认删除订单',
      success: function (res) {
        if(res.confirm){
          req.reqData(url, data, function (res) {
            if (res.data.returnCode == 0) {
              wx.showToast({
                title:'订单删除成功'
              })
              that.data.finishList.splice(index, 1);
              for (var i = 0; i < allList.length; i++) {
                if (allList[i].id == id) {
                  allList.splice(i, 1);
                }
              }
              that.setData({
                dataList: that.data.finishList,
              })
              if (that.data.dataList.length == 0) {
                that.setData({
                  isShow: 1
                })
              } else {
                that.setData({
                  isShow: 0
                })
              }
            }
          }, function () {
  
          })
        }
        
      }
    })
  },
  // 取消订单
  BtnCancel: function (e) {
    var that = this;
    console.log(that.data.allList);
    var listIndex = e.currentTarget.dataset.index;
    console.log(listIndex);
    var id = e.currentTarget.dataset.id;
    
    wx.showActionSheet({
      itemColor: "#666666",
      itemList: that.data.itemList,
      success: function (res) {
        if(res.cancel){
          return;
        }
        
        console.log(res);
        var index = res.tapIndex;
        var cancel_reason = that.data.itemList[index];
        var data = {
          id: id,
          cancel_reason: cancel_reason
        }
        var noPayList = that.data.noPayList;
        var url = 'api/order/cancelOrder';
        req.reqData(url, data, function (info) {
          wx.showToast({
            title:'订单取消成功'
          })
          var app = getApp();
          app.aldstat.sendEvent('取消订单-取消', {
            'id': id + '',
            'cancel_reason': cancel_reason
          });
          that.data.allList[listIndex].status = 0;
          that.setData({
            dataList: that.data.allList,
          })
          console.log(noPayList);
          for (var i = 0; i < noPayList.length; i++) {
            if (noPayList[i].id == id) {
              console.log(id);
              noPayList.splice(i, 1);
            }
          }
        }, function () {

        })

      },
      fail: function (res) {
        // console.log(res.errMsg)
      }
    })
  },

  // 待付款状态取消订单
  noPayCancel(e) {
    var that = this;
    var listIndex = e.currentTarget.dataset.index;
    var id = e.currentTarget.dataset.id;
    var allList = that.data.allList;
    wx.showActionSheet({
      itemColor: "#666666",
      itemList: that.data.itemList,
      success: function (res) {
        if(res.cancel){
          return;
        }
       
        var index = res.tapIndex;
        var cancel_reason = that.data.itemList[index];
        var data = {
          id: id,
          cancel_reason: cancel_reason
        }
        var url = 'api/order/cancelOrder'
        req.reqData(url, data, function (info) {
          wx.showToast({
            title:'订单取消成功'
          })
          that.data.noPayList.splice(listIndex, 1);
          that.setData({
            dataList: that.data.noPayList,
          })
          for (var i = 0; i < allList.length; i++) {
            if (allList[i].id == id) {
              that.data.allList[i].status = 0;
            }
          }
          if (that.data.dataList.length == 0) {
            that.setData({
              isShow: 1
            })
          } else {
            that.setData({
              isShow: 0
            })
          }
        }, function () {

        })
      }
    })

  },

  // 待收货页面确认收货
  confirmReceipt: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var listIndex = e.currentTarget.dataset.index;
    var allList = that.data.allList;
    console.log(e);
    var url = 'api/order/finishedOrderForApp';
    var data = {
      id: id
    };
    wx.showModal({
      content: '是否确认收货',
      cancelText: '取消',
      confirmText: '确定',
      confirmColor: '#e72f4b',
      success: function (res) {
        if (res.confirm) {
          req.reqData(url, data, function (res) {
            if (res.data.returnCode == 0) {
              wx.showToast({
                title:'确认收货成功'
              })
              var finishOrder = that.data.noReciverList.splice(listIndex, 1);
              finishOrder[0].status = 11;
              // console.log(finishOrder);
              that.data.finishList.unshift(finishOrder[0]);
              that.setData({
                dataList: that.data.noReciverList,
              })
              for (var i = 0; i < allList.length; i++) {
                if (allList[i].id == id) {
                  allList[i].status = 11;
                }
              }
              if (that.data.dataList.length == 0) {
                that.setData({
                  isShow: 1
                })
              } else {
                that.setData({
                  isShow: 0
                })
              }
            }
          }, function () {

          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },

  // 全部页面确认收货
  AllconfirmReceipt: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    var listIndex = e.currentTarget.dataset.index;
    var noReciverList = that.data.noReciverList;
    console.log(e);
    var url = 'api/order/finishedOrderForApp';
    var data = {
      id: id
    };
    wx.showModal({
      content: '是否确认收货',
      cancelText: '取消',
      confirmText: '确定',
      confirmColor: '#e72f4b',
      success: function (res) {
        if (res.confirm) {
          req.reqData(url, data, function (res) {
            if (res.data.returnCode == 0) {
              wx.showToast({
                title:'确认收货成功'
              })
              that.data.finishList.unshift(that.data.allList[listIndex]);
              that.data.allList[listIndex].status= 11 ;

              that.setData({
                dataList: that.data.allList,
              })
              for (var i = 0; i < noReciverList.length; i++) {
                if (noReciverList[i].id == id) {
                  console.log(id);
                  noReciverList.splice(i, 1);
                }
              }
              if (that.data.dataList.length == 0) {
                that.setData({
                  isShow: 1
                })
              } else {
                that.setData({
                  isShow: 0
                })
              }
            }
          }, function () {

          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  // 查看物流
  toLogistic(e) {
    var id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../../my/myLogistics/myLogistics?id=' + id,
    })
    var app = getApp();
    app.aldstat.sendEvent('全部订单页-查看物流', {
      'id': id + '',
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
    var that = this;
    if(getApp().globalData.flag){
    var reqData = {};
    reqData.order_status = 0;
    var url = "api/order/getOrders";
    
    req.reqData(url, reqData,
      function (res) {
        if (res.data.returnCode == 0) {
          
          var data = res.data.data;
          that.data.allList = [];
          that.data.noPayList = [];
          that.data.noDispatchList = [];
          that.data.noReciverList = [];
          that.data.finishList = [];
          that.data.allList = data;
          
    
          for (var i = 0; i < data.length; i++) {

            if (data[i].status == "-1") {//待付款
              that.data.noPayList.push(data[i]);
            } else if (data[i].status == "2") {//s待发货

              that.data.noDispatchList.push(data[i]);
            } else if (data[i].status == "8") {//待收货
              that.data.noReciverList.push(data[i]);
            } else if (data[i].status == "11") {//已完成
              that.data.finishList.push(data[i]);
            }
          }
          if (that.data.currentTab == 0) {//全部
            that.setData({
              dataList: that.data.allList,
            })
          } else if (that.data.currentTab == 1) {//待付款
            that.setData({
              dataList: that.data.noPayList,
            })
          } else if (that.data.currentTab == 2) {//s待发货
            that.setData({
              dataList: that.data.noDispatchList,
            })
          } else if (that.data.currentTab == 3) {//待收货
            that.setData({
              dataList: that.data.noReciverList,
            })
          } else {//已完成
            that.setData({
              dataList: that.data.finishList,
            })
          }
        
        } else {
         
          wx.showToast({
            title: res.data.message
          })
        }
        // 判断空状态
        if (that.data.dataList.length == 0) {
          that.setData({
            isShow: 1
          })
        } else {
          that.setData({
            isShow: 0
          })
        }

      }, function (res) {

      },1);
    }
    getApp().globalData.flag = false;
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
    // var that = this;
    // var reqData = {};
    // reqData.order_status = 0;
    // var url = "api/order/getOrders";
    
    // req.reqData(url, reqData,
    //   function (res) {
    //     if (res.data.returnCode == 0) {
          
    //       var data = res.data.data;
    //       that.data.allList = [];
    //       that.data.noPayList = [];
    //       that.data.noDispatchList = [];
    //       that.data.noReciverList = [];
    //       that.data.finishList = [];
    //       that.data.allList = data;
          
    
    //       for (var i = 0; i < data.length; i++) {

    //         if (data[i].status == "-1") {//待付款
    //           that.data.noPayList.push(data[i]);
    //         } else if (data[i].status == "2") {//s待发货

    //           that.data.noDispatchList.push(data[i]);
    //         } else if (data[i].status == "8") {//待收货
    //           that.data.noReciverList.push(data[i]);
    //         } else if (data[i].status == "11") {//已完成
    //           that.data.finishList.push(data[i]);
    //         }
    //       }
    //       if (that.data.currentTab == 0) {//全部
    //         that.setData({
    //           dataList: that.data.allList,
    //         })
    //       } else if (that.data.currentTab == 1) {//待付款
    //         that.setData({
    //           dataList: that.data.noPayList,
    //         })
    //       } else if (that.data.currentTab == 2) {//s待发货
    //         that.setData({
    //           dataList: that.data.noDispatchList,
    //         })
    //       } else if (that.data.currentTab == 3) {//待收货
    //         that.setData({
    //           dataList: that.data.noReciverList,
    //         })
    //       } else {//已完成
    //         that.setData({
    //           dataList: that.data.finishList,
    //         })
    //       }
        
    //     } else {
         
    //       wx.showToast({
    //         title: res.data.message
    //       })
    //     }
    //     // 判断空状态
    //     if (that.data.dataList.length == 0) {
    //       that.setData({
    //         isShow: 1
    //       })
    //     } else {
    //       that.setData({
    //         isShow: 0
    //       })
    //     }

    //   }, function (res) {

    //   });
    setTimeout(function(){
      wx.stopPullDownRefresh();
    },1000)
      
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