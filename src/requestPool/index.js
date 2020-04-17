// 优惠接口
import {
    HXpost,
    HXget
} from '../axios/http.js'
// const serverurl = '/weixinQY/oauth2/invoke.do'
export default {
    // 获取代办个数
    getTaskCount: function (payLoad) {
        return HXpost('/ehr/api/vacation/getTaskCount.do', payLoad)
    },
    // 获取登录用户名
    getLoginUserName: function (payLoad) {
        return HXpost('/ehr/api/home/user/info.do', payLoad)
    },
    // 获取token 和userid
    getUserInfo: function (payLoad) {
        return HXpost('/weixinQY/oauth2/getUserInfo.do', payLoad)
    },
    // ----------我的信息-----------------
    // 我的信息 -lxs
    getMyMessageDataList: function (payLoad) {
        return HXpost('/ehr/api/afMyDocInfo/queryMyDocInfo.do', payLoad)
    },
    // ----------我的工资-----------------
    // 我的工资 -lxs
    getMySalaryList: function (payLoad) {
        return HXpost('/ehr/api/salary/salarySearch.do', payLoad)
    },
    // ----------我的假勤-----------------
    // 1.请假申请详情 -lxs paramsJson
    leaveApplyDetail: function (payLoad) {
        return HXpost('/ehr/api/vacation/vacationForm.do', payLoad)
    },
    // 2.分支接口 -lxs 接口待定
    getBranch: function (payLoad) {
        return HXpost('/ehr/api/vacation/getBranch.do', payLoad)
    },
    // 3.流程接口,获取下一节点 -lxs 接口待定
    getNextNode: function (payLoad) {
        return HXpost('/cap-bpm/flow/getNextNode.do', payLoad)
    },
    // 4.请假申请提交/修改 -lxs
    addAndEditVacation: function (payLoad) {
        return HXpost('/ehr/api/vacation/submitVacation.do', payLoad)
    },
    // 5.获取审批人信息
    getAssignersList: function (payLoad) {
        return HXpost('/cap-bpm/flow/getAssigners_n.do', payLoad)
    },
    // 请假销假 -lxs
    removeVacation: function (payLoad) {
        return HXpost('/ehr/api/vacation/removeVacation.do', payLoad)
    },
    // 请假申请列表 -lxs
    getApplyRecordList: function (payLoad) {
        return HXpost('/ehr/api/vacation/getVacationList.do', payLoad)
    },
    // 我的假勤 -lxs
    getcheckSeekList: function (payLoad) {
        return HXpost('/ehr/api/vacation/getAttendanceByUser.do', payLoad)
    },
    // 年假余额 -lxs
    annualResidue: function (payLoad) {
        return HXpost('/ehr/api/vacation/getVacationByUserId.do', payLoad)
    },
    // 图片上传 -lxs
    multiUpload: function (payLoad = {}) {
        return HXpost('/cap-bpm/attach/upload.do', payLoad)
    },
    // 获取省份 -lxs
    getProvList: function (payLoad = {}) {
        return HXpost('/ehr/api/vacation/getVacationTypeList.do', payLoad)
    },
    // 获取组织
    getOrgChildren: function (payLoad = {}) {
        if (!payLoad.orgaId) {
            payLoad.orgaId = 'O00000001'
        }
        return HXpost('/ehr/api/capOrganization/getOrganizationAndChildren.do', payLoad)
    },
    // 获取人员
    getPersonList: function (payLoad) {
        return HXpost('/ehr/api/person/analysis/getPersonListByOrgaId.do', payLoad)
    }
}