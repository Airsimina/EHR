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
    // ----------------------lixiansen-------------------------
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
    },
    // 时间格式化 默认时间 升级后
    setDefaultTime2 ({ type, num }) {
        const date = new Date()
        var y = date.getFullYear() // 年
        var m = date.getMonth() + 1 // 月
        var d = date.getDate() + 1 // 天
        // var h = date.getHours()// 小时
        // var mi = date.getMinutes() // 分
        // var s = date.getSeconds()// 秒

        m = m < 10 ? '0' + m : m
        d = d < 10 ? '0' + d : d
        // h = h < 10 ? '0' + h : h
        // mi = mi < 10 ? '0' + mi : mi
        // s = s < 10 ? '0' + s : s

        if (type == 1) {
            if (num == 2) {
                return `${y}年${m}月`
            } else if (num == 3) {
                return `${y}年${m}月${d}日`
            } else if (num == 4) {
                return `${y}年${m}月${d}日 00时00分00秒`
            }
        } else if (type == 2) {
            if (num == 2) {
                return `${y}-${m}`
            } else if (num == 3) {
                return `${y}-${m}-${d}`
            } else if (num == 4) {
                return `${y}-${m}-${d} 00:00:00`
            }
        }
    },
    // 获取病假文本
    getLeaveVal (type) {
        // 请假类型 1、年休 2、病假 3、事假 4、工伤假 5、婚假 6、产假 7、护理假 8、丧假
        if (type == '1') {
            return '年休'
        } else if (type == '2') {
            return '病假'
        } else if (type == '3') {
            return '事假'
        } else if (type == '4') {
            return '工伤假'
        } else if (type == '5') {
            return '婚假'
        } else if (type == '6') {
            return '产假'
        } else if (type == '7') {
            return '护理假'
        } else if (type == '8') {
            return '丧假'
        }
    }
}