<template>
  <div class="disabilityInfo">
    <div class="lis-title">
      <span>残疾信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起始时间</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.beginDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">伤残组</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.injuryGroupTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">残疾类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.disabilityType}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">残疾等级</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.disabilityRank}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">残疾部位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.disabilityPart}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">城鉴定机构</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.accreditingBody}}</div>
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
  data () {
    return {
      str: '残疾信息测试数据',
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