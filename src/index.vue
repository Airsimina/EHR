<template>
  <div id="app">
    <Loading></Loading>
    <keep-alive :include="keepAliveArray">
      <router-view />
    </keep-alive>
  </div>
</template>

<script>
import Loading from './components/loading'
export default {
  name: 'App',
  components: { Loading },
  data () {
    return {
      keepAliveArray: ['Home']
    }
  }
}
</script>

<style lang="scss" scoped>
@font-face {
  font-family: "DINPro-Medium";
  src: url("../src/style/DINPro-Medium.otf");
}
#app {
  padding-top: calc(constant(safe-area-inset-top) + 0.4rem); // 标准
  padding-top: calc(env(safe-area-inset-top) + 0.4rem); // 兼容 ios11
  padding-top: 0.4rem; // 兼容非刘海屏
  font-family: "DINPro-Medium";
}
</style>
