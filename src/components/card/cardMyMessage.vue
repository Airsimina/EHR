 <template>
  <div class="card-box">
    <div class="slot">
      <div class="card-base" v-if="title && keyName">
        <div>
          <van-image width="0.71rem" height="0.74rem" radius="10" fit="cover" :src="'http://hafqas3.hxoadev.com' + idPhoto" />
        </div>
        <div class="card-lis">
          <div class="card-title">{{title}}</div>
          <div class="card-row card-name">{{keyName}} :{{userNumber}}</div>
          <div class="card-row card-name" v-if="numberData">表单编号 :{{numberData}}</div>
        </div>
        <div class="card-post">
          <div class="card-post-name">{{departmentName}}</div>
        </div>
        <!-- <div class="card-lis">
          <div class="card-row card-name">表单编号:</div>
          <div class="card-row card-value">{{numberData}}</div>
        </div>-->
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
    },
    numberData: {
      type: [String, Number],
      default: ''
    },
    idPhoto: {
      type: [String, Number],
      default: ''
    },
    departmentName: {
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
  padding: 0.28rem 0.4rem;
  margin-top: 0.2rem;
  // min-height: 2rem;
  // position: fixed;
  width: 100%;
  z-index: 200;
  // &::before {
  //   content: "";
  //   display: block;
  //   width: 2.51rem;
  //   height: 1.38rem;
  //   background: url("../../../static/img/blank@2x.png") 0 0 no-repeat;
  //   background-size: 100% 100%;
  //   position: absolute;
  //   right: 0;
  //   bottom: 0;
  // }
  .slot {
    font-size: 0.24rem;
    .card-base {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    .card-title {
      font-size: 0.32rem;
      font-weight: bold;
    }
    .card-lis {
      padding: 0.2rem 0.4rem;
      width: 100%;
      box-sizing: border-box;
      .card-row {
        font-size: 0.26rem;
        color: #999;
        padding-top: 0.1rem;
      }
    }
    .card-post {
      white-space: nowrap;
      padding: 0.04rem 0.12rem;
      background: linear-gradient(to left, #7584f8 0, #57d1da 100%);
      border-radius: 10px 0 10px 0;
      color: #fff;
    }
  }
}
</style>