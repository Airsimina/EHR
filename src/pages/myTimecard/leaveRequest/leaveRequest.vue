<template>
  <div class="leaveRequest">
    <!-- 请假申请 -->
    <div class="wrap-1">
      <div class="cantainer">
        <div class="box">
          <div class="title">{{ this.title }}</div>
          <div class="lis">
            <div class="lis-f xh">
              <div class="div-name-1">{{this.dataType=='2'?'销假类型' : '请假类型'}}</div>
            </div>
            <div class="lis-r" @click="openPopShowType">
              <div class="div-val-1">{{ leaveTypetxt }}</div>
              <div :class="{ 'icon-jt': this.dataType != '2' }"></div>
            </div>
          </div>
          <div class="lis" v-if="jsonData.leaveTypeId=='8'">
            <div class="lis-f xh">
              <div class="div-name-1">亲属关系</div>
            </div>
            <div class="lis-r" @click="openKinsfolk">
              <div class="div-val-1">{{ kinsfolkTxt }}</div>
              <div :class="{ 'icon-jt': this.dataType != '2' }"></div>
            </div>
          </div>
          <div class="lis" v-show="showDateConp && (dataType==0|| dataType==1)">
            <div class="lis-f xh">
              <div class="div-name-1">开始时间</div>
            </div>
            <div class="lis-r" @click="showDatePicker(0)">
              <div class="div-val-1">{{ jsonData.startTime }}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <div class="lis" v-show="showDateConp && (dataType==0|| dataType==1)">
            <div class="lis-f xh">
              <div class="div-name-1">结束时间</div>
            </div>
            <div class="lis-r" @click="showDatePicker(1)">
              <div class="div-val-1">{{ jsonData.endTime }}</div>
              <div class="icon-jt"></div>
            </div>
          </div>
          <!-- <div v-show="showDateConp"
               class="lis">
            <div class="lis-f">
              <div class="div-name-1">请假日期</div>
            </div>
            <div class="lis-r"
                 @click="showDatePicker(1)">
              <div class="div-val-1">
                {{jsonData.startTime}}
                至
                {{jsonData.endTime}}
              </div>
              <div class="icon-jt"></div>
            </div>
          </div>-->
          <div v-show="!showDateConp && (dataType==0|| dataType==1)" class="lis">
            <div class="lis-f xh">
              <div class="div-name-1">请假日期</div>
            </div>
            <div class="lis-r el-picker">
              <el-date-picker
                ref="datesRef"
                type="dates"
                size="mini"
                v-model="dateArr"
                :editable="false"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :default-value="defaultValue"
                @change="clickElPicker"
                placeholder="选择一个或多个日期"
              ></el-date-picker>
              <!-- <div class="icon-jt"></div> -->
            </div>
          </div>
          <div v-show="dataType==2" class="lis">
            <div class="lis-f xh">
              <!-- <div class="div-name-1">{{this.dataType=='2'?'销假日期2' : '请假日期2'}}</div> -->
              <div class="div-name-1">请假日期</div>
              <!-- 请假日期2 -->
            </div>
            <div class="lis-r el-picker">
              <el-date-picker
                ref="datesRef"
                type="dates"
                size="mini"
                v-model="dateArr"
                :editable="false"
                format="yyyy-MM-dd"
                value-format="yyyy-MM-dd"
                :default-value="defaultValue"
                @change="clickElPicker2"
                placeholder="选择一个或多个日期"
              ></el-date-picker>
              <!-- <div class="icon-jt"></div> -->
            </div>
          </div>

          <div class="lis" v-if="jsonData.leaveTypeId=='6' || jsonData.leaveTypeId=='7'">
            <div class="lis-f xh" style="display:flex">
              <div class="div-name-1">选择保险缴纳省份</div>
            </div>
            <div class="lis-r" @click="openAreaShow">
              <div class="div-val-1">{{ jsonData.areaNameTxt }}</div>
              <div :class="{ 'icon-jt': this.dataType != '2' }"></div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f">
              <div class="div-name-1">请假时长</div>
            </div>
            <div class="lis-r">
              <div class="div-val-1">{{jsonData.duration}}</div>
              <span class="dw">/天</span>
            </div>
          </div>
          <div class="lis" v-show="dataType==2">
            <div class="lis-f">
              <div class="div-name-1">销假时长</div>
              <!-- 销假时长2 -->
            </div>
            <div class="lis-r">
              <div class="div-val-1">{{jsonData.duration_xj}}</div>
              <!-- <input type="number"
                     :disabled="(jsonData.leaveTypeId != '3' && jsonData.leaveTypeId != '1'&& jsonData.leaveTypeId != '5')"
                     class="input-time"
                     :placeholder="(jsonData.leaveTypeId == '3' || jsonData.leaveTypeId == '1'|| jsonData.leaveTypeId == '5')  ? '请输入时长' :'0'"
              v-model="jsonData.duration">-->
              <span class="dw">/天</span>
            </div>
          </div>
          <div class="lis" v-if="this.dataType != '2'">
            <div class="lis-f">
              <div class="div-name-1">图片</div>
            </div>
            <div class="lis-r">
              <div class="img-box" v-for="(item, index) in jsonData.fileViewLists" :key="index">
                <div class="icon-close" @click="delImg(index)"></div>
                <img :src="item" @click="viewImg(index)" alt />
              </div>
              <div class="upload-box img-box" v-if="jsonData.fileViewLists.length < 9">
                <van-uploader
                  :preview-size="55"
                  v-if="jsonData.fileViewLists.length < 9"
                  multiple
                  :after-read="afterRead"
                  @delete="delImg"
                  :max-count="9"
                ></van-uploader>
              </div>
            </div>
          </div>
          <div class="lis">
            <div class="lis-f xh">
              <div class="div-name-1">{{this.dataType=='2'?'销假事由' : '请假事由'}}</div>
            </div>
            <div class="lis-r">
              <!-- <input type="text"
                     class="input-time liy"
                     placeholder="请输入请假事由"
              v-model="jsonData.reason">-->
              <textarea
                placeholder="请输入请假事由"
                type="text"
                id
                maxlength="100"
                v-model="jsonData.reason"
                rows="3"
              ></textarea>
            </div>
          </div>
          <van-button
            type="primary"
            size="small"
            color="#518cf1"
            round
            @click="handleShowAuditPerson"
          >显示审批人员</van-button>
          <audit-select-person
            :assingersSelectList="assingersSelectList"
            v-if="isShowAudit"
            :newAssingersSelectList="newAssingersSelectList"
          ></audit-select-person>
          <!-- <van-cell v-model="carmodel" title="省/市/区" value="" @click="show = true"></van-cell> -->
        </div>
      </div>
    </div>
    <div class="commit-btn" @click="commitFun">提交</div>
    <!-- 开始 结束时间 -->
    <van-popup
      v-model="isPopShow"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        @cancel="cancelPicker"
        @confirm="confirmPicker"
        type="date"
        :title="popupTitle"
        :formatter="formatter"
      />
    </van-popup>
    <!-- <van-calendar v-model="isPopShow"
                  :min-date="minDate"
                  :max-date="maxDate"
                  type="range"
                  color="#79a2f9"
                  @cancel="cancelPicker"
    @confirm="confirmPicker" />-->
    <!-- 类型 -->
    <van-popup
      v-model="isPopShowType"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        position="right"
        :columns="columns"
        title="选择请假类型"
        @cancel="onCancel"
        @confirm="onConfirm"
      />
    </van-popup>
    <!-- 直系亲属关系 -->
    <van-popup
      v-model="isKinsfolkShowType"
      close-icon-position="top-left"
      position="bottom"
      :style="{ height: '40%' }"
    >
      <van-picker
        show-toolbar
        position="right"
        :columns="KinsfolkList"
        title="选择请假类型"
        @cancel="cancelKinsfolk"
        @confirm="okKinsfolk"
      />
    </van-popup>
    <!-- 省市区 -->
    <van-popup v-model="showArea" position="bottom">
      <!-- <van-area :area-list="areaList"
                :columns-num="1"
                @change="onChange"
                @confirm="AreaConfirm"
                @cancel="showArea = false"
      :value="provId" />-->
      <van-picker
        :columns="areaList"
        show-toolbar
        title
        :default-index="defaultIndex"
        @cancel="showArea = false"
        @confirm="AreaConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import HttpEhr from '@requestPool/index.js'
import auditSelectPerson from '@components/auditSelectPerson/index.vue'

// import util from '../../../util/util.js'
// import testdata from '../../../testJson/from.js'
import { ImagePreview } from 'vant'
export default {
  components: {
    auditSelectPerson
  },
  data() {
    return {
      newAssingersSelectList: [],
      isShowAudit: false,
      activeNames: ['0'],
      showArea: false,
      areaList: [],
      defaultIndex: 2, // 默认选中下标
      // --------------------
      nextNodeData: [],
      cacheFlowVar: {}, // 缓存流程变量
      flowMessages: [],
      oNodeButtons: [],
      flowData: {}, // 流程数据
      flowContext: {
        // 流程内容
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
      serverUrl: '',
      loginUserName: '',
      jsonData: {
        leaveTypeId: '3', // 请假类型id
        duration: 0, // 请假时长
        duration_xj: 0, // 销假时长
        duration_xj_list: [], // 销假的日期 置灰的日期
        reason: '', // 理由
        startTime: ''||'请选择', // 开始时间
        endTime: ''||'请选择', // 结束时间,
        dataId: '', // 原请假id  修改 , 销假用
        editType: '', // 默认空,修改:2
        // 图片集合
        fileViewLists: [
          // 'http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=1dc5278a5f9c4093ac28ceefb7415bae&loginUsername=yefei_hq',
        ],
        saveType: '1', // 1新增提交 2、修改提交（待办提交全部传1
        formType: '1', // 1:新增 1:修改 2:销假
        dateList: [], // 多选的日期
        kinsfolkId: '', // 亲属关系id
        areaNameTxt: ''||'请选择省份',
        provId: '' // 省id
      },
      dataType: '1', // 0:新增 1:修改 2:销假
      leaveTypetxt: '事假'||'请选择', // 请假类型文字
      popupTitle: '', // 时间选择title
      currentDate: new Date(),
      datePicker: 0, // 用于判断哪个选择器的显示与隐藏
      isPopShow: false, // 日历 - 隐藏与显示
      isPopShowType: false, // 请假类型 - 隐藏与显示
      // 请假类型1、年休2、病假3、事假4、工伤假5、婚假6、产假7、护理假8、丧假
      // 1 年休,3 事假,5 婚假,8 丧假 ----多选
      // 2 病假,4 工伤假,6 产假,7 护理假 ----连选
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
          id: '4',
          text: '工伤假'
        },
        {
          id: '5',
          text: '婚假'
        },
        {
          id: '6',
          text: '产假'
        },
        {
          id: '7',
          text: '护理假'
        },
        {
          id: '8',
          text: '丧假'
        }
      ],
      itemData: {}, // 传过来的表单数据
      title: '',
      showDateConp: false, // true 连选 false 多选
      dateArr: [],
      OldDateArr: [], // 元数据
      defaultValue: '', // default-value
      getBranchData: {},
      minDate: new Date(), // :min-date="minDate"
      maxDate: new Date(2100,0,1),
      isKinsfolkShowType: false, // 亲属关系 - 隐藏与显示
      KinsfolkList: [
        {
          id: '1',
          text: '父母'
        },
        {
          id: '2',
          text: '配偶父母'
        },
        {
          id: '3',
          text: '配偶'
        },
        {
          id: '4',
          text: '子女'
        }
      ],
      kinsfolkTxt: '请选择',
      xjFlag: false,
      toType: '1' // 1 调用请假接口  2  调用销假接口
    }
  },
  methods: {
    handleShowAuditPerson() {
      if(!this.jsonData.duration) {
        this.$toast({
          message: '请填写请假时长'
        })
      } else {
        this.getSelectAssinerList()
      }
    },
    // --------------------------公用数据解析处理---------------------------
    // 初始化表单流程数据
    load() {
      const classifyHangup='[HANGUP]'
      const flowData=this.flowData
      const cacheFlowVar=this.cacheFlowVar
      const flowNodesData=this.flowNodesData
      const flowMessages=this.initDefMessages() // yinh
      const oNodeButtons=this.oNodeButtons
      if(flowData.currentPerson&&flowData.currentPerson.id) {
        cacheFlowVar.personId=flowData.currentPerson.id
      } // yinh
      if(flowData.loginUsername) {
        cacheFlowVar.loginUsername=flowData.loginUsername
      }
      if(flowData.flowKeyId) { cacheFlowVar.flowKeyId=flowData.flowKeyId||'' }
      if(flowData.formId) cacheFlowVar.formId=flowData.formId||''
      if(flowData.dataId) cacheFlowVar.dataId=flowData.dataId||''
      if(Object.keys(flowData).length) {
        cacheFlowVar.flowDefId=flowData.flowBase.id
      } // yinh
      if(!flowData.firstNode||flowData.firstNode==='startEvent') {
        cacheFlowVar.firstNode=flowData.flowNodes[0].id
      } // yinh
      if(flowData.currentNode.nodeId) {
        cacheFlowVar.nodeId=flowData.currentNode.nodeId
      } else if(flowData.flowInst.currentNodeId) {
        cacheFlowVar.nodeId=flowData.flowInst.currentNodeId
      }
      if(flowData.isNewFlow) {
        cacheFlowVar.nodeId=cacheFlowVar.firstNode||''
      } else {
        cacheFlowVar.instId=flowData.flowInst.actInstId||''
        cacheFlowVar.proRunId=flowData.flowInst.proRunId||''
      }
      flowData.flowNodes.forEach((item,i) => {
        flowNodesData[item.id]=item
      })
      if(flowData.currentTask&&flowData.currentTask.id) {
        cacheFlowVar.taskUserId=flowData.currentTask.id||''
        cacheFlowVar.executionId=
          flowData.currentTask.actExecutionId||''

        // 流程权限控制button
        const lastOptType=flowData.currentTask.lastOperateType
        if(lastOptType=='authorize') {
          oNodeButtons.authorize=false // 授权任务，不允许再授权
          oNodeButtons.handover=false // 授权任务，不允许再转办
        } else if(lastOptType=='handover') {
          oNodeButtons.authorize=false // 转办任务，不允许再授权
          oNodeButtons.handover=false // 转办任务，不允许再转办
        } else if(lastOptType=='append') {
          oNodeButtons.append=false // 加签任务，不允许再加签
        }
        if(flowData.currentTask.classify==classifyHangup) {
          oNodeButtons.hangup=false
        }
      }
      this.cacheFlowVar=cacheFlowVar
      this.flowMessages=flowMessages
      this.oNodeButtons=oNodeButtons
      this.initFlowContext()
      // this.getSelectAssinerList()
    },
    async getSelectAssinerList() {
      const res=await this.getAssignersList()
      this.assingersSelectList=res.data.nodeAssigners
      this.isShowAudit=true
    },
    // 初始化提示文本
    initDefMessages() {
      const personName=this.flowData.currentPerson
      const applyerName=this.flowData.flowInst
        ? this.flowData.flowInst.applyerName
        :''
      const applyerStr=
        applyerName&&applyerName!=personName
          ? '('+applyerName+'的)'
          :''
      const flowName=this.flowData.flowBase.name
      const flowMessages={
        submit:
          personName+
          this.getButtonText('submit')+
          '了'+
          applyerStr+
          flowName+
          '，请处理',
        reject:
          personName+
          this.getButtonText('reject')+
          '了您的'+
          applyerStr+
          flowName+
          '，请查阅',
        restart:
          personName+
          this.getButtonText('restart')+
          '了您的'+
          applyerStr+
          flowName+
          '，请查阅',
        append:
          personName+
          this.getButtonText('append')+
          '给您了'+
          applyerStr+
          flowName+
          '，请处理',
        handover:
          personName+
          '将'+
          applyerStr+
          flowName+
          '转交给您'+
          '，请处理',
        notify:
          personName+
          this.getButtonText('notify')+
          '您及时处理'+
          applyerStr+
          flowName+
          '，请查阅',
        deliver:
          personName+
          '传给您的'+
          applyerStr+
          flowName+
          '，请查阅',
        authorize:
          personName+
          '授权您处理'+
          applyerStr+
          flowName+
          '，请查阅',
        jump:
          personName+
          '将'+
          applyerStr+
          flowName+
          '跳转给您，请处理',
        replace:
          personName+
          '将'+
          applyerStr+
          flowName+
          '处理人替换为您，请处理'
      }
      return flowMessages
    },
    getButtonText(type) {
      let text=''
      switch(type) {
        case 'submit':
          text='提交'
          break
        case 'reject':
          text='驳回'
          break
        case 'restart':
          text='强制驳回'
          break
        case 'append':
          text='加签'
          break
        case 'notify':
          text='转办'
          break
        default:
          break
      }
      return text
    },
    initFlowContext() {
      this.flowContext={
        ...this.flowContext,
        flowDefId: this.cacheFlowVar.flowDefId,
        flowKeyId: this.cacheFlowVar.flowKeyId,
        instId: this.cacheFlowVar.instId,
        nodeId: this.cacheFlowVar.nodeId,
        taskUserId: this.cacheFlowVar.taskUserId,
        executionId: this.cacheFlowVar.executionId,
        dataId: this.cacheFlowVar.dataId,
        formId: this.cacheFlowVar.formId,
        proRunId: this.cacheFlowVar.proRunId
          ? this.cacheFlowVar.proRunId
          :''
      }
    },
    // 获取页面数据
    getProcessParams(useBizData) {
      const params={}
      let formFields=this.flowData.flowBase.bizDataRule||''
      if(formFields) {
        formFields=JSON.parse(formFields)
        if(Array.isArray(formFields)) {
          let bizData={}
          if(useBizData) {
            bizData=this.parseBizData()
          }
          formFields.forEach((item,i) => {
            if(item.propertyName) {
              if(this.formData[item.propertyName]) {
                params[item.propertyName]=
                  this.formData[item.propertyName]||''
              } else {
                params[item.propertyName]=
                  bizData[item.propertyName]||''
                // em.bizDataKey && bizData[em.bizDataKey] 存在
                if(
                  item.bizDataKey&&
                  bizData[item.bizDataKey]
                ) {
                  params[item.propertyName]=
                    bizData[item.bizDataKey]
                }
              }
            }
          })
        }
      }
      console.log('this.formData----------------')
      console.log(this.flowData)

      params.departmentType=this.flowData.currentPerson.departmentType
      params.departmentBizType=this.flowData.currentPerson.departmentBizType
      console.log(params)

      // params.departmentType = this.formData.departmentType
      // params.departmentBizType = this.formData.departmentBizType
      return params
    },
    parseBizData() {
      let params={}
      params={ ...this.formData }
      return params
    },
    // -------------------------表单数据处理----------------------------
    // 1. form.do
    leaveApplyDetail() {
      // return new Promise((resolve, reject) => {
      HttpEhr.leaveApplyDetail({
        userId: this.util.getSession('sessionData').userId,
        dataId: this.jsonData.dataId, // 销假和新增为空,修改要传值
        editType: this.jsonData.editType, // 修改专用
        formType: this.jsonData.formType
      }).then(res => {
        // resolve(res)
        this.flowData=res.data.flowData
        this.toType=res.data.formData.toType
        this.load()
      })
      // })
    },
    // 2. 分支接口
    getBranch() {
      return new Promise((resolve,reject) => {
        HttpEhr.getBranch({
          userId: this.util.getSession('sessionData').userId,
          type: this.jsonData.leaveTypeId,
          sum: this.jsonData.duration
        }).then(res => {
          resolve(res.data)
        })
      })
    },
    // 3.获取审批人信息
    async getAssignersList() {
      this.getBranchData=await this.getBranch()
      const params={
        flowDefId: this.cacheFlowVar.flowDefId||'',
        instId: this.cacheFlowVar.instId||'',
        proRunId: this.cacheFlowVar.proRunId||''
      }
      console.log('getBranchData',this.getBranchData)
      params.paramMap={ ...this.getProcessParams(true) }
      params.paramMap.theFirstTrial=this.getBranchData.theFirstTrial
      params.paramMap.inCharge=this.getBranchData.inCharge
      console.log(params.paramMap)
      const data={
        loginUsername: this.cacheFlowVar.loginUsername,
        personId: this.cacheFlowVar.personId,
        formData: params
      }
      return new Promise((resolve,reject) => {
        HttpEhr.getAssignersList(data).then(res => {
          resolve(res)
        })
      })
    },
    // 4. 获取下一节点
    getNextNode() {
      return new Promise((resolve,reject) => {
        if(JSON.stringify(this.flowContext.processVar)=='{}') {
          delete this.flowContext.processVar
          console.log(this.flowContext)
        }
        Object.assign(
          this.flowContext.processParams,
          this.getBranchData
        )

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
    addAndEditVacation() {
      return new Promise((resolve,reject) => {
        HttpEhr.addAndEditVacation({
          userId: this.util.getSession('sessionData').userId||'',
          type: this.jsonData.leaveTypeId,
          startDate: this.jsonData.startTime,
          endDate: this.jsonData.endTime,
          sum: this.jsonData.duration,
          url: JSON.stringify(this.jsonData.fileViewLists),
          flowData: JSON.stringify(this.flowContext),
          note: this.jsonData.reason,
          id: this.jsonData.dataId,
          saveType: this.jsonData.saveType,
          dates: JSON.stringify(this.jsonData.dateList),
          relativeType: this.jsonData.kinsfolkId,
          cityName: this.jsonData.areaNameTxt,
          cityValue: this.jsonData.provId
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 6.销假
    removeVacation() {
      return new Promise((resolve,reject) => {
        HttpEhr.removeVacation({
          userId: this.util.getSession('sessionData').userId||'',
          remId: this.$route.query.id, // 原请假id
          startDate: this.jsonData.startTime,
          endDate: this.jsonData.endTime,
          sum: this.jsonData.duration_xj,
          note: this.jsonData.reason,
          flowData: JSON.stringify(this.flowContext),
          url: JSON.stringify(this.jsonData.fileViewLists),
          // id: this.jsonData.dataId,
          saveType: this.jsonData.saveType,
          dates: JSON.stringify(this.jsonData.duration_xj_list),
          relativeType: this.jsonData.kinsfolkId,
          cityName: this.jsonData.areaNameTxt,
          cityValue: this.jsonData.provId
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 提交按钮
    async commitFun() {
      console.log(
        this.dataType=='0'||this.dataType=='1'||!this.xjFlag
      )
      if(!this.isShowAudit) {
        this.$toast({
          message: '请先查看审批人员信息'
        })
        return
      }
      console.log(this.dataType,this.xjFlag)
      // return
      console.log(this.dataType=='2'&&this.xjFlag)
      console.log(this.jsonData.duration,typeof this.jsonData.duration)
      console.log(this.jsonData.duration_xj_list.length)
      // return
      if(!this.jsonData.reason) {
        // 请假事由哦
        let message='请假事由不能为空'
        if(this.dataType=='2') {
          message='销假事由不能为空'
        }
        this.$toast({
          message: message
        })
        return
      }
      if(this.jsonData.leaveTypeId=='8'&&!this.jsonData.kinsfolkId) {
        this.$toast({
          message: '请假事由不能为空'
        })
        return
      }

      if(!parseInt(this.jsonData.duration)) {
        this.$toast({
          message: '请选择请假日期'
        })
        return
      }
      console.log(this.jsonData)
      console.log(this.jsonData.duration_xj_list.length)
      if(
        this.jsonData.duration_xj_list.length<1&&
        this.dataType=='2'
      ) {
        this.$toast({
          message: '请选择请假日期'
        })
        return
      }
      // HttpEhr.getNextNode({
      //   dates: JSON.stringify(this.jsonData.dateList)
      // }).then(res => {
      // })
      // return
      await this.getBranch().then(res => {
        if(res.data) {
          this.getBranchData=res.data
          Object.assign(this.flowContext.processParams,res.data)
        }
      })
      await this.getAssignersList().then(res => {
        this.newAssingersSelectList.forEach((item,index) => {
          if(!item.assignerId) {
            this.$toast({
              message: '请选择审批人员'
            })
          }
        })
        console.log(
          'this.newAssingersSelectList',
          this.newAssingersSelectList
        )
        this.assigners=res.data
        this.assigners.nodeAssigners.forEach((item,index) => {
          this.flowContext.preAssigners[item.nodeId]={
            assignerId:
              this.newAssingersSelectList[index].assignerId||'',
            assignerName:
              this.newAssingersSelectList[index].assignerName||
              ''
          }
        })
      })

      await this.getNextNode().then(res => {
        this.nextNodeData=res.data
        // 用nextNode里的id取出assigners的当前环节处理人
        const nextNodeAssigner=this.assigners.nodeAssigners.find(
          assigner => {
            return (
              assigner.nodeId.toLowerCase()==
              this.nextNodeData[0].id.toLowerCase()
            )
          }
        )
        console.log('nextNodeAssigner',nextNodeAssigner)
        // 当存在多个处理人时 用defaultShow 取出默认处理人
        const nextNodePerson=
          nextNodeAssigner.nodeAssignerPersons[
          nextNodeAssigner.defaultShow
          ]

        this.flowContext.nextNodeId=this.nextNodeData[0].id
        this.flowContext.flowMessage=''
        this.flowContext.flowComment=''
        if(!nextNodePerson) {
          this.flowContext.assigners[
            this.nextNodeData[0].id.toLowerCase()
          ]=''
        } else {
          this.flowContext.assigners[
            this.nextNodeData[0].id.toLowerCase()
          ]=nextNodePerson.sysUsername||''
        }
      })
      // if ((this.dataType == '0' || this.dataType == '1') || !this.xjFlag) {
      if(this.toType=='1') {
        await this.addAndEditVacation().then(res => {
          if(res.code==0) {
            this.$toast.success({
              message: '提交成功'
            })
            this.$router.push({ name: 'applyRecord' })
          }
        })
        // } else if (this.dataType == '2' && this.xjFlag) {
      } else if(this.toType=='2') {
        await this.removeVacation().then(res => {
          if(res.code==0) {
            this.$toast.success({
              message: '销假成功'
            })
            this.$router.push({ name: 'applyRecord' })
          }
        })
      }
    },

    // 图片上传 读取完成后的回调函数
    async afterRead(e) {
      const jsonData=new FormData()
      if(e&&e.length) {
        // 判断是否是多图上传 多图则循环添加进去
        e.forEach(item => {
          jsonData.append(
            'loginUsername',
            this.util.getSession('sysUsername').sysUsername
          )
          jsonData.append('file',item.file) // 第一个参数字符串可以填任意命名，第二个根据对象属性来找到file
        })
      } else {
        jsonData.append(
          'loginUsername',
          this.util.getSession('sysUsername').sysUsername
        )
        jsonData.append('file',e.file)
      }
      await HttpEhr.multiUpload(jsonData).then(res => {
        const newList=[]
        res.data.forEach(element => {
          const url=`${
            this.serverUrl
            }/cap-bpm/attach/download.do?id=${
            element.id
            }&loginUsername=${this.util.getSession('sysUsername')
              .sysUsername||'huaxin'}`
          newList.push(url)
        })
        this.jsonData.fileViewLists=[
          ...this.jsonData.fileViewLists,
          ...newList
        ]
        // http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=2a0df3e74c2c495fbe80198c85f0cf7a&loginUsername=wangw
      })
    },
    // 图片删除
    delImg(index) {
      this.jsonData.fileViewLists.splice(index,1)
    },
    // 图片预览
    viewImg(index) {
      ImagePreview({
        images: this.jsonData.fileViewLists,
        startPosition: index
      })
    },
    // 打开时间选择器 0: 开始 1: 结束
    showDatePicker(picker) {
      // if (this.dataType == '2') return
      this.isPopShow=true
      this.datePicker=picker
      if(this.datePicker) {
        this.popupTitle='选择结束日期'
      } else {
        this.popupTitle='选择开始日期'
      }
    },
    formatDate(date) {
      const y=date.getFullYear()
      let m=date.getMonth()+1
      let d=date.getDate()
      m=m<10? '0'+m:m
      d=d<10? '0'+d:d
      const newTime=`${y}-${m}-${d}`
      return newTime
    },
    // 控制显示多选还是连选组件
    showDateConpFun() {
      // 1 年休,3 事假,5 婚假,8 丧假 ----多选
      if(
        this.jsonData.leaveTypeId=='1'||
        this.jsonData.leaveTypeId=='3'||
        this.jsonData.leaveTypeId=='5'||
        this.jsonData.leaveTypeId=='8'
      ) {
        this.showDateConp=false
        if(this.jsonData.dateList.length>0) {
          // this.dateArr = JSON.parse(this.jsonData.dateList)
          this.dateArr=this.jsonData.dateList
        }
        console.log('多选')
        console.log(this.jsonData)
      } else if(
        this.jsonData.leaveTypeId=='2'||
        // 2 病假,4 工伤假,6 产假,7 护理假 ----连选
        this.jsonData.leaveTypeId=='4'||
        this.jsonData.leaveTypeId=='6'||
        this.jsonData.leaveTypeId=='7'
      ) {
        this.showDateConp=true
        this.jsonData.dateList=[]
        console.log('连选')
        console.log(this.jsonData)
      }
    },
    // 确定日期选择，时间格式化并显示在页面上
    confirmPicker(value) {
      const date=value
      const y=date.getFullYear()
      let m=date.getMonth()+1
      let d=date.getDate()
      m=m<10? '0'+m:m
      d=d<10? '0'+d:d
      const newTime=`${y}-${m}-${d}`
      if(this.datePicker) {
        this.jsonData.endTime=newTime
      } else {
        this.jsonData.startTime=newTime
      }
      this.isPopShow=false
      // if (this.jsonData.leaveTypeId != '3' && this.jsonData.leaveTypeId != '1' || this.jsonData.leaveTypeId != '5' && this.jsonData.leaveTypeId != '8') {
      this.jsonData.duration=this.DateMinus(
        this.jsonData.startTime,
        this.jsonData.endTime
      )
      // }
    },
    // 连选--确定日期选择，时间格式化并显示在页面上  -- 连选组件用的
    confirmPicker_2(value) {
      const [start,end]=value
      this.jsonData.startTime=this.formatDate(start)
      this.jsonData.endTime=this.formatDate(end)
      this.jsonData.duration=this.DateMinus(
        this.jsonData.startTime,
        this.jsonData.endTime
      )
      this.isPopShow=false
      console.log(this.jsonData)
    },
    // 多选--确定日历
    clickElPicker() {
      // this.jsonData.dateList = this.dateArr ? this.dateArr.join() : []
      this.jsonData.dateList=this.dateArr
      if(this.dateArr.length==1) {
        this.jsonData.startTime=this.dateArr[0]
        this.jsonData.endTime=this.dateArr[0]
      }
      this.jsonData.duration=this.dateArr.length
      const newArr=[]
      this.dateArr.forEach(element => {
        newArr.push(new Date(element).getTime())
      })
      this.jsonData.startTime=this.strDateFormat(Math.min(...newArr))
      this.jsonData.endTime=this.strDateFormat(Math.max(...newArr))
      console.log('this.jsonData.dateList-----'+this.jsonData.dateList)
    },
    clickElPicker2() {
      console.log(this.dateArr)
      this.jsonData.duration_xj_list=this.filterFun(
        this.OldDateArr,
        this.dateArr
      )
      this.jsonData.duration_xj=this.jsonData.duration_xj_list.length
      // this.jsonData.duration = this.dateArr.length
    },
    // 时间戳转字符串日期
    strDateFormat(timestamp) {
      var time=new Date(timestamp) // 先将时间戳转为Date对象，然后才能使用Date的方法
      var year=time.getFullYear()
      var month=time.getMonth()+1 // 月份是从0开始的
      var day=time.getDate()
      // add0()方法在后面定义
      return year+'-'+this.add0(month)+'-'+this.add0(day)
    },
    // 补0
    add0(m) {
      return m<10? '0'+m:m
    },
    // 关闭日历选择
    cancelPicker() {
      this.isPopShow=false
      this.datePicker=''
    },
    // 格式化选择器日期
    formatter(type,value) {
      if(type==='year') {
        return `${value}年`
      } else if(type==='month') {
        return `${value}月`
      } else if(type==='day') {
        return `${value}日`
      }
      return value
    },
    // 打开请假类型下拉选
    openPopShowType() {
      if(this.dataType=='2') return
      this.isPopShowType=true
    },
    // 确认请假类型选择
    onConfirm(item,index) {
      this.leaveTypetxt=item.text
      this.jsonData.leaveTypeId=item.id
      this.isPopShowType=false
      this.showDateConpFun()
      this.jsonData.duration=0
      this.jsonData.dateList=[]
      this.dateArr=[]
      if(
        this.jsonData.leaveTypeId!='3'&&
        this.jsonData.leaveTypeId!='1'&&
        this.jsonData.leaveTypeId!='5'
      ) {
        this.jsonData.startTime='请选择'
        this.jsonData.endTime='请选择'
      }
    },
    // 关闭请假类型下拉选
    onCancel() {
      this.isPopShowType=false
    },
    // 打开亲属关系下拉选
    openKinsfolk() {
      if(this.dataType=='2') return
      this.isKinsfolkShowType=true
    },
    // 确定亲属类型
    okKinsfolk(item) {
      this.kinsfolkTxt=item.text
      this.jsonData.kinsfolkId=item.id
      this.isKinsfolkShowType=false
    },
    // 打开亲属关系下拉选
    cancelKinsfolk() {
      this.isKinsfolkShowType=false
    },
    // 计算时间开始,结束日期差
    DateMinus(start,end) {
      const newstart=new Date(start)
      const now=new Date(end)
      const days=now.getTime()-newstart.getTime()
      const day=parseInt(days/(1000*60*60*24))
      console.log(isNaN(day))
      if(isNaN(day)) {
        return 0
      }
      if(day<0) {
        this.$toast('开始日期不能大于结束时间')
        return
      }
      return day+1
    },
    // 赋值传递参数
    setVal() {
      this.jsonData.startTime=this.itemData.startDate
      this.jsonData.endTime=this.itemData.endDate
      this.jsonData.duration=this.itemData.sum // 时长
      this.jsonData.reason=this.itemData.note // 理由
      this.jsonData.leaveTypeId=this.itemData.type // 请假类型
      this.jsonData.areaNameTxt=this.itemData.cityName // 省名称
      this.jsonData.provId=this.itemData.cityValue // 省id
      this.jsonData.fileViewLists=JSON.parse(this.itemData.url)
      const newObj=this.columns.find(item => {
        return item.id==this.itemData.type
      })
      this.leaveTypetxt=newObj.text // 请假类型
      this.jsonData.dateList=JSON.parse(this.itemData.dates) // 多选日期
      this.dateArr=
        JSON.parse(this.itemData.dates).length>0
          ? JSON.parse(this.itemData.dates)
          :[]
      this.OldDateArr=
        JSON.parse(this.itemData.dates).length>0
          ? JSON.parse(this.itemData.dates)
          :[]

      this.defaultValue=this.dateArr[0]
      if(this.jsonData.dateList) {
        this.defaultValue=this.jsonData.dateList[0]
      }
      this.showDateConpFun()
    },
    // 获取环境地址
    urlInit() {
      // console.log(this.util.getSession('sysUsername').sysUsername)
      // console.log(this.buildType + '环境-1111')
      switch(this.buildType.toUpperCase()) {
        case 'PRO':
          this.serverUrl=''
          break
        case 'PRE':
          this.serverUrl=''
          break
        case 'Q3':
          // http://hafdev.hxoadev.com/cap-bpm/attach/download.do?id=2a0df3e74c2c495fbe80198c85f0cf7a&loginUsername=wangw
          // const url = `${this.serverUrl}/cap-bpm/attach/download.do?id=${element.id}&loginUsername=${this.util.getSession('sysUsername').sysUsername || 'huaxin'}`
          // http://mobq.huaxincem.com/cap-bpm/attach/download.do?id=2a0df3e74c2c495fbe80198c85f0cf7a&loginUsername=yeliangjun_hq
          this.serverUrl='http://mob.huaxincem.com'
          break
        case 'PRO_DEV':
          this.serverUrl='http://mob.huaxincem.com'
          break
        default:
          // dev
          this.serverUrl='http://mobq.huaxincem.com'
          break
      }
      console.log(this.serverUrl)
    },
    // 获取上月第一天
    getFirstDay() {
      const nowdays=new Date()
      let year=nowdays.getFullYear()
      let month=nowdays.getMonth()
      if(month==0) {
        month=12
        year=year-1
      }
      console.log(year+','+month+','+'1')
      this.minDate=new Date(year,month-1,1)
    },
    // 判断日期是否连选
    runningDays(arr_days) {
      // const arr_days = [
      //   '2018-02-28 10:00:00',
      //   '2018-02-29 10:00:01', // 闰月
      //   '2018-03-01 10:00:02', // 跨月
      //   '2018-03-02 10:00:03'
      // ]
      // 先排序，再转时间戳
      const days=arr_days.sort().map((d,i) => {
        const dt=new Date(d)
        dt.setDate(dt.getDate()+4-i) // 处理为相同日期

        // 去除时、分、秒、毫秒
        dt.setHours(0)
        dt.setMinutes(0)
        dt.setSeconds(0)
        dt.setMilliseconds(0)

        return +dt
      })

      let ret=true

      days.forEach(d => {
        if(days[0]!==d) {
          ret=false
        }
      })

      return ret
    },
    // 打开省份下拉选
    openAreaShow() {
      this.showArea=!this.showArea
    },
    // 确定省份
    AreaConfirm(el) {
      this.showArea=!this.showArea
      // let areaName = ''
      // for (var i = 0; i < value.length; i++) {
      //   areaName = areaName + value[i].name + ' '
      // }
      this.jsonData.areaNameTxt=el.text
      this.jsonData.provId=el.value
    },
    // 获取省份列表
    getProvList() {
      HttpEhr.getProvList({
        type: 'md-sap-zone'
      }).then(res => {
        this.areaList=res.data
        if(this.provId) {
          this.defaultIndex=this.areaList.findIndex(
            fruit => fruit.value==this.provId
          )
        }
      })
    },
    // getIndex () {
    //   const index = this.areaList.findIndex(fruit => fruit.value === '060')
    // }
    filterFun(OldList,newList) {
      // OldList, newList
      // OldList 元数据, newList 选后数据
      // const OldList = ['1', '2', '3', '5', '4', '6'] // 元数据
      // const newList = ['1', '2', '3', '4'] // 选后数据
      const c=[...newList,...OldList]
      const d=new Set(c)
      const e=Array.from(d)
      const f=[
        ...e.filter(_ => !newList.includes(_)),
        ...e.filter(_ => !OldList.includes(_))
      ]
      console.log(f) // [5, 6]
      return f
    }
  },
  mounted() {
    // console.log(this.runningDays())
    this.urlInit()
    this.itemData=this.$route.query.itemData||{}
    // 销假修改
    // if (this.itemData.dataType == 1) {
    //   this.xjFlag = true
    // }
    this.dataType=this.$route.query.flag||'0'
    // 本地 this.dataType 0:新增 1:修改 2:销假
    // 提交接口 saveType 1、销假 新增提交 2、修改提交
    if(this.dataType=='0') {
      // 新增
      this.title='请假申请'
      this.jsonData.saveType='1'
    } else if(this.dataType=='1') {
      // 修改
      this.title='请假申请'
      this.jsonData.saveType='2'
      this.jsonData.editType='2'
      // 数据id
      this.jsonData.dataId=this.$route.query.id||''
      this.setVal()
    } else if(this.dataType=='2') {
      // 销假
      this.title='假期申请调整'
      this.jsonData.saveType='1'
      this.jsonData.formType='2'
      this.setVal()
    }
    document.title=this.title
    this.getProvList()
    this.leaveApplyDetail()
    this.getFirstDay()

    // console.log(this.$route.query.id)
    // console.log('this.jsonData.dataId====' + this.jsonData.dataId)
    // console.log('this.jsonData.formType----' + this.jsonData.formType)
    // console.log(this.jsonData.saveType)
  }
}
</script>

<style>
.el-icon-arrow-left::before,
.el-icon-arrow-right:before {
  right: 0.6rem;
  position: relative;
  font-size: 0.35rem;
  display: block;
}
.el-icon-arrow-left::before {
  right: -0.6rem;
}
.el-icon-d-arrow-left:before,
.el-icon-d-arrow-right:before {
  font-size: 0.35rem;
}
.el-picker-panel.el-date-picker.el-popper {
  left: 0.4rem !important;
}
.popper__arrow {
  left: 3rem !important;
}
.el-popper[x-placement^="bottom"] .popper__arrow:after {
  /* margin-left: 1.2rem; */
}
</style>
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
            margin-right: 0.2rem;
            .div-name-1 {
              font-size: 0.28rem;
              color: #666666;
              // text-align-last: justify;
              text-align: justify;
              min-width: 1.2rem;
            }
            &.xh::before {
              content: "* ";
              color: red;
            }
          }
          .lis-r {
            flex: 5;
            position: relative;
            &.el-picker {
              .el-date-editor.el-input,
              .el-date-editor.el-input__inner {
                border: 1px solid transparent;
                // border: none;
                width: 95%;
              }
            }
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
            textarea {
              width: 100%;
              box-sizing: border-box;
              border: 1px solid #eee;
              padding: 0.1rem;
              margin: 0;
              border-radius: 0.1rem;
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
