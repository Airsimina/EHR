<template>
  <div class="home">
    <router-view></router-view>
    <div class="footer">
      <div class="single-bg">
        <template v-for="(item,index) in jsonData.list_c">
          <div :class="'single' + (item.path === $route.name ? ' active' : '')" @click="transmitFun(item)" :key="index">
            <img class="single-icon" :src="item.path === $route.name ? item.iconUrl2 : item.iconUrl1" />
            <div class="icon-text">{{item.iconText}}</div>
          </div>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import HttpEhr from '@requestPool/index.js'

export default {
  data () {
    return {
      jsonData: {
        list_c: [
          {
            iconUrl1: require('../../../static/img/service.png'),
            iconUrl2: require('../../../static/img/service-c.png'),
            iconText: '服务台',
            path: 'home'
          },
          {
            iconUrl1: require('../../../static/img/daiban.png'),
            iconUrl2: require('../../../static/img/daiban-c.png'),
            iconText: '待办',
            path: 'backlog'
          },
          {
            iconUrl1: require('../../../static/img/add.png'),
            iconUrl2: require('../../../static/img/add-c.png'),
            iconText: '申请',
            path: 'apply'
          }
        ]
      },
      userId: '',
      awaitNum: '0',
      vacationNum: '0',
      OAurl: '',
      hxToken: '',
      sid: '',
      userInfo: {}
    }
  },
  mounted () {
    this.initOAurl()
    document.title = '首页'
  },
  methods: {
    toDb () {
      console.log(this.OAurl)
      // window.location.href = this.OAurl
      this.$router.push({
        path: '/backlog',
        query: {
          src: this.OAurl
        }
      })
    },
    initOAurl () {
      let backStr = ''
      switch (BUILD_TYPE) {
        case 'PRO':
          backStr = `http://app.huaxincem.com/ehr/mobile/?userId=${this.userId}&hxToken=${this.hxToken}#/home`
          break
        case 'Q3':
          backStr = `http://mob.huaxincem.com/ehr/mobile/?userId=${this.userId}&hxToken=${this.hxToken}#/home`
          break
        case 'PRO_DEV':
          backStr = `http://mobq.huaxincem.com/ehr/mobile/?userId=${this.userId}&hxToken=${this.hxToken}#/home`
          break
        default:
          backStr = `http://mob.huaxincem.com/ehr/mobile/?userId=${this.userId}&hxToken=${this.hxToken}#/home`
          break
      }
      const isShowBackStr = encodeURIComponent(backStr)
      console.log(BUILD_TYPE + '环境')
      this.OAurl = `http://pesm.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=${isShowBackStr}`
      switch (BUILD_TYPE) {
        case 'PRO':
          this.OAurl =
            'http://pesm.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' +
            isShowBackStr
          break
        case 'PRE':
          this.OAurl = ''
          break
        case 'Q3':
          this.OAurl =
            'http://mob.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' +
            isShowBackStr
          break
        case 'PRO_DEV':
          this.OAurl =
            'http://mob.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' +
            isShowBackStr
          break
        default:
          // dev
          this.OAurl =
            'http://mobq.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' +
            isShowBackStr
          break
      }
      console.log('OAurl', this.OAurl)
    },
    // 跳转
    transmitFun (item) {
      if (item.path == 'backlog' || item.path == 'sq') {
        this.toDb()
        return
      }
      this.$router.push({
        name: 'sharePage',
        query: {
          pagePath: item.path
        }
      })
    }
  }
}
</script>

<style lang='scss' scoped>
.home {
  height: 100%;
  // background: #f9f9fb;
  // .single-bg {
  //   .single {
  //     padding-top: 0.29rem;
  //     width: 25%;
  //     height: 1.6rem;
  //     .icon-text {
  //       color: rgba(51, 51, 51, 1);
  //       margin-top: 0.15rem;
  //       width: 100%;
  //     }
  //     .single-icon {
  //       width: 0.9rem;
  //       height: 0.9rem;
  //     }
  //   }
  // }
  .footer {
    width: 100%;
    height: 1.2rem;
    background: #fff;
    position: fixed;
    bottom: 0;
    box-sizing: border-box;
    .single-bg {
      height: 100%;
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      .single {
        padding-top: 0.18rem;
        width: 33.3%;
        height: 100%;
        text-align: center;
        &.active {
          .icon-text {
            color: rgba(68, 119, 190, 1);
          }
          .single-icon {
            color: rgba(68, 119, 190, 1);
          }
        }
        .single-icon {
          width: 0.36rem;
          height: 0.36rem;
          color: rgba(153, 153, 153, 1);
        }
        .icon-text {
          font-size: 0.24rem;
          color: rgba(51, 51, 51, 1);
          margin-top: 0.08rem;
        }
      }
    }
  }
}
</style>