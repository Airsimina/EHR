<template>
  <div class="bruiseInfo">
    <div class="lis-title">
      <span>工伤信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起始时间</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.beginDate}} - {{item.endDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">伤残组</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.injuryGroupTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">工伤类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.injuryTypeTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">工伤等级(华新)</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.injuryRank}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">工伤部位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.injuryPart}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">发生工伤单位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.injuryCompany}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">官方机构</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.officialMission}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">证书日期</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.certificateDate}}</div>
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
      str: '工伤信息测试数据',
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