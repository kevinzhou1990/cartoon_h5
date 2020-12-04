<template>
  <div class="feedback">
    <z-m-header title-text="问题反馈" show-right hasBorder :leftBtnFlag="true" @goBack="goBack">
      <div slot="right" class="header-right">
        <div
          slot="right"
          :class="textNumber > 4 ? 'title-right active' : 'title-right'"
          @click="commitQa"
        >
          <i class="icon-loading" v-if="isLoading" />
          <i v-else>提交</i>
        </div>
      </div>
    </z-m-header>
    <div class="feedback-content">
      <p v-if="isDetail">"{{ name && name.substr(0, 10) }}..."这个问题的解答没看懂。</p>
      <div class="textarea">
        <textarea
          cols="30"
          rows="10"
          maxlength="200"
          :placeholder="isDetail ? '说说你的疑问点，不少于5个字哦～' : '不少于5字哦～'"
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
import Dialog from '@/common/plugin/dialog';
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
      file: '',
      name: '',
      // 发布状态
      isLoading: false
    };
  },
  components: { ZMHeader, SvgIcon, ZMImg, Dialog },
  computed: {
    detail() {
      return this.$store.state.help.detail;
    }
  },
  mounted() {
    this.isDetail = parseInt(this.$route.query.source) === 1;
    this.name = this.detail.question;
  },
  methods: {
    commitQa() {
      if (!this.content.trim().length > 4 && !this.isLoading) {
        return false;
      }
      const data = {
        content: this.content,
        image_urls: this.imgList,
        help_id: this.$route.query.id
      };
      this.isLoading = true;
      this.$store.dispatch('addFeedback', data).then(res => {
        this.isLoading = false;
        if (res.code === 0) {
          this.$store.commit('UPDATE_UNDERSTAND', parseInt(this.$route.query.id));
          this.Toast('提交成功，感谢你的反馈', { type: 'success', duration: 1000 });
          this.$router.go(-1);
        } else {
          this.Toast(res.msg, { type: 'fail', duration: 1000 });
        }
      });
    },
    changeLen() {
      const len = this.content.trim().length;
      this.textNumber = len;
      if (len > 189 && !this.isTips) {
        setTimeout(() => {
          this.isTips = true;
        }, 5000);
      }
    },
    // 选择文件上传图片
    choseFile(event) {
      this.$Loading.open();
      import('lrz').then((module) => {
        const file = event.target.files[0];
        const _this = this;
        module(file, {
          quality: 1
        }).then(function(file) {
          console.log(file)
          _this.$store.dispatch('uploadFile', file.formData).then(res => {
            _this.$Loading.hide();
            if (res.code === 0) {
              _this.imgList.push(res.data.path);
            } else {
              _this.$toast(res.msg || '上传失败');
            }
          });
        }).catch(function(error) {
          //失败时执行
          _this.$Loading.hide();
          console.log('lrz失败', error);
          _this.$toast('图片加载失败,请稍后重试');
        }).always(function() {
          //不管成功或失败，都会执行
          event.target.value = '';
        });
      });
    },
    // 删除已选择的图片
    delPic(idx) {
      this.imgList.splice(idx, 1);
    },
    goBack() {
      if (this.content.length > 0 || this.imgList.length > 0) {
        this.$dialog('返回将不保存编辑的反馈', 'confirm', {
          confirm: {
            text: '返回',
            callback: () => {
              this.$router.back();
            }
          },
          cancel: {
            text: '再想想',
            callback: () => {}
          }
        });
      } else {
        this.$router.back();
      }
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
    i {
      font-style: normal;
    }
    &.active {
      color: #222;
    }
  }
  .icon-loading {
    display: inline-block;
    width: 16px;
    height: 16px;
    background: url('../../assets/img/load_ba.png') no-repeat 0 0 transparent;
    background-size: 100%;
    vertical-align: middle;
    animation: roates 1s linear infinite;
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
    margin-top: 16px;
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
        /*transform: scale(0.83);*/
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
      transform-origin: center;
    }
  }
  @keyframes roates {
    0% {
      transform: rotate(0deg);
    }
    50% {
      transform: rotate(180deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
}
</style>
