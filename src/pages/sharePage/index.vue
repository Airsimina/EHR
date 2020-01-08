<template>
  <div class="sharePage">
    <div class="my-message-wrap">
      <div class="top">
      </div>
      <span class="back"
            @click="$router.go(-1)"></span>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      pagePath: this.$route.query.pagePath || ''
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () {
    this.$router.replace({
      name: this.pagePath,
      id: '001'
    })
  }
}
</script>
<style lang="scss" scoped>
.sharePage {
  font-size: 0.24rem;
  .my-message-wrap {
    font-size: 0.24rem;
    background: #f4f6f9;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    position: relative;
    margin: 0;
    padding: 0;
    margin-top: 2rem;
    .back {
      display: inline-block;
      position: fixed;
      top: 0.2rem;
      left: 0.3rem;
      width: 0.2rem;
      height: 0.4rem;
      background: url("../../../static/img/bank.png") 0 0 no-repeat;
      background-size: 100% 100%;
      z-index: 120;
    }
    .top {
      background: url("../../../static/img/top-bg.png") 0 0 no-repeat;
      background-size: 100% 100%;
      height: 2.9rem;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 100;
    }
  }
}
</style>