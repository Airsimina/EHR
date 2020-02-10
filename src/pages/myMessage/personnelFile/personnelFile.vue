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
      str: '人事档案测试数据'
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