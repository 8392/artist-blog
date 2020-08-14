import qs from "qs";
import { get, requestData } from '../../../utils/request2'

export const deleteList = (data) => { //删除服务指南
    return requestData({
        url: '/comsys-portal-web/serviceGuid/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getDetail = (data) => { //根据id获取服务指南
    return requestData({
        url: '/comsys-portal-web/serviceGuid/getServiceGuideById',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getList = (data) => { //服务指南列表
    return requestData({
        url: '/comsys-portal-web/serviceGuid/getServiceGuidePage',
        method: 'POST',
        data
    })
}

export const save = (data) => { //保存服务指南
    return requestData({
        url: '/comsys-portal-web/serviceGuid/save',
        method: 'POST',
        data
    })
}

export const update = (data) => { //修改服务指南
    return requestData({
        url: '/comsys-portal-web/serviceGuid/update',
        method: 'POST',
        data
    })
}