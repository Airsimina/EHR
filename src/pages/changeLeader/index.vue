<template>
  <div class="container">
    <van-cell :class="formData.afStatus == 1 ? 'disabled' : ''" :is-link="formData.afStatus != 1" required :border="false" @click="showEditFn">
      <div class="my-leader">
        <p class="leader-title">
          直接上级
          <!-- <span class="require-tip">*</span> -->
        </p>
        <p>
          <span v-for="(el,index) in personAry" :key="index">{{(index > 0 ? '，' : '') + el.leaderName}}</span>
        </p>
      </div>
    </van-cell>
    <div class="process">
      <van-cell required :border="false">
        <div class="my-leader">
          <p class="leader-title">
            审批流程
            <!-- <span class="require-tip">*</span> -->
          </p>
        </div>
        <audit-select-person :assingersSelectList="assingersSelectList" v-if="isShowAudit" :newAssingersSelectList="newAssingersSelectList" :departmentId="departmentId"></audit-select-person>
      </van-cell>
    </div>
    <div class="commit-btn" @click="commitFun">提交</div>
    <van-dialog v-model="showEdit" @cancel="cancel" @confirm="save" title="修改直接上级" show-cancel-button confirm-button-text="提交" cancel-button-text="取消" class="edit-superior">
      <div class="con">
        <div class="txt">直接上级：</div>
        <div class="person-box">
          <van-tag class="person-tag" plain closeable size="medium" type="primary" v-for="(el,index) in temArray" :key="index" @close="del(index)">{{el.leaderName}}</van-tag>
        </div>
        <div class="select-btn" @click="showPerson">选择上级</div>
      </div>
    </van-dialog>
    <select-person-card v-model="isShowPerson" @config="handleSelectConfig" :departmentId="departmentId"></select-person-card>
  </div>
</template>

<script>
import HttpEhr from '@requestPool/index.js'
import selectPersonCard from '@components/selectPersonCard/index.vue'
import auditSelectPerson from '@components/auditSelectPerson/index.vue'
export default {
  components: { selectPersonCard, auditSelectPerson },
  props: {},
  data () {
    return {
      str: '职业信息测试数据',
      newAssingersSelectList: [],
      jsonDataList: [],
      showEdit: false,
      personAry: [],
      temArray: [], // 临时存储personAry
      cachePersonAry: [],
      isShowPerson: false,
      isShowAudit: false,
      departmentId: '',
      infoData: this.util.getSession('userInfo') || '',
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
  mounted () {
    this.getForm()
    this.setPerson()
    // this.getAssignersList()
    document.title = '变更上级'
  },
  methods: {
    setPerson () {
      let leaderIdAry = []
      let leaderNameAry = []
      if (this.infoData) {
        leaderIdAry = this.infoData.leaderId.split(',')
        leaderNameAry = this.infoData.leaderName.split(',')
      }
      for (let i in leaderIdAry) {
        this.personAry.push({
          leaderId: leaderIdAry[i],
          leaderName: leaderNameAry[i]
        })
      }
      this.cachePersonAry = JSON.parse(JSON.stringify(this.personAry))
    },
    async commitFun () {
      if (this.personAry.length == 0) {
        this.$toast({
          message: '请至少选择一个直接上级',
          duration: 1500,
          onClose: () => {
            this.showEditFn()
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
        console.log(111, res)
        if (res.code == 0)
          this.$toast.success({
            message: '提交成功，正在审批中',
            duration: 1500,
            onClose: () => {
              this.$router.push({ name: 'home' })
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
    save () {
      this.showEdit = false
      this.personAry = JSON.parse(JSON.stringify(this.temArray))
      console.log('aaa', this.personAry)
      this.getSelectAssinerList()
    },
    showEditFn () {
      console.log(this.personAry)
      // this.personAry = JSON.parse(JSON.stringify(this.cachePersonAry))
      if (this.formData.afStatus != 1) {
        this.temArray = JSON.parse(JSON.stringify(this.personAry))
        this.showEdit = true
      }
    },
    handleSelectConfig (value) {
      this.temArray.push({
        leaderId: value.id,
        leaderName: value.name
      })
    },
    async getSelectAssinerList () {
      const res = await this.getAssignersList()
      this.assingersSelectList = res.data.nodeAssigners
      this.isShowAudit = true
    },
    cancel () {
      this.showEdit = false
    },
    showPerson () {
      this.isShowPerson = true
    },
    del (index) {
      this.temArray.splice(index, 1)
    }
  },
}
</script>

<style lang="scss" scoped>
.container {
  background: #f3f5f8;
  z-index: 200;
  position: relative;
  padding: 0.2rem 0.4rem;
  .van-cell {
    border-radius: 10px;
    &.disabled {
      background: #ddd;
    }
  }
  .my-leader {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .leader-title {
      position: relative;
    }
    .require-tip {
      color: red;
      position: absolute;
      right: -0.16rem;
      top: 0;
    }
  }
  .process {
    padding-top: 0.2rem;
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
    margin: 0.5rem auto;
    letter-spacing: 0.14rem;
  }
}
</style>