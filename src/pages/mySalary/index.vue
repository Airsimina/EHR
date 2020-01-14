<template>
  <div class="mySalary">
    <!-- 我的工资 -->
    <div class="wrap-1">
      <cardSearchTime @searchTimeFun='searchTimeMySalaryFun'></cardSearchTime>
      <div class="cantainer">
        <!-- 汇总 -->
        <div class="box"
             v-show="sumSalary.length>0">
          <div class="list-box-1"
               @click="collect()">
            <div class="box1-lis right-lis">
              <div class="top">
                {{this.titleTime}}</div>
              <!-- <div class="bottom">进账金额:10000.00元 </div> -->
            </div>
            <div class="left-lis"
                 :class="{'open':collectShow}"></div>
          </div>
          <div class="list-data"
               v-if="collectShow">
            <div class="row-data"
                 v-for="(item,index) in sumSalary"
                 :key="index">
              <span class="name">{{item.typeName}}</span>
              <span class="val">{{item.value}}</span>
            </div>
          </div>
        </div>
        <!-- 单月 -->
        <div class="box"
             v-for="(item,index) in dataList"
             :key="index">
          <div class="list-box-1"
               @click.stop="open(item,index)">
            <div class="box1-lis right-lis">
              <div class="top">
                <!-- 月工资记录 -->
                {{item.titleName.substr(0,4)}}年
                {{item.titleName.substr(4,2)}}月工资记录
              </div>
              <!-- <div class="bottom">进账金额:10000.00元 </div> -->
            </div>
            <div class="left-lis"
                 :class="{'open':selIndex==index}"></div>
          </div>
          <div class="list-data"
               v-show="selIndex==index">
            <div class="row-data"
                 v-for="(item,index) in item.capSalaryList"
                 :key="index">
              <span class="name">{{item.typeName}}</span>
              <span class="val">{{item.value}}</span>
            </div>
          </div>
        </div>
        <!-- 空数据占位符 -->
        <div class="no-data"
             v-show="dataList.length==0">
          <div class="img-box"></div>
          <div class="text">暂无数据~</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardSearchTime from '@components/card/cardSearchTime'
import HttpEhr from '@requestPool/index.js'
// import testmysalary from '../../testJson/mySalary.js'
export default {
  components: { cardSearchTime },
  props: {},
  data () {
    return {
      selIndex: -1, // 展开的下标
      // 单月数据集合
      dataList: [],
      // 汇总
      sumSalary: [],
      // 控制汇总展开收起
      collectShow: false,
      startTime: '',
      endTime: '',
      titleTime: ''

    }
  },
  methods: {
    // 汇总展开
    collect () {
      this.collectShow = !this.collectShow
    },
    // 展开收起
    open (item, index) {
      if (this.selIndex == index) {
        this.selIndex = -1
        return
      }
      this.selIndex = index
    },
    // 获取我的工资列表
    getMySalaryList () {
      HttpEhr.getMySalaryList({
        userId: this.util.getSession('sessionData').userId || '',
        // userId: '00025608',
        startDate: this.startTime,
        endDate: this.endTime
        // startDate: '2019-01',
        // endDate: '2019-04'
      }).then(res => {
        this.titleTime = `${res.data.startDate.substr(0, 4)}年
                ${res.data.startDate.substr(5, 2)}月 -
                ${res.data.endDate.substr(0, 4)}年
                ${res.data.endDate.substr(5, 2)}月汇总工资记录`
        if (!res.data.detailData) {
          this.dataList = []
        } else {
          this.dataList = res.data.detailData
        }
        if (!res.data.sumSalary) {
          this.sumSalary = []
        } else {
          this.sumSalary = res.data.sumSalary
        }
      })
    },
    // 搜索方法
    searchTimeMySalaryFun (timeData) {
      this.startTime = timeData.startTime
      this.endTime = timeData.endTime
      this.getMySalaryList()
    },
    // 默认时间
    initTime () {
      this.endTime = this.util.setDefaultTime(2)
      this.startTime = this.util.setDefaultTime(2)
    }
  },
  mounted () {
    document.title = '我的工资'
    this.initTime()
    this.getMySalaryList()
    // 测试数据
    // this.dataList = testmysalary.detailData
    // this.sumSalary = testmysalary.sumSalary
    // this.titleTime = `${testmysalary.startDate.substr(0, 4)}年
    //             ${testmysalary.startDate.substr(5, 2)}月 -
    //             ${testmysalary.endDate.substr(0, 4)}年
    //             ${testmysalary.endDate.substr(5, 2)}月汇总工资记录`
  }
}
</script>

<style lang="scss" scoped>
.mySalary {
  font-size: 0.24rem;
  .wrap-1 {
    font-size: 0.24rem;
    position: absolute;
    padding: 0 0.4rem;
    width: 100%;
    box-sizing: border-box;
    .cantainer {
      position: relative;
      margin-top: 2rem;
      .box {
        position: relative;
        &:first-of-type .list-box-1 {
          border-top-left-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
        }
        &:last-of-type .list-box-1 {
          border-bottom-left-radius: 0.2rem;
          border-bottom-right-radius: 0.2rem;
          border: none;
        }
        &:last-of-type .box1-lis {
          border: none;
        }
        &:first-of-type {
          border-top-left-radius: 0.2rem;
          border-top-right-radius: 0.2rem;
        }
        &:last-of-type {
          border-bottom-left-radius: 0.2rem;
          border-bottom-right-radius: 0.2rem;
        }
      }
      .list-box-1 {
        background: #fff;
        font-size: 0.24rem;
        display: flex;
        padding: 0 0.4rem;
        position: relative;
        .box1-lis {
          border-bottom: 1px solid #fafafa;
          background: #fff;
          padding: 0.32rem 0;
          &.right-lis {
            flex: 1;
            .top {
              font-size: 0.28rem;
              font-weight: bold;
              color: rgba(17, 17, 17, 1);
              line-height: 0.5rem;
            }
            .bottom {
              color: rgba(153, 153, 153, 1);
              line-height: 0.4rem;
            }
          }
        }
        .left-lis {
          background: url("../../../static/img/jiantou.png") 0 0 no-repeat;
          background-size: 100% 100%;
          height: 0.34rem;
          width: 0.16rem;
          position: absolute;
          right: 0.2rem;
          top: 50%;
          transform: translate(0, -50%);
          &.open {
            transform-origin: right top;
            transform: rotate(90deg);
          }
        }
      }
      .list-data {
        font-size: 0.24rem;
        width: 90%;
        margin: auto;
        margin-bottom: 0.1rem;
        background: #fff;
        box-sizing: border-box;
        padding: 0.4rem 0.2rem;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;
        box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
        .row-data {
          font-size: 0.24rem;
          display: flex;
          justify-content: space-between;
          &:nth-child(even) {
            background: #fafafa;
          }
          span {
            display: inline-block;
            line-height: 0.7rem;
            // flex: 1;
            &.name {
              color: #999999;
              padding-left: 0.2rem;
              min-width: 1.2rem;
              text-align-last: justify;
              text-align: justify;
            }
            &.val {
              color: #111;
              text-align: right;
              padding-right: 0.2rem;
            }
          }
        }
      }
      .no-data {
        font-size: 0.24rem;
        width: 100%;
        height: 8.06rem;
        background: rgba(255, 255, 255, 1);
        box-shadow: 0px 0.1rem 0.45rem rgba(0, 0, 0, 0.02);
        border-radius: 0.2rem;
        position: relative;
        .img-box {
          width: 2.2rem;
          height: 1.7rem;
          position: relative;
          top: 3.18rem;
          margin: auto;
          background: url("../../../static/img/zwt.png") 0 0 no-repeat;
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
  }
}
</style>