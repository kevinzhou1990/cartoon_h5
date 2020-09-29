<template>
  <div class="search zm-b-b">
      <div class="content">
        <input class="content-input" placeholder="黑白放音机 第二季">
      </div>
      <div class="cancel">取消</div>
  </div>
</template>

<script>
export default {
  name: 'search'
}
</script>

<style scoped lang="scss">
// 设置input placeholder的字体
input::-webkit-input-placeholder {
  font-family: 'pingfang-blod';
  color: #BBBBBB;
  font-size: 12px;
}
.search {
  /*position: relative;*/
  display: flex;
  height: 52px;
  margin: 0 auto;
  font-family: 'pingfang-blod';
  .content {
    position: relative;
    margin: 8px 16px;
    padding-left: 40px;
    font-size: 12px;
    color: #BBBBBB;
    letter-spacing: 0;
    border: 1px solid rgba(0,0,0,0.08);
    border-radius: 4px;
    width: 261px;
    height: 36px;
    line-height: 36px;
    &-input {
      border: none;
      width: 248px;
      height: 34px;
      outline: none;
    }
    &:before {
      position: absolute;
      content: ' ';
      width: 16px;
      height: 16px;
      top: 50%;
      left: 16px;
      transform: translateY(-50%);
      background: url("../images/search.png") no-repeat center;
      background-size: 100%;
    }
  }
  .cancel {
    position: relative;
    height: 52px;
    line-height: 52px;
    font-size: 12px;
    color: #222222;
    letter-spacing: 0;
  }
}
</style>
