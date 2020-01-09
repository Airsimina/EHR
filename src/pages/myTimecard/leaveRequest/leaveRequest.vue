<template>
  <div class="leaveRequest">
    <!-- 请假申请 -->
    <div class="wrap-1">
      <div class="cantainer">
        <div class="box">
          <div class="title">请假申请</div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">请假类型</div>
            </div>
            <div class="lis-r"
                 @click="openPopShowType">
              <div class="div-val-1">{{leaveType}}</div>
              <div :class="{'icon-jt' :this.flag!='2'}"></div>
            </div>
          </div>
          <div class="lis icon-jt">
            <div class="lis-f">
              <div class="div-name-1">开始时间</div>
            </div>
            <div class="lis-r"
                 @click="showDatePicker(0)">
              <div class="div-val-1">{{fromData.startTime}}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">结束时间</div>
            </div>
            <div class="lis-r"
                 @click="showDatePicker(1)">
              <div class="div-val-1">{{fromData.endTime}}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">请假时长</div>
            </div>
            <div class="lis-r">
              <input type="number"
                     :disabled="fromData.leaveTypeId != '3'"
                     class="input-time"
                     :placeholder="fromData.leaveTypeId == '3'  ? '请输入时长' :'0'"
                     v-model="fromData.duration">
              <span class="dw">/天</span>
            </div>

          </div>
          <div class="lis"
               v-if="flag!='2'">
            <div class="lis-f">
              <div class="div-name-1">图片</div>
            </div>
            <div class="lis-r">
              <van-uploader :preview-size="55"
                            v-if="fileViewLists.length<9"
                            multiple
                            :after-read="afterRead"
                            @delete="delImg"
                            :max-count="9"></van-uploader>
              <div class="img-box"
                   v-for="(item,index) in fileViewLists"
                   :key="index">
                <div class="icon-close"
                     @click="delImg(index)"></div>
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
              <input type="text"
                     class="input-time"
                     placeholder="请输入请假事由"
                     v-model="fromData.reason"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="commit-btn"
         @click="commitFun">提交</div>
    <!-- 开始 结束时间 -->
    <van-popup v-model="isPopShow"
               close-icon-position="top-left"
               position="bottom"
               :style="{ height: '40%' }">
      <van-datetime-picker v-model="currentDate"
                           @cancel="cancelPicker"
                           @confirm="confirmPicker"
                           type="date"
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
import HttpEhr from '@requestPool/index.js'
// import util from '../../../util/util.js'
// import testdata from '../../../testJson/from.js'
import { ImagePreview } from 'vant'
export default {
  components: {},
  props: {},
  data () {
    return {
      serverUrl: 'http://hafdev.hxoadev.com',
      loginUserName: 'lixianxen',
      fromData: {
        leaveTypeId: '1', // 请假类型id
        duration: '', // 请假时长
        reason: '', // 理由
        startTime: '请选择', // 开始时间
        endTime: '请选择', // 结束时间,
        id: '', // 原请假id  修改 , 销假用
        fileViewLists: [] // 图片集合
      },
      flag: '0', // 1:修改 2:销假
      leaveType: '' || '请选择', // 请假类型
      // 本地数据图片集合
      fileViewLists: [
        // 'http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=8343bf7b65534b6db88cafe0bb4ce6a9&loginUsername=lixiansen',
        // 'http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=5be9bd97e71a4d7b940178fd206c8859&loginUsername=lixiansen',
        // 'http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=a3c321f355604772b99346714f60b473&loginUsername=lixiansen',
        // 'https://img.yzcdn.cn/vant/leaf.jpg'
      ],
      // 时间选择title
      popupTitle: '',
      currentDate: new Date(),
      datePicker: 0, // 用于判断哪个选择器的显示与隐藏
      isPopShow: false, // 弹出层隐藏与显示
      isPopShowType: false,
      // 请假类型1、年休2、病假3、事假4、工伤假5、婚假6、产假7、护理假8、丧假
      columns: [
        {
          id: '1',
          text: '年休'
        },
        {
          id: '2',
          text: '病假'
        },
        {
          id: '3',
          text: '事假'
        },
        {
          id: '5',
          text: '婚假'
        },
        {
          id: '7',
          text: '产假'
        }
      ]

    }
  },
  methods: {
    // 提交按钮
    commitFun () {
      console.log(this.fromData)
      if (this.flag == '0' || this.flag == '1') {
        // this.addAndEditVacation()
        // 修改和提交
      } else if (this.flag == '2') {
        // 销假

      }
    },
    // 1. form.do
    leaveApplyDetail () {
      return new Promise((resolve, reject) => {
        HttpEhr.leaveApplyDetail({
          userId: this.util.getSession('sessionData').userId
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 2. 分支几款
    getBranch () {
      return new Promise((resolve, reject) => {
        HttpEhr.getBranch({
          userId: this.util.getSession('sessionData').userId,
          type: this.fromData.leaveTypeId,
          sum: this.fromData.duration
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 3. 获取下一节点
    getNextNode () {
      return new Promise((resolve, reject) => {
        HttpEhr.getNextNode({
          userId: this.util.getSession('sessionData').userId
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 4.请假申请提交/修改
    addAndEditVacation () {
      HttpEhr.addAndEditVacation({
        userId: this.util.getSession('sessionData').userId || '',
        type: this.fromData.leaveTypeId,
        id: this.fromData.id, // 不传为新增，传了为修改,销假
        startDate: this.fromData.startTime,
        endDate: this.fromData.endTime,
        sum: this.fromData.duration,
        url: JSON.stringify(this.fromData.fileViewLists),
        flowData: '测试 abc',
        note: this.fromData.reason
      }).then(res => {
        console.log(res)
      })
    },
    // 初始化数据
    async init () {
      await this.leaveApplyDetail().then(res => {
        console.log('获取from.do')
        console.log(res)
      })
      await this.getBranch().then(res => {
        console.log('获取分支')
        console.log(res)
      })
      await this.getNextNode().then(res => {
        console.log('获取下一节点')
        console.log(res)
      })
    },
    // 销假
    removeVacation () {
      HttpEhr.removeVacation({
        userId: this.util.getSession('sessionData').userId || '',
        dataId: this.oldId, // 原请假id
        startDate: this.fromData.startTime,
        endDate: this.fromData.endTime,
        sum: this.fromData.duration,
        note: this.fromData.reason
      }).then(res => {
        console.log('销假')
        console.log(res)
      })
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
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      const newTime = `${y}-${m}-${d}`
      if (this.datePicker) {
        this.fromData.endTime = newTime
      } else {
        this.fromData.startTime = newTime
      }
      this.isPopShow = false
      if (this.fromData.leaveTypeId != '3') {
        this.fromData.duration = this.DateMinus(this.fromData.startTime, this.fromData.endTime)
      }
    },
    // 格式化选择器日期
    formatter (type, value) {
      if (type === 'year') {
        return `${value}年`
      } else if (type === 'month') {
        return `${value}月`
      } else if (type === 'day') {
        return `${value}日`
      }
      return value
    },
    // 请假类型选择
    onConfirm (item, index) {
      this.leaveType = item.text
      this.fromData.leaveTypeId = item.id
      this.isPopShowType = false
      if (this.fromData.leaveTypeId != '3') {
        this.fromData.duration = this.DateMinus(this.fromData.startTime, this.fromData.endTime)
      }
    },
    // 关闭
    onCancel () {
      this.isPopShowType = false
    },
    // 打开
    openPopShowType () {
      if (this.flag == '2') return
      this.isPopShowType = true
    },
    // 计算时间开始,结束日期差
    DateMinus (start, end) {
      var sdate = new Date(start)
      var now = new Date(end)
      var days = now.getTime() - sdate.getTime()
      var day = parseInt(days / (1000 * 60 * 60 * 24))
      if (day < 0) {
        this.$toast('开始日期不能大于结束时间')
        return
      }
      return day + 1
    },
    // 图片上传 读取完成后的回调函数
    async afterRead (e) {
      const fromdata = new FormData()
      if (e && e.length) { // 判断是否是多图上传 多图则循环添加进去
        e.forEach(item => {
          fromdata.append('loginUsername', 'lixiansen')
          fromdata.append('file', item.file)// 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        })
      } else {
        fromdata.append('loginUsername', 'lixiansen')
        fromdata.append('file', e.file)
      }
      await HttpEhr.multiUpload(fromdata).then(res => {
        const newList = []
        res.data.forEach(element => {
          const url = `${this.serverUrl}/cap-bpm/attach/download.do?id=${element.id}&loginUsername=${this.loginUserName}`
          newList.push(url)
        })
        this.fileViewLists = [...this.fileViewLists, ...newList]
        // http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=2a0df3e74c2c495fbe80198c85f0cf7a&loginUsername=wangw
        // this.fileViewLists = [...this.fileViewLists, ...res.Result]
      })
    },
    // 图片删除
    delImg (index) {
      this.fileViewLists.splice(index, 1)
    },
    // 图片预览
    viewImg (index) {
      ImagePreview(
        {
          images: this.fileViewLists,
          startPosition: index
        }
      )
    }

  },
  mounted () {
    console.log(window.location.host)
    // this.initTime()
    // 1:修改 2:销假
    this.flag = this.$route.query.flag
    if (this.flag == '2') {
      document.title = '假期申请调整'
    } else {
      document.title = '请假申请'
      // this.init()
    }
    // 获取ID
    if (this.$route.query.id) {
      this.fromData.id = this.$route.query.id
    }
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
            // border: 1px solid #000;
            .div-val-1 {
              font-size: 0.28rem;
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
            input:disabled {
              background-color: #fff;
            }
            .input-time {
              display: inline-block;
              width: 2.5rem;
              border: none;
              font-size: 0.28rem;
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
              font-size: 0.28rem;
            }
            // .img-box {
            //   width: 100%;
            // }
            .img-box {
              // background: rgb(248, 191, 191);
              box-sizing: border-box;
              width: 33.3%;
              height: 1rem;
              padding: 0 0.1rem;
              position: relative;
              top: 0.3rem;
              .icon-close {
                position: absolute;
                display: inline-block;
                width: 0.24rem;
                height: 0.24rem;
                right: 0;
                top: -0.1rem;
                background: url("../../../../static/img/close.png") 0 0
                  no-repeat;
                background-size: 100% 100%;
              }
              img {
                width: 100%;
                height: 100%;
              }
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
    letter-spacing: 0.14rem;
  }
}
</style>