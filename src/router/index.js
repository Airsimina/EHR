import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)

// 动态路由
// const layout = () =>
//     import('@layout/index.vue')

export default new Router({
    routes: [{
        path: '/',
        redirect: '/home'
    }, {
        path: '/home',
        name: 'home',
        component: () =>
            import('../pages/home/index.vue')
    },
    {
        // 公用主页
        path: '/sharePage',
        name: 'sharePage',
        component: () =>
            import('../pages/sharePage/index.vue'),
        children: [
            {
                // 我的信息
                path: '/myMessage',
                name: 'myMessage',
                component: () =>
                    import('../pages/myMessage/index.vue'),
                redirect: '/generalInfo', // 默认基本信息
                children: [
                    // --------------个人信息----------------
                    {
                        // 基本信息
                        path: '/generalInfo',
                        name: 'generalInfo',
                        component: () =>
                            import('../pages/myMessage/generalInfo/generalInfo.vue')
                    },
                    {
                        // 地址信息
                        path: '/addressInfo',
                        name: 'addressInfo',
                        component: () =>
                            import('../pages/myMessage/addressInfo/addressInfo.vue')
                    },
                    {
                        // 教育信息
                        path: '/educationInfo',
                        name: 'educationInfo',
                        component: () =>
                            import('../pages/myMessage/educationInfo/educationInfo.vue')
                    },
                    {
                        // 家庭信息
                        path: '/familyInfo',
                        name: 'familyInfo',
                        component: () =>
                            import('../pages/myMessage/familyInfo/familyInfo.vue')
                    },
                    {
                        // 通讯信息
                        path: '/communicationInfo',
                        name: 'communicationInfo',
                        component: () =>
                            import('../pages/myMessage/communicationInfo/communicationInfo.vue')
                    },
                    {
                        // 证件信息
                        path: '/certificateInfo',
                        name: 'certificateInfo',
                        component: () =>
                            import('../pages/myMessage/certificateInfo/certificateInfo.vue')
                    },

                    // --------------------职位信息-------------------

                    {
                        // 职位信息
                        path: '/jobInfo',
                        name: 'jobInfo',
                        component: () =>
                            import('../pages/myMessage/jobInfo/jobInfo.vue')
                    },
                    {
                        // 工作经历
                        path: '/workExperience',
                        name: 'workExperience',
                        component: () =>
                            import('../pages/myMessage/workExperience/workExperience.vue')
                    },
                    {
                        // 工作业绩
                        path: '/workPerformance',
                        name: 'workPerformance',
                        component: () =>
                            import('../pages/myMessage/workPerformance/workPerformance.vue')
                    },
                    {
                        // 奖惩信息
                        path: '/awardPunishInfo',
                        name: 'awardPunishInfo',
                        component: () =>
                            import('../pages/myMessage/awardPunishInfo/awardPunishInfo.vue')
                    },
                    {
                        // 合同信息
                        path: '/contractInfo',
                        name: 'contractInfo',
                        component: () =>
                            import('../pages/myMessage/contractInfo/contractInfo.vue')
                    },
                    {
                        // 协议信息
                        path: '/protocolInfo',
                        name: 'protocolInfo',
                        component: () =>
                            import('../pages/myMessage/protocolInfo/protocolInfo.vue')
                    },

                    // ---------------------其他信息-----------------------
                    {
                        // 工伤信息
                        path: '/bruiseInfo',
                        name: 'bruiseInfo',
                        component: () =>
                            import('../pages/myMessage/bruiseInfo/bruiseInfo.vue')
                    },
                    {
                        // 体检信息
                        path: '/healthInfo',
                        name: 'healthInfo',
                        component: () =>
                            import('../pages/myMessage/healthInfo/healthInfo.vue')
                    },
                    {
                        // 残疾信息
                        path: '/disabilityInfo',
                        name: 'disabilityInfo',
                        component: () =>
                            import('../pages/myMessage/disabilityInfo/disabilityInfo.vue')
                    },
                    {
                        // 培训信息
                        path: '/cultivatelInfo',
                        name: 'cultivatelInfo',
                        component: () =>
                            import('../pages/myMessage/cultivatelInfo/cultivatelInfo.vue')
                    },
                    {
                        // 党团信息
                        path: '/partyInfo',
                        name: 'partyInfo',
                        component: () =>
                            import('../pages/myMessage/partyInfo/partyInfo.vue')
                    },
                    {
                        // 证书信息
                        path: '/credentialInfo',
                        name: 'credentialInfo',
                        component: () =>
                            import('../pages/myMessage/credentialInfo/credentialInfo.vue')
                    },
                    {
                        // 专家信息
                        path: '/expertInfo',
                        name: 'expertInfo',
                        component: () =>
                            import('../pages/myMessage/expertInfo/expertInfo.vue')
                    },
                    {
                        // 人事档案
                        path: '/personnelFile',
                        name: 'personnelFile',
                        component: () =>
                            import('../pages/myMessage/personnelFile/personnelFile.vue')
                    },
                    {
                        // 计划生育
                        path: '/familyPlanning',
                        name: 'familyPlanning',
                        component: () =>
                            import('../pages/myMessage/familyPlanning/familyPlanning.vue')
                    }
                ]
            },
            {
                // 我的假勤
                path: '/myTimecard',
                name: 'myTimecard',
                component: () =>
                    import('../pages/myTimecard/index.vue')
            },
            {
                // 请假申请
                path: '/leaveRequest',
                name: 'leaveRequest',
                component: () =>
                    import('../pages/myTimecard/leaveRequest/leaveRequest.vue')
            },
            {
                // 考勤查询
                path: '/checkSeek',
                name: 'checkSeek',
                component: () =>
                    import('../pages/myTimecard/checkSeek/checkSeek.vue')
            },
            {
                // 申请记录
                path: '/applyRecord',
                name: 'applyRecord',
                component: () =>
                    import('../pages/myTimecard/applyRecord/applyRecord.vue')
            },
            {
                // 请假申请详情
                path: '/leaveApply',
                name: 'leaveApply',
                component: () =>
                    import('../pages/myTimecard/leaveApply/leaveApply.vue')
            },
            {
                // 年假余额
                path: '/annualResidue',
                name: 'annualResidue',
                component: () =>
                    import('../pages/myTimecard/annualResidue/annualResidue.vue')
            },
            {
                // 我的工资
                path: '/mySalary',
                name: 'mySalary',
                component: () =>
                    import('../pages/mySalary/index.vue')
            }

        ]
    }

    ]
})