// 优惠接口
import {
    HXpost
} from '../axios/http.js'
// const serverurl = '/weixinQY/oauth2/invoke.do'

export default {
    // 获取代办个数
    getTaskCount: function (payLoad) {
        return HXpost('/ehr/vacation/getTaskCount.do', payLoad)
    },
    // 获取登录用户名
    getLoginUserName: function (payLoad) {
        return HXpost('/ehr/home/user/info.do', payLoad)
    },
    // 获取token 和userid
    getUserInfo: function (payLoad) {
        return HXpost('/weixinQY/oauth2/getUserInfo.do', payLoad)
    },
    // ----------我的信息-----------------
    // 我的信息 -lxs
    getMyMessageDataList: function (payLoad) {
        return HXpost('/ehr/afMyDocInfo/queryMyDocInfo.do', payLoad)
    },
    // ----------我的工资-----------------
    // 我的工资 -lxs
    getMySalaryList: function (payLoad) {
        // http://10.248.24.55:8080/ehr/
        return HXpost('ehr/salary/salarySearch.do', payLoad)
    },
    // ----------我的考勤-----------------
    // 1.请假申请详情 -lxs paramsJson
    leaveApplyDetail: function (payLoad) {
        return HXpost('/ehr/vacation/vacationForm.do', payLoad)
    },
    // 2.分支接口 -lxs 接口待定
    getBranch: function (payLoad) {
        return HXpost('/ehr/vacation/getBranch.do', payLoad)
    },
    // 3.流程接口,获取下一节点 -lxs 接口待定
    getNextNode: function (payLoad) {
        return HXpost('/cap-bpm/flow/getNextNode.do', payLoad)
    },
    // 4.请假申请提交/修改 -lxs
    addAndEditVacation: function (payLoad) {
        return HXpost('/ehr/vacation/submitVacation.do', payLoad)
    },
    // 5.获取审批人信息
    getAssignersList: function (payLoad) {
        return HXpost('/cap-bpm/flow/getAssigners_n.do', payLoad)
    },
    // 请假销假 -lxs
    removeVacation: function (payLoad) {
        return HXpost('/ehr/vacation/removeVacation.do', payLoad)
    },
    // 请假申请列表 -lxs
    getApplyRecordList: function (payLoad) {
        return HXpost('/ehr/vacation/getVacationList.do', payLoad)
    },
    // 我的考勤 -lxs
    getcheckSeekList: function (payLoad) {
        return HXpost('/ehr/vacation/getAttendanceByUser.do', payLoad)
    },
    // 年假余额 -lxs
    annualResidue: function (payLoad) {
        return HXpost('/ehr/vacation/getVacationByUserId.do', payLoad)
    },
    // 图片上传 -lxs
    multiUpload: function (payLoad = {}) {
        return HXpost('/cap-bpm/attach/upload.do', payLoad)
    }

}