<template>
  <div class="loading"
       v-show="loading">
    <div class="loading-box">
      <van-loading type="spinner"
                   size="80px"
                   class="login-icon"></van-loading>
      <div class="message">玩命加载中...</div>
    </div>
    <van-overlay :show="loading"
                 class="overlay" />
  </div>
</template>

<script>
import { mapState } from 'vuex'
export default {
  data () {
    return {}
  },
  computed: {
    ...mapState(['loading'])
  },
  mounted () {
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.loading {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;

  .loading-box {
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translateX(-50%);
    z-index: 99999;
    text-align: center;

    .login-icon {
      width: 0.5rem;
      height: 0.5rem;
      margin: 0 auto;
    }

    .message {
      font-size: 0.2rem;
      color: #fff;
      margin-top: 0.15rem;
    }
  }

  .overlay {
    z-index: 99998 !important;
  }
}
</style>