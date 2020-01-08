<template>
  <div class="leaveRequest">
    <!-- 销假申请 -->
    <div class="wrap-1">
      <div class="cantainer">
        <div class="box">
          <div class="title">销假申请</div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">销假类型</div>
            </div>
            <div class="lis-r"
                 @click="isPopShowType=true">
              <div class="div-val-1">{{leaveType}}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis icon-jt">
            <div class="lis-f">
              <div class="div-name-1">开始时间</div>
            </div>
            <div class="lis-r"
                 @click="showDatePicker(0)">
              <div class="div-val-1">{{startTime}}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">结束时间</div>
            </div>
            <div class="lis-r"
                 @click="showDatePicker(1)">
              <div class="div-val-1">{{startTime}}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">销假时长</div>
            </div>
            <div class="lis-r">
              <input type="text"
                     class="input-time"
                     placeholder="请输入时长"
                     v-model="duration">
              <span class="dw">/小时</span>
            </div>

          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">销假理由</div>
            </div>
            <div class="lis-r">
              <input type="text"
                     class="input-time"
                     placeholder="请输入请假事由"
                     v-model="reason"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="commit-btn">提交</div>
    <!-- 开始 结束时间 -->
    <van-popup v-model="isPopShow"
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '40%' }">
      <!-- <div class="popup-title">{{popupTitle}}</div> -->
      <van-datetime-picker v-model="currentDate"
                           @cancel="cancelPicker"
                           @confirm="confirmPicker"
                           type="year-month"
                           :title="popupTitle"
                           :formatter="formatter" />
    </van-popup>
    <!-- 类型 -->
    <van-popup v-model="isPopShowType"
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '40%' }">
      <van-picker show-toolbar
                  :columns="columns"
                  title="选择请假类型"
                  @cancel="onCancel"
                  @confirm="onConfirm" />
    </van-popup>

  </div>
</template>
<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      duration: '', // 请假时长
      reason: '', // 理由
      leaveType: '' || '请选择', // 请假类型
      fileList: [],
      popupTitle: '',
      currentDate: new Date(),
      datePicker: 0, // 用于判断哪个选择器的显示与隐藏
      isPopShow: false, // 弹出层隐藏与显示
      startTime: '', // 开始时间
      endTime: '', // 结束时间,
      isPopShowType: false,
      columns: [
        {
          id: '1',
          text: '事假'
        },
        {
          id: '2',
          text: '病假'
        },
        {
          id: '3',
          text: '年假'
        },
        {
          id: '4',
          text: '婚假'
        },
        {
          id: '5',
          text: '产假'
        }
      ]

    }
  },
  watch: {},
  computed: {},
  methods: {
    // 弹出层并显示时间选择器 0: 开始 1: 结束
    showDatePicker (picker) {
      this.isPopShow = true
      this.datePicker = picker
      if (this.datePicker) {
        this.popupTitle = '选择结束日期'
      } else {
        this.popupTitle = '选择开始日期'
      }
    },
    // 选择器取消按钮点击事件
    cancelPicker () {
      this.isPopShow = false
      this.datePicker = ''
    },
    // 确定按钮，时间格式化并显示在页面上
    confirmPicker (value) {
      // console.log(value)
      const date = value
      let m = date.getMonth() + 1
      let d = date.getDate()
      if (m >= 1 && m <= 9) {
        m = '0' + m
      }
      if (d >= 0 && d <= 9) {
        d = '0' + d
      }
      if (this.datePicker) {
        this.endTime = date.getFullYear() + '年' + m + '月'
      } else {
        this.startTime = date.getFullYear() + '年' + m + '月'
      }

      this.isPopShow = false
    },
    // 格式化选择器日期
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      }
      return value
    },
    // 获取默认时间
    getdate () {
      const date = new Date()
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      m = m < 10 ? '0' + m : m
      return `${y}年${m}月`
    },
    // 类型选择
    onConfirm (value, index) {
      console.log(`当前值：${value}, 当前索引：${index}`)
    },
    onCancel () {
      console.log('取消')
      this.isPopShowType = false
    }
  },
  mounted () {
    document.title = '考勤查询'
    this.endTime = this.getdate()
    this.startTime = this.getdate()
  }
}
</script>
<style lang="scss" scoped>
.leaveRequest {
  font-size: 0.24rem;
  .wrap-1 {
    font-size: 0.24rem;
    position: relative;
    margin: 0 0.4rem;
    margin-top: 2rem;
    z-index: 110;
    .cantainer {
      overflow: auto;
      overflow-x: hidden;
      overflow-y: scroll;
      position: relative;
      &::-webkit-scrollbar {
        display: none;
      }
      .box {
        position: relative;
        padding: 0.5rem 0.6rem;
        background: #fff;
        border-radius: 0.2rem;
        .title {
          font-size: 0.32rem;
          font-weight: bold;
          padding: 0.2rem 0;
        }
        .lis {
          padding: 0.25rem 0;
          position: relative;
          border-bottom: 1px solid #fafafa;
          display: flex;
          div {
            display: inline-block;
          }
          .lis-f {
            flex: 2;
            .div-name-1 {
              font-size: 0.28rem;
              color: #666666;
            }
          }
          .lis-r {
            flex: 5;
            position: relative;
            .div-val-1 {
              font-size: 0.3rem;
              color: #999;
            }
            .icon-jt {
              width: 0.12rem;
              height: 0.24rem;
              position: absolute;
              right: 0;
              top: 0.1rem;
              background: url("../../../../static/img/jiantou.png") 0 0
                no-repeat;
              background-size: 100% 100%;
            }
            .input-time {
              display: inline-block;
              width: 2.5rem;
              border: none;
              font-size: 0.3rem;
              line-height: 0.3rem;
              color: #999;
              &::-webkit-input-placeholder {
                color: #999;
              }
            }
            span {
              display: inline-block;
              position: absolute;
              right: 0;
              color: #999;
              font-size: 0.3rem;
            }
          }
        }
      }
    }
  }
  .commit-btn {
    width: 4.8rem;
    line-height: 0.9rem;
    background: linear-gradient(
      320deg,
      rgba(81, 140, 241, 1) 0%,
      rgba(121, 162, 249, 1) 100%
    );
    box-shadow: 0px 10px 20px rgba(85, 118, 171, 0.16);
    border-radius: 0.46rem;
    font-size: 0.32rem;
    font-weight: bold;
    color: rgba(255, 255, 255, 1);
    text-align: center;
    margin: auto;
    margin-top: 1rem;
  }
}
</style>