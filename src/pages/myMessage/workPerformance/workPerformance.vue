<template>
  <div class="workPerformance">
    <div class="lis-title">
      <span>工作业绩</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起止时间:</div>
          <div class="lis-row lis-value">{{item.beginDate}} ~ {{item.endDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">完成主要项目或成果描述:</div>
          <div class="lis-row lis-value">{{item.projects}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">本人在其中的作用:</div>
          <div class="lis-row lis-value">{{item.personAffectTxt}}</div>
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
      str: '工作业绩测试数据',
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