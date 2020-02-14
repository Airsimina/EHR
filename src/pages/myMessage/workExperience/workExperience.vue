<template>
  <div class="workExperience">
    <div class="lis-title">
      <span>工作经历</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">起止时间</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.beginDate}} - {{item.endDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">公司</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.companyName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">部门</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.departmentName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">职位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.positionName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">职级</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.postLevelName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">在岗时间</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.workLong}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">类别</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.workType =='1' ?'新华内' :'新华外'}}</div>
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
      str: '工作经历测试数据',
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