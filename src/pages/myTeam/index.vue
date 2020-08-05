<template>
  <div class="myTeam">
    <div class="team">
      <div class="team-top">
        <div class="search">
          <van-search v-model="searchKey" shape="round" background="#5576ab" placeholder="搜索" @change="search" @keyup.enter="search" />
        </div>
        <div class="breadcrumb">
          <div class="breadcrumb-title">
            <router-link class="blue" :to="{path: '/home'}">首页</router-link>
          </div>
          <template v-for="(item, index) in breadcrumbList">
            <div class="breadcrumb-title blue" v-if="index !== breadcrumbList.length - 1" :key="index" @click="goBackTeam(item, index)">
              <i class="el-icon-arrow-right"></i>
              {{item.orgName}}
            </div>
            <div class="breadcrumb-title" v-else :key="index">
              <i class="el-icon-arrow-right"></i>
              {{item.orgName}}
            </div>
          </template>
        </div>
      </div>
      <div class="current-team">
        <div class="other-team">
          <template v-for="item in orgaList">
            <div class="team-item" v-if="item.personNum" :key="item.id" @click="getChildrenList(item)">
              <p>{{item.name}}</p>
              <p>
                <span>{{item.personNum}}</span>
                <i class="el-icon-arrow-right my-arrow"></i>
              </p>
            </div>
          </template>
        </div>
        <div class="items">
          <div class="current-item" @click="getPersonInfo(item)" v-for="item in myTeamPersonList" :key="item.id">
            <div class="item-info">
              <div>
                <van-image width="0.65rem" height="0.68rem" fit="cover" radius="10" :src="'http://hafqas3.hxoadev.com' + item.idPhoto" />
              </div>
              &emsp;{{item.name}}
              <span class="item-level" v-if="item.id == myLeaderId">我的上级</span>
              <div class="my-arrow">
                <span class="item-post">{{item.positionName}}</span>
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HttpEhr from '@requestPool/index.js'
export default {
  data () {
    return {
      searchKey: '',
      myTeamPersonList: [],
      myLeaderId: '', // 上级id
      personLists: {},
      orgaList: [],
      orgaListCount: 0,
      myUserId: '',
      pageNum: 1,
      breadcrumbList: []
    }
  },
  methods: {
    async getData () {
      let orgaId
      this.myUserId = this.util.getSession('ehrSessionData').userId
      await HttpEhr.getPersonOrganization().then(res => {
        if (res.data) {
          orgaId = res.data[0].id
        }
      })
      await HttpEhr.initOrgaTree({ orgaId: orgaId }).then(res => {
        if (res.data) {
          orgaId = res.data.id
          this.breadcrumbList.push({
            orgName: res.data.parCapOrganization.name,
            orgaId: res.data.parCapOrganization.id
          })
          this.breadcrumbList.push({
            orgName: res.data.name,
            orgaId: res.data.id
          })
        }
      })
      HttpEhr.getTeamPersonList({ orgaId: orgaId }).then(res => {
        if (res.data) {
          this.myTeamPersonList = res.data.rows
          this.myTeamPersonList.some(item => {
            if (this.myUserId == item.unno) {
              this.myLeaderId = item.leaderId
            }
          })
        }
      })
      this.getOrgChildren({ orgaId: orgaId })
    },
    // 搜索
    search () {
      this.getPersonListByOrgaId({
        orgaId: ''
      })
      this.orgaListCount = 0
    },
    // 获取下一级
    getChildrenList (item) {
      this.breadcrumbList.push({
        orgName: item.name,
        orgaId: item.id
      })
      this.getOrgChildren({ orgaId: item.id })
      this.myTeamPersonList = []
      this.getPersonListByOrgaId({ orgaId: item.id })
    },
    // 查看个人档案
    getPersonInfo (item) {
      HttpEhr.checkPersonReport({
        checkUserId: item.id,
        longinUserId: this.myUserId
      }).then(res => {
        if (res.data) {
          if (res.data.isEHR == '01' || res.data.levelType == '2' || item.unno == this.myUserId) {
            this.$router.push({
              name: 'myMessage',
              query: {
                userId: item.unno,
                canShow: 1 // 管理员和直属下级可以查看所有
              }
            })
            // } else if (res.data.levelType == "1") {
            //   this.$router.push({
            //     name: "myMessage",
            //     query: {
            //       userId: item.unno,
            //       canShow: 2 // 直属上级，查看基本信息
            //     }
            //   })
          } else {
            this.$toast({
              message: '暂无权限'
            })
          }
        }
      })
      // this.$router.push({
      //   name: "myMessage"
      // })
      // if (this.myUserId == item.unno) {
      // }
    },
    // 返回上一级
    goBackTeam (item, index) {
      this.breadcrumbList = this.breadcrumbList.slice(0, index + 1)
      this.getOrgChildren(item)
      this.getPersonListByOrgaId(item)
    },
    getOrgChildren (item) {
      HttpEhr.getOrgChildren({ orgaId: item.orgaId }).then(res => {
        if (res.data) {
          // this.breadcrumbList.pop()
          this.orgaList = res.data.childOrganization
          this.orgaListCount = res.data.childrenCount
        }
      })
    },
    getPersonListByOrgaId (item) {
      HttpEhr.getPersonListByOrgaId({ orgaId: item.orgaId, pageNum: this.pageNum, pageSize: 20, searchKey: this.searchKey }).then(res => {
        if (res.data) {
          this.myTeamPersonList = res.data.rows
        }
      })
    }
  },
  created () {
    this.getData()
  },
  mounted () {
    document.title = '我的团队'
  },
}
</script>

<style lang="scss">
.myTeam .team .search .el-input .el-input__inner {
  border-radius: 20px;
}
</style>
<style lang="scss" scoped>
.myTeam {
  font-size: 0.24rem;
  .team {
    position: fixed;
    top: 0rem;
    width: 100%;
    box-sizing: border-box;
    z-index: 200;
    height: 100%;
    .team-top {
      .search {
        padding: 0.1rem 0.2rem;
      }
      .breadcrumb {
        font-size: 0.26rem;
        padding: 0.2rem 0.4rem 0.4rem;
        background: #f3f5f8;
        color: #999;
        .breadcrumb-title {
          display: inline-block;
        }
        .blue {
          color: #5f94f4;
        }
        .el-icon-arrow-right {
          color: #999;
        }
      }
    }
    .other-team {
      margin: 0.2rem 0.4rem;
      border-radius: 0.2rem;
      background: #fff;
      .team-item {
        position: relative;
        padding: 0.4rem 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        display: flex;
        justify-content: space-between;
        align-items: center;
        p:last-child {
          padding-right: 0.32rem;
        }
        &:last-child {
          border-bottom: none;
        }
      }
    }
    .current-team {
      // padding-top: 0.2rem;
      // background: #f3f5f8;
      overflow: auto;
      position: absolute;
      top: 2.1rem;
      bottom: 0;
      width: 100%;
      .items {
        border-radius: 0.2rem;
        margin: 0 0.4rem;
        background: #fff;
      }
      .current-item {
        position: relative;
        padding: 0.3rem 0.4rem;
        box-sizing: border-box;
        border-bottom: 1px solid #ddd;
        &:last-child {
          border-bottom: none;
        }
        .item-info {
          display: flex;
          align-items: center;
          .item-avatar {
            width: 0.8rem;
            height: 0.8rem;
          }
          .item-level {
            font-size: 0.24rem;
            display: inline-block;
            margin-left: 0.2rem;
            padding: 0.04rem 0.2rem;
            border-radius: 0.2rem;
            background: #d3e2ff;
            color: #5f94f4;
          }
          .item-post {
            font-size: 0.24rem;
            color: #666;
            max-width: 3rem;
            display: inline-block;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
    .my-arrow {
      position: absolute;
      top: 50%;
      right: 0.4rem;
      transform: translateY(-40%);
      color: #666;
      .el-icon-arrow-right {
        vertical-align: text-top;
        color: #999;
      }
    }
  }
}
</style>