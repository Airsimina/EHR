 <template>
  <div class="card-box">
    <div class="slot">
      <div v-if="title && keyName">
        <div class="card-title">{{title}}</div>
        <div class="card-lis">
          <div class="card-row card-name">{{keyName}} :</div>
          <div class="card-row card-value">{{userNumber}}</div>
        </div>
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: [String, Number],
      default: ''
    },
    keyName: {
      type: [String, Number],
      default: ''
    },
    userNumber: {
      type: [String, Number],
      default: ''
    }
  },
  mounted () { },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  width: 100%;
  box-sizing: border-box;
  background: #fff;
  box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.03);
  border-radius: 0.2rem;
  padding: 0.48rem 0.4rem;
  min-height: 2rem;
  position: fixed;
  width: 90%;
  z-index: 80;
  &::before {
    content: "";
    display: block;
    width: 2.51rem;
    height: 1.38rem;
    background: url("../../../static/img/blank@2x.png") 0 0 no-repeat;
    background-size: 100% 100%;
    position: absolute;
    right: 0;
    bottom: 0;
  }
  .slot {
    font-size: 0.24rem;
    .card-title {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .card-lis {
      font-size: 0.24rem;
      padding: 0.2rem 0;
      .card-row {
        display: inline-block;
        color: #666666;
        font-weight: bold;
      }
    }
  }
}
</style>