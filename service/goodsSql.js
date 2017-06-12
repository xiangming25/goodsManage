/**
 * 商品管理表
 * @type {Object}
 */
var goods = {
  insert: 'insert into goods set ?',
  delete: 'delete from goods where id = ?',
  queryByPage: 'select * from goods where userId = ? limit ?, ?',
  queryCount: 'select count(*) from goods where userId = ?',
  update: 'update goods set name=:name, unit=:unit, image=:image, inPrice=:inPrice, outPrice=:outPrice, type=:type, remainder=:remainder, isShow=:isShow where userId = :userId',
  search: 'select * from goods where userId = ? and name like ? limit ?, ?',
};
module.exports = goods;
