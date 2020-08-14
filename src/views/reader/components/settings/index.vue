<template>
  <div class="setting-wrap">
    <div class="setting-icon">
      <SvgIcon iconClass="set_ba" size="small" />
    </div>
    <div class="setting-content">
      <div class="setting-content-title">
        设置
        <SvgIcon iconClass="close_aa" size="defalut" />
      </div>
      <ul>
        <li>
          <div>功能栏位置</div>
          <div>
            <span class="active">
              <SvgIcon iconClass="right_ba" class="small" />
              <br />靠右
            </span>
            <span>
              <SvgIcon iconClass="left_bb" class="small" />
              <br />靠左
            </span>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
export default {
  name: 'ReadSetting',
  components: { SvgIcon }
};
</script>

<style lang="scss" scoped>
.setting-wrap {
  .setting-icon {
    position: fixed;
    right: 16px;
    bottom: 75px;
    width: 40px;
    height: 40px;
    background: #fff;
    box-shadow: 0px 0px 20px 0px rgba(0, 0, 0, 0.1);
    border-radius: 8px;
    text-align: center;
    line-height: 40px;
  }
  .setting-content {
    position: fixed;
    z-index: 99;
    bottom: 0;
    box-sizing: border-box;
    width: 100%;
    background: #f5f5f5;
    border-radius: 8px 8px 0 0;
    padding: 0 16px;
    .setting-content-title,
    li {
      font-family: 'pingfang-blod';
      height: 56px;
      line-height: 56px;
    }
    .setting-content-title {
      box-sizing: border-box;
      font-size: 18px;
      padding: 16px 0;
      svg {
        float: right;
      }
    }
    li {
      display: flex;
      & > div:first-child {
        flex: 1 1;
      }
    }
    span {
      display: inline-block;
      width: 60px;
      height: 44px;
      line-height: 1.8;
      text-align: center;
      border: 1px solid #12e079;
      border-radius: 4px;
      & + span {
        margin-left: 16px;
      }
      &.active {
        color: #12e079;
      }
    }
  }
}
</style>
