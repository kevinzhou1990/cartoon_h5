<template>
  <div class="download">
    <ZMHeader ref="header" titleText="下载引导" :has-border='true'/>
    <div class="container">
      <div class="img"></div>
      <p class="text">赶紧去下载app吧～</p>
      <button class="button">下载app</button>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
export default {
  name: 'App',
  components: { ZMHeader }
};
</script>

<style lang="scss">
  .download {
    height: 100%;
    position: relative;
    text-align: center;
    color: #999999;

    .container{
      position: absolute;
      top: 38%;
      left: 50%;
      transform: translate(-50%, -38%);

      .text{
        margin-top: 5px;
        font-size: 12px;
        color: #999999;
        letter-spacing: 0;
        font-family: 'pingfang-blod';
      }

      .img {
        background: url('../../assets/img/no_comment.png') no-repeat;
        background-size: 100%;
        height: 160px;
        width: 160px;
      }

      .button{
        color: #ffffff;
        font-size: 14px;
        padding: 10px 38px;
        border-radius: 22px;
        border: none;
        background: #12e079;
        font-family: 'pingfang-blod';
        margin-top: 50px;
      }
    }
  }
</style>
