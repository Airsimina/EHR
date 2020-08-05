<template>
  <div class="container">
    <div class="title">
      <img src="../../../static/img/qxzqjlx.png" alt />
    </div>
    <div class="type-list">
      <van-cell class="item-type" v-for="item in leaveTypeList" :key="item.id" :title="item.text" :value="item.content" is-link :borde="false" value-class="type-content" @click="toLeaveRequest(item)">
        <template #icon>
          <img v-if="item.id == 1" src="../../../static/img/nianxiu.png" class="type-icon" />
          <img v-else-if="item.id == 2" src="../../../static/img/bingjia.png" class="type-icon" />
          <img v-else-if="item.id == 3" src="../../../static/img/shijia.png" class="type-icon" />
          <img v-else-if="item.id == 4" src="../../../static/img/gongshangjia.png" class="type-icon" />
          <img v-else-if="item.id == 5" src="../../../static/img/hunjia.png" class="type-icon" />
          <img v-else-if="item.id == 6" src="../../../static/img/chanjia.png" class="type-icon" />
          <img v-else-if="item.id == 7" src="../../../static/img/hulijia.png" class="type-icon" />
          <img v-else-if="item.id == 8" src="../../../static/img/sangjia.png" class="type-icon" />
          <img v-else src="../../../static/img/burujia.png" class="type-icon" />
        </template>
      </van-cell>
    </div>
  </div>
</template>

<script>
import HttpEhr from '@requestPool/index.js'
export default {
  data () {
    return {
      leaveTypeList: [
        {
          id: '1',
          text: '年休',
          content: ''
        },
        {
          id: '2',
          text: '病假',
          content: ''
        },
        {
          id: '3',
          text: '事假',
          content: ''
        },
        {
          id: '4',
          text: '工伤假',
          content: ''
        },
        {
          id: '5',
          text: '婚假',
          content: ''
        },
        {
          id: '6',
          text: '产假',
          content: ''
        },
        {
          id: '7',
          text: '护理假',
          content: ''
        },
        {
          id: '8',
          text: '丧假',
          content: ''
        },
        {
          id: '9',
          text: '哺乳假',
          content: ''
        }
      ],
    }
  },
  methods: {
    getAnnualResidue () {
      HttpEhr.annualResidue({
        userId: this.util.getSession('ehrSessionData').userId || ''
      }).then(res => {
        this.leaveTypeList[0].content = `剩余${res.data.surplus}天` // 剩
      })
    },
    toLeaveRequest (item) {
      this.$router.push({
        name: 'leaveRequest',
        query: {
          leaveTypeId: item.id,
          leaveTypeText: item.text
        }
      })
    }
  },
  mounted () {
    this.getAnnualResidue()
    document.title = '请假类型'
  },
}
</script>

<style lang="scss" scoped>
.container {
  z-index: 200;
  position: relative;
  background: #f8fafb;
  .title {
    padding: 0.4rem 0 0.2rem 0.4rem;
    width: 2.22rem;
    height: 0.33rem;
  }
  .type-list {
    padding: 0 0.4rem;
    .item-type {
      margin-top: 0.2rem;
      border-radius: 10px;
      box-shadow: 0 0.04rem 0.08rem #bbc8d4;
    }
    .type-content {
      color: #448bea;
      font-size: 0.24rem;
    }
  }
  .type-icon {
    width: 0.29rem;
    height: 0.39rem;
    display: inline-block;
    margin-right: 0.2rem;
    padding-top: 0.03rem;
  }
}
</style>