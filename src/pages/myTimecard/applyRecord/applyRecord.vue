<template>
  <div class="examine">
    <!-- 我的申请 -->
    <div class="wrap-1">
      <tabApplyRecord :pageTypeVal="pageTypeVal"
                      @classSearchFun='classSearchFun'></tabApplyRecord>
      <van-list v-model="loading"
                v-if="dataList.length>0"
                :finished="finished"
                finished-text="我也是有底线的"
                @load="updateList">
        <div class="list-data"
             @click="recordMoreFun(item)"
             v-for="(item,index) in dataList"
             :key="index">
          <div class="title">{{item.dataType=='1' ? '请假申请':'假期调整申请'}}</div>
          <div class="row-data">
            <!-- // 请假类型1、年休2、病假3、事假4、工伤假5、婚假6、产假7、护理假8、丧假 -->
            <div class="sublis">
              <span class="name">请假类型 :</span>
              <span class="val color-b">{{util.getLeaveVal(item.type)}}</span>
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
            <div class="sublis"
                 v-if="JSON.parse(item.dates).length>0">
              <span class="name">请假日期 :</span>
              <span class="val">{{JSON.parse(item.dates).toString()}}</span>
            </div>
          </div>
          <!-- 1 同意 2 审核中 3 驳回 -->
          <div class="title-status"
               :class="[getStatusTxt(item.status).sty]">{{getStatusTxt(item.status).txt}}</div>
        </div>
      </van-list>
      <!-- 空数据占位符 -->
      <div class="no-data"
           v-show="dataList.length==0">
        <div class="img-box"></div>
        <div class="text">暂无数据~</div>
      </div>
    </div>
  </div>
</template>

<script>
import tabApplyRecord from '@components/tabNav/tabApplyRecord'
import HttpEhr from '@requestPool/index.js'
// import testapplyList from '../../../testJson/applyList.js'
// import util from '../../../util/util.js'

export default {
  components: { tabApplyRecord },
  props: {},
  data () {
    return {
      pageTypeVal: '1', // 1:我的申请 2:假期调整申请
      dataList: [],
      jsonData: {
        startDate: '',
        endDate: '',
        type: '1',
        status: '2'
      },
      page: 1, // 当前页
      showCount: 10, // 当前页显示多少条
      totalPage: -1, // 总页数
      finished: false,
      loading: false
    }
  },
  methods: {
    // 详情
    recordMoreFun (itemData) {
      this.$router.push({
        name: 'leaveApply',
        query: {
          id: itemData.id, // 数据id
          dataType: itemData.dataType, // 请假  销假
          type: itemData.type // 请假类型
        }
      })
    },
    // 获取我的申请列表数据
    getApplyRecordList () {
      HttpEhr.getApplyRecordList({
        userId: this.util.getSession('sessionData').userId || '',
        startDate: this.jsonData.startTime,
        endDate: this.jsonData.endTime,
        type: this.jsonData.type,
        status: this.jsonData.status,
        pageNum: this.page,
        showSize: this.showCount
      }).then(res => {
        if (res.data.rows.length > 0) {
          this.dataList = this.dataList.concat(res.data.rows)
          this.totalPage = res.data.pages
          this.loading = false
          this.finished = false
        } else {
          this.finished = true
          this.loading = false
        }
      })
    },
    // 搜索
    classSearchFun (subData) {
      console.log(subData)
      this.page = 1
      this.totalPage = -1
      this.jsonData.startTime = subData.startTime
      this.jsonData.endTime = subData.endTime
      this.jsonData.type = subData.type
      this.dataList = []
      if (this.$route.query.icon == 'qjtzsq') {
        this.jsonData.status = '3'
      } else {
        this.jsonData.status = subData.status
      }
      this.getApplyRecordList()
    },
    // 上拉加载
    updateList () {
      // if (this.page == this.totalPage) {
      //   this.loading = false
      //   this.finished = true
      //   return
      // }
      this.page++
      this.getApplyRecordList()
    },
    // 默认时间
    initTime () {
      this.jsonData.endTime = this.util.setDefaultTime(2)
      this.jsonData.startTime = this.util.setDefaultTime(2)
    },
    // 获取状态文本
    getStatusTxt (type) {
      if (type == 3) {
        return { txt: '同意', sty: 'ty' }
      } else if (type == 2) {
        return { txt: '审批中', sty: 'spz' }
      } else if (type == 4) {
        return { txt: '驳回', sty: 'bh' }
      }
    }
  },
  created () {
    if (this.$route.query.icon == 'qjtzsq') {
      document.title = '假期调整申请'
      this.pageTypeVal = '2'
      this.jsonData.status = '3'
    } else {
      document.title = '我的申请'
      this.pageTypeVal = '1'
      this.jsonData.status = '2'
    }
    this.initTime()
    this.getApplyRecordList()
  },
  mounted () {

    // 测试数据
  }
}
</script>

<style lang="scss" scoped>
.examine {
  font-size: 0.24rem;
  .wrap-1 {
    font-size: 0.24rem;
    position: absolute;
    padding: 0 0.4rem;
    width: 100%;
    box-sizing: border-box;

    .list-data {
      font-size: 0.24rem;
      width: 100%;
      margin: auto;
      padding: 0.4rem;
      background: #fff;
      box-sizing: border-box;
      box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.1);
      margin-bottom: 0.4rem;
      border-radius: 0.2rem;
      .title {
        font-size: 0.32rem;
        font-weight: bold;
        padding: 0.2rem 0;
      }
      .title-status {
        font-size: 0.32rem;
        font-weight: bold;
        padding: 0.2rem 0;
        border-top: 1px solid #fafafa;
        &.bh {
          color: #ff8500;
        }
        &.spz {
          color: #5576ab;
        }
        &.ty {
          color: #cccccc;
        }
      }
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
    }
    .no-data {
      font-size: 0.24rem;
      width: 100%;
      height: 8.8rem;
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
}
</style>