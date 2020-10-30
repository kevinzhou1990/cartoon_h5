<template>
  <div class="download" @click="handleClickDownloadAPP">

  </div>
</template>

<script>
let u = navigator.userAgent;
let isIos = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
let isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
// 下载地址
let iosUrl = 'https://itunes.apple.com/cn/app/'; // todo 待定
/* eslint-disable */
let androidUrl = ''; //  地址待定
let createIframe = (function () {
  let iframe;
  return function () {
    if (iframe) {
      return iframe;
    } else {
      iframe = document.createElement('iframe');
      iframe.style.display = 'none';
      document.body.appendChild(iframe);
      return iframe;
    }
  }
})()
export default {
  name: 'download',
  methods: {
	  handleClickDownloadAPP() {
		  if (isAndroid) {
        // todo android 待定
			  return this.openApp('carmarket://splash');
		  } else {
			  return this.openApp('ZMCartoon://');
		  }
    },
    openApp(url) {
	    let openIframe = createIframe();
	    let isChrome = window.navigator.userAgent.indexOf('Chrome') !== -1;
	    if (isIos) {
		    let loadDateTime = Date.now();
		    setTimeout(function () {
			    let timeOutDateTime = Date.now();
			    console.log(timeOutDateTime - loadDateTime);
			    if (timeOutDateTime - loadDateTime < 1000) {
				    window.location.href = iosUrl;
			    }
		    }, 25);
		    // 判断是否是ios
		    window.location.href = url;
	    } else {
		    // 判断是否是android
		    if (isChrome) {
			    // chrome浏览器用iframe打不开得直接去打开，算一个坑
			    window.location.href = url;
		    } else {
			    //抛出你的scheme
			    openIframe.src = url;
		    }
		    // setTimeout(function () {
		    //   window.location.href = androidUrl;
		    // }, 500);
	    }
    }
  }
}
</script>

<style lang="scss">
  .download {
    position: relative;
    overflow: auto;
    background: #71ad5b;
    min-height: 667px;
    width: 100%;
    margin: auto 0;
    padding: 0;
    background: url("./images/downloadbg.jpg") center top no-repeat;
    background-size: 100%;
  }
</style>
