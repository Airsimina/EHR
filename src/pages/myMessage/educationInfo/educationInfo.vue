<template>
  <div class="educationInfo">
    <div class="lis-title">
      <span>教育信息</span>
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
          <div class="lis-row lis-name">教育类型</div>
          <span>:</span>
          <div class="lis-row lis-value">{{getEduTypeTxt(item.eduType)}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">说明</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.eduRemark}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">教育/培训</div>
          <span>:</span>
          <div class="lis-row lis-value">{{getEduSubTypeTxt(item.eduSubType)}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">机构/地点</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.schoolName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">国家代码</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.country}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">学历证书</div>
          <span>:</span>
          <div class="lis-row lis-value">{{getEduCertTxt(item.eduCert)}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">学位证书</div>
          <span>:</span>
          <div class="lis-row lis-value">{{getDegreeCertTxt(item.degreeCert)}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">学制</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.eduPeriod}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">专业1</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.major1Name}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">专业2</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.major2Name}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">首次就业学历标识</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.isFirstRank}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">最高学历标识</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.isHighestRank}}</div>
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
      str: '教育信息测试数据',
      jsonDataList: []
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      infoData: 'getInfoData'
    })
  },
  methods: {
    getEduTypeTxt (type) {
      if (type == '10') {
        return '初中及以下'
      } else if (type == '11') {
        return '高中'
      } else if (type == '20') {
        return '中专'
      } else if (type == '21') {
        return '中技'
      } else if (type == '30') {
        return '大专'
      } else if (type == '31') {
        return '本科'
      } else if (type == '40') {
        return '硕士'
      } else if (type == '50') {
        return '博士'
      } else if (type == '60') {
        return '博士后'
      } else if (type == 'A0') {
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
    },
    getEduSubTypeTxt (type) {
      if (type == '00000001') {
        return '全日制-统招'
      } else if (type == '00000002') {
        return '全日制-非统招'
      } else if (type == '00000003') {
        return '自学考试'
      } else if (type == '00000004') {
        return '函授'
      } else if (type == '00000005') {
        return '电大'
      } else if (type == '00000006') {
        return '夜大'
      } else if (type == '00000007') {
        return '职大'
      }
    },
    getEduCertTxt (type) {
      if (type == '01') {
        return '毕业证书'
      } else if (type == '02') {
        return '肄业证书'
      } else if (type == '03') {
        return '结业证书'
      } else if (type == '99') {
        return '无证书'
      }
    },
    getDegreeCertTxt (type) {
      if (type == '10') {
        return '学士证书'
      } else if (type == '20') {
        return '硕士证书'
      } else if (type == '30') {
        return '博士证书'
      }
    }
  },
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