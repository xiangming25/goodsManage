/**
 * 定义错误码
 */
define([], function() {
  return {
    1000: {
      name: 'SUCCESS',
      desc: '成功'
    },
    1001: {
      name: 'VERIFY_ERROR',
      desc: '用户名或密码错误'
    },
    1002: {
      name: 'SERVIER_ERROR',
      desc: '服务器错误'
    },
    1003: {
      name: 'QUERY_ERROR',
      desc: '数据库查询错误'
    },
    1004: {
      name: 'NO_RESULT',
      desc: '没有结果'
    },
    2001: {
      name: 'NO_TOKEN',
      desc: '没有token'
    },
    2002: {
      name: 'TOKEN_ERROR',
      desc: 'token信息错误'
    },
    2003: {
      name: 'TOKEN_EXPIRED',
      desc: 'token过期'
    }
  }
});
