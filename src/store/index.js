import Vue from 'vue'
import Vuex from 'vuex'
// import createLogger from 'vuex/dist/logger'
import mutations from './mutation.js'
import actions from './action.js'
import getters from './getter.js'
// import lawWork from './lawWork.js'
// import marketing from './marketing.js'

// 判断环境
Vue.use(Vuex)
// const debug = process.env.NODE_ENV !== 'production'
// 创建vuex
export default new Vuex.Store({
    state: {
        loading: false,
        // 我的文档公用数据
        infoDataList: [],
        infoData: {},
        isShowLoading: false, // todo
        loadingCount: 0 // todo
    },
    mutations,
    actions,
    getters
    // strict: debug,
    // plugins: debug ? [createLogger()] : [],
    // modules: {
    //     lawWork,
    //     marketing
    // }
})