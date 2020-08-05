<template>
  <div>
    <div class="container">
      <div class="single-title">
        <img src="../../../static/img/renshi.png" alt />
      </div>
      <div class="single-bg">
        <div class="single" @click="transmitFun(item)" v-for="(item,index) in jsonData.list_a" :key="index">
          <img class="single-icon" :src="item.iconUrl" />
          <div :class="'icon-text ' + (item.path ? '' : 'coming-soon')">{{item.iconText}}</div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="single-title">
        <img src="../../../static/img/xinxi.png" alt />
      </div>
      <div class="single-bg">
        <div class="single" @click="transmitFun(item)" v-for="(item,index) in jsonData.list_b" :key="index">
          <img class="single-icon" :src="item.iconUrl" />
          <div :class="'icon-text ' + (item.path ? '' : 'coming-soon')">{{item.iconText}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      jsonData: {
        list_a: [
          {
            iconUrl: require('../../../static/img/qingjia.png'),
            iconText: '请假申请',
            path: 'leaveType'
          },
          {
            iconUrl: require('../../../static/img/xiaojia.png'),
            iconText: '销假申请',
            path: ''
          }
        ],
        list_b: [
          {
            iconUrl: require('../../../static/img/biangeng.png'),
            iconText: '变更上级',
            path: 'changeLeader'
          },
          {
            iconUrl: require('../../../static/img/jichu.png'),
            iconText: '基础信息',
            path: ''
          },
          {
            iconUrl: require('../../../static/img/gongzuo.png'),
            iconText: '工作教育信息',
            path: ''
          },
          {
            iconUrl: require('../../../static/img/qita.png'),
            iconText: '其他信息',
            path: ''
          }
        ]
      }
    }
  },
  methods: {
    // 跳转
    transmitFun (item) {
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
  },
  created () {
    document.title = '申请'
  },
}
</script>

<style lang="scss" scoped>
.container {
  width: 100%;
  padding: 0.2rem 0 0.1rem 0;
  box-sizing: border-box;
}

.single-title {
  padding: 0 0 0.2rem 0.4rem;
  width: 1.26rem;
  height: 0.33rem;
}
.single-bg {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  margin: 0.2rem 0.4rem;
  background: #fff;
  border-radius: 10px;
  .single {
    padding: 0.4rem 0 0.2rem;
    width: 25%;
    height: 1.6rem;
    text-align: center;
    .icon-text {
      color: rgba(51, 51, 51, 1);
      font-size: 0.24rem;
      margin-top: 0.15rem;
      width: 100%;
      &.coming-soon {
        color: #999;
      }
    }
    .single-icon {
      width: 0.84rem;
      height: 0.84rem;
    }
  }
}
</style>