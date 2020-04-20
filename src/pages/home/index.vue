<template>
  <div class="home">
    <div class="top">
      <div class="commission-card-container">
        <div class="commission-card">
          <div class="single-card"
               @click="toDb">
            <div class="number">{{awaitNum}}</div>
            <div class="discribe">我的待办（个）</div>
          </div>
          <div class="single-card"
               @click="toNj">
            <div class="number">{{vacationNum}}</div>
            <div class="discribe">年假余额（天）</div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="single"
           @click="transmitFun(item)"
           v-for="(item,index) in jsonData.list_a"
           :key="index">
        <img class="single-icon"
             :src="item.iconUrl" />
        <div class="icon-text">{{item.iconText}}</div>
      </div>
    </div>
    <div class="people-container"
         v-show="false">
      <div class="people-title">人事管理</div>
      <div class="single"
           @click="transmitFun(item)"
           v-for="(item,index) in jsonData.list_b"
           :key="index">
        <img class="single-icon"
             :src="item.iconUrl" />
        <div class="icon-text">{{item.iconText}}</div>
      </div>
      <!-- <div>111</div> -->
    </div>
    <div class="people-container nodata-box"
         v-show="true">
      <div class="img-bg"></div>
      <!-- <div class="txt">更多功能敬请期待</div> -->
    </div>
  </div>
</template>

<script>
import HttpEhr from '@requestPool/index.js'

export default {
  data () {
    return {
      jsonData: {
        list_a: [
          {
            iconUrl: require('../../../static/img/myMessage.png'),
            iconText: '我的信息',
            path: 'myMessage'
          },
          {
            iconUrl: require('../../../static/img/money.png'),
            iconText: '我的工资',
            path: 'mySalary'
          },
          {
            iconUrl: require('../../../static/img/check.png'),
            iconText: '我的假勤',
            path: 'myTimecard'
          },
          // {
          //   iconUrl: require('../../../static/img/text.png'),
          //   iconText: '我的的异动',
          //   path: ''
          // },
          {
            iconUrl: require('../../../static/img/kzm.png'),
            iconText: '我的已办',
            path: 'commission'
          }
        ],
        list_b: [
          {
            iconUrl: require('../../../static/img/people.png'),
            iconText: '员工信息',
            path: ''
          },
          {
            iconUrl: require('../../../static/img/card.png'),
            iconText: '员工薪酬',
            path: ''
          },
          {
            iconUrl: require('../../../static/img/personcard.png'),
            iconText: '员工考勤',
            path: ''
          },
          {
            iconUrl: require('../../../static/img/list.png'),
            iconText: '员工异动',
            path: ''
          }
        ]
      },
      userId: '',
      awaitNum: '0',
      vacationNum: '0',
      OAurl: '',
      hxToken: '',
      sid: ''
    }
  },
  mounted () {
    this.init()
    this.initOAurl()
    document.title = '首页'
  },
  methods: {
    toDb () {
      console.log(this.OAurl)
      window.location.href = this.OAurl
    },
    toNj () {
      this.$router.push({
        name: 'annualResidue'
      })
    },
    // 获取代办个数
    getTaskCount () {
      return new Promise((resolve, reject) => {
        HttpEhr.getTaskCount({
          userId: this.userId
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 获取用户
    getLoginUserName () {
      return new Promise((resolve, reject) => {
        HttpEhr.getLoginUserName({
          userId: this.userId
        }).then(res => {
          resolve(res)
        })
      })
    },
    // 获取年假余额
    annualResidue () {
      return new Promise((resolve, reject) => {
        HttpEhr.annualResidue({ userId: this.userId }).then(res => {
          resolve(res)
        })
      })
    },
    // 获取userId  设置年假
    async init () {
      // 判断是不是打包环境获取userId
      let messageObj = {}
      if (this.buildType !== 'dev') {
        var messagesArray = window.location.search.substring(1).split('&')

        messagesArray.forEach(function (item, index) {
          var itemArray = item.split('=')
          messageObj[itemArray[0]] = itemArray[1]
        })
        if (messageObj.backehr) {
          messageObj = this.util.getSession('ehrSessionData')
        } else {
          this.util.setSession('ehrSessionData', messageObj)
        }
        // const sessionObj=this.util.getSession('ehrSessionData')
        // if(sessionObj&&sessionObj.userId&&sessionObj.hxToken) {
        //   messageObj=sessionObj
        // } else {
        //   var messagesArray=window.location.search.substring(1).split('&')

        //   messagesArray.forEach(function(item,index) {
        //     var itemArray=item.split('=')
        //     messageObj[itemArray[0]]=itemArray[1]
        //   })
        // }
        console.log('prodMessageObj', messageObj)
        this.userId = messageObj.userId
        this.hxToken = messageObj.hxToken
        // 存userId
      } else {
        // this.userId = '80001247' // wangdan
        messageObj = {
          userId: '80002116',
          hxToken: '495cfb309a9d4aeb9172e10acf639e8c'
        }
        this.userId = messageObj.userId // 多个审批人
        this.hxToken = messageObj.hxToken
        // this.hxToken='796c0da34ede479aab31ad060da51d9f'
        // this.sid='0e95012c436f45a39a3b4fe407c87aab'
        // this.userId='90016244'
      }
      this.util.setSession('ehrSessionData', messageObj)
      await this.annualResidue().then(res => {
        this.vacationNum = res.data.surplus
      })
      await this.getLoginUserName().then(res => {
        this.util.setSession('sysUsername', {
          sysUsername: res.data.sysUsername
        })
      })
      await this.getTaskCount().then(res => {
        this.awaitNum = res.data
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
          this.OAurl = 'http://pesm.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' +
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
      // console.log(this.buildType + '环境')
      // const isShowBackStr = encodeURIComponent(`http://mob.huaxincem.com/ehr/mobile/?userId=${this.userId}#/home`)
      // switch (this.buildType.toUpperCase()) {
      //   case 'PRO':
      //     this.OAurl = ''
      //     break
      //   case 'PRE':
      //     this.OAurl = ''
      //     break
      //   case 'Q3':
      //     this.OAurl = 'http://mob.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' + isShowBackStr
      //     break
      //   case 'PRO_DEV':
      //     this.OAurl = 'http://mob.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' + isShowBackStr
      //     break
      //   default:
      //     // dev
      //     this.OAurl = 'http://mobq.huaxincem.com/appPI/weixinQY/oauth2/home.do?WXQY_REQUEST=1&isShowBack=' + isShowBackStr
      //     break
      // }
      // console.log(this.OAurl)
      if (item.path == 'commission') {
        window.location.href = this.OAurl
        return
      }
      if (!item.path) {
        this.$toast({
          message: '敬请期待',
          icon: 'like-o'
        })
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
  .top {
    background: url("../../../static/img/top-bg.png") 0 0 no-repeat;
    background-size: 100% 100%;
    height: 2.9rem;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    .commission-card-container {
      position: absolute;
      width: 100%;
      padding: 0 0.2rem;
      height: 1.52rem;
      box-sizing: border-box;
      bottom: -0.15rem;
      .commission-card {
        width: 100%;
        background: rgba(255, 255, 255, 1);
        height: 100%;
        box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.05);
        opacity: 1;
        border-radius: 10px;
        display: flex;
        justify-content: flex-start;
        .single-card {
          width: 50%;
          position: relative;
          text-align: center;
          &:first-child {
            &::before {
              content: "";
              width: 1px;
              height: 0.8rem;
              position: absolute;
              right: 0;
              top: 0.23rem;
              background: #ccc;
              opacity: 0.3;
            }
          }
          .number {
            font-size: 0.6rem;
            line-height: 0.44rem;
            color: rgba(51, 51, 51, 1);
            margin-top: 0.4rem;
            font-family: "DINPro-Medium";
          }
          .discribe {
            font-weight: 400;
            line-height: 0.22rem;
            font-size: 0.24rem;
            margin-top: 0.2rem;
            color: rgba(153, 153, 153, 1);
            margin-left: 0.3rem;
          }
        }
      }
    }
  }
  .container {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    padding: 3.59rem 0.4rem 0 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
    .single {
      padding-top: 0.29rem;
      width: 25%;
      height: 1.6rem;
      text-align: center;
      .icon-text {
        color: rgba(51, 51, 51, 1);
        font-size: 0.24rem;
        margin-top: 0.15rem;
        width: 100%;
      }
      .single-icon {
        width: 0.9rem;
        height: 0.9rem;
      }
    }
  }
  .people-container {
    margin-top: 0.2rem;
    background: #fff;
    font-size: 0.24rem;
    padding: 0.59rem 0.4rem 0.4rem 0.4rem;
    box-sizing: border-box;
    // display: flex;
    // justify-content: flex-start;
    // flex-wrap: wrap;
    // border: 1px solid red;
    &.nodata-box {
      padding-bottom: 2.5rem;
    }
    .img-bg {
      width: 70%;
      height: 3rem;
      margin: auto;
      background: url("./../../../static/img/home_bg2.png") 0 0 no-repeat;
      background-size: 100% 100%;
    }
    .txt {
      color: rgba(102, 102, 102, 1);
      text-align: center;
      line-height: 1rem;
      font-size: 0.28rem;
    }
    .people-title {
      color: #111111;
      font-size: 0.36rem;
      // font-weight: bold;
      width: 100%;
      margin-bottom: 0.2rem;
    }
    .single {
      padding-top: 0.29rem;
      width: 25%;
      height: 1.6rem;
      text-align: center;
      .icon-text {
        color: rgba(51, 51, 51, 1);
        font-size: 0.24rem;
        margin-top: 0.15rem;
        width: 100%;
      }
      .single-icon {
        width: 0.9rem;
        height: 0.9rem;
      }
    }
  }
}
</style>