<template>
  <div class="leaveApply">
    <!-- 请假申请详情 -->
    <div class="wrap-1">
      <cardMyMessage :title="title"
                     :keyName="keyName"
                     :userNumber="userNumber"></cardMyMessage>
      <div class="cantainer">
        <div class="box">
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">开始时间</div>
            </div>
            <div class="lis-r">
              <span>{{startTime}}</span>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">结束时间</div>
            </div>
            <div class="lis-r">
              <span>{{endTime}}</span>
            </div>
          </div>
          <!-- <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">请假具体日期</div>
            </div>
            <div class="lis-r">
              <span>{{dates}}</span>
            </div>
          </div> -->
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">请假时长</div>
            </div>
            <div class="lis-r">
              <span>{{numDay}} 天</span>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">图片</div>
            </div>
            <div class="lis-r">
              <div class="img-box"
                   v-for="(item,index) in imgList"
                   :key="index">
                <img :src="item"
                     @click="viewImg(index)"
                     alt="">
              </div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">请假理由</div>
            </div>
            <div class="lis-r">
              <span>{{reason}}</span>
            </div>
          </div>
        </div>
      </div>
      <div class="lis-title">
        <span>审批流程</span>
      </div>
      <!-- 流程区域 -->
      <div class="flow-box">
        <div class="flow-item"
             v-for="(item, index) in flowHiComments"
             :key="index">
          <!-- 销售计划 左侧时间线 -->
          <div :class="[getStatus(item.operateType)]"
               class="state"></div>
          <div class="flow-info">
            <div class="name-box">
              <div class="flow-name">{{item.operaterName}}</div>
              <div class="position">{{item.nodeName}}</div>
            </div>
            <div class="approval-info"
                 v-if="item.operateType=='驳回'">意见：{{item.opinion}}</div>
            <div class="time">{{item.operateTime}}</div>
            <!-- 销售计划 右侧展示文字 -->
            <div :class="[getStatus(item.operateType)]"
                 class="status">{{item.operateType}}</div>
          </div>
        </div>
      </div>
      <!-- 底部按钮 -->
      <div class="footer-box">
        <div class="btn edit-btn">
          <span @click="editFun('1')"
                class="btn xj-btn"
                :class="{'forbid':editFlag=='2'}">修改</span>
        </div>
        <div class="btn xj-btn"
             :class="{'forbid':removeFlag=='2'}">
          <span @click="editFun('2')">销假</span>
        </div>
        <div class="btn "></div>
      </div>
    </div>
  </div>
</template>

<script>
import cardMyMessage from '@components/card/cardMyMessage'
import HttpEhr from '@requestPool/index.js'
import { ImagePreview } from 'vant'
// import util from '../../../util/util.js'

export default {
  components: { cardMyMessage },
  props: {},
  data () {
    return {
      userNumber: '',
      title: '',
      keyName: '请假类型',
      flowHiComments: [], // 流程
      imgList: [], // 图片集合
      startTime: '',
      endTime: '',
      numDay: 0, // 时长
      reason: '', // 理由
      editFlag: '2', // 1、正常使用 2、无法使用
      removeFlag: '2', // 1、正常使用 2、无法使用
      dataId: '', // 数据id
      dataType: '', // 1:请假 2:销假
      itemData: {},
      dates: ''
    }
  },
  methods: {
    getStatus (typeTxt) {
      if (typeTxt == '提交') {
        return 'blue'
      } else if (typeTxt == '未审核') {
        return 'grey'
      } else if (typeTxt == '待审核') {
        return 'green'
      } else if (typeTxt == '驳回') {
        return 'orange'
      }
    },
    // 1 修改和 2销假跳转
    editFun (flag) {
      if ((flag == '1' && this.editFlag == '1') || (flag == '2' && this.removeFlag == '1')) {
        this.$router.push({
          name: 'leaveRequest',
          query: {
            id: this.dataId,
            flag: flag,
            itemData: this.itemData
          }
        })
      }
    },
    // 获取详情数据
    leaveApplyDetail () {
      HttpEhr.leaveApplyDetail({
        userId: this.util.getSession('sessionData').userId || '',
        dataId: this.dataId,
        formType: this.dataType
      }).then(res => {
        this.flowHiComments = res.data.flowData.flowMobileHiComments
        this.itemData = res.data.formData
        this.dataType = this.itemData.dataType
        this.startTime = this.itemData.startDate
        this.endTime = this.itemData.endDate
        this.numDay = this.itemData.sum
        this.reason = this.itemData.note
        this.dates = JSON.stringify(this.itemData.datas)
        this.imgList = JSON.parse(this.itemData.url)
        this.editFlag = this.itemData.editFlag
        this.removeFlag = this.itemData.removeFlag
      })
    },
    // 图片预览
    viewImg (index) {
      ImagePreview(
        {
          images: this.imgList,
          startPosition: index
        }
      )
    }
  },
  mounted () {
    this.dataId = this.$route.query.id // 数据id  原请假id
    this.dataType = this.$route.query.dataType
    this.userNumber = this.util.getLeaveVal(this.$route.query.type)
    if (this.dataType == '1') {
      this.title = '请假申请'
    } else if (this.dataType == '2') {
      this.title = '请假调整申请'
    }
    document.title = this.title
    this.leaveApplyDetail()
  }
}
</script>

<style lang="scss" scoped>
.leaveApply {
  font-size: 0.24rem;
  .wrap-1 {
    font-size: 0.24rem;
    position: absolute;
    padding: 0 0.4rem;
    width: 100%;
    box-sizing: border-box;
    .card-box {
      z-index: 101;
    }
    .cantainer {
      position: relative;
      margin-top: 2.5rem;
      .box {
        position: relative;
        padding: 0.5rem 0.6rem;
        background: #fff;
        border-radius: 0.2rem;
        .lis {
          padding: 0.15rem 0;
          position: relative;
          display: flex;
          div {
            display: inline-block;
          }
          .lis-f {
            flex: 2;
            .div-name-1 {
              font-size: 0.28rem;
              color: #111111;
              font-weight: bold;
              text-align-last: justify;
              text-align: justify;
              min-width: 1.2rem;
            }
          }
          .lis-r {
            flex: 5;
            position: relative;
            .div-val-1 {
              font-size: 0.3rem;
              color: #999;
            }
            span {
              display: inline-block;
              color: #999;
              font-size: 0.3rem;
            }
            .img-box {
              box-sizing: border-box;
              width: 32%;
              height: 1.3rem;
              padding: 0rem 0.1rem 0.2rem 0.1rem;
              vertical-align: middle;
              img {
                width: 100%;
                height: 100%;
              }
            }
          }
        }
      }
    }
    .lis-title {
      font-size: 0.32rem;
      font-weight: bold;
      margin-bottom: 0.4rem;
      margin-top: 0.4rem;
      position: relative;
      span {
        display: inline-block;
        position: relative;

        &::before {
          content: "";
          display: inline-block;
          position: absolute;
          width: 0.3rem;
          height: 0.3rem;
          background: rgb(135, 182, 248);
          border-radius: 50%;
          right: -0.1rem;
          bottom: -0.1rem;
          opacity: 0.5;
        }
      }
    }

    .flow-box {
      margin-top: 0.4rem;
      margin-bottom: 1rem;
      .flow-item {
        display: flex;
        align-items: center;
        position: relative;
        padding-bottom: 0.3rem;
        box-sizing: border-box;
        transition: all 0.3s;
        &::before {
          content: " ";
          width: 1px;
          height: 100%;
          background: #ccc;
          position: absolute;
          left: 0.17rem;
          top: 50%;
        }

        &:last-child {
          &::before {
            height: 0;
            width: 0;
          }
        }

        .state {
          display: block;
          width: 0.34rem;
          height: 0.34rem;
          &.grey {
            background-image: url("../../../../static/img/grey@2x.png");
            background-size: 100% 100%;
          }
          &.blue {
            background-image: url("../../../../static/img/blue@2x.png");
            background-size: 100% 100%;
          }
          &.green {
            background-image: url("../../../../static/img/green@2x.png");
            background-size: 100% 100%;
          }
          &.orange {
            background-image: url("../../../../static/img/orange.png");
            background-size: 100% 100%;
          }
        }

        .flow-info {
          flex: 1;
          box-sizing: border-box;
          padding: 0.15rem 0.44rem 0.2rem 0.6rem;
          background: rgba(255, 255, 255, 1);
          box-shadow: 0 0 0.44rem 0.05rem rgba(0, 0, 0, 0.03);
          border-radius: 0.2rem;
          margin-left: 0.4rem;
          position: relative;

          &::before {
            content: " ";
            width: 0;
            height: 0;
            border-width: 0.1rem;
            border-style: solid;
            border-color: transparent #fff transparent transparent;
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateX(-100%) translateY(-50%);
          }

          .name-box {
            display: flex;
            align-items: center;
            line-height: 0.26rem;
            margin-top: 0.25rem;
            .flow-name {
              color: #333;
              font-size: 0.26rem !important;
              font-weight: bold;
            }

            .position {
              color: #666;
              font-size: 0.22rem;
              font-weight: 400;
              margin-left: 0.12rem;
            }
          }

          .time {
            font-size: 0.22rem;
            line-height: 1;
            color: #b0b0b0;
            margin-top: 0.25rem;
          }

          .approval-info {
            margin-top: 0.2rem;
            color: #b0b0b0;
            line-height: 1;
            font-size: 0.22rem;
          }

          .status {
            position: absolute;
            right: 0.28rem;
            top: 50%;
            transform: translateY(-50%);
            width: 1.14rem;
            height: 0.48rem;
            font-size: 0.27rem;
            font-weight: bold;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 0.24rem;
            &.grey {
              color: #999999;
            }
            &.blue {
              color: #5576ab;
            }
            &.green {
              color: #44bc82;
            }
            &.orange {
              color: #ff8500;
            }
          }
        }
      }
    }
    .footer-box {
      width: 100%;
      box-sizing: border-box;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px -11px 49px rgba(0, 0, 0, 0.06);
      position: fixed;
      display: flex;
      bottom: 0;
      left: 0;
      padding: 0.22rem;
      height: 1rem;
      .btn {
        flex: 1;
        text-align: center;

        span {
          width: 1.6rem;
          display: inline-block;
          line-height: 27px;
          border-radius: 0.54rem;
          color: #fff;
          font-size: 0.32rem;
          text-align: center;
        }
        &.forbid {
          opacity: 0.4;
        }
        &.edit-btn {
          span {
            background: rgba(85, 118, 171, 1);
          }
        }
        &.xj-btn {
          span {
            background: #ff8500;
          }
        }
      }
    }
  }
}
</style>