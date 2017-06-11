/**
 * 商品管理表
 * @type {Object}
 */
var goods = {
  insert: 'insert into goods set ?',
  queryByPage: 'select * from goods where userId = ? limit ?, ?',
};
module.exports = goods;
