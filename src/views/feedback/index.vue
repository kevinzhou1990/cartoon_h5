<template>
  <div class="feedback">
    <z-m-header title-text="问题反馈" show-right hasBorder>
      <div slot="right" class="header-right">
        <div
          slot="right"
          :class="textNumber > 0 ? 'title-right active' : 'title-right'"
          @click="commitQa"
        >
          提交
        </div>
      </div>
    </z-m-header>
    <div class="feedback-content">
      <p v-if="isDetail">"我充值了，但是没有反应..."这个问题的解答没看懂。</p>
      <div class="textarea">
        <textarea
          cols="30"
          rows="10"
          maxlength="200"
          placeholder="说说你的疑问点，不少于5个字哦～"
          v-model="content"
          @input="changeLen"
        ></textarea>
        <span>
          <i :class="textNumber >= 190 ? 'over' : 'normal'">{{ textNumber }}</i
          >/<i>200</i>
        </span>
      </div>
      <div class="pic-list" v-if="!isDetail">
        <p>
          上传图片(<i>{{ imgList.length }}</i
          >/<i>4</i>)
        </p>
        <div class="img-list">
          <div class="upload-icon zm-b zm-b-radius">
            <div>
              <div v-if="imgList.length < 4">
                <input type="file" @change="choseFile" accept="image/*" />
                <svg-icon icon-class="add_aa" />
              </div>
              <span v-else>图片添加已满</span>
            </div>
          </div>
          <z-m-img
            :idx="index"
            :key="index"
            :url="item"
            v-for="(item, index) in imgList"
            @del="delPic(index)"
          />
        </div>
      </div>
    </div>
    <div class="tips-msg" v-show="!isTips && textNumber > 189">
      <span>200字反馈，你快写完咯</span>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
import ZMImg from './components/img';
export default {
  data() {
    return {
      isDetail: false,
      textNumber: 0,
      content: '',
      // 是否已经提醒过
      isTips: false,
      // 图片地址数组
      imgList: [],
      file: ''
    };
  },
  components: { ZMHeader, SvgIcon, ZMImg },
  mounted() {
    this.isDetail = parseInt(this.$route.query.source) === 1;
  },
  methods: {
    commitQa() {
      if (!this.content) {
        return false;
      }
      const data = {
        content: this.content,
        'image_urls[]': this.imgList,
        help_id: ''
      };
      this.$store.dispatch('addFeedback', data).then(res => {
        if (res.code === 0) {
          this.Toast('提交成功，感谢你的反馈', { type: 'success', duration: 1000 });
          this.$router.go(-1);
        } else {
          this.Toast(res.msg, { type: 'fail', duration: 1000 });
        }
      });
    },
    changeLen() {
      const len = this.content.length;
      this.textNumber = len;
      if (len > 189 && !this.isTips) {
        setTimeout(() => {
          this.isTips = true;
        }, 5000);
      }
    },
    // 选择文件上传图片
    choseFile(event) {
      const formData = new FormData();
      formData.append('file', event.target.files[0]);
      // console.log(event.target.files[0], '-----');
      this.$store.dispatch('uploadFile', formData).then(res => {
        if (res.code === 0) {
          this.imgList.push(res.data.path);
        } else {
          this.$toast(res.msg || '上传失败');
        }
      });
    },
    // 删除已选择的图片
    delPic(idx) {
      this.imgList.splice(idx, 1);
    }
  }
};
</script>

<style lang="scss" scoped>
.feedback {
  .header-right {
    background: transparent;
    width: auto;
  }
  .title-right {
    font-size: 12px;
    color: #e6e6e6;
    &.active {
      color: #222;
    }
  }
  .feedback-content {
    padding: 44px 16px 0 16px;
    p {
      padding: 16px 0;
      font-size: 10px;
    }
  }
  .textarea {
    background: #f5f5f5;
    padding: 8px;
    border-radius: 4px;
    position: relative;
    textarea {
      resize: none;
      outline: none;
      width: 100%;
      background: transparent;
      border: none;
      font-family: pingfang-blod;
    }
    span {
      position: absolute;
      bottom: 4px;
      right: 5px;
      display: inline-block;
    }
    i {
      font-style: normal;
      &.over {
        color: #ff3456;
      }
    }
  }
  .img-list {
    width: 100%;
    white-space: nowrap;
    overflow-y: hidden;
    overflow-x: scroll;
    height: 70px;
    padding-top: 7px;
  }
  .pic-list {
    p {
      font-size: 12px;
      color: #999999;
      margin: 24px 0 16px 0;
      padding: 0;
    }
    i {
      font-style: normal;
    }
    .upload-icon {
      height: 64px;
      width: 64px;
      margin-right: 16px;
      display: inline-block;
      & > div {
        padding: 8px;
        box-sizing: border-box;
        text-align: center;
        color: #e6e6e6;
        font-size: 12px;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 100%;
      }
      span {
        transform: scale(0.83);
        transform-origin: center;
      }
      input {
        width: calc(100% - 16px);
        height: calc(100% - 16px);
        position: absolute;
        opacity: 0;
      }
    }
  }
  .tips-msg {
    font-size: 12px;
    width: 160px;
    height: 36px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
    position: fixed;
    top: 44px;
    left: calc(50% - 80px);
    background: #ffffff;
    border-radius: 18px;
    text-align: center;
    line-height: 36px;
    span {
      display: inline-block;
      color: #999;
      transform: scale(0.83);
      transform-origin: center;
    }
  }
}
</style>
