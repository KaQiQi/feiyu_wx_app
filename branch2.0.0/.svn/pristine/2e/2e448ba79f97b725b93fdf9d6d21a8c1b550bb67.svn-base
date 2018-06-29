function formatTime(date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

function formatNumber(n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

function json2Form(json) {
  var str = [];
  for (var p in json) {
    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(json[p]));
  }
  return str.join("&");
}

function isOrNo (n) {
   var res = n > 0?true:false;
   return res;
}


//防止小程序多次点击跳转解决办法
function throttle(fn, gapTime) {
  if (gapTime == null || gapTime == undefined) {
    gapTime = 1500
  }

  let _lastTime = null

  // 返回新的函数
  return function () {
    let _nowTime = + new Date()
    if (_nowTime - _lastTime > gapTime || !_lastTime) {
      fn.apply(this, arguments)   //将this和参数传给原函数
      _lastTime = _nowTime
    }
  }
}

function delUrlParam (url, ref) {

  // 如果不包括此参数
  if (url.indexOf(ref) == -1)
    return url;

  var arr_url = url.split('?');

  var base = arr_url[0];

  var arr_param = arr_url[1].split('&');

  var index = -1;

  for (var i = 0; i < arr_param.length; i++) {

    var paired = arr_param[i].split('=');

    if (paired[0] == ref) {

      index = i;
      break;
    }
  }

  if (index == -1) {
    return url;
  } else {
    arr_param.splice(index, 1);
    if (arr_param && arr_param.length > 0) {
      return base + "?" + arr_param.join('&');
    }
    return base;
  }
}
module.exports = {
  formatTime: formatTime,
  json2Form: json2Form,
  throttle: throttle,
  delUrlParam: delUrlParam,
}
