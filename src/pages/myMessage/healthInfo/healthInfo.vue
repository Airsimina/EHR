<template>
  <div class="healthInfo">
    <div class="lis-title">
      <span>体检信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">体检子类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.healthTypeTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">体检日期</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.checkDate}}</div>
        </div>
        <!-- <div class="lis-box">
          <div class="lis-row lis-name">最后检查</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.lastCheckDate}}</div>
        </div> -->
        <div class="lis-box">
          <div class="lis-row lis-name">诊断</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.diagnose}}</div>
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
      str: '体检信息测试数据',
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