<template>
    <div class="educationInfo">
        <div class="lis-title">
            <span>教育信息</span>
        </div>
        <div v-if="jsonDataList.length>0">
            <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
                <div class="lis-box">
                    <div class="lis-row lis-name">起止时间</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.beginDate}} ~ {{item.endDate}}</div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">学历</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.eduTypeTxt}}</div>
                </div>
                <!-- <div class="lis-box">
          <div class="lis-row lis-name">说明</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.eduRemark}}</div>
                </div>-->
                <div class="lis-box">
                    <div class="lis-row lis-name">教育类型</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.eduSubTypeTxt}}</div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">学校</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.schoolName}}</div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">国家名称</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.countryTxt}}</div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">学历证书</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.eduCertTxt}}</div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">学位证书</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.degreeCertTxt}}</div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">学制</div>
                    <span>:</span>
                    <div class="lis-row lis-value">
                        {{item.eduPeriod}}
                        <span v-if="item.periodUnitTxt">({{item.periodUnitTxt}})</span>
                    </div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">专业</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.major}}</div>
                </div>
                <!-- <div class="lis-box">
          <div class="lis-row lis-name">专业2</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.major2Name}}</div>
                </div>-->
                <div class="lis-box">
                    <div class="lis-row lis-name">首次就业学历标识</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.isFirstRank=='1' ? '是':'否'}}</div>
                </div>
                <div class="lis-box">
                    <div class="lis-row lis-name">最高学历标识</div>
                    <span>:</span>
                    <div class="lis-row lis-value">{{item.isHighestRank=='1' ? '是':'否'}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import "../../../style/tabList.scss";
export default {
    components: {},
    props: {},
    data() {
        return {
            str: "教育信息测试数据",
            jsonDataList: []
        };
    },
    computed: {
        ...mapGetters({
            infoData: "getInfoData"
        })
    },
    methods: {},
    mounted() {
        if (!this.infoData[0].dataList) {
            this.jsonDataList = [{}];
            return;
        }
        this.jsonDataList = this.infoData[0].dataList;
        console.log(this.jsonDataList);
    }
};
</script>

<style lang="scss" scoped>
</style>