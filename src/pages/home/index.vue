<template>
  <div class="home">
    <div class="top">
      <div class="commission-card-container">
        <div class="commission-card">
          <div class="single-card">
            <div class="number">{{awaitNum}}</div>
            <div class="discribe">我的代办（个）</div>
          </div>
          <div class="single-card">
            <div class="number">{{vacationNum}}</div>
            <div class="discribe">假期余额（天）</div>
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
             :src="item.iconUrl">
        <div class="icon-text">{{item.iconText}}</div>
      </div>
    </div>
    <div class=people-container>
      <div class="people-title">人事管理</div>
      <div class="single"
           @click="transmitFun(item)"
           v-for="(item,index) in jsonData.list_b"
           :key="index">
        <img class="single-icon"
             :src="item.iconUrl">
        <div class="icon-text">{{item.iconText}}</div>
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
            iconText: '我的考勤',
            path: 'myTimecard'
          },
          {
            iconUrl: require('../../../static/img/text.png'),
            iconText: '我的的异动',
            path: ''
          },
          {
            iconUrl: require('../../../static/img/kzm.png'),
            iconText: '审批',
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
      OAurl: ''
    }
  },
  mounted () {
    // this.init()
    document.title = '首页'
  },
  methods: {
    // 获取代办个数
    getTaskCount () {
      return new Promise((resolve, reject) => {
        HttpEhr.getTaskCount({
          userId: this.userId
        }
        ).then(res => {
          resolve(res)
        })
      })
    },
    // 获取用户
    getLoginUserName () {
      return new Promise((resolve, reject) => {
        HttpEhr.getLoginUserName({
          userId: this.userId
        }
        ).then(res => {
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
      if (this.buildType !== 'dev') {
        const urlId = location.href.split('?')[1].split('=')[1]
        this.userId = urlId.substring(0, urlId.length - 6)
        // this.util.setSession('sessionData', { userId: this.userId })
      } else {
        // this.userId = '00025608'
        this.userId = '00000251'
      }
      this.util.setSession('sessionData', { userId: this.userId })
      await this.annualResidue().then(res => {
        this.vacationNum = res.data.surplus
      })
      await this.getLoginUserName().then(res => {
        this.util.setSession('sysUsername', { sysUsername: res.data.sysUsername })
      })
      await this.getTaskCount().then(res => {
        this.awaitNum = res.data
      })
    },
    // 跳转
    transmitFun (item) {
      console.log(this.buildType + '环境')
      switch (this.buildType.toUpperCase()) {
        case 'PRO':
          this.OAurl = ''
          break
        case 'PRE':
          this.OAurl = ''
          break
        case 'Q3':
          this.OAurl = 'https://mob.huaxincem.com/appPI/weixinQY/ui/index.html?userId=' + this.userId
          break
        case 'PRO_DEV':
          this.OAurl = 'https://mobq.huaxincem.com/appPI/weixinQY/ui/index.html?userId=' + this.userId
          break
        default:
          // dev
          this.OAurl = 'https://mobq.huaxincem.com/appPI/weixinQY/ui/index.html?userId=' + this.userId
          break
      }
      console.log(this.OAurl)
      if (item.path == 'commission') {
        window.location.href = this.OAurl
        return
      }
      this.$router.push({
        name: 'unwell'
      })
      if (!item.path) {
        this.$toast(
          {
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
    padding: 0.59rem 0.4rem 0 0.4rem;
    box-sizing: border-box;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
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