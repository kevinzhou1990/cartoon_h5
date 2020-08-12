<template>
  <div class="main">
    <div class="main-content"></div>
    <div class="main-catalogue">
      <div class="left">
        <img class="left-dn" src="../images/download.png" alt="">
        <span class="left-text">缓存</span>
      </div>
      <div class="center">
        阅读 第一话
      </div>
      <div class="left">
        <img class="left-dn" src="../images/catalog-icon.png" alt="">
        <span class="left-text">目录</span>
      </div>
    </div>
    <div style="background: #FFFFFF;">
      <z-m-detail-chapter></z-m-detail-chapter>
      <z-m-detail-remark></z-m-detail-remark>
    </div>
  </div>
</template>

<script>
import ZMDetailChapter from '@/views/detail/components/ZMDetailChapter'
import ZMDetailRemark from '@/views/detail/components/ZMDetailRemark'
export default {
  name: 'ZMScroll',
  components: {
    ZMDetailChapter,
    ZMDetailRemark
  }
}
</script>

<style scoped lang="scss">
.main {
  /*position: absolute;*/
  font-weight: bold;
  margin: 0 auto;
  color: #222222;
  height: 1000px;
  z-index: 6;
  width: 100%;
  &-content {
    height: 256px;
    background: #FFFFFF;
    opacity: 0;
  }
  &-catalogue {
    display: flex;
    justify-content: center;
    background: #FFFFFF;
    margin: 0 16px;
    width: 343px;
    height: 56px;
    border-radius: 4px;
    box-shadow: 0 4px 12px 0;
    .left {
      display: flex;
      padding: 16px 22px;
      &-dn {
        width: 24px;
        height: 24px;
      }
      &-text {
        padding-left: 8px;
        white-space: nowrap;
        line-height: 24px;
      }
    }
    .center {
      position: relative;
      margin: 10px 22px;
      width: 135px;
      height: 36px;
      background: #12E079;
      border-radius: 4px;
      text-align: center;
      line-height: 36px;
      font-size: 14px;
      color: #FFFFFF;
    }
  }

}
</style>
