<template>
  <div class="mySalary">
    <!-- 考勤查询 -->
    <div class="wrap-1">
      <cardSearchTime @searchTimeFun='searchTimeChSeFun'></cardSearchTime>
      <div class="cantainer">
        <!-- 汇总 -->
        <div class="box">
          <div class="list-box-1"
               @click="collect()">
            <div class="box1-lis right-lis">
              <div class="top">
                {{this.startTime.substr(0,4)}}年
                {{this.endTime.substr(5,3)}}月
                汇总考勤记录</div>
            </div>
            <div class="left-lis"
                 :class="{'open':collectShow}"></div>
          </div>
          <!-- 总考勤展开记录 -->
          <div class="list-data"
               v-if="collectShow">
            <div class="sub-box">
              <div class="grid-div"
                   v-for="(item,index) in dataList_s"
                   :key="index">
                <div class="num"
                     v-if="item.val!=0"
                     :class="[item.color+'']">{{item.val}}</div>
                <div class="num ccc"
                     v-if="item.val==0">0</div>
                <div class="name">{{item.name}}</div>
              </div>
            </div>
          </div>
        </div>
        <!-- 单月 -->
        <div class="box"
             v-for="(item,index) in dataList"
             :key="index">
          <div class="list-box-1"
               @click="open(item,index)">
            <div class="box1-lis right-lis">
              <div class="top">
                {{item.title.substr(0,4)}}年
                {{item.title.substr(5,2)}}月
                考勤记录
              </div>
            </div>
            <div class="left-lis"
                 :class="{'open':selIndex==index}"></div>
          </div>
          <!-- 单月展开记录 -->
          <div class="list-data"
               v-show="selIndex==index">
            <div class="row-data"
                 v-for="(item,index) in item.subList"
                 :key="index">
              <div class="sublis">
                <span class="name">请假类型 :</span>
                <span class="val color-b"
                      v-if="item.type=='1'">病假</span>
                <span class="val color-b"
                      v-if="item.type=='2'">事假</span>
                <span class="val color-b"
                      v-if="item.type=='3'">产假</span>
                <span class="val color-b"
                      v-if="item.type=='4'">婚假</span>
                <span class="val color-b"
                      v-if="item.type=='5'">丧假</span>
              </div>
              <div class="sublis">
                <span class="name">开始时间 :</span>
                <span class="val">{{item.startDate}}</span>
              </div>
              <div class="sublis">
                <span class="name">结束时间 :</span>
                <span class="val">{{item.endDate}}</span>
              </div>
              <div class="sublis">
                <span class="name">请假时长 :</span>
                <span class="val">{{item.sum}}/天</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import cardSearchTime from '@components/card/cardSearchTime'
import HttpEhr from '@requestPool/index.js'
import checkData from '../../../testJson/checkSeek.js'
// import util from '../../../util/util.js'

export default {
  components: { cardSearchTime },
  props: {},
  data () {
    return {
      typeVal: '1', // 考勤记录查询
      collectShow: false, // 展开和收起
      selIndex: -1, // 展开的下标
      // 单月数据集合
      dataList: [],
      // 总考勤数据集合
      dataList_s: [
        { val: 0, color: 'c-1', name: '事假(天)' },
        { val: 0, color: 'c-2', name: '病假(天)' },
        { val: 0, color: 'c-3', name: '婚假(天)' },
        { val: 0, color: 'c-4', name: '产假(天)' },
        { val: 0, color: 'c-5', name: '丧假(天)' },
        { val: 0, color: 'c-2', name: '年休假(天)' },
        { val: 0, color: 'c-1', name: '工伤假(天)' },
        { val: 0, color: 'c-5', name: '护理假(天)' }
      ],
      startTime: '',
      endTime: '',
      formData: {
        funeralLeave: '', // 丧假天数
        nursingLeave: '', // 护理假天数
        maternityLeave: '', // 产假
        marriageLeave: '', // 婚假
        injuryLeave: '', // 工伤假
        compassionateLeave: '', // 事假
        sickLeave: '', // 病假val:
        annualLeave: '' // 年假
      }
    }
  },
  methods: {
    // 汇总展开
    collect () {
      this.collectShow = !this.collectShow
    },
    // 展开
    open (item, index) {
      if (this.selIndex == index) {
        this.selIndex = -1
        return
      }
      this.selIndex = index
    },
    // 我的考勤列表
    getcheckSeekList () {
      HttpEhr.getcheckSeekList({
        userId: this.util.getSession('sessionData').userId || '',
        startDate: this.startTime,
        endtDate: this.endTime
      }).then(res => {
        console.log(res)
        this.formData = res.datas.formData
        this.setVal(this.formData)
        this.dataList = res.datas.list
      })
    },
    setVal (datas) {
      this.dataList_s[0].val = this.formData.compassionateLeave // 事假
      this.dataList_s[1].val = this.formData.sickLeave // 病假
      this.dataList_s[2].val = this.formData.marriageLeave // 婚假
      this.dataList_s[3].val = this.formData.maternityLeave // 产假
      this.dataList_s[4].val = this.formData.funeralLeave // 丧假天数
      this.dataList_s[5].val = this.formData.annualLeave// 年假
      this.dataList_s[6].val = this.formData.injuryLeave // 工伤假
      this.dataList_s[7].val = this.formData.nursingLeave // 护理假天数
    },
    // 搜索方法
    searchTimeChSeFun (timeData) {
      console.log(timeData)
      this.startTime = timeData.startTime
      this.endTime = timeData.endTime
      // this.getcheckSeekList()
    },
    // 获取默认时间
    getdate (type) {
      const date = new Date()
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      if (type == 1) {
        return `${y}年${m}月`
      } else {
        return `${y}-${m}`
      }
    }
  },
  created () { },
  mounted () {
    document.title = '考勤查询'
    this.startTime = this.getdate(2)
    this.endTime = this.getdate(2)
    // 测试数据
    // this.formData = checkData.formData
    // this.setVal(checkData.formData)
    // this.dataList = checkData.list
    this.getcheckSeekList()
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
      margin-top: 2rem;
      &::-webkit-scrollbar {
        display: none;
      }
      .box {
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
          }
        }
        .left-lis {
          background: url("../../../../static/img/jiantou.png") 0 0 no-repeat;
          background-size: 100% 100%;
          height: 0.34rem;
          width: 0.16rem;
          position: absolute;
          right: 0.2rem;
          top: 50%;
          transform: translate(0, -50%);
          &.open {
            transform: rotate(90deg);
          }
        }
      }
      .list-data {
        font-size: 0.24rem;
        width: 90%;
        margin: auto;
        padding: 0 0.2rem;
        background: #fff;
        box-sizing: border-box;
        box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
        margin-bottom: 0.1rem;
        border-bottom-left-radius: 0.2rem;
        border-bottom-right-radius: 0.2rem;

        .row-data {
          font-size: 0.24rem;
          border-bottom: 1px solid #fafafa;
          &:last-of-type {
            border: none;
            border-bottom-left-radius: 0.2rem;
            border-bottom-right-radius: 0.2rem;
          }
          .sublis {
            display: flex;
            span {
              display: inline-block;
              line-height: 0.7rem;
              &.name {
                color: #333333;
                padding-left: 0.2rem;
                flex: 1;
                font-weight: bold;
              }
              &.val {
                color: #666666;
                flex: 3;
              }
              &.color-b {
                color: #5576ab;
              }
            }
          }
        }
        .sub-box {
          display: flex;
          justify-content: space-between;
          flex-direction: row;
          flex-wrap: wrap;
          box-sizing: border-box;
          padding: 0.4rem 0;
          .grid-div {
            height: 1rem;
            border: 1px solid transparent;
            width: 25%;
            box-sizing: border-box;
            text-align: center;
            .num {
              font-size: 0.28rem;
              font-weight: bold;
            }
            .name {
              font-size: 0.22rem;
              color: #999999;
              padding: 0.2rem 0;
            }
            .c-1 {
              color: #01c700;
            }
            .c-2 {
              color: #fdb123;
            }
            .c-3 {
              color: #ff8aa9;
            }
            .c-4 {
              color: #ed5d4a;
            }
            .c-5 {
              color: #4b96f9;
            }
            .ccc {
              color: #cccccc;
            }
          }
        }
      }
    }
  }
}
</style>