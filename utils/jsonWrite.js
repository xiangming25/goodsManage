var errorCode = require('../config/errorCode');

// 向前台返回JSON方法的简单封装
var jsonWrite = function(res, ret) {
  if (typeof ret === 'undefined') {
    res.json({
      code: errorCode.NO_RESULT,
      msg: '暂无数据'
    });
  } else {
    res.json(ret);
  }
}

module.exports = jsonWrite;
