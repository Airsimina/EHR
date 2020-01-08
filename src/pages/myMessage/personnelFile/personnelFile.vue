<template>
  <div class="personnelFile">
    <div class="lis-title">
      <span>人事档案</span>
    </div>
    <div class="list-box">
      <div class="lis-box">
        <div class="lis-row lis-name">档案编号</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">档案所在地点</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">档案来源</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">历史档案存放单位</div>
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
      str: '人事档案测试数据',
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