import qs from "qs";
import { get, requestData } from '@//utils/request2'

export const allPrivilegeData = (data) => { //获取所有权限列表
    return requestData({
        url: '/comsys-portal-privilege/api/privilege/role/allPrivilegeData',
        method: 'GET',
        data
    })
}

// 角色授权
export const rolePrivilegeList = (data) => { //获取角色所有权限列表
    return requestData({
        url: '/comsys-portal-privilege/api/privilege/role/rolePrivilegeList',
        method: 'GET',
        data
    })
}

export const powerRole = (data) => { //角色授权或取消授权

    return requestData({
        url: '/comsys-portal-privilege/api/privilege/role/addOrUpdateRolePrivilege',
        method: 'POST',
        data: qs.stringify(data)
    })
}

// 用户组授权
export const powerTeam = (data) => { //用户组授权或取消授权

    return requestData({
        url: '/comsys-portal-privilege/api/privilege/team/addOrUpdateRolePrivilege',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getTeamPrivilegeList = (data) => { //获取用户组所有权限列表
    return requestData({
        url: '/comsys-portal-privilege/api/privilege/team/getTeamPrivilegeList',
        method: 'GET',
        data
    })
}

// 用户授权
export const powerUser = (data) => { //用户授权或取消授权
    return requestData({
        url: '/comsys-portal-privilege/api/privilege/user/addOrUpdateUserPrivilege',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getUserPrivilegeList = (data) => { //获取用户全部权限列表
    return requestData({
        url: '/comsys-portal-privilege/api/privilege/user/getUserPrivilegeList',
        method: 'GET',
        data
    })
}




export const getEducation = (data) => { //获取学历
    return requestData({
        url: '/comsys-cs-user-web/lookup/getEducation',
        method: 'POST',
        data
    })
}

export const getGraduationSchool = (data) => { //获取毕业学校
    return requestData({
        url: '/comsys-cs-user-web/lookup/getGraduationSchool',
        method: 'POST',
        data
    })
}

export const getNation = (data) => { //获取名族
    return requestData({
        url: '/comsys-cs-user-web/lookup/getNation',
        method: 'POST',
        data
    })
}

export const getPoliticalOrientation = (data) => { //获取政治面貌
    return requestData({
        url: '/comsys-cs-user-web/lookup/getPoliticalOrientation',
        method: 'POST',
        data
    })
}

export const getSpeciality = (data) => { //获取专业方向
    return requestData({
        url: '/comsys-cs-user-web/lookup/getSpeciality',
        method: 'POST',
        data
    })
}

export const getSubject = (data) => { //获取学科
    return requestData({
        url: '/comsys-cs-user-web/lookup/getSubject',
        method: 'POST',
        data
    })
}

export const getSex = (data) => { //获取性别
    return requestData({
        url: '/comsys-cs-user-web/lookup/getSex',
        method: 'POST',
        data
    })
}

export const getPaperTypes = (data) => { //获取证件类型
    return requestData({
        url: '/comsys-cs-user-web/employeeRegister/getPaperTypes',
        method: 'POST',
        data
    })
}
