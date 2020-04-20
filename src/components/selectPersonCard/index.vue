<template>
  <div id="turnToPerson">
    <van-popup v-model="isShow"
               @close="handleLayoutClose"
               round
               position="bottom"
               :style="{ 'max-height': '80%' }">
      <div class="layout">
        <div class="search-box">
          <input @focusout="inputBlur"
                 class="search-input"
                 v-model="myValue"
                 :placeholder="placeholdertext"
                 @keyup.enter="onSearch" />
          <div class="search-icon"
               @click.stop="onSearch"></div>
        </div>
        <div class="tab-box"
             v-if="!isSearch">
          <div class="tab-item"
               :class="{ active: tabIndex === 1 }"
               @click="changeTab(1)">股份公司</div>
          <div class="tab-item"
               :class="{ active: tabIndex === 3 }"
               @click="changeTab(3)">我的部门</div>
        </div>
        <div class="company-box"
             v-show="tabIndex === 1"
             v-if="!isSearch">
          <div class="my-select">
            <div class="value-box">
              <div class="first"
                   :class="{ blue: !item.id }"
                   @click="changeCompanyTab(item, index)"
                   v-for="(item, index) in companyDataAry"
                   :key="index">{{ item.name }}</div>
              <div v-show="showCompanyPerson"
                   class="first">人员</div>
            </div>
          </div>
          <div class="option-box-layout">
            <div class="my-option-box">
              <div class="my-option"
                   v-for="(item, index) in company"
                   :key="index"
                   @click="selectCompanyAndPeople(item)"
                   :class="{ blue: companyData.id === item.id }">
                <span class="name">{{ item.name }}</span>
              </div>
            </div>
            <div class="my-option-box">
              <van-radio-group v-model="selectName">
                <van-cell-group>
                  <van-cell class="radio-name"
                            :title="item.name + ' ' + item.unno"
                            clickable
                            @click="radio = item.sysUsername"
                            v-for="(item, index) in companyPerson"
                            :key="index">
                    <van-radio slot="right-icon"
                               class="my-radio"
                               :name="item.sysUsername" />
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </div>
          </div>
        </div>

        <div class="higher-level"
             v-show="tabIndex === 2"
             v-if="!isSearch">
          <div class="my-select">
            <div class="value-box">
              <div class="first"
                   :class="{ blue: !item.id }"
                   @click="changeCompanyTab(item, index)"
                   v-for="(item, index) in companyDataAry"
                   :key="index">{{ item.text }}</div>
              <div v-show="showCompanyPerson"
                   class="first">人员</div>
            </div>
          </div>
          <div class="option-box-layout">
            <div class="my-option-box">
              <div class="my-option"
                   v-for="(item, index) in company"
                   :key="index"
                   @click="selectCompanyAndPeople(item)"
                   :class="{ blue: companyData.id === item.id }">
                <span class="name">{{ item.text }}</span>
              </div>
            </div>
            <div class="my-option-box">
              <van-radio-group v-model="selectName">
                <van-cell-group icon-size="30">
                  <van-cell class="radio-name"
                            :title="item.name + ' ' + item.unno"
                            clickable
                            @click="radio = item.sysUsername"
                            v-for="(item, index) in companyPerson"
                            :key="index">
                    <template #right-icon>
                      <van-radio slot="right-icon"
                                 class="my-radio"
                                 :name="item.sysUsername" />
                    </template>
                  </van-cell>
                </van-cell-group>
              </van-radio-group>
            </div>
          </div>
        </div>

        <div class="my-department-three"
             v-show="tabIndex === 3"
             v-if="!isSearch">
          <div>
            <van-radio-group v-model="selectName">
              <van-cell-group>
                <van-cell class="radio-name"
                          :title="item.name + ' ' + item.unno"
                          clickable
                          @click="radio = item.sysUsername"
                          v-for="(item, index) in companyPerson"
                          :key="index">
                  <div class="single_person_item"></div>
                  <van-radio slot="right-icon"
                             class="my-radio"
                             :name="item.sysUsername" />
                </van-cell>
              </van-cell-group>
            </van-radio-group>
          </div>
        </div>
        <loadMoreList class="search-container"
                      @load="handleLoad"
                      ref="dataList"
                      :finished="finished"
                      v-if="isSearch">
          <van-radio-group v-model="selectName">
            <van-cell-group :icon-size="iconSize">
              <van-cell clickable
                        @click="radio = item.sysUsername"
                        v-for="(item, index) in companyPerson"
                        :key="index">
                <div class="single-select-person">
                  <span class="text-style">{{ item.name }}</span>
                  <span class="text-style">{{ item.unno }}</span>
                  <span class="text-style">
                    {{
                    item.departmentName | textLength
                    }}
                  </span>
                </div>
                <van-radio class="my-radio"
                           slot="right-icon"
                           :name="item.sysUsername" />
              </van-cell>
            </van-cell-group>
          </van-radio-group>
        </loadMoreList>
        <div class="btn-box">
          <div class="btn config"
               @click="handleCertainPerson">确认</div>
          <div class="btn cancel"
               @click="handleLayoutClose">取消</div>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import myHttp from '@requestPool/index.js'
import loadMoreList from '@components/loadMoreList/index.vue'
import { Dialog } from 'vant'

export default {
  components: {
    loadMoreList
  },
  props: {
    departmentId: { // 获取的组织
      type: String,
      default: ''
    },
    // 显示转办探矿
    value: {
      type: Boolean,
      default: false
    },
    operateType: {
      type: String,
      default: 'append'
    }
  },
  data () {
    return {
      iconSize: 30,
      titleArray: [
        {
          label: '在我之前加签',
          value: 'before'
        },
        {
          label: '在我之后加签',
          value: 'after'
        }
      ],
      tabFlag: false,
      selectName: null,
      number: '123123',
      isShow: this.value,
      myValue: '',
      placeholdertext: '输入你想输入的内容',
      showCompanyPerson: false,
      showHigherLevelPerson: false,
      showMyDepartmentPerson: false,
      higherLevelPerson: [],
      myDepartmentPerson: [],
      // （二级tab 数据）
      companyDataAry: [{
        id: 'O00000001',
        type: 'O',
        code: 'O00000001',
        unno: '00000001',
        lockedStatus: 0,
        deleteStatus: 0,
        name: '华新水泥股份有限公司',
        extId: 'O00000001',
        extName: '华新水泥股份有限公司',
        refId: 'ComOrg',
        childrenCount: 33,
        reportPersonNum: null,
        personNum: null,
        personLists: null,
        parCapOrganization: null,
        brotherCapOrganization: null
      }],
      higherLevelDataAry: [{}],
      myDepartmentDataAry: [{}],
      // 股份公司
      companyData: {
        id: '',
        text: ''
      },
      // 上级部门人员
      higherLevelData: {
        id: '',
        text: ''
      },
      // 我的部门
      myDepartmentData: {
        id: '',
        text: ''
      },
      // 列表数据
      company: [],
      // 上级部门列表数据
      higherLevel: [
        {
          id: '1',
          text: 'IT服务中心1',
          hasChildren: false
        },
        {
          id: '2',
          text: '软件开发',
          hasChildren: true
        },
        {
          id: '3',
          text: 'IT服务中心2',
          hasChildren: true
        },
        {
          id: '4',
          text: '用户服务',
          hasChildren: true
        },
        {
          id: '5',
          text: '信息安全',
          hasChildren: true
        },
        {
          id: '6',
          text: '架构治理',
          hasChildren: true
        }
      ],
      myDepartment: [
        {
          id: '1',
          text: '软件开发',
          hasChildren: false
        }
      ],
      selectObj: {
        queryType: 1
      },
      selectQuery: {
        orgId: ''
      },
      selectPeopleQuery: {
        orgaId: '',
        pageNum: 1,
        pageSize: 499,
        searchKey: ''
      },
      tabIndex: 1,
      tabIndex2: 1,
      changeTabIndex: 0,
      appendType: 'before',
      appendActiveTitleIndex: 0,
      isSearch: false,
      companyPerson: [],
      searchObj: {
        pageNum: 0,
        pageSize: 20,
        searchKey: '',
        orgaId: ''
      },
      finished: false
    }
  },
  watch: {
    value: function (val, oldVal) {
      this.isShow = val
      this.$emit('input', val)
      if (!val) this.reset()
    },
    isShow: function (val) {
      this.changeTab(1)
    }
  },
  mounted () {
    console.log('departmentId', this.departmentId)
    this.changeTab(1)
    // if (this.operateType == '') {
    // }
  },
  methods: {
    handleAppendLabelClick (item, index) {
      this.appendType = item.value
      this.appendActiveTitleIndex = index
    },
    // 选择公司tab
    changeCompanyTab (item, index) {
      this.selectName = null
      this.tabFlag = true
      this.changeTabIndex = index
      this.selectQuery.orgaId = item.id
      this.selectPeopleQuery.orgaId = item.id
      myHttp.getOrgChildren(this.selectQuery).then(res => {
        if (res.code == 0) {
          this.company = res.data.childOrganization
        }
      })
      myHttp.getPersonList(this.selectPeopleQuery).then(res => {
        if (res.code == 0) {
          this.companyPerson = res.data.rows
        }
      })
    },
    selectCompanyAndPeople (item) {
      this.selectQuery.orgaId = item.id
      this.selectPeopleQuery.orgaId = item.id
      myHttp.getOrgChildren(this.selectQuery).then(res => {
        if (res.code == 0) {
          console.log('data', res.data)
          this.company = res.data.childOrganization
        }
      })
      myHttp.getPersonList(this.selectPeopleQuery).then(res => {
        if (res.code == 0) {
          this.companyPerson = res.data.rows
        }
      })
      if (!this.tabFlag) {
        console.log('this.companyDataAry', this.companyDataAry)
        this.companyDataAry.push(item)
      } else {
        this.companyDataAry.splice(
          this.changeTabIndex + 1,
          this.companyDataAry.length - 1
        )
        this.companyDataAry.push(item)
      }
      this.tabFlag = false
    },
    // 选择股份公司人员
    selectCompanyPerson (item) {
      this.companyData = item
    },
    // 点击上级部门已选项
    changeHigherLevelTab (item, index) { },
    // 选择上级部门项
    selectHigherLevel (item, index) {
      if (!item.hasChildren) {
        this.showHigherLevelPerson = true // 删除空选项
        this.higherLevelDataAry.splice(this.higherLevelDataAry.length - 1, 1)
        // 调用人员接口切换数据
        this.higherLevelPerson = this.person
      } else {
        // 调用组织接口切换数据
        // this.higherLevel
      }
      this.higherLevelDataAry.splice(
        this.higherLevelDataAry.length - 1,
        0,
        item
      )
    },
    // 选择上级部门人员
    selectHigherLevelPerson (item) {
      this.higherLevelData = item
    },
    changeMyDepartmentTab (item, index) {
      const num = this.myDepartmentDataAry.length - index
      this.myDepartmentDataAry.splice(index, num)
      this.myDepartmentDataAry.push({})
      this.showMyDepartmentPerson = false
      // this.myDepartment
    },
    selectMyDepartment (item) {
      if (!item.hasChildren) {
        this.showMyDepartmentPerson = true
        // 删除空选项
        this.myDepartmentDataAry.splice(this.myDepartmentDataAry.length - 1, 1)
        // 调用人员接口切换数据
        this.myDepartmentPerson = this.person
      } else {
        // 调用组织接口切换数据
        // this.myDepartment
      }
      this.myDepartmentDataAry.splice(
        this.myDepartmentDataAry.length - 1,
        0,
        item
      )
    },
    // 选择我的部门人员
    selectMyDepartmentPerson (item) {
      this.myDepartmentData = item
    },
    changeTab (index) {
      this.tabIndex = index
      this.selectObj.queryType = index
      this.companyDataAry = [{
        id: 'O00000001',
        type: 'O',
        code: 'O00000001',
        unno: '00000001',
        lockedStatus: 0,
        deleteStatus: 0,
        name: '华新水泥股份有限公司',
        extId: 'O00000001',
        extName: '华新水泥股份有限公司',
        refId: 'ComOrg',
        childrenCount: 33,
        reportPersonNum: null,
        personNum: null,
        personLists: null,
        parCapOrganization: null,
        brotherCapOrganization: null
      }]
      this.selectName = null
      // 调用接口
      myHttp.getOrgChildren(this.selectObj).then(res => {
        if (res.code == 0) {
          this.company = res.data.childOrganization
          if (this.tabIndex == 3) {
            this.selectPeopleQuery.orgaId = this.departmentId
            myHttp.getPersonList(this.selectPeopleQuery).then(res => {
              if (res.code == 0) {
                this.companyPerson = res.data.rows
              }
            })
          }
        }
      })
    },
    handleLayoutClose () {
      this.tabIndex = 1
      this.changeTab(1)
      this.myValue = ''
      this.$emit('input', false)
    },
    handleCertainPerson () {
      if (!this.selectName) {
        Dialog.alert({
          message: '请选择人员！'
        })
      } else {
        this.companyPerson.forEach((item, index) => {
          if (item.sysUsername === this.selectName) {
            this.$emit('config', item)
          }
        })
        this.$emit('input', false)
      }
    },
    reset () {
      this.selectName = null
      this.isSearch = false
      this.companyPerson = []
    },
    onSearch () {
      console.log("123123")
      this.searchObj.page = 0
      this.isSearch = true
      this.companyPerson = []
      this.handleLoad()
    },
    handleLoad () {

      this.searchObj.page++
      this.searchObj.searchKey = this.myValue

      myHttp.getPersonList(this.searchObj).then(res => {
        if (res.code == 0) {
          this.companyPerson = this.companyPerson.concat(res.data.rows)

          if (
            res.data.totalItems === this.companyPerson.length ||
            res.data.totalItems < this.companyPerson.length
          ) {
            this.finished = true
          }
          this.$refs.dataList.loading = false
        }
      })
    },
    inputBlur (e) {
      setTimeout(() => {
        const scrollTop =
          document.documentElement.scrollTop || document.body.scrollTop || 0
        window.scrollTo(0, scrollTop)
      }, 200)
    },
    inputFocus (e) {
      console.log('22222')
      // 如果focus，则移除上一个输入框的timer
      if (
        e &&
        e.target &&
        e.target.tagName &&
        e.target.tagName.toLowerCase() === 'input'
      ) {
        clearTimeout(this.timer)
      }
    }
  }
}
</script>

<style lang="scss">
#turnToPerson {
  .van-cell__title {
    font-size: 0.12rem;
  }
  .van-radio__icon {
    font-size: 0.12rem !important;
  }
  .van-cell {
    &:first-child {
      padding-top: 0;
    }
  }
  .layout {
    padding: 0.32rem 0 0.3rem 0;

    .title {
      width: 100%;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0 0.4rem;
      box-sizing: border-box;
      .append-title {
        width: 4.2rem;
        display: flex;
        justify-content: space-around;
        .title-text {
          font-size: 0.32rem;
          font-weight: bold;
          color: rgba(51, 51, 51, 1);
          position: relative;

          &::before {
            content: "";
            position: absolute;
            width: 0.96rem;
            height: 0.1rem;
            left: 50%;
            bottom: 0.05rem;
            background: #ccdef8;
            z-index: -1;
            transform: translateX(-50%);
          }
        }
        .normal-title {
          font-size: 0.22rem;
          color: rgba(153, 153, 153, 1);
          font-weight: bold;
          line-height: 0.5rem;
        }
      }
      .title-text {
        font-size: 0.32rem;
        font-weight: bold;
        color: rgba(51, 51, 51, 1);
        position: relative;

        &::before {
          content: "";
          position: absolute;
          width: 0.96rem;
          height: 0.1rem;
          left: 50%;
          bottom: 0.05rem;
          background: #ccdef8;
          z-index: -1;
          transform: translateX(-50%);
        }
      }

      .close {
        width: 0.19rem;
        height: 0.19rem;
        // background: url("../../../static/img/inside_close@2x.png");
        background-size: 100% 100%;
      }
    }

    .search-box {
      position: relative;
      margin: 0.28rem auto 0.2rem 1.06rem;
      display: inline-block;
      display: flex;
      align-items: center;
      width: 5.84rem;

      .search-icon {
        width: 0.5rem;
        height: 0.5rem;
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        right: 0.15rem;

        &::before {
          content: " ";
          display: block;
          width: 0.3rem;
          height: 0.3rem;

          background-size: 100% 100%;
        }
      }

      .search-input {
        width: 5.84rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        border: 0;
        background: rgba(240, 240, 240, 1);
        font-size: 0.28rem;
        padding: 0 0.58rem 0 0.28rem;
        box-sizing: border-box;
        color: #333 !important;
      }

      input::-webkit-input-placeholder {
        color: #ccc !important;
      }

      input:-moz-placeholder {
        color: #ccc !important;
      }

      input::-moz-placeholder {
        color: #ccc !important;
      }

      input:-ms-input-placeholder {
        color: #ccc !important;
      }
    }

    .tab-box {
      height: 0.75rem;
      background: #f4f4f4;
      border-top: 1px solid #ccc;
      display: flex;
      align-items: center;

      .tab-item {
        flex: 1;
        font-size: 0.26rem;
        color: #333;
        text-align: center;
        line-height: 0.75rem;
      }

      .active {
        color: #5576ab;
        background: #fff;
      }
    }
    .search-container {
      height: 6.55rem;
      overflow: scroll;
      .single-select-person {
        display: flex;
        justify-content: space-around;
        .text-style {
          font-size: 0.26rem;
          font-weight: 400;
          color: rgba(85, 118, 171, 1);
        }
      }
    }
    .company-box {
      height: 5.8rem;
      background: #fff;
      padding: 0.2rem 0.4rem;
    }

    .higher-level {
      height: 5.8rem;
      background: #fff;
      padding: 0.2rem 0.4rem;
      padding-right: 0;
    }

    .my-department-box {
      height: 5.8rem;
      background: #fff;
      padding: 0.2rem 0.4rem;
      display: flex;
    }
    .my-department-three {
      height: 5.8rem;
      background: #fff;
      padding: 0.2rem 0.4rem;
      overflow: scroll;
    }

    .my-select {
      &:last-child {
        margin-right: 0;
      }

      .blue {
        color: #5576ab !important;
      }

      .value-box {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        line-height: 0.6rem;
      }

      .first {
        font-size: 0.26rem;
        line-height: 0.26rem;
        color: #666;
        position: relative;
        padding-right: 0.24rem;
        max-width: 1.2rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        display: block;
        margin-right: 0.3rem;
        margin-bottom: 0.4rem;
      }
    }

    .option-box-layout {
      display: flex;
      justify-content: left;
      font-size: 0.26rem;
      height: 4.7rem;
      .my-option-box {
        flex: 1;
        overflow: scroll;
        &:first-child {
          margin-top: 0;
          border-right: 1px solid rgba(226, 226, 226, 1);
        }
        .my-option {
          margin-top: 0.4rem;
          font-size: 0.26rem;
          line-height: 0.26rem;
          color: #666;
          &:first-child {
            margin-top: 0;
          }

          .name {
            display: inline-block;
          }
        }

        .active {
          color: #5576ab;
          text-decoration: underline;
        }
      }
    }

    .btn-box {
      display: flex;
      justify-content: center;
      .btn {
        padding: 0.13rem 0.46rem;
        border-radius: 0.27rem;
        font-size: 0.32rem;
        line-height: 1;
      }

      .config {
        color: #fff;
        background: #5576ab;
      }

      .cancel {
        color: #666;
        background: #efefef;
        border: 1xp solid #ccc;
        box-sizing: border-box;
        margin-left: 0.5rem;
      }
    }

    .van-cell {
      align-items: center;
    }
    .radio-name .van-cell__title {
      font-size: 0.24rem;
    }

    .my-radio {
      width: 0.35rem;
      height: 0.35rem;

      .van-radio__icon {
        height: 100%;
        width: 100%;

        .van-icon {
          width: 100%;
          height: 100%;
          font-size: 0.3rem;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
    }
  }
}
</style>
