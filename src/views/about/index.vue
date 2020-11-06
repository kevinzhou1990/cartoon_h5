<template>
  <div>
    <z-m-header title-text="" has-border />

    <div class="main">
      <div class="icon-container">
        <span class="icon"></span>
        <p class="title">哇咔漫画</p>
      </div>

      <div class="content">
        <ul>
          <li class="zm-b-b">
            <section @click="jumpDownloadPage">
              <span>下载App</span>
            </section>
          </li>
          <li class="zm-b-b">
            <section @click="jumpAbout">
              <span>关于我们</span>
            </section>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import ZMHeader from '@/common/components/ZMHeader';
  import myMixins from '@/common/mixin/myMixins'
  export default {
    name: 'about',
    components: { ZMHeader },
    mixins: [ myMixins ],
    data() {
      return {}
    },
    methods: {
      jumpAbout(){
        this.$router.push({
          path: '/ZM/userAgreement',
          query: {
            agreeType: 3
          }
        })
      }
    }
  };
</script>

<style lang="scss" scoped>
  .main{
    margin-top: 44px;
    padding: 40px 0 0;
    color: #222222;

    .icon-container{
      margin: 0 auto;
      text-align: center;
      .icon{
        &:after{
          width: 64px;
          height: 64px;
          content: ' ';
          display: inline-block;
          background: url("../../assets/img/logo_aa.png") no-repeat;
          background-size: 100%;
        }
      }
      .title{
        padding: 0;
        margin: 8px 0 38px;
      }
    }

    .content{
      ul{
        padding-left: 16px;

        li{
          height: 56px;
          line-height: 56px;
          padding-right: 16px;
          position: relative;

          &:after{
            width: 16px;
            height: 16px;
            position: absolute;
            right: 16px;
            top: 21px;
            content: '';
            background: url('../../assets/img/more_chapter.png') no-repeat;
            background-size: 100%;
          }
        }
      }
    }
  }
</style>
