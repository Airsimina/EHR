<template>
  <div class="record-info">
    <div class="item-info" @click="recordMoreFun(item)" v-for="(item, index) in recordList" :key="index">
      <div class="item-top">
        <div>
          <van-image width="0.68rem" height="0.71rem" radius="10" fit="cover" :src="item.personPhoto" />
        </div>
        <div class="item-post">
          <p>{{item.name}}-{{item.dataType=='1' ? '请假':'假期调整'}}</p>
          <p class="item-date">{{item.createDate}}</p>
        </div>
      </div>
      <div :class="'item-status ' + getStatusTxt(item.status).sty">{{getStatusTxt(item.status).txt}}</div>
      <!-- // 请假类型1、年休2、病假3、事假4、工伤假5、婚假6、产假7、护理假8、丧假 -->
      <div class="item-type">请假类型：{{util.getLeaveVal(item.type)}}</div>
      <div class="item-time">
        {{item.status == 4 ? '销假时间：':'请假时间：'}}
        <span>{{item.startDate}}-{{item.endDate}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    recordList: {
      type: Array,
      default: () => {
        return [
          {
            name: '',
            status: '',
            data: '',
            type: '',
            dataType: ''
          }
        ]
      }
    }
  },
  data () {
    return {
    }
  },
  methods: {
    // 详情
    recordMoreFun (itemData) {
      this.$router.push({
        name: 'leaveApply',
        query: {
          id: itemData.id, // 数据id
          dataType: itemData.dataType, // 请假  销假
          type: itemData.type // 请假类型
        }
      })
    },
    // 获取状态文本
    getStatusTxt (type) {
      if (type == 3) {
        return { txt: '已通过', sty: 'ytg' }
      } else if (type == 2) {
        return { txt: '审批中', sty: 'spz' }
      } else {
        return { txt: '被驳回', sty: 'bbh' }
      }
    }
  },
}
</script>

<style lang="scss" scoped>
.record-info {
  .item-info {
    margin-top: 0.2rem;
    background: #fff;
    padding: 0.3rem 0.4rem;
    border-radius: 10px;
    position: relative;
    .item-top {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .item-status {
      font-size: 0.24rem;
      padding: 0.07rem 0.22rem;
      border-radius: 0 10px 0 10px;
      color: #fff;
      position: absolute;
      top: 0;
      right: 0;
      &.ytg {
        background: linear-gradient(to left, #7584f8 0, #57d1da 100%);
      }
      &.spz {
        background: linear-gradient(to left, #7ab87c 0, #91c68e 100%);
      }
      &.bbh {
        background: linear-gradient(to left, #e7b191 0, #eecc87 100%);
      }
    }
    .item-post {
      font-size: 0.28rem;
      color: #111;
      font-weight: 700;
      width: 100%;
      padding-left: 0.2rem;
      .item-date {
        font-size: 0.24rem;
        color: #999;
        padding-top: 0.1rem;
        font-weight: normal;
      }
    }
    .item-type {
      padding-top: 0.2rem;
      font-size: 0.24rem;
      color: #999;
    }
    .item-time {
      padding-top: 0.1rem;
      font-size: 0.24 rem;
      color: #999;
      span {
        color: #438aea;
      }
    }
  }
}
</style>