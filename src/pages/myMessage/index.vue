<template>
  <div class="myMessage">
    <div class="wrap-1">
      <tabNav></tabNav>
      <cardMyMessage :keyName="keyName"
                     :title="title"
                     :userNumber="userNumber"></cardMyMessage>
      <div class="cantainer"
           v-if="infoData.length>0">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
import tabNav from '@components/tabNav/tabNav'
import cardMyMessage from '@components/card/cardMyMessage'
import { mapGetters, mapMutations } from 'vuex'
// import mymsgData from '../../testJson/mymsg.js'
import util from '../../util/util'
import HttpEhr from '@requestPool/index.js'

export default {
  components: { tabNav, cardMyMessage },
  props: {},
  data () {
    return {
      userNumber: '',
      title: '',
      keyName: '人员编号'
    }
  },
  watch: {},
  mounted () { },
  computed: {
    ...mapGetters({
      infoData: 'getInfoData'
    })
  },
  methods: {
    ...mapMutations(['setInfoDataList', 'setInfoData']),
    // 初始化
    init () {
      HttpEhr.getMyMessageDataList({
        userId: this.util.getSession('sessionData').userId || '',
        isMoble: 'isMoble'
      }).then(res => {
        // 总数据保存起来
        this.setInfoDataList(res.data)
        // 默认显示第一个 基本信息
        this.setInfoData(util.filtData(res.data, '01'))
        this.userNumber = util.filtData(res.data, '01')[0].dataList[0].id
        this.title = util.filtData(res.data, '01')[0].dataList[0].name
      })
    }
  },
  created () {
    // 测试数据
    // this.setInfoDataList(mymsgData.data)
    // this.setInfoData(util.filtData(mymsgData.data, '01'))
    // this.userNumber = util.filtData(mymsgData.data, '01')[0].dataList[0].id
    // this.title = util.filtData(mymsgData.data, '01')[0].dataList[0].name
    this.init()
  }
}
</script>
<style lang="scss" scoped>
.myMessage {
  font-size: 0.24rem;
  .wrap-1 {
    font-size: 0.24rem;
    margin: 0 0.4rem;
    position: absolute;
    width: 90%;
    box-sizing: border-box;
  }
  .cantainer {
    padding-top: 2.5rem;
  }
}
</style>