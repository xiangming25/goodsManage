/**
 * 用户表操作
 * @type {Object}
 */
var user = {
  insert: 'INSERT INTO user(name, nickName, password, email, headImage, telphone, qq, wechat) values (?, ?, ?, ?, ?, ?, ?, ?)',
  update: 'update user set name=?, nickName=?, password=?, email=?, headImage=?, telphone=?, qq=?, wechat=? where id=?',
  delete: 'delete from user where id=?',
  queryById: 'select * from user where id=?',
  queryAll: 'select * from user',
  queryByName: 'select * from user where name=? and password=?'
};

module.exports = user;
