<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
import crypto from 'crypto-js';
export default {
  name: 'App',
  mounted() {
    const str = '123456@#$%abcdEFG';
    const key = crypto.enc.Utf8.parse(
      'jiGOIz7IrdInU5KYqs4euNDgRe65FOQL1234567890123'
    );
    const iv = crypto.enc.Utf8.parse('01234567');
    console.log(
      crypto.TripleDES.encrypt(str, key, {
        iv: iv,
        mode: crypto.mode.CBC,
        padding: crypto.pad.Pkcs7
      }).toString()
    );
  }
};
</script>

<style lang="scss">
@import url('/assets/style/index.scss');
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}
</style>
