/**
 * 计算漫画章节中的图片索引
 * @param {Number} readPer 阅读记录百分比
 * @param {Number} total 当前章节总图片数
 * @returns {Number} 当前章节图片索引
 */
export const getIndex = function(readPer, total) {
  const idx = Math.floor((readPer / 100) * total) - 1;
  return idx < 0 ? 0 : idx;
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

/**
 * 更新本地阅读记录
 * @param {Object} context 上下文
 * @param {Object} imglist 当前阅读章节图片对象
 */
export const localReadProcess = function(context, imglist) {
  const localContents = JSON.parse(JSON.stringify(context.$store.state.reader.localContents));
  const chapter = {};
  chapter[imglist.chapter_id] = {
    read_per: Math.round(context.readerProcess),
    detail_id: imglist.detail[context.imgIndex || 0].detail_id
  };
  localContents[context.$route.query.cartoon_id] = {
    ...chapter
  };
  context.$store.dispatch('reader/saveProcess', localContents);
};

/**
 * @description:初始化阅读数据
 * @param {Object} context 执行上下文
 * **/
export const dataInit = function(context) {
  // 阅读器数据初始化
  // 根据图片宽高比，计算每一张图片高度，设置页面高度
  const p = getPageHeight(context.comicsList);
  context.$refs.imgWrap.style.height = p.pageHeight + 'px';
  context.imgHeight = p.p;
  // 计算滚动位置
  let contentsList = context.$store.state.reader.contentsList;
  let localContents = context.$store.state.reader.localContents;
  let reader_per = 0;
  const CAPTERID = parseInt(context.$route.query.capterId);
  const CARTOONID = parseInt(context.$route.query.cartoon_id);
  // 本地阅读记录存在，且有当前章节的数据时，使用本地数据
  if (
    localContents &&
    JSON.stringify(localContents) !== '{}' &&
    CAPTERID &&
    CARTOONID &&
    localContents[CARTOONID][CAPTERID]
  ) {
    reader_per = localContents[CARTOONID][CAPTERID].read_per;
  } else {
    // 如果没有本地数据，获取后台返回的
    for (let i = 0; i < contentsList.length; i++) {
      if (CAPTERID === contentsList[i].chapter_id) {
        reader_per = contentsList[i].read_per;
      }
    }
  }
  // 上一话下一话跳转的，并且当前话图片数量超过1张，从0开始阅读
  if (context.$route.query.flag && context.comicsList.length > 1) {
    reader_per = 0;
    // 更新本地阅读记录
    const cartoon = localContents[CARTOONID];
    cartoon[CAPTERID] = { read_per: 0 };
  }
  if (reader_per) {
    context.Toast('上次读到这', { type: 'tag', duration: 1000 });
  }
  context.$store.commit('reader/UPDATE_READERPROCESS', reader_per);
  // 计算图片索引
  const idx = getIndex(reader_per, context.comicsList.length);
  // 根据图片索引，计算滚动高度
  let scrollDistance = getDistance(idx, p.p);
  document.scrollingElement.scrollTop = scrollDistance;
  context.pageIndex = idx > 3 ? idx : 3;
  // 获取当前阅读漫画章节标题和序号
  for (let i = 0; i < contentsList.length; i++) {
    if (CAPTERID && parseInt(contentsList[i].chapter_id) === CAPTERID) {
      context.titleText = contentsList[i].title + '.' + contentsList[i].intro;
      return false;
    }
  }
};
