/**
 * 对ajax网络请求再次封装
 */
define(['jquery', 'errorCode', 'errorCodeRev'], function($, errorCode, errorCodeRev) {
  // get请求
  return function interaction(method, url, data) {
    var token = localStorage.token;
    return new Promise(function(resolve, reject) {
      if (['GET','POST','PUT','DELETE'].indexOf(method) === -1) {
        alert('请求类型错误');
        reject({msg: '请求类型错误'});
      } else if (data &&　!data instanceof Object) {
        alert('参数类型错误');
        reject({msg: '参数类型错误'});
      } else {
        $.ajax({
          type: method,
          url: url,
          data: data,
          beforeSend: function(xhr) {
            if (token) xhr.setRequestHeader('token', token);
          },
          success: function(response) {
            if (response.code === errorCode.SUCCESS) {
              if (response.token) localStorage.token = response.token;
              resolve(response.data);
            } else {
              reject(response.code);
              alert(errorCodeRev[response.code].desc);
            }
          },
          error: function(err) {
            reject(err);
            alert('服务器错误');
          }
        });
      }
    })
  }
});
