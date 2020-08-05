<template>
  <div class="awardPunishInfo">
    <div class="lis-title">
      <span>奖惩信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起始时间:</div>
          <div class="lis-row lis-value">{{item.beginDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">名称:</div>
          <div class="lis-row lis-value">{{item.rewardInfo}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">授予单位或部门:</div>
          <div class="lis-row lis-value">{{item.rewardDepartment}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">发文文号:</div>
          <div class="lis-row lis-value">{{item.documentNum}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">奖惩类型:</div>
          <div class="lis-row lis-value">{{item.rewardTypeTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">备注:</div>
          <div class="lis-row lis-value">{{item.remark ? item.remark :'暂无'}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

import '../../../style/tabList.scss'
export default {
  data () {
    return {
      str: '奖惩信息测试数据',
      jsonDataList: []
    }
  },
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