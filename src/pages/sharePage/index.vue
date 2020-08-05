<template>
  <div class="sharePage">
    <div class="my-message-wrap">
      <div class="top"></div>
      <span class="back" v-show="false" @click="$router.go(-1)"></span>
      <span class="home" @click="goHome">
        <img src="../../../static/img/home.png" />
      </span>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      pagePath: this.$route.query.pagePath || ''
    }
  },
  methods: {
    goHome () {
      this.$router.push({ name: 'home' })
    }
  },
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
    // margin-top: 0.4rem;
    .back {
      display: inline-block;
      position: fixed;
      top: 0.2rem;
      left: 0.3rem;
      width: 0.2rem;
      height: 0.4rem;
      // background: url("../../../static/img/bank.png") 0 0 no-repeat;
      // background-size: 100% 100%;
      z-index: 120;
    }
    .home {
      display: inline-block;
      position: fixed;
      bottom: 1.4rem;
      right: 0.3rem;
      // width: 0.2rem;
      z-index: 220;
      // font-weight: bold;
      // border: 1px solid rgba(95, 148, 244, 1);
      // border-radius: 50%;
      // padding: 0.1rem 0.32rem 0.18rem;
      // background: rgba(95, 148, 244, 1);
      // box-shadow: 0px 5px 25px rgba(95, 148, 244, 1);
      width: 0.9rem;
      height: 0.9rem;
      img {
        width: 100%;
        height: 100%;
      }
      p {
        color: #fff;
        font-size: 0.24rem;
        letter-spacing: 0.02rem;
      }
    }
    .top {
      background: #5775ad;
      // background: url("../../../static/img/top-bg.png") 0 0 no-repeat;
      // background-size: 100% 100%;
      height: 1.9rem;
      width: 100%;
      position: fixed;
      top: 0;
      left: 0;
      z-index: 200;
    }
  }
}
</style>