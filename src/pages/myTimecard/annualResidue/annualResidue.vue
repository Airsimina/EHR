<template>
  <div class="annualResidue">
    <!-- 请假申请 -->
    <div class="wrap-1">
      <div class="content">
        <div class="titile">年假余额</div>
        <div class="list-data">
          <div class="sub-box">
            <div class="grid-div">
              <!-- :class="{'ccc' :item.a=='0'}" -->
              <div class="num">{{fixationNum}}</div>
              <div class="name">本年定额(天)</div>
            </div>
          </div>
          <div class="sub-box">
            <div class="grid-div">
              <!-- :class="{'ccc' :item.a=='0'}" -->
              <div class="num">{{lastBalanceNum}}</div>
              <div class="name">上年结余(天)</div>
            </div>
          </div>
          <div class="sub-box">
            <div class="grid-div">
              <div class="num">{{fulfillNum}}</div>
              <div class="name">本年已休(天)</div>
            </div>
          </div>
          <div class="sub-box">
            <div class="grid-div">
              <div class="num">{{residueNum}}</div>
              <div class="name">剩余(天)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HttpEhr from "@requestPool/index.js"
export default {
  props: {},
  data() {
    return {
      fixationNum: "0", // 定额
      fulfillNum: "0", // 已休
      residueNum: "0", // 剩余
      lastBalanceNum: "0" // 上年结余
    }
  },
  watch: {},
  computed: {},
  methods: {
    annualResidue() {
      HttpEhr.annualResidue({
        userId: this.util.getSession("ehrSessionData").userId || "",
        startDate: this.startTime,
        endtDate: this.endTime
      }).then(res => {
        console.log("上年结余", res)
        this.fixationNum = res.data.quota // 定
        this.lastBalanceNum = res.data.lastYear // 上
        this.fulfillNum = res.data.cease // 已
        this.residueNum = res.data.surplus // 剩
      })
    }
  },
  created() {},
  mounted() {
    document.title = "年假余额"
    this.annualResidue()
  }
}
</script>

<style lang="scss" scoped>
.annualResidue {
  font-size: 0.24rem;
  .wrap-1 {
    font-size: 0.24rem;
    position: absolute;
    padding: 0 0.4rem;
    width: 100%;
    box-sizing: border-box;
    .content {
      position: relative;
      font-size: 0.24rem;
      margin: auto;
      padding: 0 0.2rem;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
      margin-bottom: 0.1rem;
      border-radius: 0.2rem;
      z-index: 110;
      border: 1px solid transparent;
    }
    .titile {
      line-height: 0.44rem;
      font-size: 0.32rem;
      font-weight: bold;
      color: rgba(17, 17, 17, 1);
      letter-spacing: 0.1rem;
      margin-top: 0.5rem;
      margin-left: 0.6rem;
    }
    .list-data {
      display: flex;
      .sub-box {
        flex: 1;
        display: flex;
        box-sizing: border-box;
        padding: 0.4rem 0;
        .grid-div {
          flex: 1;
          height: 1rem;
          border: 1px solid transparent;
          width: 30%;
          box-sizing: border-box;
          text-align: center;
          .num {
            font-size: 0.28rem;
            font-weight: bold;
            font-family: "DINPro-Medium";
            color: #111;
            &.ccc {
              color: #cccccc;
            }
          }
          .name {
            font-size: 0.22rem;
            color: #999;
            padding: 0.2rem 0;
            position: relative;
          }
        }
      }
    }
  }
}
</style>