<template>
  <div>
    <template v-for="(item,index) in newAssingersSelectList">
      <div class="my-single-cell" :key="index">
        <div class="cell-name">{{item.nodeName}}：</div>
        <div class="cell-content">
          <div class="single-cell-content" v-for="(tagItem,tagIndex) in item.chooseNameModifyAssignerPerson" :key="tagIndex">
            <van-tag type="primary" :key="tagIndex" :closeable="tagIndex > 0" color="#ffffff" text-color="rgb(81, 140, 241)" plain @close="handleTagClose(index,tagIndex)">{{tagItem.name}}</van-tag>
          </div>
        </div>
        <div class="button-container">
          <van-button slot="button" size="mini" type="primary" v-if="!item.chooseNameModifyAssignerPerson[0].sysUsername" hairline plain round color="#518cf1" @click="handleChoosePerson(index)">选择</van-button>
          <van-button
            slot="button"
            size="mini"
            type="primary"
            round
            plain
            icon="plus"
            hairline
            color="#518cf1"
            v-if="item.chooseNameModifyAssignerPerson[0].sysUsername&&item.nodeName =='N+1'"
            @click="handleAddPerson(index)"
          ></van-button>
          <van-button
            slot="button"
            size="mini"
            type="primary"
            v-if="item.nodeAssignerPersons.length>1"
            hairline
            plain
            round
            color="#518cf1"
            @click="handleChooselocalPerson(item.nodeAssignerPersons,index)"
          >选择</van-button>
        </div>
      </div>
    </template>
    <selectPersonCard v-model="showAuditPerson" @config="handleSelectConfig" :departmentId="departmentId"></selectPersonCard>
    <van-popup v-model="isSelect" position="bottom">
      <van-picker :columns="selectPersonList" value-key="name" title="审批人选择" show-toolbar @cancle="handleSelectCancle" @confirm="handlePersonConfirm" />
    </van-popup>
  </div>
</template>

<script>
import selectPersonCard from '@components/selectPersonCard/index.vue'
export default {
  components: {
    selectPersonCard
  },
  data () {
    return {
      userId: this.util.getSession('ehrSessionData').userId || '',
      activeNames: ['0'],
      showAuditPerson: false,
      addpersonIndex: null,
      isAdd: false,
      selectPersonList: [],
      isSelect: false,
      selectIndex: 0
    }
  },
  props: {
    assingersSelectList: {
      type: Array,
      default: function () {
        return []
      }
    },
    newAssingersSelectList: {
      type: Array,
      default: function () {
        return []
      }
    },
    departmentId: {
      type: String,
      default: ''
    },
    jsonData: {
      type: Object,
      default: function () {
        return {}
      }
    }
  },
  mounted () {
    this.init()
    console.log(this.userId)
  },
  methods: {
    closeTagClass (index) {
      if (index == 0) return
      else {
        return {
          background: 'red'
        }
      }
    },
    handleSelectCancle () {
      this.isSelect = false
    },
    handlePersonConfirm (selectPerson) {
      this.newAssingersSelectList[
        this.selectIndex
      ].chooseNameModifyAssignerPerson.splice(0, 1, selectPerson)
      const ModifyAssignerName = this.getShowName(
        this.newAssingersSelectList[this.selectIndex]
          .chooseNameModifyAssignerPerson
      )
      this.newAssingersSelectList[
        this.selectIndex
      ].showModifyAssignerName = ModifyAssignerName
      this.newAssingersSelectList[
        this.selectIndex
      ].assignerName = this.newAssingersSelectList[
        this.selectIndex
      ].chooseNameModifyAssignerPerson[0].name
      this.newAssingersSelectList[
        this.selectIndex
      ].assignerId = this.newAssingersSelectList[
        this.selectIndex
      ].chooseNameModifyAssignerPerson[0].sysUsername

      this.isSelect = false
    },
    // 对审批人大于两个人的人员进行选择
    handleChooselocalPerson (persons, index) {
      this.selectIndex = index
      this.selectPersonList = persons
      this.isSelect = true
    },
    // 更换申请人时触发的方法
    handleSelectConfig (value) {
      if (value.unno == this.userId) {
        this.$toast({
          message: '不能选择自己为审批人'
        })
        return
      }
      for (let item of this.newAssingersSelectList[0].chooseNameModifyAssignerPerson) {
        if (value.id == item.id) {
          this.$toast({
            message: '不能重复选择审批人'
          })
          return
        }
      }
      if (!this.isAdd) {
        this.newAssingersSelectList[
          this.addpersonIndex
        ].chooseNameModifyAssignerPerson.splice(0, 1, value)
      } else {
        this.newAssingersSelectList[
          this.addpersonIndex
        ].chooseNameModifyAssignerPerson.push(value)
      }
      // 设置传入的assignerId
      let assignerId = ''
      this.newAssingersSelectList[
        this.addpersonIndex
      ].chooseNameModifyAssignerPerson.forEach((item, index) => {
        assignerId += `${item.sysUsername},`
      })
      this.newAssingersSelectList[
        this.addpersonIndex
      ].assignerId = assignerId.substring(0, assignerId.length - 1)
      // 设置传入进来的assignerName
      let assignerName = ''
      this.newAssingersSelectList[
        this.addpersonIndex
      ].chooseNameModifyAssignerPerson.forEach((item, index) => {
        assignerName += `${item.name},`
      })
      this.newAssingersSelectList[
        this.addpersonIndex
      ].assignerName = assignerName.substring(0, assignerName.length - 1)
      this.newAssingersSelectList[
        this.addpersonIndex
      ].showModifyAssignerName = this.getShowName(
        this.newAssingersSelectList[this.addpersonIndex]
          .chooseNameModifyAssignerPerson
      )
    },

    init () {
      // 清空数组
      if (this.newAssingersSelectList.length > 0) {
        this.newAssingersSelectList.splice(
          0,
          this.newAssingersSelectList.length
        )
      }
      this.assingersSelectList.forEach((item, index) => {
        this.newAssingersSelectList.push(item)
      })
      this.newAssingersSelectList.forEach((item, index) => {
        if (item.nodeAssignerPersons && item.nodeAssignerPersons.length === 0) {
          item.chooseNameModifyAssignerPerson = [
            {
              sysUsername: '',
              name: '',
              id: ''
            }
          ]
        } else {
          item.chooseNameModifyAssignerPerson = [item.nodeAssignerPersons[0]]
          const ModifyAssignerName = this.getShowName(
            item.chooseNameModifyAssignerPerson
          )
          item.showModifyAssignerName = ModifyAssignerName
          item.assignerName = item.chooseNameModifyAssignerPerson[0].name
          item.assignerId = item.chooseNameModifyAssignerPerson[0].sysUsername
        }
      })
      console.log('newAssingersSelectList', this.newAssingersSelectList)
    },
    getShowName (modifyAssignerPersons) {
      let showName = ''
      modifyAssignerPersons.forEach((item, index) => {
        showName += `${item.name},`
      })
      showName = showName.substring(0, showName.length - 1)
      return showName
    },
    handleChoosePerson (index) {
      this.showAuditPerson = true
      this.addpersonIndex = index // 向数组里面添加选择审批的人
      this.isAdd = false
    },
    handleAddPerson (index) {
      this.isAdd = true
      this.showAuditPerson = true
      this.addpersonIndex = index // 向数组里面添加选择审批的人
    },
    handleTagClose (index, singleIndex) {
      const chooseNameModifyAssignerPerson = this.newAssingersSelectList[index]
        .chooseNameModifyAssignerPerson
      chooseNameModifyAssignerPerson.splice(singleIndex, 1)
      this.$set(
        this.newAssingersSelectList[index],
        'chooseNameModifyAssignerPerson',
        chooseNameModifyAssignerPerson
      )
      // 设置传入的assignerId
      let assignerId = ''
      this.newAssingersSelectList[
        this.addpersonIndex
      ].chooseNameModifyAssignerPerson.forEach((item, index) => {
        assignerId += `${item.sysUsername},`
      })
      this.newAssingersSelectList[
        this.addpersonIndex
      ].assignerId = assignerId.substring(0, assignerId.length - 1)
      // 设置传入进来的assignerName
      let assignerName = ''
      this.newAssingersSelectList[
        this.addpersonIndex
      ].chooseNameModifyAssignerPerson.forEach((item, index) => {
        assignerName += `${item.name},`
      })
      this.newAssingersSelectList[
        this.addpersonIndex
      ].assignerName = assignerName.substring(0, assignerName.length - 1)
      console.log('newAssingersSelectList', this.newAssingersSelectList)
      this.$forceUpdate()
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .van-field__label {
  margin-right: 10px;
  width: auto;
}
::v-deep .van-collapse-item__content {
  padding: 0;
}
.my-single-cell {
  width: 100%;
  height: 0.8rem;
  border: 1px solid #f7f7f7;
  line-height: 0.6rem;
  box-sizing: border-box;
  padding: 0.1rem 0 0.1rem 0.3rem;
  color: #323233;
  font-size: 0.28rem;
  display: flex;
  &:nth-child(n + 2) {
    border-top: none;
  }
  .cell-name {
    font-size: 0.28rem;
    color: #323233;
    min-width: 1.4rem;
  }
  .cell-content {
    overflow-x: scroll;
    height: 100%;
    display: flex;
    justify-content: flex-start;
    position: relative;
    white-space: nowrap;
    padding-left: 0.1rem;
    .single-cell-content {
      margin-right: 0.3rem;
    }
  }
}
</style>
