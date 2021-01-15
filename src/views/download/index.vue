<template>
  <div class="download" @click="handleClickDownloadAPP"></div>
</template>

<script>
export default {
  name: 'download',
  data() {
    return {
      isIos: false,
      isAndroid: false,
      iosUrl: 'https://itunes.apple.com/cn/app/',
      androidUrl: 'http://10.1.15.98:9501/api/android/down'
    };
  },
  mounted() {
    this.isIos = !!navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);
    this.isAndroid =
      navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Adr') > -1;
    if (location.host.indexOf('localhost') < 0) {
      this.androidUrl = `${location.origin}/api/android/down`;
    }
  },
  methods: {
    createIframe() {
      let iframe;
      return function() {
        if (iframe) {
          return iframe;
        } else {
          iframe = document.createElement('iframe');
          iframe.style.display = 'none';
          document.body.appendChild(iframe);
          return iframe;
        }
      };
    },
    handleClickDownloadAPP() {
      if (this.isAndroid) {
        return this.openApp('comic://lmm.comic');
      } else {
        return this.openApp('ZMCartoon://');
      }
    },
    openApp(url) {
      // android
      let openIframe = this.createIframe();
      let isChrome = window.navigator.userAgent.indexOf('Chrome') !== -1;
      if (this.isIos) {
        // 判断是否是ios
        window.location.href = url;
        let loadDateTime = Date.now();
        setTimeout(function() {
          let timeOutDateTime = Date.now();
          console.log(timeOutDateTime - loadDateTime);
          if (timeOutDateTime - loadDateTime < 2200) {
            // var t = document.createEvent('HTMLEvents'); // 返回新创建的 Event 对象，具有指定的类型。
            // t.initEvent('click', !1, !1) // 初始化新事件对象的属性
            window.location.href = this.iosUrl;
          }
        }, 2000);
      } else {
        // 判断是否是android
        if (isChrome) {
          // chrome浏览器用iframe打不开得直接去打开，算一个坑
          window.location.href = url;
        } else {
          //抛出你的scheme
          openIframe.src = url;
        }
        setTimeout(function() {
          window.location.href = this.androidUrl;
        }, 500);
      }
    }
  }
};
</script>

<style lang="scss">
.download {
  position: relative;
  overflow: auto;
  background: #71ad5b;
  min-height: 667px;
  width: auto;
  margin: auto;
  padding: 0;
  background: url('./images/downloadbg.jpg') no-repeat;
  background-size: 100%;
}
</style>
