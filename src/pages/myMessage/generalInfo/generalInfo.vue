<template>
  <div class="generalInfo">
    <div class="lis-title">
      <span>个人数据</span>
    </div>
    <div v-if="jsonDataList.length>0">
      <div class="list-box"
           v-for="(item,index) in jsonDataList"
           :key="index">
        <div class="lis-box">
          <div class="lis-row lis-name">姓名拼音</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.sname}}</div>
        </div>
        <!-- <div class="lis-box">
        <div class="lis-row lis-name">姓名</div>
        <span>:</span>
        <div class="lis-row lis-value">{{item.name}}</div>
      </div> -->
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
          <div class="lis-row lis-name">出生地</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.birthplace}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生省份</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.provinceTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">籍贯</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.nativeplace}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">出生国家</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.country}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">国籍名称</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.name}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">婚姻状况</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.marriageStatusTxt}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">婚姻始于</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.marriageBegin}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">子女数目</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.childrenCount}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">语种名称</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.langueName}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">民族名称</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.nation}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">特长</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.ability}}</div>
        </div>
        <div class="lis-box">
          <div class="lis-row lis-name">是否服过兵役</div>
          <span>:</span>
          <div class="lis-row lis-value">{{item.isNationalService}}</div>
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
      str: '家庭信息测试数据',
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