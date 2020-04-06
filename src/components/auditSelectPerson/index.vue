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
            </van-field>
          </template>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse>
    <selectPersonCard v-model="showAuditPerson" @config="handleSelectConfig"></selectPersonCard>
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
      isAdd: false
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
    // 更换申请人时触发的方法
    handleSelectConfig(value) {
      if(!this.isAdd) {
        this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson.splice(0,1,value)
      } else {
        this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson.push(value)
      }
      this.newAssingersSelectList[this.addpersonIndex].showModifyAssignerName=this.getShowName(this.newAssingersSelectList[this.addpersonIndex].chooseNameModifyAssignerPerson)
    },
    init() {
      // 深拷贝传入进来的数组
      let newAssingersSelectList=[]
      newAssingersSelectList=this.assingersSelectList.map(
        (item,index) => {
          if(item.modifyAssignerPersons&&item.modifyAssignerPersons.length==0) {
            item.modifyAssignerPersons.push({
              sysUsername: '',
              name: '',
              id: ''
            })
          }
          const ModifyAssignerName=this.getShowName(item.modifyAssignerPersons)
          const newItem={
            nodeName: item.nodeName,
            modifyAssignerPersons: item.modifyAssignerPersons,
            chooseNameModifyAssignerPerson: [item.modifyAssignerPersons[0]],
            showModifyAssignerName: ModifyAssignerName,
            nodeId: item.nodeId,
            defaultShow: item.defaultShow
          }
          this.newAssingersSelectList.push(newItem)
          return newItem
        }
      )
      // this.newAssingersSelectList=this.newAssingersSelectList.concat(newAssingersSelectList)
      // console.log('newAssingersSelectList',this.newAssingersSelectList)
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

<style lang="scss" scoped></style>
