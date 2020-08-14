import { isVNode } from '@/utils'
import request from "./request.js"
import { isIE, isIE9, isIE11, isEdge, isAndroid, isIOS, isChrome, isApp } from 'config'
import axios from 'axios'
const resiter = (Vue) => {
    // 挂载 axios
    Vue.prototype.$_axios = request.requestData
    /**
     * 扩展 element pagination pageSize list
     */
    Vue.prototype.$pageSizes = [10, 15, 20, 30, 50]

    /**
     * 将指定的日期之间禁用
     * @param {*} startDate 开始日期
     * @param {*} endDate 结束日期
     */
    Vue.prototype.$dateScopeLimitBetween = (startDate, endDate) => {
        return {
            disabledDate(time) {
                if (time.getTime() < startDate - 3600 * 1000 * 24 || time.getTime() > endDate) {
                    return true
                }
            }
        }
    }

    /**
     * 在表单验证错误的时候给友好的提示
     * @param {指定的组件}} _this
     * @param {错误的表单form} form 字符串
     * @param {表单错误项}} errlist
     */
    Vue.prototype.$validateErrTips = (_this, form, errlist) => {
        try {
            _this.$nextTick(() => {
                _this.$refs[form].$el.querySelectorAll('.is-error input, .is-error textarea')[0].focus()
            })
            const err = Object.keys(errlist)[0]
            _this.$message({
                type: 'warning',
                message: errlist[err][0].message || '表单验证未通过'
            })
        } catch (error) {
            _this.$message({
                type: 'warning',
                message: '表单验证未通过'
            })
        }
    }
    /**
     * 表单验证是的自定义规则 通过传递regexp来自定义验证
     * @param {传递进来的规则,regexp,以及message} rule
     * @param {需要验证的值} value
     * @param {下一步} callback
     */
    Vue.prototype.$gloVertify = (rule, value, callback) => {
        var regExp = new RegExp(rule.regexp)
        if (!value || regExp.test(value)) {
            callback()
        } else {
            callback(new Error(rule.message))
        }
    }
    /**
     * 当操作成功后的弹框
     * @param [String, Object] data 参数参照 this.$message
     * @returns {Promise} 页面弹框关闭后会执行
     */
    Vue.prototype.$__Tips = function (data) {
        const defaultData = {
            tips: '保存成功',
            duration: 2000
        }
        if (typeof data === 'string' || isVNode(data)) {
            data = Object.assign(defaultData, { tips: data })
        } else {
            data = Object.assign(defaultData, data)
        }
        return new Promise((resolve) => {
            if (!data.type) {
                delete data.type
            }
            this.$message({
                message: data.tips,
                type: 'success',
                ...data
            })
            resolve()
        })
    }

    Vue.prototype.$__Device = {
        isIE,
        isIE9,
        isIE11,
        isEdge,
        isAndroid,
        isIOS,
        isApp,
        isChrome
    }
}

export default {
    install: resiter
}
