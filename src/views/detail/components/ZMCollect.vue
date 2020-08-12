<template>
  <div class="collect-main">
    <div class="collect-content">
      <div>
        <div style="width: 123px; display: flex;">
          <span style="font-size: 20px; color: #FFFFFF; padding: 4px 8px;">7.5</span>
          <div
              style=" padding: 4px 0; font-size: 10px; transform: scale(0.83); -webkit-transform-origin-x: 0; letter-spacing: 0; white-space: nowrap;">
            <div style="color: rgba(255,255,255,0.60);">285642人评分</div>
            <div style="display: flex;">
              <img v-for="index in 5" :key="index" style="display: block; width: 10px; height: 10px;" src="../images/save_start_collect.png" alt=""/>
              <!--              <span style=" display: inline-block; background: url('../images/save_start_collect.png') no-repeat center;  background-size: 100%;"></span>-->
            </div>
          </div>
        </div>
        <div style="display: flex; padding: 0 8px; line-height: 16px;">
          <img src="../images/save_collect.png" alt="" style="width: 16px; height: 16px;"/>
          <span style="padding-left: 4px; color: rgba(255,255,255,0.60); font-size: 10px; transform: scale(0.83); -webkit-transform-origin-x: 0;">285642人收藏</span>
        </div>
      </div>
      <span class="zm-b-l" style="height: 24px; margin: 16px 0; color: #FFFFFF; opacity: 0.1;"></span>
      <div style="display: flex; flex-direction: column; padding: 4px 12px;">
        <img :src="collected" alt="" width="24px" height="24px">
        <!--        <span style="background: url('../images/save_collect.png') no-repeat; height: 24px; width: 24px; z-index: 9;"></span>-->
        <span style="padding: 4px 0;">收藏</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ZMCollect',
  data() {
    return {
      collected: require('@/assets/img/save_bb.png'),
      collect: require('@/assets/img/save_ba.png')
    }
  }
}
</script>

<style scoped lang="scss">
  .collect-main {
    position: relative;
    width: 175px;
    height: 56px;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 4px;
    margin: 16px 0;

    .collect-content {
      display: flex;
      z-index: 2;
    }
  }
</style>
