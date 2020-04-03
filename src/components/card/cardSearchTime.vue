 <template>
  <div class="card-box">
    <div class="nav-content">
      <div class="nav-lis right">
        <span class="right-lis"
              @click="showDatePicker(0)">{{startTime}}</span>
        <span>至</span>
        <span class="right-lis"
              @click="showDatePicker(1)">{{endTime}}</span>
      </div>
      <div class="nav-lis left">
        <span @click="searchFun">查询</span>
      </div>
    </div>
    <van-popup v-model="isPopShow"
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate"
                           :title="popupTitle"
                           @cancel="cancelPicker"
                           @confirm="confirmPicker"
                           type="year-month"
                           :formatter="formatter" />
    </van-popup>
    <!-- <van-calendar v-model="isPopShow"
                  @confirm="confirmPicker"
                  :title="popupTitle"
                  :min-date="minDate"
                  :max-date="maxDate"
                  :default-date="currentDate"
                  @cancel="cancelPicker" /> -->
  </div>
</template>

<script>
export default {
  data () {
    return {
      minDate: new Date(2019, 0, 1),
      maxDate: new Date(2040, 0, 31),
      popupTitle: '',
      currentDate: new Date(), // 时间默认值
      datePicker: 0, // 用于判断哪个选择器的显示与隐藏
      isPopShow: false, // 弹出层隐藏与显示
      startTime: '', // 开始时间
      endTime: '', // 结束时间
      startTimeVal: '', // 开始时间
      endTimeVal: '' // 结束时间
    }
  },
  methods: {
    // 搜索方法
    searchFun () {
      this.$emit('searchTimeFun', { endTime: this.endTimeVal, startTime: this.startTimeVal })
    },
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
        this.endTimeVal = date.getFullYear() + '-' + m
      } else {
        this.startTime = date.getFullYear() + '年' + m + '月'
        this.startTimeVal = date.getFullYear() + '-' + m
      }

      this.isPopShow = false
      // this.datePicker = 0
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
    // 默认时间
    initTime () {
      this.endTime = this.getdate(1)
      this.startTime = this.getdate_2(1)
      this.startTimeVal = this.getdate_2(2)
      this.endTimeVal = this.getdate(2)
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
    },
    // 获取默认时间
    getdate_2 (type) {
      const date = new Date()
      var y = date.getFullYear()
      var m = date.getMonth() + 1
      if (m == 1) {
        m = 12
        y = y - 1
      } else {
        m = m - 3
      }
      m = m < 10 ? '0' + m : m
      if (type == 1) {
        return `${y}年${m}月`
      } else {
        return `${y}-${m}`
      }
    }

  },
  mounted () {
    this.initTime()
  }
}
</script>

<style lang="scss" scoped>
.card-box {
  font-size: 0.24rem;
  margin-bottom: 2rem;
  width: 90%;
  box-sizing: border-box;
  position: fixed;
  z-index: 200;
  .nav-content {
    width: 100%;
    font-size: 0.24rem;
    box-sizing: border-box;
    background: #fff;
    box-shadow: 0px 0px 1rem rgba(0, 0, 0, 0.03);
    border-radius: 0.2rem;
    padding: 0.48rem 0.4rem;
    display: flex;
    .nav-lis {
      height: 0.6rem;
      &.right {
        flex: 5;
        span {
          vertical-align: middle;
          &.right-lis {
            display: inline-block;
            width: 1.8rem;
            height: 0.6rem;
            line-height: 0.6rem;
            text-align: center;
            background: rgb(241, 238, 238);
            opacity: 1;
            border-radius: 30px;
            color: #333;
            font-size: 0.28rem;
          }
        }
      }
      &.left {
        flex: 2;
        span {
          display: inline-block;
          width: 1.36rem;
          height: 0.6rem;
          text-align: center;
          line-height: 0.6rem;
          color: #fff;
          background: linear-gradient(
            320deg,
            rgba(81, 140, 241, 1) 0%,
            rgba(121, 162, 249, 1) 100%
          );
          box-shadow: 0px 10px 20px rgba(85, 118, 171, 0.16);
          opacity: 1;
          border-radius: 23px;
          position: relative;
          float: right;
          font-size: 0.28rem;
        }
      }
    }
  }
}
</style>