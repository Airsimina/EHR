<template>
  <div class="communicationInfo">
    <div class="lis-title">
      <span>通讯信息</span>
    </div>
    <div class="list-box"
         v-for="(item,index) in jsonDataList"
         :key="index">
      <div class="lis-box">
        <div class="lis-row lis-name">通讯类型</div>
        <span>:</span>
        <div class="lis-row lis-value">{{item.phoneTypeTxt}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">号码</div>
        <span>:</span>
        <div class="lis-row lis-value">{{item.phoneNum}}</div>
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
      str: '通讯信息测试数据',
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