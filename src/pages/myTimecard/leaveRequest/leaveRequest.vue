<template>
  <div class="leaveRequest">
    <!-- 请假申请 -->
    <div class="wrap-1">
      <div class="cantainer">
        <div class="box">
          <div class="title">{{this.title}}</div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1"> {{this.dataType=='2'?'销假类型' : '请假类型'}}</div>
            </div>
            <div class="lis-r"
                 @click="openPopShowType">
              <div class="div-val-1">{{leaveTypetxt}}</div>
              <div :class="{'icon-jt' :this.dataType!='2'}"></div>
            </div>
          </div>
          <div class="lis icon-jt">
            <div class="lis-f">
              <div class="div-name-1">开始时间</div>
            </div>
            <div class="lis-r"
                 @click="showDatePicker(0)">
              <div class="div-val-1">{{jsonData.startTime}}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">结束时间</div>
            </div>
            <div class="lis-r"
                 @click="showDatePicker(1)">
              <div class="div-val-1">{{jsonData.endTime}}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">{{this.dataType=='2'?'销假时长' : '请假时长'}}</div>
            </div>
            <div class="lis-r">
              <input type="number"
                     :disabled="jsonData.leaveTypeId != '3'"
                     class="input-time"
                     :placeholder="jsonData.leaveTypeId == '3'  ? '请输入时长' :'0'"
                     v-model="jsonData.duration">
              <span class="dw">/天</span>
            </div>

          </div>
          <div class="lis"
               v-if="this.dataType!='2'">
            <div class="lis-f">
              <div class="div-name-1">图片</div>
            </div>
            <div class="lis-r">
              <div class="img-box"
                   v-for="(item,index) in jsonData.fileViewLists"
                   :key="index">
                <div class="icon-close"
                     @click="delImg(index)"></div>
                <img :src="item"
                     @click="viewImg(index)"
                     alt="">
              </div>
              <div class="upload-box img-box"
                   v-if="jsonData.fileViewLists.length<9">
                <van-uploader :preview-size="55"
                              v-if="jsonData.fileViewLists.length<9"
                              multiple
                              :after-read="afterRead"
                              @delete="delImg"
                              :max-count="9"></van-uploader>
              </div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">{{this.dataType=='2'?'销假事由' : '请假理由'}}</div>
            </div>
            <div class="lis-r">
              <input type="text"
                     class="input-time liy"
                     placeholder="请输入请假事由"
                     v-model="jsonData.reason"></div>
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
  data () {
    return {
      nextNodeData: [],
      cacheFlowVar: {}, // 缓存流程变量
      flowMessages: [],
      oNodeButtons: [],
      flowData: {}, // 流程数据
      flowContext: { // 流程内容
        assigners: {},
        preAssigners: {},
        processVar: {},
        subProcessVar: {},
        processParams: {
          // inCharge: '1',
          // theFirstTrial: '1'
        },
        operateType: 'submit'
      },
      flowNodesData: [],
      formData: {
        dataList: [{}]
      },
      assigners: {},
      // -----------------------------------------------------
      serverUrl: 'http://hafdev.hxoadev.com',
      loginUserName: '',
      jsonData: {
        leaveTypeId: '1', // 请假类型id
        duration: '0', // 请假时长
        reason: '', // 理由
        startTime: '请选择', // 开始时间
        endTime: '请选择', // 结束时间,
        dataId: '', // 原请假id  修改 , 销假用
        // 图片集合
        fileViewLists: [
          // 'http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=1dc5278a5f9c4093ac28ceefb7415bae&loginUsername=yefei_hq',
        ],
        saveType: '1', // 1新增提交 2、修改提交（待办提交全部传1
        formType: '1' // 1:新增 1:修改 2:销假
      },
      dataType: '1', // 0:新增 1:修改 2:销假
      leaveTypetxt: '' || '请选择', // 请假类型文字
      popupTitle: '', // 时间选择title
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
        // {
        //   id: '4',
        //   text: '工伤假'
        // },
        {
          id: '5',
          text: '婚假'
        },
        // {
        //   id: '6',
        //   text: '产假'
        // },
        {
          id: '7',
          text: '护理假'
        }
        // {
        //   id: '8',
        //   text: '丧假'
        // }
      ],
      itemData: {}, // 传过来的表单数据
      title: ''
    }
  },
  methods: {
    // --------------------------公用数据解析处理---------------------------
    // 初始化表单流程数据
    load () {
      const classifyHangup = '[HANGUP]'
      const flowData = this.flowData
      const cacheFlowVar = this.cacheFlowVar
      const flowNodesData = this.flowNodesData
      const flowMessages = this.initDefMessages() // yinh
      const oNodeButtons = this.oNodeButtons
      if (flowData.currentPerson && flowData.currentPerson.id) cacheFlowVar.personId = flowData.currentPerson.id // yinh
      if (flowData.loginUsername) cacheFlowVar.loginUsername = flowData.loginUsername
      if (flowData.flowKeyId) cacheFlowVar.flowKeyId = flowData.flowKeyId || ''
      if (flowData.formId) cacheFlowVar.formId = flowData.formId || ''
      if (flowData.dataId) cacheFlowVar.dataId = flowData.dataId || ''
      if (Object.keys(flowData).length) cacheFlowVar.flowDefId = flowData.flowBase.id // yinh
      if (!flowData.firstNode || flowData.firstNode === 'startEvent') cacheFlowVar.firstNode = flowData.flowNodes[0].id // yinh
      if (flowData.currentNode.nodeId) {
        cacheFlowVar.nodeId = flowData.currentNode.nodeId
      } else if (flowData.flowInst.currentNodeId) {
        cacheFlowVar.nodeId = flowData.flowInst.currentNodeId
      }
      if (flowData.isNewFlow) {
        cacheFlowVar.nodeId = cacheFlowVar.firstNode || ''
      } else {
        cacheFlowVar.instId = flowData.flowInst.actInstId || ''
        cacheFlowVar.proRunId = flowData.flowInst.proRunId || ''
      }
      flowData.flowNodes.forEach((item, i) => {
        flowNodesData[item.id] = item
      })
      if (flowData.currentTask && flowData.currentTask.id) {
        cacheFlowVar.taskUserId = flowData.currentTask.id || ''
        cacheFlowVar.executionId = flowData.currentTask.actExecutionId || ''

        // 流程权限控制button
        const lastOptType = flowData.currentTask.lastOperateType
        if (lastOptType == 'authorize') {
          oNodeButtons.authorize = false // 授权任务，不允许再授权
          oNodeButtons.handover = false // 授权任务，不允许再转办
        } else if (lastOptType == 'handover') {
          oNodeButtons.authorize = false // 转办任务，不允许再授权
          oNodeButtons.handover = false // 转办任务，不允许再转办
        } else if (lastOptType == 'append') {
          oNodeButtons.append = false // 加签任务，不允许再加签
        }
        if (flowData.currentTask.classify == classifyHangup) {
          oNodeButtons.hangup = false
        }
      }
      this.cacheFlowVar = cacheFlowVar
      this.flowMessages = flowMessages
      this.oNodeButtons = oNodeButtons
      this.initFlowContext()
    },
    // 初始化提示文本
    initDefMessages () {
      const personName = this.flowData.currentPerson
      const applyerName = this.flowData.flowInst ? this.flowData.flowInst.applyerName : ''
      const applyerStr = applyerName && applyerName != personName ? ('(' + applyerName + '的)') : ''
      const flowName = this.flowData.flowBase.name
      const flowMessages = {
        submit: personName + this.getButtonText('submit') + '了' + applyerStr + flowName + '，请处理',
        reject: personName + this.getButtonText('reject') + '了您的' + applyerStr + flowName + '，请查阅',
        restart: personName + this.getButtonText('restart') + '了您的' + applyerStr + flowName + '，请查阅',
        append: personName + this.getButtonText('append') + '给您了' + applyerStr + flowName + '，请处理',
        handover: personName + '将' + applyerStr + flowName + '转交给您' + '，请处理',
        notify: personName + this.getButtonText('notify') + '您及时处理' + applyerStr + flowName + '，请查阅',
        deliver: personName + '传给您的' + applyerStr + flowName + '，请查阅',
        authorize: personName + '授权您处理' + applyerStr + flowName + '，请查阅',
        jump: personName + '将' + applyerStr + flowName + '跳转给您，请处理',
        replace: personName + '将' + applyerStr + flowName + '处理人替换为您，请处理'
      }
      return flowMessages
    },
    getButtonText (type) {
      let text = ''
      switch (type) {
        case 'submit':
          text = '提交'
          break
        case 'reject':
          text = '驳回'
          break
        case 'restart':
          text = '强制驳回'
          break
        case 'append':
          text = '加签'
          break
        case 'notify':
          text = '转办'
          break
        default:
          break
      }
      return text
    },
    initFlowContext () {
      this.flowContext = {
        ...this.flowContext,
        flowDefId: this.cacheFlowVar.flowDefId,
        flowKeyId: this.cacheFlowVar.flowKeyId,
        instId: this.cacheFlowVar.instId,
        nodeId: this.cacheFlowVar.nodeId,
        taskUserId: this.cacheFlowVar.taskUserId,
        executionId: this.cacheFlowVar.executionId,
        dataId: this.cacheFlowVar.dataId,
        formId: this.cacheFlowVar.formId,
        proRunId: this.cacheFlowVar.proRunId ? this.cacheFlowVar.proRunId : ''
      }
    },
    // 获取页面数据
    getProcessParams (useBizData) {
      const params = {}
      let formFields = this.flowData.flowBase.bizDataRule || ''
      if (formFields) {
        formFields = JSON.parse(formFields)
        if (Array.isArray(formFields)) {
          let bizData = {}
          if (useBizData) {
            bizData = this.parseBizData()
          }
          formFields.forEach((item, i) => {
            if (item.propertyName) {
              if (this.formData[item.propertyName]) {
                params[item.propertyName] = this.formData[item.propertyName] || ''
              } else {
                params[item.propertyName] = bizData[item.propertyName] || ''
                // em.bizDataKey && bizData[em.bizDataKey] 存在
                if (item.bizDataKey && bizData[item.bizDataKey]) {
                  params[item.propertyName] = bizData[item.bizDataKey]
                }
              }
            }
          })
        }
      }
      return params
    },
    parseBizData () {
      let params = {}
      params = { ...this.formData }
      return params
    },
    // -------------------------表单数据处理----------------------------
    // 1. form.do
    leaveApplyDetail () {
      // return new Promise((resolve, reject) => {
      HttpEhr.leaveApplyDetail({
        userId: this.util.getSession('sessionData').userId,
        dataId: this.jsonData.dataId, // 销假和新增为空,修改要传值
        formType: this.jsonData.formType
      }).then(res => {
        // resolve(res)
        this.flowData = res.data.flowData
        this.load()
      })
      // })
    },
    // 2. 分支接口
    getBranch () {
      return new Promise((resolve, reject) => {
        HttpEhr.getBranch({
          userId: this.util.getSession('sessionData').userId,
          type: this.jsonData.leaveTypeId,
          sum: this.jsonData.duration
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 3.获取审批人信息
    getAssignersList () {
      const params = {
        flowDefId: this.cacheFlowVar.flowDefId || '',
        instId: this.cacheFlowVar.instId || '',
        proRunId: this.cacheFlowVar.proRunId || ''
      }
      params.paramMap = { ...this.getProcessParams(true) }
      const data = {
        loginUsername: this.cacheFlowVar.loginUsername,
        personId: this.cacheFlowVar.personId,
        formData: params
      }
      return new Promise((resolve, reject) => {
        HttpEhr.getAssignersList(
          data
        ).then(res => {
          resolve(res)
        })
      })
    },
    // 4. 获取下一节点
    getNextNode () {
      return new Promise((resolve, reject) => {
        HttpEhr.getNextNode({
          personId: this.cacheFlowVar.personId,
          flowContext: this.flowContext
        }).then(res => {
          resolve(res)
          // this.nextNodeData = res.data
          // // 用nextNode里的id取出assigners的当前环节处理人
          // const nextNodeAssigner = this.assigners.nodeAssigners.find((assigner) => {
          //   return assigner.nodeId.toLowerCase() == this.nextNodeData[0].id.toLowerCase()
          // })
          // // 当存在多个处理人时 用defaultShow 取出默认处理人
          // const nextNodePerson = nextNodeAssigner.nodeAssignerPersons[nextNodeAssigner.defaultShow]
          // this.flowContext.nextNodeId = this.nextNodeData[0].id
          // this.flowContext.flowMessage = ''
          // this.flowContext.flowComment = ''
          // this.flowContext.assigners[this.nextNodeData[0].id.toLowerCase()] = nextNodePerson.sysUsername || ''
        })
      })
    },
    // 5.请假申请提交/修改
    addAndEditVacation () {
      return new Promise((resolve, reject) => {
        HttpEhr.addAndEditVacation({
          userId: this.util.getSession('sessionData').userId || '',
          type: this.jsonData.leaveTypeId,
          startDate: this.jsonData.startTime,
          endDate: this.jsonData.endTime,
          sum: this.jsonData.duration,
          url: JSON.stringify(this.jsonData.fileViewLists),
          flowData: JSON.stringify(this.flowContext),
          note: this.jsonData.reason,
          id: this.jsonData.dataId,
          saveType: this.jsonData.saveType
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 6.销假
    removeVacation () {
      return new Promise((resolve, reject) => {
        HttpEhr.removeVacation({
          userId: this.util.getSession('sessionData').userId || '',
          remId: this.jsonData.dataId, // 原请假id
          startDate: this.jsonData.startTime,
          endDate: this.jsonData.endTime,
          sum: this.jsonData.duration,
          note: this.jsonData.reason,
          flowData: JSON.stringify(this.flowContext),
          url: JSON.stringify(this.jsonData.fileViewLists),
          id: this.jsonData.dataId,
          saveType: this.jsonData.saveType
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 提交按钮
    async commitFun () {
      await this.getBranch().then(res => {
        if (res.data) {
          Object.assign(this.flowContext.processParams, res.data)
        }
      })
      await this.getAssignersList().then(res => {
        this.assigners = res.data
        this.assigners.nodeAssigners.forEach(item => {
          if (item.nodeAssignerPersons.length != 0) {
            this.flowContext.preAssigners[item.nodeId] = {
              assignerId: item.nodeAssignerPersons[0].sysUsername || '',
              assignerName: item.nodeAssignerPersons[0].name || ''
            }
          } else {
            this.flowContext.preAssigners[item.nodeId] = {
              assignerId: '',
              assignerName: ''
            }
          }
        })
      })
      await this.getNextNode().then(res => {
        this.nextNodeData = res.data
        // 用nextNode里的id取出assigners的当前环节处理人
        const nextNodeAssigner = this.assigners.nodeAssigners.find((assigner) => {
          return assigner.nodeId.toLowerCase() == this.nextNodeData[0].id.toLowerCase()
        })
        // 当存在多个处理人时 用defaultShow 取出默认处理人
        const nextNodePerson = nextNodeAssigner.nodeAssignerPersons[nextNodeAssigner.defaultShow]
        this.flowContext.nextNodeId = this.nextNodeData[0].id
        this.flowContext.flowMessage = ''
        this.flowContext.flowComment = ''
        if (!nextNodePerson) {
          this.flowContext.assigners[this.nextNodeData[0].id.toLowerCase()] = ''
        } else {
          this.flowContext.assigners[this.nextNodeData[0].id.toLowerCase()] = nextNodePerson.sysUsername || ''
        }
      })
      if (this.dataType == '0' || this.dataType == '1') {
        await this.addAndEditVacation().then(res => {
          if (res.code == 0) {
            this.$toast.success({
              message: '提交成功'
            })
          }
        })
      } else if (this.dataType == '2') {
        await this.removeVacation().then(res => {
          if (res.code == 0) {
            this.$toast.success({
              message: '销假成功'
            })
          }
        })
      }
    },

    // 图片上传 读取完成后的回调函数
    async afterRead (e) {
      const jsonData = new FormData()
      if (e && e.length) { // 判断是否是多图上传 多图则循环添加进去
        e.forEach(item => {
          jsonData.append('loginUsername', 'lixiansen')
          jsonData.append('file', item.file)// 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        })
      } else {
        jsonData.append('loginUsername', 'lixiansen')
        jsonData.append('file', e.file)
      }
      await HttpEhr.multiUpload(jsonData).then(res => {
        const newList = []
        res.data.forEach(element => {
          const url = `${this.serverUrl}/cap-bpm/attach/download.do?id=${element.id}&loginUsername=${this.util.getSession('sysUsername').sysUsername || 'huaxin'}`
          newList.push(url)
        })
        this.jsonData.fileViewLists = [...this.jsonData.fileViewLists, ...newList]
        // http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=2a0df3e74c2c495fbe80198c85f0cf7a&loginUsername=wangw
      })
    },
    // 图片删除
    delImg (index) {
      this.jsonData.fileViewLists.splice(index, 1)
    },
    // 图片预览
    viewImg (index) {
      ImagePreview(
        {
          images: this.jsonData.fileViewLists,
          startPosition: index
        }
      )
    },
    // 打开时间选择器 0: 开始 1: 结束
    showDatePicker (picker) {
      // if (this.dataType == '2') return
      this.isPopShow = true
      this.datePicker = picker
      if (this.datePicker) {
        this.popupTitle = '选择结束日期'
      } else {
        this.popupTitle = '选择开始日期'
      }
    },
    // 确定日期选择，时间格式化并显示在页面上
    confirmPicker (value) {
      const date = value
      const y = date.getFullYear()
      let m = date.getMonth() + 1
      let d = date.getDate()
      m = m < 10 ? '0' + m : m
      d = d < 10 ? '0' + d : d
      const newTime = `${y}-${m}-${d}`
      if (this.datePicker) {
        this.jsonData.endTime = newTime
      } else {
        this.jsonData.startTime = newTime
      }
      this.isPopShow = false
      if (this.jsonData.leaveTypeId != '3') {
        this.jsonData.duration = this.DateMinus(this.jsonData.startTime, this.jsonData.endTime)
      }
    },
    // 关闭日历选择
    cancelPicker () {
      this.isPopShow = false
      this.datePicker = ''
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
    // 打开请假类型下拉选
    openPopShowType () {
      if (this.dataType == '2') return
      this.isPopShowType = true
    },
    // 确认请假类型选择
    onConfirm (item, index) {
      this.leaveTypetxt = item.text
      this.jsonData.leaveTypeId = item.id
      this.isPopShowType = false
      if (this.jsonData.leaveTypeId != '3') {
        this.jsonData.duration = this.DateMinus(this.jsonData.startTime, this.jsonData.endTime)
      }
    },
    // 关闭请假类型下拉选
    onCancel () {
      this.isPopShowType = false
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
    // 赋值传递参数
    setVal () {
      this.jsonData.startTime = this.itemData.startDate
      this.jsonData.endTime = this.itemData.endDate
      this.jsonData.duration = this.itemData.sum // 时长
      this.jsonData.reason = this.itemData.note // 理由
      this.jsonData.leaveTypeId = this.itemData.type // 请假类型
      this.jsonData.fileViewLists = JSON.parse(this.itemData.url)
      const newObj = this.columns.find((item) => { return item.id == this.itemData.type })
      this.leaveTypetxt = newObj.text // 请假类型
    }

  },
  mounted () {
    // this.serverUrl = ' http://' + window.location.host
    this.itemData = this.$route.query.itemData || {}
    this.dataType = this.$route.query.flag || '0'
    // 本地 this.dataType 0:新增 1:修改 2:销假
    // 提交接口 saveType 1、销假 新增提交 2、修改提交
    if (this.dataType == '0') {
      // 新增
      this.title = '请假申请'
      this.jsonData.saveType = '1'
    } else if (this.dataType == '1') {
      // 修改
      this.title = '请假申请'
      this.jsonData.saveType = '2'
      // 数据id
      this.jsonData.dataId = this.$route.query.id || ''
      this.setVal()
    } else if (this.dataType == '2') {
      // 销假
      this.title = '假期申请调整'
      this.jsonData.saveType = '1'
      this.jsonData.formType = '2'
      this.setVal()
    }
    document.title = this.title
    this.jsonData.dataId = this.$route.query.id
    // console.log('this.jsonData.formType----' + this.jsonData.formType)
    // console.log(this.jsonData.saveType)

    this.leaveApplyDetail()
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
              text-align-last: justify;
              text-align: justify;
              min-width: 1.2rem;
            }
          }
          .lis-r {
            flex: 5;
            position: relative;
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
              &.liy {
                width: 100%;
              }
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

            .img-box {
              position: relative;
              box-sizing: border-box;
              width: 32.6%;
              height: 1rem;
              padding: 0 0.2rem;
              top: 0rem;
              margin-bottom: 0.25rem;
              &.upload-box {
                box-sizing: border-box;
                position: relative;
                vertical-align: top;
              }
              .icon-close {
                position: absolute;
                display: inline-block;
                width: 0.24rem;
                height: 0.24rem;
                right: 0.1rem;
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
    margin-bottom: 0.5rem;
    letter-spacing: 0.14rem;
  }
}
</style>