export const isDev = process.env.NODE_ENV === 'development'

export const timeout = 30000
export const longTimeout = 500000


let baseURL = "";
if (process.env.NODE_ENV) { //开发环境
    baseURL = "http://192.168.4.211:86/"
} else { //生产环境
    baseURL = "http://192.168.4.211:86/"
}

export default {
    isDev,
    baseURL
}
