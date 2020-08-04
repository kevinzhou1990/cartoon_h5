<template>
  <div class="search">
    <span class="search-label">
      <img class="search-label-img" src="../images/search.png" />
      <input class="search-label-input" v-model="searchValue" :placeholder="placeholderValue" />
    </span>
  </div>
</template>
<script>
export default {
  name: 'ZM-search',
  data() {
    return {
      searchValue: '', // search values
      placeholderValue: '请输入你想要的内容' // search init values
    };
  }
};
</script>
<style scoped lang="scss">
$search-font-size: 12px;
$search-color: #fff;
.search {
  position: relative;
  height: 52px;
  font-size: $search-font-size;
  color: $search-color;
  &-label {
    display: flex;
    justify-content: center;
    justify-items: center;
    border-radius: 4px;
    &-img {
      position: absolute;
      top: 50%;
      left: 16px;
      width: 16px;
      height: 16px;
      line-height: 16px;
      transform: translateY(-50%);
    }
    &-input {
      height: 36px;
      width: 343px;
      line-height: 36px;
      margin: 8px 0;
      padding-left: 36px;
      background: rgba(0, 0, 0, 0.3);
      border: none;
      border-radius: 4px;
    }
    input {
      color: #ffffff;
      outline: none;
    }
  }
}
</style>
