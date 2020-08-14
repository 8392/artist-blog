import qs from "qs";
import { get, requestData } from '../../../utils/request2'
import { baseURL } from "@/utils/config"

export const getUserListByPage = (data) => { //获取校外用户列表
    return requestData({
        url: '/comsys-cs-user-web/outSchoolUserManage/getUserListByPage',
        method: 'POST',
        data
    })
}

export const getDetail = (data) => { //获取在校用户列表
    return requestData({
        url: '/comsys-cs-user-web/outSchoolUserManage/getOutSchoolUserByAccountId',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const deleteOutSchoolUser = (data) => { //删除校外用户
    return requestData({
        url: '/comsys-cs-user-web/outSchoolUserManage/deleteOutSchoolUser',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const disable = (data) => { //禁用用户
    return requestData({
        url: '/comsys-cs-user-web/outSchoolUserManage/disable',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const enable = (data) => { //启用用户
    return requestData({
        url: '/comsys-cs-user-web/outSchoolUserManage/enable',
        method: 'POST',
        data
    })
}

export const exportOutSchoolUser = (data) => { //导出校外用户
    // console.log(data, qs.stringify(data))
    return baseURL + `comsys-cs-user-web/outSchoolUserManage/exportOutSchoolUser?${qs.stringify(data)}`
}

export const getResume = (data) => { //获取简历
    return requestData({
        url: '/comsys-cs-user-web/outSchoolUserManage/getResume',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const updateOutSchoolUser = (data) => { //修改校外用户
    return requestData({
        url: '/comsys-cs-user-web/outSchoolUserManage/updateOutSchoolUser',
        method: 'POST',
        data
    })
}