<template>
  <div class="familyInfo">
    <div class="lis-title">
      <span>家庭成员</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">子类型:</div>
          <div class="lis-row lis-value">{{item.relationTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">与本人关系:</div>
          <div class="lis-row lis-value">{{item.relationNote}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">姓名:</div>
          <div class="lis-row lis-value">{{item.name}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">性别:</div>
          <div class="lis-row lis-value">{{item.sex}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生日期:</div>
          <div class="lis-row lis-value">{{item.birth}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生国家:</div>
          <div class="lis-row lis-value">{{item.countryTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">国籍:</div>
          <div class="lis-row lis-value">{{item.nationalityTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">工作单位:</div>
          <div class="lis-row lis-value">{{item.workUnit}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">部门/岗位:</div>
          <div class="lis-row lis-value">{{item.departmentStation}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">回避政策:</div>
          <div class="lis-row lis-value">{{item.avoidStatusTxt=='01' ? '已回避' :'待回避'}}</div>
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
