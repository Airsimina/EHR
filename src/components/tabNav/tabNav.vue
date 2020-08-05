<template>
  <div class="tab-nav-wrap">
    <div class="tab-box">
      <div class="tab-name" @click="changeTab(item,index)" v-for="(item,index) in tabList" :key="index" :class="{'active-tab' : tabIndex == index}">
        <span>{{item}}</span>
        <span class="icon-name"></span>
      </div>
      <div class="tab-list-box" v-show="showbox">
        <div class="lis" @click="selcontent(item,index)" :class="{'active-name' : index == lisIndex}" v-for="(item,index) in tabNabList" :key="index">{{item.name}}</div>
      </div>
    </div>

    <div class="menc" v-show="showbox" @click="closeMenc"></div>
  </div>
</template>
<script>
import util from '../../util/util'
import { mapGetters, mapMutations } from 'vuex'
export default {
  components: {},
  props: {},
  data () {
    return {
      showbox: false,
      tabList: ['基本信息', '工作及教育信息', '其他'],
      // 选中菜单的信息
      tabIndex: 0,
      // 选中的子菜单信息
      lisIndex: -1,
      lisindex_1: 0,
      lisindex_2: -1,
      lisindex_3: -1,
      tabNabList: [],
      arrList: [
        [
          {
            name: '个人数据',
            path: 'generalInfo',
            id: '01'
          },
          {
            name: '证件信息',
            path: 'certificateInfo',
            id: '11'
          },
          {
            name: '家庭成员',
            path: 'familyInfo',
            id: '03'
          },
          {
            name: '地址信息',
            path: 'addressInfo',
            id: '21'
          },
          {
            name: '通讯信息',
            path: 'communicationInfo',
            id: '12'
          }
        ],
        [
          {
            name: '职位信息',
            path: 'jobInfo',
            id: '02'
          },
          {
            name: '教育信息',
            path: 'educationInfo',
            id: '04'
          },
          {
            name: '工作经历',
            path: 'workExperience',
            id: '05'
          },
          {
            name: '培训信息',
            path: 'cultivatelInfo',
            id: '07'
          },
          {
            name: '工作业绩',
            path: 'workPerformance',
            id: '06'
          },
          {
            name: '奖惩信息',
            path: 'awardPunishInfo',
            id: '08'
          },

          {
            name: '协议信息',
            path: 'protocolInfo',
            id: '10'
          }
          // {
          //   name: '合同信息',
          //   path: 'contractInfo'
          // }
        ],
        [
          {
            name: '体检信息',
            path: 'healthInfo',
            id: '14'
          },
          {
            name: '党团信息',
            path: 'partyInfo',
            id: '16'
          },
          {
            name: '残疾信息',
            path: 'disabilityInfo',
            id: '15'
          },
          {
            name: '工伤信息',
            path: 'bruiseInfo',
            id: '13'
          }
          // {
          //   name: '证书信息',
          //   path: 'credentialInfo'
          // },
          // {
          //   name: '专家信息',
          //   path: 'expertInfo'
          // }, {
          //   name: '人事档案',
          //   path: 'personnelFile'
          // }, {
          //   name: '计划生育信息',
          //   path: 'familyPlanning'
          // }
        ]
      ]
    }
  },
  watch: {},
  computed: {
    ...mapGetters({
      getInfoDataList: 'getInfoDataList'
    })
  },
  methods: {
    ...mapMutations(['setInfoData']),
    ...mapMutations(['setInfoDataList', 'setInfoData']),
    // 切换tab
    changeTab (item, index) {
      if (index == this.tabIndex && this.showbox) {
        this.showbox = !this.showbox
      } else {
        this.lisIndex = 0
        this.showbox = true
      }
      if (index == 0) {
        this.lisIndex = this.lisindex_1
      } else if (index == 1) {
        this.lisIndex = this.lisindex_2
      } else if (index == 2) {
        this.lisIndex = this.lisindex_3
      }
      this.tabIndex = index
      this.tabNabList = this.arrList[index]
    },
    // 选择内容
    selcontent (item, index) {
      this.lisIndex = index
      // this.tabList.splice(this.tabIndex, 1, item.name)
      this.showbox = false
      if (this.tabIndex == 0) {
        this.lisindex_1 = index
      } else if (this.tabIndex == 1) {
        this.lisindex_2 = index
      } else if (this.tabIndex == 2) {
        this.lisindex_3 = index
      }
      this.setInfoData(util.filtData(this.getInfoDataList, item.id))
      this.$router.push({
        name: item.path
      })
    },
    // 关闭
    closeMenc () {
      this.showbox = false
    }
  },
  created () { },
  mounted () {
    this.tabNabList = this.arrList[0]
  }
}
</script>
<style lang="scss" scoped>
.tab-nav-wrap {
  font-size: 0.24rem;
  padding: 0.2rem 0.4rem;
  position: fixed;
  box-sizing: border-box;
  background: #5775ad;
  z-index: 200;
  width: 100%;
  // &::after {
  //   content: "";
  //   display: inline-block;
  //   position: fixed;
  //   width: 100%;
  //   height: 0.7rem;
  //   background: #f3f5f8;
  //   top: 3.2rem;
  //   left: 0;
  //   z-index: 8;
  // }

  .menc {
    position: fixed;
    display: inline-block;
    width: 100%;
    height: 100%;
    font-size: 0.24rem;
    background: rgba(0, 0, 0, 0.5);
    left: 0;
    top: 2.5rem;
    z-index: 90;
  }
  .tab-box {
    position: relative;
    display: flex;
    justify-content: center;
    width: 100%;
    line-height: 0.8rem;
    box-sizing: border-box;
    border-radius: 0.2rem;
    z-index: 500 !important;
    background: #fff;
    // position: fixed;
    .tab-name {
      padding: 0 0.25rem;
      text-align: center;
      font-size: 0.28rem;
      color: #999999;
      &.active-tab {
        color: #5576ab;
        .icon-name {
          border-color: #5576ab transparent transparent transparent;
        }
      }
      .icon-name {
        color: #999999;
        font-size: 0.26rem;
        display: inline-block;
        position: relative;
        width: 0;
        height: 0;
        border-width: 0.1rem;
        border-style: solid;
        border-color: #999999 transparent transparent transparent;
        top: 0.05rem;
      }
    }
    .tab-list-box {
      font-size: 0.24rem;
      width: 90%;
      background: #fff;
      padding: 0rem 0.5rem;
      border-bottom-left-radius: 0.2rem;
      border-bottom-right-radius: 0.2rem;
      box-sizing: border-box;
      position: absolute;
      top: 0.95rem;
      left: 5%;
      z-index: 300;
      max-height: 7rem;
      overflow: auto;
      .lis {
        padding: 0rem 0;
        font-size: 0.26rem;
        color: #999999;
        &.active-name {
          color: #5576ab;
        }
      }
    }
  }
}
</style>