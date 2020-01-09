<template>
  <div class="examine">
    <!-- 我的申请 -->
    <div class="wrap-1">
      <tabApplyRecord :pageTypeVal="pageTypeVal"
                      @classSearchFun='classSearchFun'></tabApplyRecord>
      <van-list v-model="loading"
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
              <span class="val color-b"
                    v-if="item.type=='1'">年假</span>
              <span class="val color-b"
                    v-if="item.type=='2'">病假</span>
              <span class="val color-b"
                    v-if="item.type=='3'">事假</span>
              <span class="val color-b"
                    v-if="item.type=='5'">婚假</span>
              <span class="val color-b"
                    v-if="item.type=='7'">产假</span>
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
          <!-- 1 同意 2 审核中 3 驳回 -->
          <div class="title-status ty"
               v-if="item.status==1">同意</div>
          <div class="title-status spz"
               v-if="item.status==2">审批中</div>
          <div class="title-status bh"
               v-if="item.status==3">驳回</div>
        </div>
      </van-list>
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
        status: '1'
      },
      page: 0,
      showCount: 5,
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
        page: this.page,
        showCount: this.showCount
      }).then(res => {
        console.log(res)
        if (res.data.list.length > 0) {
          this.dataList = this.dataList.concat(res.data.list)
          this.totalPage = res.data.totalPage
          this.loading = false
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
      if (this.$route.query.icon == 'qjtzsq') {
        this.jsonData.status = '1'
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
    created () {
      if (this.$route.query.icon == 'qjtzsq') {
        document.title = '假期调整申请'
        this.pageTypeVal = '2'
      } else {
        document.title = '我的申请'
        this.pageTypeVal = '1'
      }
    }
  },
  mounted () {
    this.initTime()
    // 测试数据
    // this.dataList = testapplyList.data
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
  }
}
</style>