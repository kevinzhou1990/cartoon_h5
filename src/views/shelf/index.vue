<template>
  <div>
    <Button type="pramary" @click="dialog">弹窗</Button>
    <Button type="pramary" @click="toast">toast</Button>
    <Button type="pramary" @click="openContents">目录</Button>
    <Contents
      @close="closeConents"
      @switch="changeSort"
      :show="show"
      :comicsInfo="comicsInfo"
      :chapterData="chapterData"
    />
  </div>
</template>

<script>
import Contents from '@/common/components/contents';
export default {
  components: {
    Contents
  },
  data() {
    return {
      show: false,
      comicsInfo: {
        status: 2, // 1=连载中,2=已完结,3=休更中
        update_freq: '每周六更新', // 更新频率
        title: '#001', // 章节编号
        sort: 2, // 1=正序,2=倒序
        last_chapter_id: 1 // 当前阅读的章节
      },
      chapterData: [
        { chapter_id: 1, title: '#000', intro: '序章', read_per: 100 },
        {
          chapter_id: 2,
          title: '#001',
          intro:
            '魔神降临上篇：黑盒的原罪之另有乾坤魔神降临上篇：黑盒的原罪之另有乾坤',
          read_per: 100
        },
        { chapter_id: 3, title: '#002', intro: '谁叫你背书了', read_per: 25 },
        {
          chapter_id: 4,
          title: '#003',
          intro: '进入魔道馆（1）',
          read_per: 79
        },
        {
          chapter_id: 5,
          title: '#004',
          intro: '进入魔道馆（2）',
          read_per: 20
        },
        { chapter_id: 6, title: '#005', intro: '没那么容易', read_per: 0 },
        { chapter_id: 7, title: '#006', intro: '拜师', read_per: 0 },
        { chapter_id: 8, title: '#007', intro: '八旗降临', read_per: 0 },
        { chapter_id: 9, title: '#008', intro: '戈壁最后的夜晚', read_per: 0 },
        { chapter_id: 10, title: '#009', intro: '前往覆满山', read_per: 0 },
        { chapter_id: 11, title: '#0010', intro: '月岭一战', read_per: 0 },
        { chapter_id: 12, title: '#0011', intro: '结拜', read_per: 0 }
      ]
    };
  },
  methods: {
    dialog() {
      this.$dialog('取消收藏后，将不再展示在我的书架中', 'alert', {
        confirm: {
          text: '取消收藏',
          callback: () => {
            return false;
          }
        }
      });
    },
    toast() {
      this.$toast('收藏成功，可在书架中查看', {
        type: 'success',
        duration: 1000
      });
    },
    openContents() {
      console.log('打开目录');
      this.show = true;
    },
    closeConents() {
      console.log('关闭目录');
      this.show = false;
    },
    changeSort() {
      this.comicsInfo.sort = this.comicsInfo.sort === 1 ? 2 : 1;
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
