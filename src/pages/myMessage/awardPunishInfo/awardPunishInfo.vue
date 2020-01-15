<template>
  <div class="awardPunishInfo">
    <div class="lis-title">
      <span>奖惩信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起止时间</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.beginDate}} - {{item.endDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">名称</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.personName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">授予单位或部门</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.rewardDepartmentId}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">发文文号</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.documentNum}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">奖惩类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{getRewardTypeTxt(item.rewardType)}}</div>
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
  watch: {},
  computed: {
    ...mapGetters({
      infoData: 'getInfoData'
    })
  },
  methods: {
    getRewardTypeTxt (type) {
      if (type == '01') {
        return '公司奖惩'
      } else if (type == '02') {
        return '分支机构奖惩'
      } else if (type == '03') {
        return '行业奖励'
      } else if (type == '04') {
        return '市级奖励'
      } else if (type == '05') {
        return '省级奖励'
      } else if (type == '06') {
        return '国家级奖励'
      }
    }
  },
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