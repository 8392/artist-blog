// import { Message } from "element-ui";
// import { baseURL } from "./config"
// import axios from 'axios'
// axios.defaults.timeout = 5000;
// axios.defaults.baseURL = '';

export function createRequest(axios, Message, headers) {
    const service = axios.create({
        // baseURL: "http://192.168.4.211:86/",
        // baseURL,
        baseURL: process.env.VUE_APP_BASE_API,
        // baseURL: "http://rap2.taobao.org:38080/app/mock/25365/",
        timeout: 30000 // 请求超时
    })



    // 请求拦截器
    service.interceptors.request.use(config => {
        // 请求拦截
        config.headers = { ...config.headers, ...headers }
        if (config.method === "get") {  //get请求和post请求通过用data数据传输
            config.params = config.data || config.params
        }
        return config
    }, error => {
        // 出现异常
        return Promise.reject(error);
    })
    // 响应拦截器
    service.interceptors.response.use(response => {
        const res = response.data;
        if (res.code != 200) {  //code为200时，统一处理，成功的状态
            let content = res.message || res.msg || "Error";
            Message({
                message: content,
                type: "error",
                duration: 2 * 1000
            });
            return Promise.reject(res);
        } else {
            if (response.config.calAll) { //需要返回全部的数据
                return res;
            } else {
                return res.datas;
            }
        }
    }, error => {
        return Promise.reject(error);
    })
    return service
}



/**
 * 封装get方法
 * @param url
 * @param data
 * @param customConfig
 * @returns {Promise}
 */

// export function get(url, params = {}, customConfig = {}) {
//     return new Promise((resolve, reject) => {
//         service.get(url, {
//             params: params
//         })
//             .then(response => {
//                 resolve(response);
//             })
//             .catch(err => {
//                 reject(err)
//             })
//     })
// }


/**
 * 封装post请求
 * @param url
 * @param data
 * @param customConfig
 * @returns {Promise}
 */

// export function post(url, data = {}, customConfig = {}) {
//     return new Promise((resolve, reject) => {
//         service.post(url, data)
//             .then(response => {
//                 resolve(response);
//             }, err => {
//                 reject(err)
//             })
//     })
// }


// export const requestData = service;  //导出公用方法
