<template>
  <div class="protocolInfo">
    <div class="lis-title">
      <span>协议信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">开始日期</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.protocolBeginDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">协议类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.type}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">协议截止日期</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.protocolEndDate}}</div>
        </div>
        <!-- <div class="lis-box">
        <div class="lis-row lis-name">服务开始日期</div>
        <span>:</span>
        <div class="lis-row lis-value">{{item.serviceBeginDate}}</div>
      </div> -->
        <div class="lis-box">
          <div class="lis-row lis-name">服务结束日期</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.serviceEndDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">违约金额</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.breakMoney}}</div>
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
      str: '协议信息测试数据',
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