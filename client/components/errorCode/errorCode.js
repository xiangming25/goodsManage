define([], function() {
  return {
    'SUCCESS': 1000,          // 成功
    'VERIFY_ERROR': 1001,     //　用户名或密码错误
    'SERVIER_ERROR': 1002,    // 服务器错误
    'QUERY_ERROR': 1003,      //　查询错误
    'NO_RESULT': 1004,        // 没有结果
    'NO_TOKEN': 2001,         // 没有token
    'TOKEN_ERROR': 2002,      // token信息错误
    'TOKEN_EXPIRED': 2003,    // token过期
  }
});
