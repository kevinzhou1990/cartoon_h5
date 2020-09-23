<template>
  <div class="container">
    <div class="main-container" v-for="(history, index) in historyList" :key="index">
      <div class="date scale">{{ history.date }}</div>

      <div class="content zm-b-b" v-for="item in history.items" :key="item.id" @click="handleClickInfo(item.id)">
        <div class="cover" :style="{background: item.cover ? 'url('+item.cover+')' : '','background-size': '100%'}"></div>

        <div class="info">
          <div class="title ellipsis">{{ item.title }}</div>

          <div class="other scale">
            <div class="author ellipsis">{{ item.author }}</div>
            <div class="status ellipsis">{{ item.status }}</div>
          </div>

          <div class="tag scale">
            <span class="tag-item" v-for="itemTag in item.tag" :key="itemTag.id">{{ itemTag.name }}</span>
          </div>

          <div class="last-status">
            <div class="publish scale ellipsis">{{ item.publish }}</div>
            <div class="last-read scale ellipsis">{{ item.last_update }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'history',
  data() {
    return {
      historyList: [
        {
          date: '今天',
          items: [
            {
              id: 1,
              cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
              title: '测试',
              author: '测试作者',
              status: '更新至2910话',
              tag: [
                {
                  id: 1,
                  name: '悬疑'
                },
                {
                  id: 2,
                  name: '暗黑系'
                },
                {
                  id: 3,
                  name: '暗黑系'
                },
                {
                  id: 4,
                  name: '暗黑系'
                }
              ],
              publish: '小刀刀工作室',
              last_update: '上次读到213话'
            },
            {
              id: 2,
              cover: '',
              title: '测试超长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
              author: '测试作者长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
              status: '更新至2910话长长长长长长长长长长长长长长长长长长长长长长长长长长',
              tag: [
                {
                  id: 1,
                  name: '悬疑'
                },
                {
                  id: 2,
                  name: '暗黑系'
                },
                {
                  id: 3,
                  name: '暗黑系'
                },
                {
                  id: 4,
                  name: '暗黑系'
                }
              ],
              publish: '小刀刀工作室长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
              last_update: '上次读到213话长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长'
            }
          ]
        },
        {
          date: '昨天',
          items: [
            {
              id: 1,
              cover: 'http://bookwine.leimans.com/1600338798174-360_480.png',
              title: '测试',
              author: '测试作者',
              status: '更新至2910话',
              tag: [
                {
                  id: 1,
                  name: '悬疑'
                },
                {
                  id: 2,
                  name: '暗黑系'
                },
                {
                  id: 3,
                  name: '暗黑系'
                },
                {
                  id: 4,
                  name: '暗黑系'
                }
              ],
              publish: '小刀刀工作室',
              last_update: ''
            },
            {
              id: 2,
              cover: 'http://bookwine.leimans.com/1599200425300-%E6%9F%AF%E5%8D%97%E5%B0%81%E9%9D%A2.png',
              title: '测试超长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
              author: '测试作者长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长',
              status: '',
              tag: [
                {
                  id: 1,
                  name: '悬疑'
                },
                {
                  id: 2,
                  name: '暗黑系'
                },
                {
                  id: 3,
                  name: '暗黑系'
                },
                {
                  id: 4,
                  name: '暗黑系'
                }
              ],
              publish: '',
              last_update: '上次读到213话长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长'
            },
            {
              id: 3,
              cover: 'http://bookwine.leimans.com/1600338798174-360_480.png',
              title: '测试',
              author: '测试作者',
              status: '更新至2910话',
              tag: [
                {
                  id: 1,
                  name: '悬疑'
                },
                {
                  id: 2,
                  name: '暗黑系'
                },
                {
                  id: 3,
                  name: '暗黑系'
                },
                {
                  id: 4,
                  name: '暗黑系'
                }
              ],
              publish: '',
              last_update: ''
            }
          ]
        }
      ]
    };
  },
  methods: {
    handleClickInfo(val) {
      this.$router.push({
        path: '/detail',
        query: {
          cartoon_id: val
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
  $COVERWIDTH: 72px;
  $COVERHEIGHT: 96px;
  $PADDINGLEFT: 16px;
  .scale{
    -webkit-transform: scale(0.83);
    transform: scale(0.83);
    transform-origin: 0;
  }

  .ellipsis {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    word-break: break-all;
  }

  .container {
    padding-top: 16px;
    font-family: PingFangSC-Semibold;

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
            .author {
              display: inline-block;
              max-width: 50%;
              padding-right: 10px;
            }
            .status {
              display: inline-block;
              max-width: calc(50% - 14px);
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
  }
</style>
