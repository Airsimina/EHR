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
          <div class="lis-row lis-value"
               v-if="item.rewardType=='01'">公司奖惩</div>
          <div class="lis-row lis-value"
               v-if="item.rewardType=='02'">分支机构奖惩</div>
          <div class="lis-row lis-value"
               v-if="item.rewardType=='03'">行业奖励</div>
          <div class="lis-row lis-value"
               v-if="item.rewardType=='04'">市级奖励</div>
          <div class="lis-row lis-value"
               v-if="item.rewardType=='05'">省级奖励</div>
          <div class="lis-row lis-value"
               v-if="item.rewardType=='06'">国家级奖励</div>
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
  methods: {},
  created () { },
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