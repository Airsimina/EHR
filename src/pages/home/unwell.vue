<template>
  <div class="uw-wrapper">
    <div class="content">
      <div class="title-box">
        <div class="cont cont-lf">
          附加信息
        </div>
        <div class="cont cont-rt "
             :class="showFlag ? 'open' : 'close'"
             @click="open">
          居家隔离
        </div>
      </div>
      <div class="sub-cont"
           v-if="showFlag">
        <intiTouch></intiTouch>
      </div>
    </div>
  </div>
</template>

<script>
import intiTouch from '@components/intimacyTouch/index'

export default {
  components: { intiTouch },
  props: {},
  data () {
    return {
      showFlag: false
    }
  },
  watch: {},
  computed: {},
  methods: {
    open () {
      console.log('aaa')
      this.showFlag = !this.showFlag
    }
  },
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.uw-wrapper {
  position: relative;
  z-index: 9999;
  font-size: 0.26rem;
  background: #fff;
  .content {
    background: #fafafa;
    .title-box {
      display: flex;
      vertical-align: center;
      justify-content: space-between;
      .cont {
        display: inline-block;
        // border: 1px solid #000;
        font-size: 0.26rem;
        font-weight: bold;
        padding: 0.1rem 0.3rem;
        flex: 1;
        &.cont-lf {
          color: #111111;
        }
        &.cont-rt {
          color: #ff0000;
          text-align: right;
          position: relative;
          &.close::after {
            content: "";
            position: relative;
            width: 0;
            height: 0;
            top: -0.2rem;
            border-width: 0.15rem;
            border-style: solid;
            border-color: transparent transparent #ff0000;
          }
          &.open::after {
            content: "";
            position: relative;
            width: 0;
            height: 0;
            top: 0.25rem;
            border-width: 0.15rem;
            border-style: solid;
            border-color: #ff0000 transparent transparent transparent;
          }
        }
      }
    }
    .sub-cont {
      // border: 1px solid #000;
      padding: 0.1rem 0.2rem;
    }
  }
}
</style>