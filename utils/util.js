module.exports = {
  /**
   * 对象的复制
   * @param  {[type]} target [description]
   * @param  {[type]} source [description]
   * @param  {[type]} flag   [description]
   * @return {[type]}        [description]
   */
  extend: function(target, source, flag) {
    for (var key in source) {
      if (source.hasOwnProperty(key)) {
        flag ?
          (target[key] = source[key]) :
          (target[key] === void 0 && (target[key] = source[key]));
      }
    }
    return target;
  }
};
