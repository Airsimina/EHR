<template>
  <div class="partyInfo">
    <div class="lis-title">
      <span>党团信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起始时间:</div>
          <div class="lis-row lis-value">{{item.beginDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">政党状态:</div>
          <div class="lis-row lis-value">{{item.partyStateTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">政治面貌:</div>
          <div class="lis-row lis-value">{{item.politicsStatusTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">参加单位:</div>
          <div class="lis-row lis-value">{{item.attendCompany}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">介绍人:</div>
          <div class="lis-row lis-value">{{item.introducer}}</div>
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
      str: '党团信息测试数据',
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