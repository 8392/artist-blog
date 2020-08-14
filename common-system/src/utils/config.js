let baseURL = "";
if (process.env.NODE_ENV) { //开发环境
    baseURL = "http://192.168.4.211:86/"
} else { //生产环境
    baseURL = "http://192.168.4.211:86/"
}


export { baseURL }