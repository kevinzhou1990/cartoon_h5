const utils = {
  /**
   * 获取16位随机字符串
   */
  getRandomStr: function() {
    return 'xxxxxxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      let r = (Math.random() * 16) | 0;
      let v = c === 'x' ? r : (r & 0x3) | 0x8;
      let str = v.toString(16);
      return str;
    });
  }
};
export default utils;
