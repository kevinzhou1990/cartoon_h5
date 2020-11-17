<template>
  <div class="avatar-container">
    <canvas ref="$canvas" width="100" height="100" style="display: none" :class="{'canvas--doing':imgURL}"></canvas>
    <div class="container g-popup-box">
      <div class="content">
        <div class="container-box" :style="{
          width:`${containerBoxData.width}px`,
          height:`${containerBoxData.height}px`,
          }">
          <img ref="$img" :src="imgURL"/>
          <div class="img-mask"></div>
          <div class="select-box" v-if="imgURL"
               @touchstart.stop="onMouseDown($event, 'move')" :style="{
            top:`${selectData.top}px`,
            left:`${selectData.left}px`,
            width:`${selectData.width}px`,
            height:`${selectData.width}px`,
            'background-image':`url(${imgURL})`,
            'background-position':`${-selectData.left}px ${-selectData.top}px`,
            'background-size':`${containerBoxData.width}px ${containerBoxData.height}px`,
          }">
            <ul class="x-line">
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'top')"></li>
              <li></li>
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'bottom')"></li>
            </ul>
            <ul class="y-line">
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'left')"></li>
              <li></li>
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'right')"></li>
            </ul>
            <ul class="point">
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'top-left')">
                <span></span>
              </li>
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'top-right')">
                <span></span>
              </li>
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'bottom-left')">
                <span></span>
              </li>
              <li @touchstart.stop="onMouseDown($event, 'stretch', 'bottom-right')">
                <span></span>
              </li>
            </ul>
            <div class="cross"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="header">
      <span class="back" @click.stop="onCancel"></span>
      <span class="done" @click.stop="onEnter">确定</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      returnType: {
        type: String,
        default: 'url'
      },
      inputFile: {
        default: null
      }
    },
    data() {
      return {
        imgURL: '',
        scaleRate: 1, // 图片缩放比
        minWidth: 20, // 选择框最小宽度
        containerBoxData: {
          width: 0,
          height: 0
        },
        selectData: {
          top: 0,
          left: 0,
          width: 0,
          action: '', // 当前进行的操作
          originPoint: {}, // 点击时所在位置
          selectLine: '' // 选择那一条边进行拉伸，为空则不是在拉伸
        }
      }
    },
    mounted() {
      // 全局监听松开事件，放在在内容选择框外松开
      document.addEventListener('touchend', this.onMouseUp)
      document.addEventListener('touchmove', this.onMouseMove)
      this.fileChange(this.inputFile)
    },
    beforeDestroy() {
      document.removeEventListener('mouseup', this.onMouseUp)
      document.removeEventListener('mousemove', this.onMouseMove)
    },
    methods: {
      // 获取图片宽高
      getImgSize(url) {
        return new Promise((resolve) => {
          let $img = document.createElement('img');
          $img.crossOrigin = 'Anonymous';
          $img.src = url;
          $img.style.opacity = 0;
          $img.addEventListener('error', () => {
            document.body.removeChild($img)
            resolve(false)
          })
          $img.addEventListener('load', () => {
            const data = {
              width: $img.naturalWidth,
              height: $img.naturalHeight
            }
            document.body.removeChild($img)
            resolve(data)
          })
          document.body.appendChild($img)
        })
      },
      // 从base64转化为file文件
      base64ToFile(base64Str, fileName) {
        const params = base64Str.split(',')
        const fileData = atob(params[1]) // 解码Base64
        let { length } = fileData
        const uint8Array = new Uint8Array(length)
        while (length) {
          length -= 1
          uint8Array[length] = fileData.charCodeAt(length)
        }
        return new File([uint8Array], fileName, { type: 'image/png' })
      },
      // 获取驼峰写法
      getCamelCase(text) {
        return text.replace(/-[a-z]+?/g, matchStr => matchStr[1].toUpperCase())
      },
      // 获取首单词大写
      getWord(text) {
        return text[0].toUpperCase() + text.substr(1)
      },
      // 鼠标点击
      onMouseDown(event, action, direction) {
        const { selectData } = this
        selectData.action = action
        selectData.direction = direction || ''
        selectData.originPoint = {
          x: event.touches[0].clientX > 0 ? event.touches[0].clientX : 0,
          y: event.touches[0].clientY > 0 ? event.touches[0].clientY : 0
        }
      },
      // 鼠标松开
      onMouseUp() {
        const { selectData } = this
        selectData.action = ''
        selectData.direction = ''
      },
      // 鼠标移动
      onMouseMove(event) {
        const { selectData, containerBoxData } = this
        const { x, y } = selectData.originPoint
        const moveX = event.touches[0].clientX - x // X轴移动的距离
        const moveY = event.touches[0].clientY - y // Y轴移动的距离
        if (selectData.action === 'move') { // 移动选择框
          this.doMove(selectData, containerBoxData, moveX, moveY)
        } else if (selectData.action === 'stretch') { // 拉伸选择框
          this.doStretch(selectData, containerBoxData, moveX, moveY)
        } else {
          return
        }
        selectData.originPoint = {
          x: event.touches[0].clientX > 0 ? event.touches[0].clientX : 0,
          y: event.touches[0].clientY > 0 ? event.touches[0].clientY : 0
        }
        this.setPreview()
      },
      // 选择框移动
      doMove(selectData, containerBoxData, moveX, moveY) {
        selectData.top += moveY
        selectData.left += moveX
        if (selectData.top < 0) {
          selectData.top = 0
        }
        if (selectData.left < 0) {
          selectData.left = 0
        }
        if (selectData.top + selectData.width > containerBoxData.height) {
          selectData.top = containerBoxData.height - selectData.width
        }
        if (selectData.left + selectData.width > containerBoxData.width) {
          selectData.left = containerBoxData.width - selectData.width
        }
      },
      // 选择框拉伸
      doStretch(selectData, containerBoxData, moveX, moveY) {
        const { minWidth } = this
        // 获取溢出长度
        function getOverflowLength() {
          const overflowLeft = selectData.left < 0 ? -selectData.left : 0
          const overflowTop = selectData.top < 0 ? -selectData.top : 0
          const overflowRight = selectData.left + selectData.width > containerBoxData.width ? selectData.left + selectData.width - containerBoxData.width : 0
          const overflowBottom = selectData.top + selectData.width > containerBoxData.height ? selectData.top + selectData.width - containerBoxData.height : 0
          const overflowWidth = selectData.width < minWidth ? minWidth - selectData.width : 0
          return Math.max(overflowLeft, overflowTop, overflowRight, overflowBottom, overflowWidth)
        }
        // 向左拉伸
        function doStretchLeft(action) {
          let space = moveX
          space = action === 'preDo' ? space : -space
          selectData.top += space / 2
          selectData.left += space
          selectData.width -= space
        }
        function doStretchRight(action) {
          let space = moveX
          space = action === 'preDo' ? space : -space
          selectData.top -= space / 2
          selectData.width += space
        }
        function doStretchTop(action) {
          let space = moveY
          space = action === 'preDo' ? space : -space
          selectData.top += space
          selectData.left += space / 2
          selectData.width -= space
        }
        function doStretchBottom(action) {
          let space = moveY
          space = action === 'preDo' ? space : -space
          selectData.left -= space / 2
          selectData.width += space
        }
        function doStretchTopLeft(action) {
          let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY
          space = action === 'preDo' ? space : -space
          selectData.top += space
          selectData.left += space
          selectData.width -= space
        }
        function doStretchTopRight(action) {
          let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY
          space = action === 'preDo' ? space : -space
          selectData.top -= space
          selectData.width += space
        }
        function doStretchBottomLeft(action) {
          let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : -moveY
          space = action === 'preDo' ? space : -space
          selectData.left += space
          selectData.width -= space
        }
        function doStretchBottomRight(action) {
          let space = Math.abs(moveX) > Math.abs(moveY) ? moveX : moveY
          space = action === 'preDo' ? space : -space
          selectData.width += space
        }
        const doStretchFun = {
          doStretchLeft,
          doStretchRight,
          doStretchTop,
          doStretchBottom,
          doStretchTopLeft,
          doStretchTopRight,
          doStretchBottomLeft,
          doStretchBottomRight
        }[`doStretch${this.getWord(this.getCamelCase(selectData.direction))}`]
        doStretchFun('preDo')
        let overflowLength = getOverflowLength()
        if (overflowLength > 0) {
          doStretchFun('reset')
        }
      },
      // 设置预览图
      setPreview() {
        const { selectData, scaleRate } = this
        const $canvas = this.$refs.$canvas.getContext('2d')
        $canvas.clearRect(0, 0, 100, 100)
        $canvas.drawImage(
          this.$refs.$img,
          Math.floor(selectData.left / scaleRate),
          Math.floor(selectData.top / scaleRate),
          selectData.width / scaleRate,
          selectData.width / scaleRate,
          0,
          0,
          100,
          100
        )
      },
      // 选择图片
      fileChange(event) {
        //lrz压缩并且调整ios上图片反转的问题
        const lrz = require('lrz');
        const fileObj = event.target.files[0];
        let that = this;
        lrz(fileObj, {
          quality: 0.7
        })
          .then(function(rst) {
            console.log(rst);
            //成功时执行
            const reader = new FileReader();
            reader.onload = () => {
              const { selectData, containerBoxData } = that;
              that.imgURL = reader.result;
              that.getImgSize(that.imgURL).then((result) => {
                const clientWidth = document.body.clientWidth - 80;
                if (result.width > result.height) { // 350为外盒子宽高
                  that.scaleRate = clientWidth / result.width;
                  containerBoxData.width = clientWidth;
                  containerBoxData.height = Math.floor(result.height * that.scaleRate);
                  selectData.top = 0;
                  selectData.left = (clientWidth - containerBoxData.height) / 2;
                  selectData.width = containerBoxData.height
                } else {
                  that.scaleRate = clientWidth / result.width;
                  containerBoxData.height = Math.floor(result.height * that.scaleRate);
                  containerBoxData.width = clientWidth
                  selectData.left = 0;
                  selectData.top = 0;
                  selectData.width = containerBoxData.width
                }
                that.setPreview()
              });
            };

            reader.readAsDataURL(rst.file)
          })
          .catch(function(error) {
            //失败时执行
            console.log('lrz失败', error);
          })
          .always(function() {
            //不管成功或失败，都会执行
            event.target.value = '';
          });
      },
      // 确认
      onEnter() {
        if (this.imgURL) {
          if (this.returnType === 'url') {
            this.$emit('enter', this.$refs.$canvas.toDataURL());// 返回链接
          } else if (this.returnType === 'file') {
            this.$emit('enter', this.base64ToFile(this.$refs.$canvas.toDataURL(), 'avatar.png'));// 返回文件
          }
        }
      },
      // 取消
      onCancel() {
        this.$emit('cancel')
      }
    }
  }
</script>

<style lang="scss" scoped>
  .avatar-container {
    height: 100%;
    width: 100vw;
    background: #000000;
    position: fixed;
    -moz-user-select: none;
    -webkit-user-select: none;
    -ms-user-select: none;
    -khtml-user-select: none;
    user-select: none;

    .header{
      height: 44px;
      position: absolute;
      top: 0;
      background: transparent;
      line-height: 44px;
      width: calc(100% - 32px);
      padding: 0 16px;
      color: #ffffff;
      font-family: 'pingfang-blod';
      font-size: 14px;

      .back {
        position: relative;
        &:before{
          position: absolute;
          top: 10px;
          content: ' ';
          width: 24px;
          height: 24px;
          background: url("../../../../assets/img/return_aa.png");
          background-size: 100%;
        }
      }

      .done {
        float: right;
      }
    }
  }

  li, ul {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .container {
    position: absolute;
    width: 100%;
    height: 100%;
    display: flex;
  }
  .content {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    background: #000000;
    .container-box {position: relative;}
    .img-mask {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      opacity: 0.6;
      background-color: #333333;
    }
    img {width: 100%;height: 100%}
    .select-box {
      position: absolute;
      top: 0;
      left: 0;
      cursor: move;
      border-radius: 50%;
    }
    .x-line, .y-line {
      display: flex;
      justify-content: space-between;
      position: absolute;
      width: 100%;
      height: 100%;
      li {
        position: relative;
        z-index: 1000000;
        border: dashed 1px white;
      }
      li:nth-child(1):before,
      li:nth-last-child(1):before {
        position: absolute;
        margin-left: -3px;
        margin-top: -3px;
        width: 6px;
        height: 6px;
        content: '';
        background-color: white;
      }
    }
    .x-line {
      flex-direction: column;
      li:nth-child(1) {
        cursor: n-resize;
        &:before {left: 50%;}
      }
      li:nth-last-child(1) {
        cursor: s-resize;
        &:before {left: 50%;}
      }
    }
    .y-line {
      li:nth-child(1) {
        cursor: w-resize;
        &:before {top: 50%;}
      }
      li:nth-last-child(1) {
        cursor: e-resize;
        &:before {top: 50%;}
      }
    }
    .point {
      width: 100%;
      height: 100%;
      li {
        position: absolute;
        margin-left: -3px;
        margin-top: -3px;
        padding: 20px;
        content: '';
        cursor: crosshair;
        span{
          width: 6px;
          height: 6px;
          background-color: white;
        }
      }
      li:nth-child(1) {
        top: -10px;
        left: -18px;
        cursor: nw-resize;
      }
      li:nth-child(2) {
        top: -10px;
        right: -18px;
        cursor: ne-resize;
      }
      li:nth-child(3) {
        bottom: -18px;
        left: -10px;
        cursor: sw-resize;
      }
      li:nth-child(4) {
        bottom: -18px;
        right: -10px;
        cursor: se-resize;
      }
    }
    .cross {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 6px;
      height: 6px;
      min-width: unset;
      margin-top: -3px;
      margin-left: -3px;
      background-size: cover;
      background-image: url('../../../../assets/img/delete_bb.png');
    }
  }
</style>
