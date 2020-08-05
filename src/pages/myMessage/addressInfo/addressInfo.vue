<template>
  <div class="addressInfo">
    <div class="lis-title">
      <span>地址信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">地址类型:</div>
          <div class="lis-row lis-value">{{item.addressTypeTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">国家名称:</div>
          <div class="lis-row lis-value">{{item.countryTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">省份名称:</div>
          <div class="lis-row lis-value">{{item.provinceTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">城市/地区:</div>
          <div class="lis-row lis-value">{{item.city}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">街道/门牌号:</div>
          <div class="lis-row lis-value">{{item.street}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">转交人:</div>
          <div class="lis-row lis-value">{{item.contactPerson}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">邮政编码:</div>
          <div class="lis-row lis-value">{{item.postalCode}}</div>
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
      str: '地址信息测试数据',
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