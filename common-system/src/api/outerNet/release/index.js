import qs from "qs";
import { get, requestData } from '../../../utils/request2'

export const deleteList = (data) => { //删除
    return requestData({
        url: '/comsys-portal-web/messageNotification/delete',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getDetail = (data) => { //根据id获取消息通知
    return requestData({
        url: '/comsys-portal-web/messageNotification/getMessageNotificationById',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getList = (data) => { //消息通知列表
    return requestData({
        url: '/comsys-portal-web/messageNotification/getMessageNotificationPage',
        method: 'POST',
        // data: qs.stringify(data)
        data
    })
}

export const publish = (data) => { //发布
    return requestData({
        url: '/comsys-portal-web/messageNotification/publish',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const save = (data) => { //保存消息通知
    return requestData({
        url: '/comsys-portal-web/messageNotification/save',
        method: 'POST',
        data
    })
}

export const termination = (data) => { //终止
    return requestData({
        url: '/comsys-portal-web/messageNotification/termination',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const update = (data) => { //修改
    return requestData({
        url: '/comsys-portal-web/messageNotification/update',
        method: 'POST',
        data
    })
}