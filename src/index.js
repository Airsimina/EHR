/* eslint-disable no-new,no-extend-native,no-undef */
import Vue from 'vue'
import App from './index.vue'
import router from './router'
import './style/variable.scss'
import Vant from 'vant'
import 'vant/lib/index.css'
import store from './store/index'
import $util from '../src/util/util.js'
import axios from 'axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './util/vconsole.js'
import './globFilter/index.js'

Vue.use(ElementUI)
Vue.prototype.axios = axios
Vue.prototype.util = $util
// 绑定repalceAll方法
String.prototype.replaceAll = function (s1, s2) {
    return this.replace(new RegExp(s1, 'gm'), s2)
}
Vue.use(Vant)
Vue.prototype.buildType = BUILD_TYPE

Vue.directive('clickOutside', {
    // 初始化指令
    bind (el, binding, vnode) {
        function clickHandler (e) {
            // 这里判断点击的元素是否是本身，是本身，则返回
            if (el.contains(e.target)) {
                return false
            }
            // 判断指令中是否绑定了函数
            if (binding.expression) {
                // 如果绑定了函数 则调用那个函数，此处binding.value就是handleClose方法
                binding.value(e)
            }
        }
        // 给当前元素绑定个私有变量，方便在unbind中可以解除事件监听
        el.__vueClickOutside__ = clickHandler
        document.addEventListener('click', clickHandler)
    },
    update () { },
    unbind (el, binding) {
        // 解除事件监听
        document.removeEventListener('click', el.__vueClickOutside__)
        delete el.__vueClickOutside__
    }
})
Vue.directive('focus', {
    inserted: function (el) {
        el.focus()
    }
})
// 遍历组件加载
Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')