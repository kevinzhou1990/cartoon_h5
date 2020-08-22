<template>
  <div class="comments-page">
    <z-m-header title-text=" " />
    <div class="comments-comics-title"></div>
    <div class="comments-list">
      <ul>
        <li>
          <img src=" " alt=" " class="avatar" />
          <div>
            <div>多啦C梦爆米花</div>
            <div>这漫画，他喵的真香。迄今为止，最Cooooo…ol的，没有之一，不服不辩，快来点赞啊！哇咔咔咔～～</div>
            <div>
              <span>1小时前</span>
              <span>
                <svg-icon icon-class="like_ba" size="small" />9528
                <svg-icon icon-class="more_bc" size="small" />
              </span>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import ZMHeader from '@/common/components/ZMHeader';
import SvgIcon from '@/common/components/svg';
export default {
  name: 'Comments',
  components: { ZMHeader, SvgIcon }
};
</script>

<style lang="scss" scoped>
.comments-page {
  padding-top: 44px;
}
</style>
