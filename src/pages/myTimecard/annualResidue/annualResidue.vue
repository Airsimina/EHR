<template>
  <div class="annualResidue">
    <!-- 请假申请 -->
    <div class="wrap-1">
      <div class="content">
        <!-- <div class="titile">年假余额</div> -->
        <div class="list-data">
          <div class="sub-box">
            <div class="grid-div">
              <!-- :class="{'ccc' :item.a=='0'}" -->
              <div class="num">{{fixationNum}}</div>
              <div class="name">定额(天)</div>
            </div>
          </div>
          <!-- <div class="sub-box">
            <div class="grid-div">
              <div class="num">{{lastBalanceNum}}</div>
              <div class="name">上年结余(天)</div>
            </div>
          </div>-->
          <div class="sub-box">
            <div class="grid-div">
              <div class="num orange">{{fulfillNum}}</div>
              <div class="name">已休(天)</div>
            </div>
          </div>
          <div class="sub-box">
            <div class="grid-div">
              <div class="num blue">{{residueNum}}</div>
              <div class="name">剩余(天)</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="record">
      <div class="record-title">
        <img src="../../../../static/img/jilu.png" alt />
      </div>
      <record-list :recordList="recordList"></record-list>
    </div>
    <!-- 空数据占位符 -->
    <div class="no-data" v-show="recordList.length==0">
      <div class="img-box"></div>
      <div class="text">暂无数据~</div>
    </div>
  </div>
</template>

<script>
import recordList from '@components/recordList/index.vue'
import HttpEhr from '@requestPool/index.js'
export default {
  props: {},
  data () {
    return {
      fixationNum: '0', // 定额
      fulfillNum: '0', // 已休
      residueNum: '0', // 剩余
      lastBalanceNum: '0', // 上年结余
      recordList: [] // 年休详情
    }
  },
  watch: {},
  computed: {},
  methods: {
    annualResidue () {
      HttpEhr.annualResidue({
        userId: this.util.getSession('ehrSessionData').userId || '',
        startDate: this.startTime,
        endtDate: this.endTime
      }).then(res => {
        console.log('上年结余', res)
        this.fixationNum = res.data.quota // 定
        this.lastBalanceNum = res.data.lastYear // 上
        this.fulfillNum = res.data.cease // 已
        this.residueNum = res.data.surplus // 剩
      })
    },
    getVacationList () {
      HttpEhr.getVacationList2({
        type: '1',
        userId: this.util.getSession('ehrSessionData').userId || '',
      }).then(res => {
        if (res.data) {
          this.recordList = res.data.filter(item => item.type == 1)
        }
      })
    }
  },
  created () {
  },
  mounted () {
    document.title = '年休详情'
    this.annualResidue()
    this.getVacationList()
  },
  components: {
    recordList
  }
}
</script>

<style lang="scss" scoped>
.annualResidue {
  font-size: 0.24rem;
  padding: 0.4rem;
  .wrap-1 {
    font-size: 0.24rem;
    padding-top: 0.2rem;
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
      z-index: 200;
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
            font-size: 0.48rem;
            font-weight: bold;
            font-family: "DINPro-Medium";
            color: #111;
            &.ccc {
              color: #cccccc;
            }
          }
          .orange {
            color: #eaa943;
          }
          .blue {
            color: #438aea;
          }
          .name {
            font-size: 0.24rem;
            color: #999;
            padding: 0.2rem 0;
            position: relative;
          }
        }
      }
    }
  }
  .record {
    .record-title {
      padding: 0.3rem 0;
      width: 1.25rem;
      height: 0.33rem;
    }
  }
  .no-data {
    font-size: 0.24rem;
    width: 100%;
    height: 8.8rem;
    background: rgba(255, 255, 255, 1);
    box-shadow: 0px 0.1rem 0.45rem rgba(0, 0, 0, 0.02);
    border-radius: 0.2rem;
    .img-box {
      width: 2.2rem;
      height: 1.7rem;
      position: relative;
      top: 3.18rem;
      margin: auto;
      background: url("../../../../static/img/zwt.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .text {
      color: #999999;
      font-size: 0.3rem;
      text-align: center;
      position: relative;
      top: 3.45rem;
    }
  }
}
</style>