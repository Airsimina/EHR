/* eslint-disable no-undef */
import axios from 'axios'
import {
    Dialog
} from 'vant'
import store from '../store/index'
import util from '../util/util.js'
// 请求超时时间
axios.defaults.timeout = 120000
// let baseUrl = 'http://pesm.huaxincem.com/appPI'
// let baseUrl = 'http://mob.huaxincem.com/appPI'

let baseUrl = '/api'
// let baseUrl = 'http://hafdev.hxoadev.com'

// 根据不同的环境设置不同的baseUrl
switch (BUILD_TYPE) {
    case 'PRO':
        baseUrl = 'http://pesm.huaxincem.com/appPI'
        break
    case 'PRE':
        baseUrl = 'PRE'
        break
    case 'Q3':
        baseUrl = 'http://mob.huaxincem.com/appPI'
        break
    case 'PRO_DEV':
        baseUrl = 'http://mobq.huaxincem.com/appPI'
        break
    default:
        break
}
axios.defaults.baseURL = baseUrl
axios.defaults.headers.post['Content-Type'] =
    'application/json;charset=UTF-8'
// axios,request请求拦截器
axios.interceptors.request.use(
    // token预留
    config => {
        store.commit('setLoading', true)
        // store.commit('addLoading')
        const sessionData = util.getSession('sessionData')
        if (sessionData instanceof Object) {
            config.headers = Object.assign(config.headers, sessionData)
        }
        return config
    },
    error => {
        // store.state.loading = false
        // store.state.loadingCount = 0
        return Promise.reject(error)
    }
)
// axios,reponse请求拦截器
axios.interceptors.response.use(response => {
    store.commit('setLoading', false)
    // store.commit('isCloseLoading')
    if (response.data.code != 0 && response.data.code != 200) {
        Dialog.alert({
            message: response.data.msg,
            title: '错误提示'
        })
    } else {
        // store.commit('isCloseLoading')
        return response.data
    }
}, () => {
    store.commit('setLoading', false)
    // store.state.loading = false
    // store.state.loadingCount = 0
    Dialog.alert({
        message: '数据异常，请联系管理员',
        title: '错误提示'
    })
})

function HXget (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .get(url, {
                params: params
            })
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

// url [请求的url地址]
// params [请求时携带的参数]
function HXpost (url, params = {}) {
    return new Promise((resolve, reject) => {
        axios
            .post(url, params)
            .then(res => {
                resolve(res)
            })
            .catch(err => {
                reject(err)
            })
    })
}

export {
    HXget,
    HXpost
}