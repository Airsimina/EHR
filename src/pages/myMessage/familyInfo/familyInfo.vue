<template>
  <div class="familyInfo">
    <div class="lis-title">
      <span>家庭成员</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">

        <div class="lis-box">
          <div class="lis-row lis-name">子类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{getRelationTxt(item.relation)}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">与本人关系</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.str}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">姓名</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.personName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">性别</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.sex}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生日期</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.birth}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生国家</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.country}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">国籍</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.nationality}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">工作单位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.workUnit}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">部门/岗位</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.departmentStation}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">回避政策</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.avoidStatus=='01' ? '已回避' :'待回避'}}</div>
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
      str: '家庭信息测试数据',
      jsonDataList: []
    }
  },
  computed: {
    ...mapGetters({
      infoData: 'getInfoData'
    })
  },
  methods: {
    getRelationTxt (type) {
      if (type == '1') {
        return '配偶'
      } else if (type == '2') {
        return '子女'
      } else if (type == '11') {
        return '父亲'
      } else if (type == '12') {
        return '母亲'
      } else if (type == '99') {
        return '其他亲属关系'
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
