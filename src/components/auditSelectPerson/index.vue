<template>
  <div>
    <van-collapse v-model="activeNames">
      <van-collapse-item name="1">
        <template #title>
          <div>
            审批人员
            <van-icon name="question-o" />
          </div>
        </template>
        <van-cell-group>
          <template v-for="(item,index) in newAssingersSelectList">
            <van-field
              v-model="item.showModifyAssignerName"
              :label="item.nodeName"
              use-button-slot
              readonly
            >
              <van-button
                slot="button"
                size="mini"
                type="primary"
                v-if="!item.chooseNameModifyAssignerPerson[0].sysUsername"
                hairline
                plain
                round
                color="#518cf1"
                @click="handleChoosePerson(index)"
              >选择</van-button>
              <van-button
                slot="button"
                size="mini"
                type="primary"
                round
                plain
                icon="plus"
                hairline
                color="#518cf1"
                v-if="item.chooseNameModifyAssignerPerson[0].sysUsername"
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
            </van-field>
          </template>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <selectPersonCard v-model="showAuditPerson" @config="handleSelectConfig"></selectPersonCard>
    <van-popup v-model="isSelect" position="bottom">
      <van-picker
        :columns="selectPersonList"
        value-key="name"
        title="审批人选择"
        show-toolbar
        @cancle="handleSelectCancle"
        @confirm="handlePersonConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import selectPersonCard from '@components/selectPersonCard/index.vue'
export default {
  components: {
    selectPersonCard
  },
  data() {
    return {
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
      default: function() {
        return []
      }
    },
    newAssingersSelectList: {
      type: Array,
      default: function() {
        return []
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    handleSelectCancle() {
      this.isSelect=false
    },
    handlePersonConfirm(selectPerson) {
      this.newAssingersSelectList[this.selectIndex].chooseNameModifyAssignerPerson.splice(0,1,selectPerson)
      const ModifyAssignerName=this.getShowName(this.newAssingersSelectList[this.selectIndex].chooseNameModifyAssignerPerson)
      this.newAssingersSelectList[this.selectIndex].showModifyAssignerName=ModifyAssignerName
      this.newAssingersSelectList[this.selectIndex].assignerName=this.newAssingersSelectList[this.selectIndex].chooseNameModifyAssignerPerson[0].name
      this.newAssingersSelectList[this.selectIndex].assignerId=this.newAssingersSelectList[this.selectIndex].chooseNameModifyAssignerPerson[0].sysUsername

      this.isSelect=false
    },
    // 对审批人大于两个人的人员进行选择
    handleChooselocalPerson(persons,index) {
      this.selectIndex=index
      this.selectPersonList=persons
      this.isSelect=true
      console.log('persons',this.selectPersonList)
    },
    // 更换申请人时触发的方法
    handleSelectConfig(value) {
      console.log('value',value)
      if(!this.isAdd) {
        this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson.splice(0,1,value)
      } else {
        this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson.push(value)
      }
      // 设置传入的assignerId
      let assignerId=''
      this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson.forEach((item,index) => {
        assignerId+=`${item.sysUsername},`
      })
      this.newAssingersSelectList[this.addpersonIndex].assignerId=assignerId.substring(0,assignerId.length-1)
      // 设置传入进来的assignerName
      let assignerName=''
      this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson.forEach((item,index) => {
        assignerName+=`${item.name},`
      })
      this.newAssingersSelectList[this.addpersonIndex].assignerName=assignerName.substring(0,assignerName.length-1)
      this.newAssingersSelectList[this.addpersonIndex].showModifyAssignerName=this.getShowName(this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson)
    },

    init() {
      // 深拷贝传入进来的数组
      if(this.newAssingersSelectList.length>1) {
        return
      }
      this.assingersSelectList.forEach((item,index) => {
        this.newAssingersSelectList.push(item)
      })
      this.newAssingersSelectList.forEach((item,index) => {
        if(item.nodeAssignerPersons&&item.nodeAssignerPersons.length===0) {
          item.chooseNameModifyAssignerPerson=[{
            sysUsername: '',
            name: '',
            id: ''
          }]
        } else {
          item.chooseNameModifyAssignerPerson=[item.nodeAssignerPersons[0]]
          console.log('chooseNameModifyAssignerPerson',item.chooseNameModifyAssignerPerson)
          const ModifyAssignerName=this.getShowName(item.chooseNameModifyAssignerPerson)
          item.showModifyAssignerName=ModifyAssignerName
          item.assignerName=item.chooseNameModifyAssignerPerson[0].name
          item.assignerId=item.chooseNameModifyAssignerPerson[0].sysUsername
        }
      })
      console.log('newAssingersSelectList',this.newAssingersSelectList)
    },
    getShowName(modifyAssignerPersons) {
      let showName=''
      modifyAssignerPersons.forEach((item,index) => {
        showName+=`${item.name},`
      })
      showName=showName.substring(0,showName.length-1)
      return showName
    },
    handleChoosePerson(index) {
      this.showAuditPerson=true
      this.addpersonIndex=index // 向数组里面添加选择审批的人
      this.isAdd=false
    },
    handleAddPerson(index) {
      this.isAdd=true
      this.showAuditPerson=true
      this.addpersonIndex=index // 向数组里面添加选择审批的人
    }
  }

}
</script>

<style lang="scss" scoped>
::v-deep .van-field__label {
  margin-right: 10px;
  width: auto;
}
</style>
