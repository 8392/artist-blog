import qs from "qs";
import { get, requestData } from '../../../utils/request2'

export const deleteList = (data) => { //删除友情链接
    return requestData({
        url: '/comsys-portal-web/friendshipLink/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getList = (data) => { //友情链接列表
    return requestData({
        url: '/comsys-portal-web/friendshipLink/getFriendshipLinkPage',
        method: 'POST',
        data
    })
}

export const getDetail = (data) => { //根据id获取友情链接
    return requestData({
        url: '/comsys-portal-web/friendshipLink/getFriendshipLinkById',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const save = (data) => { //保存友情链接
    return requestData({
        url: '/comsys-portal-web/friendshipLink/save',
        method: 'POST',
        // data: qs.stringify(data)
        data
    })
}

export const update = (data) => { //修改友情链接
    return requestData({
        url: '/comsys-portal-web/friendshipLink/update',
        method: 'POST',
        data: data
    })
}

export const saveCopyrightInfo = (data) => { //保存版权信息
    return requestData({
        url: '/comsys-portal-web/copyrightInfo/saveCopyrightInfo',
        method: 'POST',
        data
    })
}