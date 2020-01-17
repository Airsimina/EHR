<template>
  <div class="certificatelInfo">
    <div class="lis-title">
      <span>证件信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">证件类别</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.idCardTypeTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">发证机关</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.certificateOffice}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">证书号</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.idCardNo}}</div>
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
      str: '证件信息测试数据',
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