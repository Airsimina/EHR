<template>
  <div class="workPerformance">
    <div class="lis-title">
      <span>工作业绩</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起时间</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.beginDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">项目或成功描述</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.projects}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">本人在其中的作用</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.personAffect}}</div>
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
      str: '工作业绩测试数据',
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