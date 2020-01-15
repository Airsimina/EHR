<template>
  <div class="cultivatelInfo">
    <div class="lis-title">
      <span>培训信息</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起时间</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.beginDate}} - {{item.endDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">培训类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{getTrainingTypeTxt(item.trainingType)}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">课程名称</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.trainingCourse}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">组织单位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.trainingCompany}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">证书</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.trainningCert}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">备注</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.remark}}</div>
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
      str: '培训信息测试数据',
      jsonDataList: []
    }
  },
  computed: {
    ...mapGetters({
      infoData: 'getInfoData'
    })
  },
  methods: {
    getTrainingTypeTxt (type) {
      if (type == 'A0') {
        return '进修'
      } else if (type == 'A1') {
        return '语言培训'
      } else if (type == 'A2') {
        return '管理培训'
      } else if (type == 'A3') {
        return '技术培训'
      } else if (type == 'A4') {
        return '技能培训'
      } else if (type == 'A5') {
        return '专业培训'
      } else if (type == 'ZZ') {
        return '其他'
      }
    }
  },
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