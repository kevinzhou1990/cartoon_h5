/**
 * 阅读漫画界面api请求
 */
import request from 'lib/request';
// 获取章节列表
export const getContents = cartoon_id => {
  return request.get(`/api/cartoon/chapter/${cartoon_id}`);
};
// 获取章节内容
export const getChapter = chapter_id => {};
