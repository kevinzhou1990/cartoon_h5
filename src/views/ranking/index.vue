<template>
  <div class="ranking">
    <ZMHeader titleText="排行榜" />
    <div class="ranking-wrap">
      <ul class="ranking-type">
        <li
          :class="rank.rank_id === activedRank ? 'actived':''"
          :key="rank.rank_id"
          v-for="rank in rankingList"
          @click="switchRank(rank)"
        >{{rank.name}}</li>
      </ul>
      <div class="ranking-comics-list">
        <ul>
          <li v-for="(comics) in comicsList" :key="comics.cartoon_id">
            <div
              class="comics-cover"
              :class="comics.rank > 2 ? 'comics-cover-normal':''"
              :style="`background-image:url(${comics.cover})`"
            />
            <div class="comics-info">
              <div class="ranking-info">
                <span
                  :class="comics.rank < 4 ? 'ranking-serial-top' : 'ranking-serial-bottom'"
                >{{comics.rank > 10 ? comics.rank : `0${comics.rank}`}}</span>
                <span
                  class="ranking-occupy"
                  v-if="comics.days >= 7"
                >连续霸榜{{Math.floor(comics.days/7)}}周</span>
                <span class="comics-info-other" v-else>
                  <SvgIcon
                    :iconClass="comics.status > 0 ? 'rankingup_ba' : 'rankingup_bb'"
                    size="small"
                  />
                  {{comics.status > 0 ? `上升${Math.abs(comics.status)}位` : `下降${Math.abs(comics.status)}位`}}
                </span>
              </div>
              <p class="comics-info-title">{{comics.title}}</p>
              <p
                class="comics-info-other"
              >{{comics.author}}&nbsp;&nbsp;更新至{{comics.last_chapters_id}}话</p>
              <!-- <p class="comics-info-other">{{comics.}}</p> -->
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
import ZMHeader from '@/common/components/ZMHeader';
export default {
  name: 'Ranking',
  components: { ZMHeader, SvgIcon },
  data() {
    return {
      activedRank: 1,
      comicsList: [
        {
          last_chapters_id: 11,
          cartoon_id: 1,
          title: '黑色放映机全新复刻经典版',
          cover:
            'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
          author_id: 2,
          author: '福尔马林',
          rank: 1,
          days: '30',
          status: 0
        },
        {
          last_chapters_id: 11,
          cartoon_id: 2,
          title: '黑色放映机全新复刻经典版',
          cover:
            'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
          author_id: 2,
          author: '福尔马林',
          rank: 2,
          days: '30',
          status: 0
        },
        {
          last_chapters_id: 11,
          cartoon_id: 3,
          title: '黑色放映机全新复刻经典版',
          cover:
            'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
          author_id: 2,
          author: '福尔马林',
          rank: 3,
          days: 0,
          status: -1
        },
        {
          last_chapters_id: 11,
          cartoon_id: 4,
          title: '黑色放映机全新复刻经典版',
          cover:
            'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
          author_id: 2,
          author: '福尔马林',
          rank: 4,
          days: 0,
          status: -2
        },
        {
          last_chapters_id: 11,
          cartoon_id: 5,
          title: '黑色放映机全新复刻经典版',
          cover:
            'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
          author_id: 2,
          author: '福尔马林',
          rank: 5,
          days: 0,
          status: 1
        },
        {
          last_chapters_id: 11,
          cartoon_id: 6,
          title: '黑色放映机全新复刻经典版',
          cover:
            'https://img.iplaysoft.com/wp-content/uploads/2019/free-images/free_stock_photo.jpg',
          author_id: 2,
          author: '福尔马林',
          rank: 6,
          days: 0,
          status: 2
        }
      ],
      rankingList: [
        {
          rank_id: 1,
          sort: 1,
          name: '畅销榜'
        },
        {
          rank_id: 2,
          sort: 2,
          name: '悬疑榜'
        },
        {
          rank_id: 3,
          sort: 3,
          name: '热血榜'
        },
        {
          rank_id: 4,
          sort: 4,
          name: '校园榜'
        },
        {
          rank_id: 5,
          sort: 5,
          name: '玄幻榜'
        },
        {
          rank_id: 6,
          sort: 6,
          name: '中二榜',
          publish_name: ''
        }
      ]
    };
  },
  methods: {
    switchRank(rank) {
      this.activedRank = rank.rank_id;
    }
  }
};
</script>

<style lang="scss" scoped>
$FONTCOLOR: #bbb;
$MAINCOLOR: #12e079;
$GRAYFONTCOLOR: #999;
.ranking {
  padding-top: 44px;
  font-family: 'pingfang-blod';
  height: calc(100% - 44px);
  .ranking-wrap {
    display: flex;
    height: 100%;
    .ranking-type {
      width: 86px;
      li {
        box-sizing: border-box;
        height: 56px;
        color: $FONTCOLOR;
        font-family: 'pingfang-blod';
        font-size: 12px;
        padding: 30px 28px 12px 22px;
        &.actived {
          color: #fff;
          background-image: url('./img/rankbgCa@3x.png');
          background-repeat: no-repeat;
          background-position: 0 0;
          background-size: 100%;
        }
      }
    }
    .ranking-comics-list {
      flex: 1;
      padding-left: 30px;

      overflow: auto;
      li:first-child {
        margin-top: 17px;
      }
      li {
        margin-top: 16px;
        display: flex;
      }
    }
    .comics-cover {
      width: 109px;
      height: 145px;
      border-radius: 4px;
      background-position: center;
      background-size: cover;
      background-repeat: no-repeat;
      margin-right: 16px;
      &-normal {
        width: 90px;
        height: 120px;
        margin-left: 19px;
      }
    }
    .comics-info {
      flex: 1;
      padding: 8px 16px 0 0;
      display: flex;
      flex-direction: column;
      .ranking-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        span {
          display: inline-block;
          font-size: 12px;
          font-weight: bolder;
          text-align: center;
        }
      }
      .ranking-serial-top {
        height: 28px;
        width: 24px;
        background: url('./img/topAa@3x.png') 0 0 no-repeat transparent;
        background-size: contain;
        color: #fff;
        line-height: 2.6;
      }
      .ranking-serial-bottom {
        height: 24px;
        width: 24px;
        background: url('./img/topAb@3x.png') 0 0 no-repeat transparent;
        background-size: contain;
        line-height: 24px;
        color: $GRAYFONTCOLOR;
      }
      .ranking-occupy {
        border: 1px solid $MAINCOLOR;
        color: $MAINCOLOR;
        padding: 3px 8px;
        border-radius: 15px;
        font-size: 10px;
        transform: scale(0.82);
        transform-origin: right;
      }
      .comics-info-title {
        font-size: 14px;
        flex: 1;
        margin-top: 16px;
        color: #222;
      }
      .comics-info-other {
        color: $FONTCOLOR;
      }
    }
  }
}
</style>
