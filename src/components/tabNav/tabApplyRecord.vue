<template>
  <div class="tab-nav-wrap">
    <div class="tab-box">
      <div class="tab-name"
           @click="changeTab(item,index)"
           v-for="(item,index) in tabList"
           :key="index"
           :class="{'active-tab' : tabIndex == index}">
        <span>{{item.name}}</span>
        <span class="icon-name"></span>
      </div>

      <div class="tab-list-box"
           v-if="showbox">
        <!-- 全部 -->
        <div class="box-1"
             v-if="selTabIdShow==1">
          <div @click="selcontent(item,index)"
               :class="{'active-name-1' : index == lisIndex_1,'lis-1':selTabIdShow==1}"
               v-for="(item,index) in dataList"
               :key="index">{{item.name}}</div>
        </div>
        <!-- 筛选 -->
        <div class="box-1"
             v-if="selTabIdShow==2">
          <div class="lis-2">
            <span class="sp-input"
                  :class="{'sp-input-active':datePicker==0}"
                  @click="showDatePicker(0)">{{startTime}}</span>
            <span class="sp-text">至</span>
            <span class="sp-input"
                  :class="{'sp-input-active':datePicker==1}"
                  @click="showDatePicker(1)">{{endTime}}</span>
          </div>
          <div class="btn-box">
            <div class="btn">
              <span class="ok"
                    @click="selcontent({},0)">查询</span>
            </div>
          </div>

        </div>
        <!-- 分类 -->
        <div class="box-1"
             v-if="selTabIdShow==3">
          <div @click="selcontent(item,index)"
               :class="{'active-name-3' : index == lisIndex_3,'lis-3':selTabIdShow==3}"
               v-for="(item,index) in dataList"
               :key="index">{{item.name}}</div>
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
    </div>
    <!-- 蒙层 -->
    <div class="menc"
         v-show="showbox"
         @click="closeMenc"></div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    pageTypeVal: {
      type: [String, Number],
      default: '1'
    }
  },
  data () {
    return {
      // 导航数据
      tabList: [
        {
          name: '全部',
          id: 1
        },
        {
          name: '筛选',
          id: 2
        },
        {
          name: '分类',
          id: 3

        }
      ],
      // 选中导航菜单的信息
      tabIndex: 0,
      // 蒙层和展开数据控制开关
      showbox: false,
      // 选中的展开数据
      selTabIdShow: 1,
      // 选中的子菜单信息
      lisIndex_1: 0,
      lisIndex_3: 0,
      // 导航菜单数据
      tabNabJsonList: {
        statusList: [
          {
            name: '同意',
            id: '3'
          },
          {
            name: '审批中',
            id: '2'
          },
          {
            name: '驳回',
            id: '4'
          }
        ],
        // 1 请假申请 2 加班申请 3 出差申请
        typeList: [
          {
            name: '请假申请',
            id: '1'
          },
          {
            name: '加班申请',
            id: '2'
          },
          {
            name: '出差申请',
            id: '3'
          }
        ]
      },
      // ----------------------------
      // 开始和结束时间
      startTime: '',
      endTime: '',
      startTimeVal: '',
      endTimeVal: '',
      // 选中的全部
      type: '1',
      // 选中的分类
      status: '3',
      // 日期title
      popupTitle: '',
      // 时间选择器的默认值
      currentDate: new Date(),
      datePicker: 0, // 用于判断哪个选择器的显示与隐藏
      isPopShow: false // 弹出层隐藏与显示

    }
  },
  methods: {
    // 切换tab
    changeTab (item, index) {
      this.showbox = true
      this.selTabIdShow = item.id
      this.tabIndex = index
      if (item.id == 1) {
        this.dataList = this.tabNabJsonList.statusList
      } else if (item.id == 3) {
        this.dataList = this.tabNabJsonList.typeList
      }
    },
    // 选择内容
    selcontent (item, index) {
      this.showbox = false
      if (this.selTabIdShow == 1) {
        // 全部
        this.status = item.id
        this.lisIndex_1 = index
      } else if (this.selTabIdShow == 3) {
        // 分类
        this.type = item.id
        this.lisIndex_3 = index
      }
      this.$emit('classSearchFun', {
        selTabIdShow: this.selTabIdShow,
        type: this.type,
        status: this.status,
        startTime: this.startTimeVal,
        endTime: this.endTimeVal
      })
    },
    closeMenc () {
      this.showbox = false
    },
    // ------------------------
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
      this.endTime = this.util.setDefaultTime(1)
      this.startTime = this.util.setDefaultTime(1)
      this.startTimeVal = this.util.setDefaultTime(2)
      this.endTimeVal = this.util.setDefaultTime(2)
    }
  },
  mounted () {
    if (this.pageTypeVal == '2') {
      this.tabList.splice(0, 1)
    }
    this.initTime()
  }
}
</script>

<style lang="scss" scoped>
.tab-nav-wrap {
  font-size: 0.24rem;
  margin-bottom: 1.4rem;
  .menc {
    position: fixed;
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 2.5rem;
    z-index: 20;
  }
  .tab-box {
    position: relative;
    display: flex;
    justify-content: center;
    width: 90%;
    line-height: 0.9rem;
    box-sizing: border-box;
    border-radius: 0.2rem;
    z-index: 500 !important;
    background: #fff;
    position: fixed;
    .tab-name {
      flex: 1;
      text-align: center;
      font-size: 0.3rem;
      color: #999999;
      &.active-tab {
        color: #5576ab;
        .icon-name {
          border-color: #5576ab transparent transparent transparent;
        }
      }
      .icon-name {
        color: #999999;
        font-size: 0.26rem;
        display: inline-block;
        position: relative;
        // #5576AB
        width: 0;
        height: 0;
        border-width: 0.1rem;
        border-style: solid;
        border-color: #999999 transparent transparent transparent;
        top: 0.05rem;
      }
    }
    .tab-list-box {
      margin-top: 0.85rem;
      font-size: 0.24rem;
      width: 90%;
      background: #fff;
      padding: 0rem 0.5rem 0 0.5rem;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      box-sizing: border-box;
      position: absolute;
      left: 5%;
      z-index: 300;
      min-height: 1.5rem;
      max-height: 7rem;
      overflow: auto;
      .box-1 {
        .lis-1 {
          display: inline-block;
          width: 1rem;
          background: rgba(255, 255, 255, 1);
          border: 1px solid rgba(153, 153, 153, 1);
          border-radius: 20px;
          font-size: 0.24rem;
          color: rgba(153, 153, 153, 1);
          margin: 0.5rem 0.3rem 0 0.3rem;
          text-align: center;
          line-height: 0.4rem;
          &.active-name-1 {
            border: 1px solid #5576ab;
            color: #fff;
            background: #5576ab;
          }
        }
        .lis-2 {
          padding-top: 0.3rem;
          display: flex;
          span {
            display: inline-block;
            justify-content: center;
            &.sp-text {
              width: 1rem;
              line-height: 0.6rem;
              text-align: center;
              color: #999999;
            }
            &.sp-input {
              display: inline-block;
              flex: 1;
              height: 0.6rem;
              line-height: 0.6rem;
              text-align: center;
              opacity: 1;
              color: #999999;
              border-bottom: 1px solid #cccccc;
              &.sp-input-active {
                border-bottom: 1px solid #5576ab;
                color: #5576ab;
              }
            }
          }
        }
        .lis-3 {
          padding-top: 0.1rem;
          font-size: 0.26rem;
          color: #999999;
          &.active-name-3 {
            color: #5576ab;
          }
        }
        .btn-box {
          display: flex;
          justify-content: center;
          align-items: center;
          .btn {
            flex: 1;
            box-sizing: border-box;
            padding: 0.3rem 0;
            span {
              display: block;
              width: 3rem;
              line-height: 0.6rem;
              text-align: center;
              margin: auto;
              border-radius: 0.46rem;
              color: #fff;
              width: 3rem;
              background: linear-gradient(
                320deg,
                rgba(81, 140, 241, 1) 0%,
                rgba(121, 162, 249, 1) 100%
              );
              box-shadow: 0px 10px 20px rgba(85, 118, 171, 0.16);
            }
          }
        }
      }
    }
  }
}
</style>