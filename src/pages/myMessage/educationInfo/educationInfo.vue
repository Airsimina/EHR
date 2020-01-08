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
        <!-- <div class="lis-box">
        <div class="lis-row lis-name">结束日期</div>
        <span>:</span>
        <div class="lis-row lis-value">{{item.endDate}}</div>
      </div> -->
        <div class="lis-box">
          <div class="lis-row lis-name">教育类型</div>
          <span>:</span>
          <div class="lis-row lis-value"
               v-if="item.eduType=='10'">初中及以下</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='11'">高中</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='20'">中专</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='21'">中技</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='30'">大专</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='31'">本科</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='40'">硕士</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='50'">博士</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='60'">博士后</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='A0'">进修</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='A1'">语言培训</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='A2'">管理培训</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='A3'">技术培训</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='A4'">技能培训</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='A5'">专业培训</div>
          <div class="lis-row lis-value"
               v-if="item.eduType=='ZZ'">其他</div>

        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">说明</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.eduRemark}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">教育/培训</div>
          <span>:</span>
          <div class="lis-row lis-value"
               v-if="item.eduSubType=='00000001'">全日制-统招</div>
          <div class="lis-row lis-value"
               v-if="item.eduSubType=='00000002'">全日制-非统招</div>
          <div class="lis-row lis-value"
               v-if="item.eduSubType=='00000003'">自学考试</div>
          <div class="lis-row lis-value"
               v-if="item.eduSubType=='00000004'">函授</div>
          <div class="lis-row lis-value"
               v-if="item.eduSubType=='00000005'">电大</div>
          <div class="lis-row lis-value"
               v-if="item.eduSubType=='00000006'">夜大</div>
          <div class="lis-row lis-value"
               v-if="item.eduSubType=='00000007'">职大</div>

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
          <div class="lis-row lis-value"
               v-if="item.eduCert=='01'">毕业证书</div>
          <div class="lis-row lis-value"
               v-if="item.eduCert=='02'">肄业证书</div>
          <div class="lis-row lis-value"
               v-if="item.eduCert=='03'">结业证书</div>
          <div class="lis-row lis-value"
               v-if="item.eduCert=='99'">无证书</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">学位证书</div>
          <span>:</span>
          <div class="lis-row lis-value"
               v-if="item.eduCert=='10'">学士证书</div>
          <div class="lis-row lis-value"
               v-if="item.eduCert=='20'">硕士证书</div>
          <div class="lis-row lis-value"
               v-if="item.eduCert=='30'">博士证书</div>
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