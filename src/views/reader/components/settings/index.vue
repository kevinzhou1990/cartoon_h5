<template>
  <div class="setting-wrap">
    <div :class="`setting-content ${show ? '' : 'setting-content-hidden'}`">
      <div class="setting-content-title">
        设置
        <span @click="switchSetting">
          <SvgIcon iconClass="close_aa" size="default" />
        </span>
      </div>
      <ul>
        <li>
          <div class="setting-name" style="line-height:44px;">功能栏位置</div>
          <div class="setting-msg">
            <span :class="funcPos==='right' ? 'active' : ''" @click="changePos">
              <SvgIcon :iconClass="`right_b${funcPos === 'right' ? 'a' : 'b'}`" class="small" />
              <br />靠右
            </span>
            <span @click="changePos" :class="funcPos==='right' ? '' : 'active'">
              <SvgIcon :iconClass="`left_b${funcPos === 'right' ? 'b' : 'a'}`" class="small" />
              <br />靠左
            </span>
          </div>
        </li>
        <li>
          <div class="setting-name">
            <p>点击翻页</p>
            <p>
              <span>开启后支持点击页面上下区域翻页，点击中间唤起功能栏</span>
            </p>
          </div>
          <div class="setting-content-btnwrap">
            <SwitchBtn :activated="clickTurnPage" @changeStatus="changeStatus" />
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import SvgIcon from '@/common/components/svg';
import SwitchBtn from '@/common/components/switch';
export default {
  name: 'ReadSetting',
  components: { SvgIcon, SwitchBtn },
  props: {
    show: { type: Boolean, default: true }
  },
  data() {
    return {};
  },
  computed: {
    funcPos() {
      return this.$store.state.reader.settingData.funcPos;
    },
    clickTurnPage() {
      return this.$store.state.reader.settingData.clickTurnPage;
    }
  },
  methods: {
    // 点击翻页开关
    changeStatus() {
      const setting = { clickTurnPage: !this.clickTurnPage };
      this.$store.dispatch('updateSetting', setting);
    },
    // 更改功能栏位置
    changePos() {
      const setting = this.funcPos === 'right' ? { funcPos: 'left' } : { funcPos: 'right' };
      this.$store.dispatch('updateSetting', setting);
    },
    switchSetting() {
      this.$parent.navigationStatus = !this.$parent.navigationStatus;
      this.$parent.settingStatus = !this.$parent.settingStatus;
    }
  }
};
</script>

<style lang="scss" scoped>
.setting-wrap {
  .setting-content {
    position: fixed;
    z-index: 999;
    bottom: 0px;
    box-sizing: border-box;
    width: 100%;
    background: #f5f5f5;
    border-radius: 8px 8px 0 0;
    padding: 0 16px;
    transition: bottom 0.2s;
    &-hidden {
      bottom: -170px;
    }
    .setting-content-title,
    li {
      font-family: 'pingfang-blod';
      height: 56px;
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
      box-sizing: border-box;
      padding: 6px 0;
    }
    .setting-name {
      flex: 1 1;
      font-size: 12px;
      span {
        display: inline-block;
        color: #bbb;
        font-size: 10px;
        transform: scale(0.875);
        -webkit-transform-origin-x: 0;
        width: 110%;
      }
    }
    .setting-msg {
      span {
        display: inline-block;
        width: 60px;
        height: 44px;
        line-height: 1.8;
        text-align: center;
        box-sizing: border-box;
        border: 1px solid rgba(0, 0, 0, 0.2);
        color: #bbb;
        border-radius: 4px;
        & + span {
          margin-left: 16px;
        }
        &.active {
          color: #12e079;
          border-color: #12e079;
        }
      }
    }
    .setting-content-btnwrap {
      display: flex;
      align-items: center;
    }
  }
}
</style>
