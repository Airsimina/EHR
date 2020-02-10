<template>
  <div class="it-wrapper">
    <div class="box">
      <div class="lf-box name">过去15天行程: </div>
      <div class="rt-box val">去医院确诊后建议居家隔离</div>
    </div>
    <div class="box">
      <div class="lf-box">是否与同事有接触: </div>
      <div class="rt-box">
        <span class="check">是</span>
        <span class="check active">否</span>
      </div>
    </div>
    <div class="box">
      <div class="sub-box">
        <span class="name">姓名: </span>
        <span class="val val">lixiansen</span>
      </div>
      <div class="sub-box">
        <span class="name">单位: </span>
        <span class="val">xxxx00单位</span>
      </div>
    </div>
    <div class="box">
      <div class="lf-box name">联系电话: </div>
      <div class="rt-box val">1359987947</div>
    </div>

    <div class="box">
      <div class="lf-box">是否接触医务人员: </div>
      <div class="rt-box">
        <span class="check active ">是</span>
        <span class="check">否</span>
      </div>
    </div>
    <div class="box">
      <div class="sub-box">
        <span class="name">姓名: </span>
        <span class="val">lixiansen</span>
      </div>
      <div class="sub-box">
        <span class="name">医院名称: </span>
        <span class="val val">xxxxxxx单位</span>
      </div>
    </div>
    <div class="box">
      <div class="lf-box name">目前状态: </div>
      <div class="rt-box val">正常</div>
    </div>
    <div class="box">
      <div class="lf-box">是否参加聚餐集会: </div>
      <div class="rt-box">
        <span class="check active ">是</span>
        <span class="check">否</span>
      </div>
    </div>
    <div class="box">
      <div class="lf-box name">聚餐集会人员姓名: </div>
      <div class="rt-box val">张三</div>
    </div>
    <div class="box">
      <div class="lf-box name">其他人是否有相关不适: </div>
      <div class="rt-box val">暂无</div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    jsonData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>
<style lang="scss" scoped>
.it-wrapper {
  font-size: 0.26rem;
  width: 100%;
  font-weight: bold;
  background: #fafafa;
  // border: 1px solid #000;
  // .val {
  //   font-weight: bold;
  // }
  .box {
    padding: 0.1rem 0.12rem;
    display: flex;
    .sub-box {
      flex: 1;
      .name {
        color: #999;
        padding-right: 0.2rem;
      }
    }
    .lf-box {
      display: inline-block;
      padding-right: 0.2rem;
      &.name {
        color: #999;
      }
    }
    .rt-box {
      display: inline-block;
    }
    .check {
      display: inline-block;
      position: relative;
      vertical-align: middle;
      padding: 0 0.3rem;
      &::before {
        content: "";
        display: inline-block;
        position: relative;
        width: 0.28rem;
        height: 0.28rem;
        background: #d9d9d9;
        border-radius: 50%;
        margin: 0 0.1rem;
        top: 0.05rem;
      }
      &.active::before {
        content: "";
        display: inline-block;
        background: linear-gradient(
          117deg,
          rgba(255, 120, 120, 1),
          rgba(252, 167, 167, 1)
        );
        box-shadow: 0px 8px 21px 0px rgba(255, 124, 124, 0.26);
      }
      &.active::after {
        content: "";
        display: inline-block;
        position: absolute;
        width: 0.1rem;
        height: 0.23rem;
        border: solid #000;
        border-style: solid;
        transform: rotate(30deg);
        border-width: 0 0.06rem 0.06rem 0;
        left: 0.5rem;
        top: -0.05rem;
      }
    }
  }
}
</style>