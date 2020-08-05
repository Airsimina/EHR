<template>
  <div class="myMessage">
    <tabNav></tabNav>
    <div class="wrap-1">
      <cardMyMessage :keyName="keyName" :title="title" :userNumber="userNumber" :idPhoto="idPhoto" :departmentName="departmentName"></cardMyMessage>
      <div class="cantainer" v-if="infoData.length>0">
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
      userId: '',
      isEHR: '01',
      title: '',
      idPhoto: '',
      departmentName: '',
      keyName: '人员编号'
    }
  },
  mounted () {
    document.title = '个人档案'
  },
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
        userId: this.userId,
        isMoble: 'isMoble'
      }).then(res => {
        // 总数据保存起来
        this.setInfoDataList(res.data)
        // 默认显示第一个 基本信息
        if (this.canShow == 1) {
          this.setInfoData(res.data)
        } else {
          this.setInfoData(util.filtData(res.data, '01'))
        }
        console.log(util.filtData(res.data, '01'))
        if (!this.util.filtData(res.data, '01')[0].dataList) {
          this.userNumber = ''
          this.title = ''
          this.idPhoto = ''
          this.departmentName = ''
        } else {
          const newStr = this.util.filtData(res.data, '01')[0].dataList[0].id || '暂无'
          this.userNumber = newStr.substr(1, newStr.length - 1)
          this.title = this.util.filtData(res.data, '01')[0].dataList[0].name || '暂无'
          this.idPhoto = this.util.filtData(res.data, '01')[0].dataList[0].idPhoto || '暂无'
          this.departmentName = this.util.filtData(res.data, '01')[0].dataList[0].departmentName || '暂无'
        }
      })
    }
  },
  created () {
    console.log(this.$route)
    this.userId = this.$route.query.userId || this.util.getSession('ehrSessionData').userId
    this.canShow = this.$route.query.canShow || 1
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
    padding: 1.5rem 0.4rem 0;
    width: 100%;
    box-sizing: border-box;
  }
  .cantainer {
    padding-top: 0.5rem;
  }
}
</style>