<template>
  <div class="familyPlanning">
    <div class="lis-title">
      <span>计划生育信息</span>
    </div>
    <div class="list-box">
      <div class="lis-box">
        <div class="lis-row lis-name">是否办理特保</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">是否办理节育</div>
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
      str: '计划生育信息测试数据'
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