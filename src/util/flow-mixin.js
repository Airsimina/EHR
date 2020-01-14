import api from '../../src/requestPool/index'
import _ from 'lodash'

export default {
    data () {
        return {
            cacheFlowVar: {}, // 缓存流程变量
            flowData: {}, // 流程数据
            flowContext: { // 流程内容
                assigners: {},
                preAssigners: {},
                processVar: {},
                subProcessVar: {},
                processParams: {},
                operateType: ''
            },
            flowNodesData: [],
            flowMessages: [],
            oNodeButtons: [],
            formData: {
                dataList: [{}]
            },
            assigners: {},
            allNextNodes: [],
            nextNode: []
        }
    },
    mounted () {

    },
    methods: {
        async getInitEditData (afType, alias) { // 获取编辑数据
            try {
                const editInfo = await api.getEmployeeEditInfo({ afType: afType })
                // 增加时间范围变量
                editInfo.data.formData.dataList = editInfo.data.formData.dataList.map(dataItem => {
                    const beginDate = dataItem.beginDate || ''
                    const endDate = dataItem.endDate || ''
                    dataItem.rangeDate = [beginDate, endDate]
                    return dataItem
                })
                // 当前模块没有编辑数据时 初始化一个
                if (editInfo.data.formData.dataList.length === 0) this.add()

                this.formData = _.assign(this.formData, editInfo.data.formData)
                this.selectOptions = _.assign(this.selectOptions, editInfo.data.formData.dataList2)
                console.log(this.selectOptions)
                this.cacheEditData(this.formData)
                this.initFormItemTemporaryId()

                this.flowData = editInfo.data.flowData
                this.load()
                this.initFlowContext()
                this.getAssigners()
                this.$emit('setEditModule', alias)
            } catch {

            }
        },
        // 初始化表单流程数据
        load () {
            const classifyHangup = '[HANGUP]'
            const flowData = this.flowData
            const cacheFlowVar = this.cacheFlowVar
            const flowNodesData = this.flowNodesData
            const flowMessages = this.initDefMessages()
            const oNodeButtons = this.oNodeButtons
            if (flowData.currentPerson && flowData.currentPerson.id) cacheFlowVar.personId = flowData.currentPerson.id
            if (flowData.loginUsername) cacheFlowVar.loginUsername = flowData.loginUsername
            if (flowData.flowKeyId) cacheFlowVar.flowKeyId = flowData.flowKeyId || ''
            if (flowData.formId) cacheFlowVar.formId = flowData.formId || ''
            if (flowData.dataId) cacheFlowVar.dataId = flowData.dataId || ''
            if (Object.keys(flowData).length) cacheFlowVar.flowDefId = flowData.flowBase.id
            if (!flowData.firstNode || flowData.firstNode === 'startEvent') cacheFlowVar.firstNode = flowData.flowNodes[0].id
            if (flowData.currentNode.nodeId) {
                cacheFlowVar.nodeId = flowData.currentNode.nodeId
            } else if (flowData.flowInst.currentNodeId) {
                cacheFlowVar.nodeId = flowData.flowInst.currentNodeId
            }
            if (flowData.newFlow) {
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
        // 获取 所有流程环节
        async getAssigners () {
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

            const assigners = await api.getAssigner(data)
            this.assigners = assigners.data
        },
        async formSubmitHandle (operateType) {
            const nodes = await this.getNodes(operateType)
            if (nodes[0].code === 200 && nodes[1].code === 200) {
                this.allNextNodes = nodes[0].data
                this.nextNodes = nodes[1].data
                // 用nextNode里的id取出assigners的当前环节处理人
                const nextNodeAssigner = this.assigners.nodeAssigners.find(assigner => {
                    return assigner.nodeId === this.nextNodes[0].id
                })
                // 当存在多个处理人时 用defaultShow 取出默认处理人
                const nextNodePerson = nextNodeAssigner.nodeAssignerPersons[nextNodeAssigner.defaultShow]
                const nextNodeName = this.nextNodes[0].name
                const nextPersonName = nextNodePerson.name
                // this.submitDialog
                this.$flowpop({
                    operateTypeTxt: '提交',
                    nextNodeName: nextNodeName,
                    nextPersonName: nextPersonName,
                    flowMessages: this.flowMessages[operateType],
                    onConfirm: (ops) => {
                        // TODO: userId
                        const userId = this.formData.userId || '00025015'
                        const formData = this.getFormData()
                        const flowContext = { ...this.flowData, ...this.flowContext }
                        flowContext.nextNodeId = this.nextNodes[0].id
                        flowContext.flowMessage = ops.flowMessage
                        flowContext.flowComment = ops.flowComment
                        flowContext.assigners[this.nextNodes[0].id] = nextNodePerson.sysUsername
                        // 所有环节处理人
                        // flowContext['preAssigners'] =
                        this.assigners.nodeAssigners.forEach(assign => {
                            flowContext.preAssigners[assign.nodeId] = {
                                assignerId: assign.nodeAssignerPersons[assign.defaultShow].sysUsername,
                                assignerName: assign.nodeAssignerPersons[assign.defaultShow].name
                            }
                        })
                        const data = {
                            userId: userId,
                            flowData: flowContext,
                            formData: formData
                        }
                        console.log(JSON.stringify(data))
                    }
                })
            } else {
                if (nodes[0].code !== 200) this.$message(nodes[0].msg)
                if (nodes[1].code !== 200) this.$message(nodes[1].msg)
            }
        },
        getFormData () {
            console.log(this.formData)
            // rangeDate 转化成 beginDate 和 endDate
            const dataList = this.formData.dataList
            _.forEach(dataList, formItem => {
                let rangeDate = []
                if (formItem.rangeDate.length === 2) rangeDate = formItem.rangeDate
                if (rangeDate[0] !== null && rangeDate[1] !== null) {
                    formItem.beginDate = rangeDate[0]
                    formItem.endDate = rangeDate[1]
                }
            })
            this.$set(this.formData, 'dataList', dataList)
            return this.formData
        },
        parseProcessParams () {
            const processParams = this.getProcessParams(true)
            this.flowContext = { ...this.flowContext, processParams }
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
        // getAllNextNode (operateType) {
        //     this.parseProcessParams()
        //     this.flowContext['operateType'] = operateType
        // },
        // getNextNode (operateType) {
        //     this.parseProcessParams()
        //     this.flowContext['operateType'] = operateType
        //     console.log(this.flowContext)
        // },
        async getNodes (operateType) {
            this.parseProcessParams()
            this.flowContext.operateType = operateType
            const data = {
                personId: this.cacheFlowVar.personId,
                flowContext: this.flowContext
            }
            const result = await api.getNodes(data)
            console.log(result)
            return result
        },
        // TODO: 获取bizData 表单相关数据
        parseBizData () {
            let params = {}
            params = { ...this.formData }
            return params
        },
        // 初始化提示文本
        initDefMessages () {
            const personName = this.flowData.currentPerson.name
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
        }
    }
}