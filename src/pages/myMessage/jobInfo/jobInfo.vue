<template>
  <div class="jobInfo">
    <div class="lis-title">
      <span>职位信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">事业部/中心:</div>
          <div class="lis-row lis-value">{{item.orgCompanyName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">所在单位:</div>
          <div class="lis-row lis-value">{{item.afDivisionName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">所在部门:</div>
          <div class="lis-row lis-value">{{item.afDepartmentName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">公司:</div>
          <div class="lis-row lis-value">{{item.afCompanyName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">职位:</div>
          <div class="lis-row lis-value">{{item.afPositionName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">成本中心:</div>
          <div class="lis-row lis-value">{{item.costCenterName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">岗级:</div>
          <div class="lis-row lis-value">{{item.postLevelName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">人级:</div>
          <div class="lis-row lis-value">{{item.personLevelTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">差旅级别:</div>
          <div class="lis-row lis-value">{{item.extInfo8}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">直接上级:</div>
          <div class="lis-row lis-value">
            {{item.leaderName}}
            <!-- <div class="edit-box disable" v-if="formData.afStatus == 1"></div>
            <div class="edit-box" v-else @click="showEditFn"></div>-->
          </div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">手机话费报销额度:</div>
          <div class="lis-row lis-value">{{item.quotaStandard}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">报销比例:</div>
          <div class="lis-row lis-value">{{item.reimbursementRate}}</div>
        </div>
      </div>
    </div>
    <van-dialog v-model="showEdit" @close="close" @cancel="save" title="修改直接上级" show-cancel-button confirm-button-text="取消" cancel-button-text="提交" class="edit-superior">
      <div class="con">
        <div class="txt">直接上级：</div>
        <div class="person-box">
          <van-tag class="person-tag" plain closeable size="medium" type="primary" v-for="(el,index) in personAry" :key="index" @close="del(index)">{{el.leaderName}}</van-tag>
        </div>
        <div class="select-btn" @click="showPerson">选择上级</div>
      </div>
    </van-dialog>
    <selectPersonCard v-model="isShowPerson" @config="handleSelectConfig" :departmentId="departmentId"></selectPersonCard>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../../../style/tabList.scss'
import HttpEhr from '@requestPool/index.js'
import selectPersonCard from '@components/selectPersonCard/index.vue'

export default {
  components: { selectPersonCard },
  props: {},
  data () {
    return {
      str: '职业信息测试数据',
      jsonDataList: [],
      showEdit: false,
      personAry: [],
      cachePersonAry: [],
      isShowPerson: false,
      departmentId: '',
      formData: {}, //表单数据
      flowData: {}, // 流程数据
      cacheFlowVar: {}, // 缓存流程数据
      flowContext: {
        // 流程内容
        assigners: {},
        preAssigners: {},
        subProcessVar: {},
        processVar: {},
        processParams: {},
        operateType: ''
      },
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      infoData: 'getInfoData'
    })
  },
  mounted () {
    this.getForm()
    this.setPerson()
  },
  methods: {
    setPerson () {
      if (!this.infoData[0].dataList) {
        this.jsonDataList = [{}]
        return
      }
      this.jsonDataList = this.infoData[0].dataList
      let leaderIdAry = []
      let leaderNameAry = []
      if (this.jsonDataList[0].leaderId) {
        leaderIdAry = this.jsonDataList[0].leaderId.split(',')
        leaderNameAry = this.jsonDataList[0].leaderName.split(',')
      }
      for (let i in leaderIdAry) {
        this.personAry.push({
          leaderId: leaderIdAry[i],
          leaderName: leaderNameAry[i]
        })
      }
      this.cachePersonAry = JSON.parse(JSON.stringify(this.personAry))
    },
    async save () {
      if (this.personAry.length == 0) {
        this.$toast({
          message: '请至少选择一个直接上级',
          duration: 1500,
          onClose: () => {
            this.showEdit = true
          }
        })
        return
      }
      let leaderId = ''
      let leaderName = ''
      for (let i in this.personAry) {
        leaderId += i == 0 ? this.personAry[i].leaderId : ',' + this.personAry[i].leaderId
        leaderName += i == 0 ? this.personAry[i].leaderName : ',' + this.personAry[i].leaderName
      }
      this.formData.dataList[0].afType = '02'
      this.formData.dataList[0].leaderId = leaderId
      this.formData.dataList[0].leaderName = leaderName

      await this.getAssignersList()
      await this.getNextNode()


      this.flowContext['operateType'] = 'submit'
      this.flowContext['nextNodeId'] = this.cacheFlowVar['nextNodeId']
      this.flowContext['assigners'][this.cacheFlowVar['nextNodeId']] = this.nextNodePerson.assignerId || ''

      let flowContext = { ...this.flowData, ...this.flowContext }
      const data = {
        userId: this.util.getSession('ehrSessionData').userId || '',
        flowData: flowContext,
        formData: this.formData
      }

      HttpEhr.saveLeader(data).then(res => {
        if (res.code == 0)
          this.$toast.success({
            message: '提交成功，正在审批中',
            duration: 1500,
            onClose: () => {
              this.getForm()
            }
          })
      })
    },
    getAssignersList () {
      const params = {
        flowDefId: this.cacheFlowVar.flowDefId || '',
        instId: this.cacheFlowVar.instId || '',
        proRunId: this.cacheFlowVar.proRunId || '',
        paramMap: { ...this.getProcessParams(true) }
      }
      const data = {
        loginUsername: this.cacheFlowVar.loginUsername,
        personId: this.cacheFlowVar.personId,
        formData: params
      }
      return new Promise((resolve, reject) => {
        HttpEhr.getAssignersList(data).then(res => {
          this.cacheFlowVar['assigners'] = res.data
          this.processPreAssigner()
          resolve(res)
        })
      })
    },
    getNextNode () {
      return new Promise((resolve, reject) => {
        if (JSON.stringify(this.flowContext.processVar) == '{}') {
          delete this.flowContext.processVar
        }
        HttpEhr.getNextNode({
          personId: this.cacheFlowVar.personId,
          flowContext: this.flowContext
        }).then(res => {
          this.cacheFlowVar['nextNodes'] = res.data
          this.processNextNode()
          resolve(res.data)
        })
      })
    },
    processNextNode () {
      let nextNodeId = this.cacheFlowVar['nextNodes'][0].id
      let nextNodePerson = {}
      this.cacheFlowVar['nextNodeId'] = nextNodeId

      if (nextNodeId === 'EndEvent') {
        this.cacheFlowVar['nextNodeId'] = 'FirstNode'
        nextNodePerson = {
          assignerName: this.flowData.flowInst.applyerName,
          assignerId: this.flowData.flowInst.applyerId
        }
      } else {
        const preAssigners = this.flowContext['preAssigners'] || {}
        if (Object.keys(preAssigners).length === 0) {
          this.$toast({ message: '下一环节处理人不存在' })
          return false
        }
        nextNodePerson = preAssigners[nextNodeId] || {}
      }
      this.nextNodePerson = nextNodePerson
    },
    // 加工preAssinger
    processPreAssigner () {
      let flowContext = this.flowContext
      const assigners = this.cacheFlowVar['assigners']

      assigners.nodeAssigners.forEach(assign => {
        const defaultAssigner = 0
        if (assign['nodeAssignerPersons'].length > 0) {
          flowContext['preAssigners'][assign.nodeId] = {
            assignerId: assign['nodeAssignerPersons'][defaultAssigner].sysUsername,
            assignerName: assign['nodeAssignerPersons'][defaultAssigner].name
          }
        } else {
          flowContext['preAssigners'][assign.nodeId] = {
            assignerId: '',
            assignerName: ''
          }
        }
      })
      this.flowContext = flowContext
    },
    // 获取processParams数据
    getProcessParams () {
      const params = {}
      const formData = this.formData
      let formFields = this.flowData.flowBase.bizDataRule || ''
      if (formFields) {
        formFields = JSON.parse(formFields)
        if (Array.isArray(formFields)) {
          formFields.forEach((item, i) => {
            if (item.propertyName) {
              if (formData[item.propertyName]) {
                params[item.propertyName] = formData[item.propertyName] || ''
              }
            }
          })
        }
      }
      params['departmentType'] = formData.departmentType
      params['departmentBizType'] = formData.departmentBizType
      params['theFirstTrial'] = formData.theFirstTrial
      return params
    },
    // 初始化流程数据
    load () {
      const flowData = this.flowData
      const cacheFlowVar = this.cacheFlowVar
      if (flowData.currentPerson && flowData.currentPerson.id) {
        cacheFlowVar.personId = flowData.currentPerson.id
      }
      if (flowData.loginUsername) {
        cacheFlowVar.loginUsername = flowData.loginUsername
      }
      if (flowData.flowKeyId) {
        cacheFlowVar.flowKeyId = flowData.flowKeyId || ''
      }
      if (flowData.formId) cacheFlowVar.formId = flowData.formId || ''
      if (flowData.dataId) cacheFlowVar.dataId = flowData.dataId || ''
      if (Object.keys(flowData).length) {
        cacheFlowVar.flowDefId = flowData.flowBase.id
      }
      if (!flowData.firstNode || flowData.firstNode === 'startEvent') {
        cacheFlowVar.firstNode = flowData.flowNodes[0].id
      }
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
      if (flowData.currentTask && flowData.currentTask.id) {
        cacheFlowVar.taskUserId = flowData.currentTask.id || ''
        cacheFlowVar.executionId = flowData.currentTask.actExecutionId || ''
      }
      this.cacheFlowVar = cacheFlowVar
      this.flowContext = {
        ...this.flowContext,
        flowDefId: this.cacheFlowVar.flowDefId,
        flowKeyId: this.cacheFlowVar.flowKeyId,
        nodeId: this.cacheFlowVar.nodeId,
        dataId: this.cacheFlowVar.dataId,
        formId: this.cacheFlowVar.formId,
        proRunId: this.cacheFlowVar.proRunId || ''
      }
      this.flowContext.processParams = this.getProcessParams()
    },
    getForm () {
      HttpEhr.getAfPerson({ 'afPersonId': this.util.getSession('ehrSessionData').userId || '' })
        .then(res => {
          this.departmentId = res.data.formData.dataList[0] && res.data.formData.dataList[0].afDepartmentId
          this.formData = res.data.formData
          this.flowData = res.data.flowData
          this.load()
        })
    },
    showEditFn () {
      this.showEdit = true
      this.personAry = JSON.parse(JSON.stringify(this.cachePersonAry))
    },
    handleSelectConfig (value) {
      this.personAry.push({
        leaderId: value.id,
        leaderName: value.name
      })
    },
    close () {
      this.showEdit = false
    },
    showPerson () {
      this.isShowPerson = true
    },
    del (index) {
      this.personAry.splice(index, 1)
    }
  },
}
</script>
<style lang="scss" scoped>
.edit-box {
  width: 0.32rem;
  height: 0.23rem;
  background: url("../../../../static/img/bianji.png");
  background-size: 100% 100%;
  display: inline-block;
  margin-left: 0.1rem;
}

.edit-superior {
  .con {
    display: flex;
    padding: 0.45rem 0.37rem 0 0.43rem;

    .txt {
      font-size: 0.22rem;
      color: #333;
    }
    .select-btn {
      width: 1.36rem;
      height: 0.46rem;
      background: #5576ab;
      color: #fff;
      font-size: 0.24rem;
      border-radius: 0.23rem;
      text-align: center;
      line-height: 0.46rem;
    }

    .person-box {
      margin: 0 0.2rem 0 0.1rem;
      flex: 1;
      font-size: 0;
      .person-tag {
        margin: 0 0.1rem 0.1rem 0;
      }
    }
  }
}
</style>
<style lang="scss">
.jobInfo {
  .van-dialog__header {
    font-size: 0.26rem;
    color: #333;
  }
  .van-button--large {
    width: 1.6rem;
    height: 0.54rem;
    border-radius: 0.27rem;
    font-size: 0.32rem;
    line-height: 0.32rem;
    flex: unset;
  }

  .van-dialog__cancel {
    background: #5576ab;
    color: #fff;
  }

  .van-dialog__confirm {
    background: #efefef;
    color: #666;
    border: 1px solid #ccc;
    margin-left: 0.5rem;
  }
  .van-hairline--top:after,
  .van-hairline--left:after {
    border: 0;
  }
  .van-dialog__footer--buttons {
    justify-content: center;
    padding: 0.6rem 0;
  }
  .disable {
    opacity: 0.5;
  }
}
</style>
