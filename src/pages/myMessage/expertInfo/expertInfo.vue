<template>
  <div class="expertInfo">
    <div class="lis-title">
      <span>专家信息</span>
    </div>
    <div class="list-box">
      <span class="icon-right">01</span>
      <div class="lis-box">
        <div class="lis-row lis-name">开始日期</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">结束日期</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">专家类型</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">备注</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import '../../../style/tabList.scss'
export default {
  components: {},
  props: {},
  data () {
    return {
      str: '专家信息测试数据',
      dataList: [
        {
          name: '姓名',
          val: '初晓黎'
        },
        {
          name: '姓名拼音',
          val: 'chu xiaoli'
        },
        {
          name: '性别',
          val: '女'
        },
        {
          name: '出生日期',
          val: '1993-07-09'
        },
        {
          name: '出生地',
          val: '武汉'
        },
        {
          name: '出生省份',
          val: '湖北'
        },
        {
          name: '籍贯',
          val: '初晓黎'
        },
        {
          name: '出生国家',
          val: '中国'
        },
        {
          name: '国籍名称',
          val: '中国'
        },
        {
          name: '婚姻状况',
          val: '否'
        },
        {
          name: '婚姻始于',
          val: '2018-05-20'
        },
        {
          name: '子女数目',
          val: '中国'
        },
        {
          name: '语种名称',
          val: '中文'
        }

      ]
    }
  },
  watch: {},
  computed: {},
  methods: {},
  created () { },
  mounted () { }
}
</script>

<style lang="scss" scoped>
</style>