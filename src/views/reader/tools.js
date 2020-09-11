/**
 * 计算漫画章节中的图片索引
 * @param {Number} readPer 阅读记录百分比
 * @param {Number} total 当前章节总图片数
 * @returns {Number} 当前章节图片索引
 */
export const getIndex = function(readPer, total) {
  return Math.ceil((readPer / 100) * total);
};

/**
 * 计算页面总高度和图片高度
 * @param {Array} imgList 章节图片集合
 * @returns {Object} 总高度和每张图片的高度
 */
export const getPageHeight = function(imgList) {
  let pageHeight = 0;
  const p = [];
  imgList.forEach(item => {
    let h = Math.ceil(innerWidth / item.scale);
    pageHeight += h;
    p.push(h);
  });
  return { pageHeight, p };
};
/**
 * 计算滚动距离
 * @param {Number} index 图片索引
 * @param {Array} imgHeightList 图片高度列表
 * @returns {Number} 滚动距离
 */
export const getDistance = function(index, imgHeightList) {
  let scrollDistance = 0;
  const visibleImgs = imgHeightList.slice(0, index);
  visibleImgs.forEach(item => {
    scrollDistance += item;
  });
  return scrollDistance;
};