<template>
  <div class="jobInfo">
    <div class="lis-title">
      <span>职位信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">事业部/中心</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.orgCompanyName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">所在单位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.afDivisionName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">所在部门</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.afDepartmentName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">公司</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.companyName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">职位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.afPositionName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">成本中心</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.costCenterName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">岗级</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.postLevelName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">人级</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.personLevelTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">差旅级别</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.extInfo8}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">直接上级</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.leaderName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">手机话费报销额度</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.quotaStandard}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">报销比例</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.reimbursementRate}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import '../../../style/tabList.scss'
export default {
  components: {},
  props: {},
  data () {
    return {
      str: '职业信息测试数据',
      jsonDataList: []
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      infoData: 'getInfoData'
    })
  },
  methods: {},
  mounted () {
    if (!this.infoData[0].dataList) {
      this.jsonDataList = [{}]
      return
    }
    this.jsonDataList = this.infoData[0].dataList
  }
}
</script>
<style lang="scss" scoped>
</style>
