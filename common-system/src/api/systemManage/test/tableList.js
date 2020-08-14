import { get, requestData } from '../../../utils/request2'
// 示例

export const testTableApi = (params) => {
    return requestData({
        url: `http://rap2.taobao.org:38080/app/mock/25365/api2/vue`,
        method: 'GET',
        params
    })
}

export const testGet = (params) => {
    return requestData({
        url: `http://rap2.taobao.org:38080/app/mock/25365/hotshop`,
        method: 'delete',
        data: {
            name: "重庆"
        }
    })
}



// export const testGet = (data) => get('http://rap2.taobao.org:38080/app/mock/25365/api2/vue', { city: "成都" });
