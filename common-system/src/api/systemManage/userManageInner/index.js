// import qs from "qs";
// import { get, requestData } from '../../../utils/request2'
import { baseURL } from "@/utils/config"
import qs from "qs";
// import Vue from 'vue'
// import { requestData } from "../../../utils/request2";
import { get, requestData } from '../../../utils/request2'
// let app = new Vue();
// console.log("app", app.$_axios)
// let requestData = app.$_axios;

export const download = baseURL + "comsys-cs-user-web/schoolUserManage/download";//下载excel模板


export const getUserListByPage = (data) => { //获取在校用户列表
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/getUserListByPage',
        method: 'POST',
        data
    })
}

export const getUserInfo = (data) => { //获取用户详细信息
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/getUserInfo',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getAllUserPrivilege = (data) => { //获取当前用户下所有权限
    return requestData({
        url: '/comsys-portal-privilege/api/privilege/user/getAllUserPrivilege',
        method: 'GET',
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

export const getUserByOrgId = (data) => { //根据组织机构Id获取用户
    return requestData({
        url: '/comsys-cs-user-web/teamManage/getUserByOrgId',
        method: 'POST',
        data
    })
}

export const addSchoolUser = (data) => { //添加在校用户
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/addSchoolUser',
        method: 'POST',
        data
    })
}

export const aliasAndAccountIsOnly = (data) => { //账号和别名是否唯一
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/aliasAndAccountIsOnly',
        method: 'POST',
        data
    })
}

export const authorization = (data) => { //授权(账号授权)
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/authorization',
        method: 'POST',
        data
    })
}

export const deleteSchoolUser = (data) => { //删除校内用户
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/deleteSchoolUser',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const disable = (data) => { //禁用用户
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/disable',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const enable = (data) => { //启用用户
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/enable',
        method: 'POST',
        data
    })
}

export const getExcelNameList = (data) => { //获取所有导入模板名称
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/getExcelNameList',
        method: 'POST',
        data
    })
}

export const getFunctionList = (data) => { //获取功能模块
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/getFunctionList',
        method: 'POST',
        data
    })
}

export const getRoles = (data) => { //获取所有角色
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/getRoles',
        method: 'POST',
        data
    })
}

export const getUserTeam = (data) => { //获取所有用户组
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/getUserTeam',
        method: 'POST',
        data
    })
}

export const importSchoolUser = (data) => { //导入校内用户
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/importSchoolUser',
        method: 'POST',
        data
    })
}

export const resetPassword = (data) => { //重置密码
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/resetPassword',
        method: 'POST',
        data
    })
}

export const updateInitPasswordConfig = (data) => { //设置初始密码
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/updateInitPasswordConfig',
        method: 'POST',
        data
    })
}

export const updateSchoolUser = (data) => { //修改在校用户
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/updateSchoolUser',
        method: 'POST',
        data
    })
}

export const upload = (data) => { //上传excel模板
    return requestData({
        url: '/comsys-cs-user-web/schoolUserManage/upload',
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

