import qs from "qs";
import { get, requestData } from '../../../utils/request2'

export const addUserMember = (data) => { //添加用户组成员
    return requestData({
        url: '/comsys-cs-user-web/teamManage/addMember',
        method: 'POST',
        calAll: true,  //返回全部数据，code和datas和msg
        data: qs.stringify(data)
    })
}

export const addTeam = (data) => { //新增用户组
    return requestData({
        url: '/comsys-cs-user-web/teamManage/addTeam',
        method: 'POST',
        data
    })
}

export const deleteMember = (data) => { //删除用户组成员
    return requestData({
        url: '/comsys-cs-user-web/teamManage/deleteMember',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const deleteTeam = (data) => { //删除用户组
    return requestData({
        url: '/comsys-cs-user-web/teamManage/deleteTeam',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getAllTeam = (data) => { //获取所有用户组
    return requestData({
        url: '/comsys-cs-user-web/teamManage/getAllTeam',
        method: 'POST',
        data
    })
}

export const getOrg = (data) => { //获取组织机构树
    return requestData({
        url: '/comsys-cs-user-web/teamManage/getOrg',
        method: 'POST',
        data
    })
}

export const getTeamList = (data) => { //获取用户组树
    return requestData({
        url: '/comsys-cs-user-web/teamManage/getTeamList',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getTeamMember = (data) => { //获取用户组成员
    const teamId = data.teamId;
    delete data.teamId;
    return requestData({
        url: `/comsys-cs-user-web/teamManage/getTeamMember?teamId=${teamId}`,
        method: 'POST',
        data
    })
}

export const getUserByOrgId = (data) => { //根据组织机构Id获取用户
    return requestData({
        url: '/comsys-cs-user-web/teamManage/getUserByOrgId',
        method: 'POST',
        data
    })
}

export const teamDetails = (data) => { //查看用户组详情
    return requestData({
        url: '/comsys-cs-user-web/teamManage/teamDetails',
        method: 'POST',
        data: qs.stringify(data)
    })
}

