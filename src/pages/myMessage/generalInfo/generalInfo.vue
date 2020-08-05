<template>
  <div class="generalInfo">
    <div class="lis-title">
      <img src="../../../../static/img/biaorti.png" alt />
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box" v-for="(item,index) in jsonDataList" :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">姓名拼音:</div>
          <div class="lis-row lis-value">{{item.sname}}</div>
        </div>
        <!-- <div class="lis-box">
        <div class="lis-row lis-name">:姓名</div>
        <div class="lis-row lis-value">{{item.name}}</div>
        </div>-->
        <div class="lis-box">
          <div class="lis-row lis-name">性别:</div>
          <div class="lis-row lis-value">{{item.sex}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生日期:</div>
          <div class="lis-row lis-value">{{item.birth}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生地:</div>
          <div class="lis-row lis-value">{{item.birthplace}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生省份:</div>
          <div class="lis-row lis-value">{{item.provinceTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">籍贯:</div>
          <div class="lis-row lis-value">{{item.nativeplace}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生国家:</div>
          <div class="lis-row lis-value">{{item.country}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">国籍名称:</div>
          <div class="lis-row lis-value">{{item.nationalityTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">婚姻状况:</div>
          <div class="lis-row lis-value">{{item.marriageStatusTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">婚姻始于:</div>
          <div class="lis-row lis-value">{{item.marriageBegin}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">子女数目:</div>
          <div class="lis-row lis-value">{{item.childrenCount}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">语种名称:</div>
          <div class="lis-row lis-value">{{item.langueNameTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">民族名称:</div>
          <div class="lis-row lis-value">{{item.nationTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">特长:</div>
          <div class="lis-row lis-value">{{item.ability}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">英语水平:</div>
          <div class="lis-row lis-value">{{item.englishLevel}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">首次参加工作时间:</div>
          <div class="lis-row lis-value">{{item.joinWorkDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">加入本公司时间:</div>
          <div class="lis-row lis-value">{{item.joinDate}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">是否有海外工作经验:</div>
          <div class="lis-row lis-value">{{item.isAbroadExp=='1' ?'有':'无'}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">是否可以调动:</div>
          <div class="lis-row lis-value">{{item.isTransfer=='1' ?'是':'无'}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">是否服过兵役:</div>
          <div class="lis-row lis-value">{{item.isNationalService=='1' ?'有':'无'}}</div>
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
.lis-title {
  width: 1.26rem;
  height: 0.33rem;
}
</style>