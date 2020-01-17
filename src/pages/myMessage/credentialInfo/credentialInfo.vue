<template>
  <div class="credentialInfo">
    <div class="lis-title">
      <span>证书信息</span>
    </div>
    <div class="list-box">
      <div class="lis-box">
        <div class="lis-row lis-name">证书名称</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">颁发机构</div>
        <span>:</span>
        <div class="lis-row lis-value">{{str}}</div>
      </div>
      <div class="lis-box">
        <div class="lis-row lis-name">获得日期</div>
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
      str: '证书信息测试数据'
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