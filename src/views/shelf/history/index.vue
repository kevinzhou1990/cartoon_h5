<template>
  <div class="container">
    <div v-if="historyList.length">
      <div class="main-container" v-for="(history, index) in historyList" :key="index">
        <div class="date scale">{{ history.date }}</div>

        <div class="content zm-b-b" v-for="item in history.items" :key="item.cartoon_id" @click="handleZMInfo(item.cartoon_id, ref)">
          <div class="cover" :style="{background: item.cover ? 'url('+item.cover+')' : '','background-size': '100%'}"></div>

          <div class="info">
            <div class="title ellipsis">{{ item.title }}</div>

            <div class="other scale">
              <div class="author ellipsis" v-if="item.author.length > 0">
                <span v-for="(author, index) in item.author" :key="index" class="author-item">{{ author }}</span>
              </div>
              <div class="author ellipsis" v-else>--</div>

              <div class="status">{{ item.publish_status }}</div>
            </div>

            <div class="tag scale">
              <span class="tag-item" v-for="itemTag in item.tag" :key="itemTag">{{ itemTag }}</span>
            </div>

            <div class="last-status">
              <div class="publish scale ellipsis">{{ item.publish_name }}</div>
              <div class="last-read scale ellipsis">{{ item.last_chapter }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <no-data-view v-else-if="!historyList.length && !isLoading" class="no-data" type="history" textContent="一个脚印都没有～"></no-data-view>
  </div>
</template>

<script>
import noDataView from '@/common/components/noDataView';
import { getHistory } from '@/common/api/shelf';
import myMixins from '@/common/mixin/myMixins'
import shelfMixin from '../mixin'
export default {
  name: 'history',
  mixins: [ myMixins, shelfMixin ],
  components: { noDataView },
  data() {
    return {
      ref: 7,
      historyList: [],
      isLoading: true
    };
  },
  mounted() {
    this.getHistoryList()
  },
  methods: {
    //获取历史列表
    async getHistoryList(){
      this.isLoading = true;
      const data = await getHistory();
      this.isLoading = false;
      this.emitData(data.code);
      if (data.code === 0) {
        this.historyList = data.data.list;
      } else {
        this.noLoginToast(data)
      }
    }
  }
};
</script>

<style lang="scss" scoped>
  $COVERWIDTH: 72px;
  $COVERHEIGHT: 96px;
  $PADDINGLEFT: 16px;
  .scale{
    /*-webkit-transform: scale(0.83);*/
    /*transform: scale(0.83);*/
    /*transform-origin: 0;*/
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }

  .container {
    padding-top: 16px;
    font-family: 'pingfang-blod';

    .main-container {
      padding-left: $PADDINGLEFT;
      margin-bottom: 16px;

      .date {
        color: #BBBBBB;
      }

      .content {
        padding-top: 16px;
        padding-bottom: 15px;
        position: relative;

        .cover {
          height: $COVERHEIGHT;
          width: $COVERWIDTH;
          border-radius: 4px;
          background: url("../../../assets/img/defaultBook.png") no-repeat;
        }

        .info {
          width: calc(100% - #{$COVERWIDTH + $PADDINGLEFT} - 8px);
          color: #BBBBBB;
          padding: 8px 16px 4px 0;
          position: absolute;
          top: 50%;
          left: calc(#{$COVERWIDTH} + 8px);
          transform: translate(0%, -50%);

          .title {
            color: #222222;
            font-size: 14px;
          }

          .other {
            display: -webkit-flex;
            display: flex;
            -webkit-justify-content: flex-start;
            justify-content: flex-start;
            white-space: nowrap;
            overflow: hidden;
            .author {
              padding-right: 16px;
              .author-item:not(:last-child) {
                &:after {
                  content: '/';
                }
              }
            }
          }

          .tag {
            margin-top: 8px;
            .tag-item {
              border: 1px solid #eeeeee;
              border-radius: 4px;
              padding: 3px 6px;
              margin-right: 8px;
              &:last-child {
                margin-right: 0;
              }
            }
          }

          .last-status {
            margin-top: 8px;
            .publish {
              float: left;
              max-width: 50%;
            }
            .last-read {
              max-width: 50%;
              transform-origin: right;
              float: right;
            }
          }
        }
      }
    }

    .no-data{
      touch-action: none;
      height: calc(100vh - 109px);
    }
  }
</style>
