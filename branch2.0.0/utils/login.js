var uaChange = require('head.js');
var req = require('../service/service.js');


function getUserInfo(doSuccess,fail) {
  wx.getUserInfo({
    success: function (res) {
      console.log(res);
      // var user_name = res.userInfo.nickName;
      // var user_avatar = res.userInfo.avatarUrl;
      // var encryptedData = res.encryptedData;
      // var iv = res.iv;
      doSuccess(res);
    },
    fail: function (res) {
      fail(res);
      //console.log('获取用户信息失败')
    }
  })
}



// 获取微信个人信息上传服务器

function setUserInfo( wx_id, encryptedData, iv, callback, fail_callback) {

  var url = 'api/wxapp/setUserInfov2';
  var data = {
    id: wx_id,
    iv: iv,
    encryptedData: encryptedData,
  };
  req.reqData(url, data, function (successRes) {
    if (successRes.data.returnCode == 0) {
      wx.setStorageSync('is_auth', successRes.data.data.is_auth);//判断是否微信授权0:no
      wx.setStorageSync('wx_username', successRes.data.data.user_name);
      wx.setStorageSync('wx_avatar', successRes.data.data.headimgurl);
      if (callback) {
        callback();
      }

    }
  }, function (failRes) {
    if (fail_callback) {
      fail_callback();
    }
  })
}




// 二维码分享所带的场景值的参数处理
function getQueryString(name, search) {
  var reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)', 'i');
  var r = search.substr(1).match(reg);
  if (r != null) {
    return decodeURIComponent(r[2]);
  }
  return null;
}


function processRegShopId(reg_shop_id, from_member_id, register_channel, from_user_id, entity_type, entity_id, afterLoginCallBack, data_id) {
  var wx_reg_shop_id = wx.getStorageSync('reg_shop_id');

  wx.setStorageSync('from_member_id', from_member_id);
  wx.setStorageSync('register_channel', register_channel);
  wx.setStorageSync('from_user_id', from_user_id);

  if (!wx_reg_shop_id && reg_shop_id) {
    wx.setStorageSync('reg_shop_id', reg_shop_id);
  }
  data_id = data_id ? data_id : '';
  var my_home_flag = wx.getStorageSync('my_home_flag');
  if (!my_home_flag) {
    wx.removeStorageSync('token');
    wx.removeStorageSync('wx_id');
  }

  this.login(false, null, null, entity_type, entity_id, afterLoginCallBack, data_id);
}

//2、调用获取用户信息接口
function loginUrl(code, callback, fail_callback, entity_type, entity_id, afterLoginCallBack, data_id) {
  var wx_reg_shop_id = wx.getStorageSync('reg_shop_id');
  var from_member_id = wx.getStorageSync('from_member_id');
  var register_channel = wx.getStorageSync('register_channel');
  var from_user_id = wx.getStorageSync('from_user_id');

  wx_reg_shop_id = wx_reg_shop_id ? wx_reg_shop_id : '';
  from_member_id = from_member_id ? from_member_id : '';
  register_channel = register_channel ? register_channel : '';
  from_user_id = from_user_id ? from_user_id : '';

  entity_type = entity_type ? entity_type : 'm_home';
  entity_id = entity_id ? entity_id : '';
  data_id = data_id ? data_id : '';

  var url = 'api/wxapp/login';
  var data = {
    code: code,
    wx_reg_shop_id: wx_reg_shop_id,
    from_member_id: from_member_id,
    register_channel: register_channel,
    from_user_id: from_user_id,
    entity_type: entity_type,
    entity_id: entity_id,
    data_id: data_id,
  };
  req.reqData(url, data, function (successRes) {
    wx.setStorageSync('my_home_flag', successRes.data.data.my_home_flag);
    wx.setStorageSync('my_home_id', successRes.data.data.my_home_id);
    wx.setStorageSync('wx_id', successRes.data.data.id);

    wx.setStorageSync('is_auth', successRes.data.data.is_auth);//判断是否微信授权0:no
    wx.setStorageSync('member_id', successRes.data.data.member_id);
    wx.setStorageSync('token', successRes.data.data.token);
    wx.setStorageSync('wx_username', successRes.data.data.user_name);
    wx.setStorageSync('wx_avatar', successRes.data.data.headimgurl);

    if (afterLoginCallBack) {
      afterLoginCallBack();
    }
    if (callback) {
      callback();
    }
  },
    function (failRes) {
      wx.showToast({
        title: '系统异常,请稍后重试!',
      })
    });

}

function login(focus_login, callback, fail_callback, entity_type, entity_id, afterLoginCallBack, data_id) {
  data_id = data_id ? data_id : '';
  wx.checkSession({
    success: function () {
      var wx_token = wx.getStorageSync('token');
      // debugger
      if (wx_token) {
        if (callback) {
          callback();
        }
        if (afterLoginCallBack) {
          afterLoginCallBack();
        }
        return;
      }

      var wx_id = wx.getStorageSync('wx_id');
      console.log('登录凭证' + wx_id);
      if (!wx_id) {
        wx.login({
          success: function (r) {

            var code = r.code;//登录凭证
            if (code) {
              loginUrl(code, callback, fail_callback, entity_type, entity_id, afterLoginCallBack, data_id);
            } else {
              if (fail_callback) {
                fail_callback();
              }
            }
          },
          fail: function () {
            if (fail_callback) {
              fail_callback();
            }
          }
        });
        return;
      }

    },
    fail: function () {
      //登录态过期
      // 登录
      console.log('fail');
      var ua = uaChange.getUseragent();

      wx.login({
        success: function (r) {
          var code = r.code;//登录凭证
          console.log(code);
          if (code) {

            loginUrl(code, callback, fail_callback, entity_type, entity_id, afterLoginCallBack, data_id);
          } else {
            if (fail_callback) {
              fail_callback();
            }
          }
        },
        fail: function () {
          if (fail_callback) {
            fail_callback();
          }
        }
      })

    }
  })


}
module.exports = {
  login: login,
  processRegShopId: processRegShopId,
  getQueryString: getQueryString,
  setUserInfo: setUserInfo,
}