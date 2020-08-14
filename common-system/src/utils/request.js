import axios from 'axios'
import { Message, Loading } from 'element-ui'
import store from '@/store'
import { timeout } from 'config'
const onLoading = []
let elementLoading = null
let clearLoading = null

/* 添加loading */
const createLoading = (text) => {
    onLoading.push(1)
    elementLoading = Loading.service(
        {
            lock: true,
            text: text,
            // spinner: 'el-icon-loading',
            background: 'rgba(255, 255, 255, 0.3)'
        },
        200
    )
}

/* 清除loading */
const deleteLoading = () => {
    onLoading.pop()
    if (clearLoading) {
        clearTimeout(clearLoading)
    }
    clearLoading = setTimeout(() => {
        if (elementLoading) {
            elementLoading.close()
        }
    }, timeout)
    if (onLoading.length === 0) {
        clearTimeout(clearLoading)
        if (elementLoading) {
            elementLoading.close()
        }
    }
}

// create an axios instance
const service = axios.create({
    baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
    // withCredentials: false, // send cookies when cross-domain requests
    timeout: timeout // request timeout
})

// request interceptor
service.interceptors.request.use(
    (config) => {
        // do something before request is sent
        const token = store.getters.token
        if (token) {
            config.headers.token = token
        }
        if (config.headers.loading && config.headers.loading.hide) {
            delete config.headers.loading
        } else {
            let text = ''
            if (config.headers.loading) {
                if (config.headers.loading.text) {
                    text = config.headers.loading.text
                }
                delete config.headers.loading
            }
            createLoading(text)
        }
        return config
    },
    (error) => {
        // do something with request error
        console.log(error) // for debug
        return Promise.reject(error)
    }
)

// response interceptor
service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response) => {
        const res = response.data
        deleteLoading()
        if (res.success || res.code === 0 || res.code == 200 || res.code === 20000 || res.message === '请求数据成功') {
            return res.datas
        } else {
            if (res.code === 401) {

            }
            Message({
                message: res.msg || res.message || res.info || 'Error',
                type: 'error',
                duration: 5 * 1000
            })
            const errMsg = res.msg || res.message || res.info || 'Error'
            return Promise.reject(res.code === 403 ? 403 : new Error(errMsg))
        }
    },
    (error) => {
        console.log('err' + error) // for debug
        deleteLoading()
        Message({
            message: error.message.includes('timeout') ? '查询失败，数据查询超时！' : error.message,
            type: 'error',
            duration: 5 * 1000
        })
        return Promise.reject(error)
    }
)
const { get, post } = service
// export { get, post }
export default {
    get, post,
    requestData: service
}
