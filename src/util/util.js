export default {
    // 判断是否是安卓
    isAndroid () {
        if (process.env.NODE_ENV === 'development') {
            return true
        } else {
            const u = navigator.userAgent
            const isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1 // android终端
            if (isAndroid) {
                return true
            } else {
                return false
            }
        }
    },
    format (date, fmt) {
        let o = ''
        if (!date) {
            return '-'
        } else if (typeof date !== 'object') {
            date = new Date(date)
            o = {
                'M+': date.getMonth() + 1, // 月份
                'd+': date.getDate(), // 日
                'h+': date.getHours(), // 小时
                'm+': date.getMinutes(), // 分
                's+': date.getSeconds(), // 秒
                'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
                S: date.getMilliseconds() // 毫秒
            }
        }
        if (/(y+)/.test(fmt)) {
            fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
        }
        for (const k in o) {
            if (new RegExp('(' + k + ')').test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
        }
        return fmt
    },
    debounce (fn, wait = 500) {
        var timeout = null
        return function () {
            if (timeout !== null) clearTimeout(timeout)
            timeout = setTimeout(fn, wait)
        }
    },
    // 设置session
    setSession (key, obj) {
        const sessionObj = JSON.stringify(obj)
        window.sessionStorage.setItem(key, sessionObj)
    },

    // 取出session
    getSession (key) {
        const getValue = window.sessionStorage.getItem(key)
        return JSON.parse(getValue)
    },
    // 判断对象是否为空
    isNullObj (obj) {
        for (var key in obj) {
            return false
        }
        return true
    },
    // 将小数位科学计算法表示数转数字
    scientificToNumber (tempValueStr) {
        if ((tempValueStr.indexOf('E') != -1) || (tempValueStr.indexOf('e') != -1)) {
            var regExp = new RegExp('^((\\d+.?\\d+)[Ee]{1}(\\d+))$', 'ig')
            var result = regExp.exec(tempValueStr)
            var resultValue = ''
            var power = ''
            if (result != null) {
                resultValue = result[2]
                power = result[3]
                result = regExp.exec(tempValueStr)
            }
            if (resultValue != '') {
                if (power != '') {
                    var powVer = Math.pow(10, power)
                    // alert("10的" + power + "次方[" + powVer + "]");
                    resultValue = resultValue * powVer
                }
            }
            return resultValue
        }
    },
    // 过滤数据
    filtData (arr, id) {
        return arr.filter(item => item.afType === id)
    },
    // 时间格式化 默认时间
    setDefaultTime (type) {
        const date = new Date()
        var y = date.getFullYear()
        var m = date.getMonth() + 1
        m = m < 10 ? '0' + m : m
        if (type == 1) {
            return `${y}年${m}月`
        } else {
            return `${y}-${m}`
        }
    }
}