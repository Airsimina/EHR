<template>
  <div class="myTimecard">
    <!-- 我的假勤 -->
    <div class="wrap-1">
      <div class="card-box">
        <div class="nav"
             @click="jumpFun(item)"
             v-for="(item ,index) in navList"
             :key="index">
          <div class="icon "
               :class="`${item.icon}`"></div>
          <div class="text">{{item.name}}</div>
        </div>
      </div>
      <div class="cantainer">
        <div class="list-box">
          <div class="lis"
               :class="`${item.icon}`"
               @click="jumpFun(item,index)"
               v-for="(item ,index) in menuList"
               :key="index">
            <span>{{item.name}}</span>
            <!-- <span class="s-color"
                  v-if="index==3">(剩余5天)</span> -->
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {},
  data () {
    return {
      navList: [
        {
          name: '打卡签到',
          path: '',
          icon: 'dkqd'
        },
        {
          name: '请假申请',
          path: 'leaveRequest',
          icon: 'wdsq'

        }
      ],
      menuList: [
        {
          name: '我的申请',
          path: 'applyRecord',
          icon: 'jqsq'
        }, {
          name: '请假调整申请',
          path: 'applyRecord',
          icon: 'qjtzsq'
        }, {
          name: '考勤查询',
          path: 'checkSeek',
          icon: 'kqcx'
        }, {
          name: '假期余额',
          path: 'annualResidue',
          icon: 'jqye'
        }, {
          name: '加班申请',
          path: '',
          icon: 'jbsq'
        }, {
          name: '出差申请',
          path: '',
          icon: 'ccsq'
        }, {
          name: '排班管理',
          path: '',
          icon: 'pbgl'
        }
      ]
    }
  },
  methods: {
    // 跳转
    jumpFun (item, index) {
      if (!item.path) {
        this.$toast(
          {
            message: '敬请期待',
            icon: 'like-o'
          })
        return
      }
      this.$router.push({
        name: item.path,
        query: {
          icon: item.icon
        }
      })
    }
  },
  mounted () {
    document.title = '我的假勤'
  }
}
</script>

<style lang="scss" scoped>
.myTimecard {
  font-size: 0.24rem;
  .wrap-1 {
    font-size: 0.24rem;
    position: relative;
    margin: 0 0.4rem;
    margin-top: 2rem;
    z-index: 110;
    .card-box {
      font-size: 0.24rem;
      padding: 0.4rem 0;
      background: rgba(255, 255, 255, 1);
      box-shadow: 0px 5px 25px rgba(0, 0, 0, 0.05);
      border-radius: 10px;
      display: flex;
      .nav {
        &:first-of-type {
          border-right: 1px solid rgb(238, 231, 231);
        }
        flex: 1;
        .icon {
          width: 0.84rem;
          height: 0.9rem;
          margin: auto;
          &.dkqd {
            background: url("../../../static/img/dkqd.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          &.wdsq {
            background: url("../../../static/img/wdsq.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
        }
        .text {
          color: #333;
          text-align: center;
          font-weight: bold;
          font-size: 0.28rem;
        }
      }
    }
    .cantainer {
      height: 8rem;
      overflow: auto;
      padding-top: 0.4rem;
      overflow-x: hidden;
      overflow-y: scroll;
      position: relative;
      &::-webkit-scrollbar {
        display: none;
      }
      .list-box {
        font-size: 0.24rem;
        background: #fff;
        padding: 0.4rem;
        border-radius: 0.2rem;
        position: relative;
        .lis {
          padding: 0.2rem 0;
          font-size: 0.28rem;
          font-weight: bold;
          position: relative;
          border-bottom: 1px solid #f5efef;
          span {
            vertical-align: middle;
            color: #333;
          }
          .s-color {
            color: #999;
            font-size: 0.24rem;
          }
          &:last-of-type {
            border-bottom: none;
          }
          &::before {
            content: "";
            display: inline-block;
            width: 0.5rem;
            height: 0.5rem;
            vertical-align: middle;
            margin-right: 0.2rem;
            position: relative;
            top: 50%;
            left: 0.2rem;
            transform: translate(-50%, 0);
          }
          &.jbsq::before {
            background: url("../../../static/img/jbsq.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          &.ccsq::before {
            background: url("../../../static/img/ccsq.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          &.pbgl::before {
            background: url("../../../static/img/pbgl.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          &.kqcx::before {
            background: url("../../../static/img/kqcx.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          &.jqye::before {
            background: url("../../../static/img/jqye.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          &.jqsq::before {
            background: url("../../../static/img/jqsq.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
          &.qjtzsq::before {
            background: url("../../../static/img/qjtzsq.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }

          &::after {
            content: "";
            display: inline-block;
            width: 0.15rem;
            height: 0.3rem;
            position: absolute;
            top: 50%;
            right: 0;
            transform: translate(0, -50%);
            background: url("../../../static/img/jiantou.png") 0 0 no-repeat;
            background-size: 100% 100%;
          }
        }
      }
    }
  }
}
</style>