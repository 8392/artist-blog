import qs from "qs";
// import Vue from 'vue'
import { requestData } from "../../../utils/request2";
// import { get, requestData } from '../../../utils/request2'
// let app = new Vue();
// console.log("app", app.$_axios)
// let requestData = app.$_axios;


export const getRolePage = (data) => { //获取角色列表
    return requestData({
        url: '/comsys-cs-user-web/roleManage/getRolePage',
        method: 'POST',
        data
    })
}

export const addRoleMember = (data) => { //新增成员
    return requestData({
        url: '/comsys-cs-user-web/roleManage/addMember',
        method: 'POST',
        calAll: true,  //返回全部数据，code和datas和msg
        data: qs.stringify(data)
    })
}

export const addRole = (data) => { //新增角色
    return requestData({
        url: '/comsys-cs-user-web/roleManage/addRole',
        method: 'POST',
        data
    })
}

export const copy = (data) => { //复制角色
    return requestData({
        url: '/comsys-cs-user-web/roleManage/copy',
        method: 'POST',
        data
    })
}

export const deleteMember = (data) => { //删除成员
    return requestData({
        url: '/comsys-cs-user-web/roleManage/deleteMember',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const deleteRole = (data) => { //删除角色
    return requestData({
        url: '/comsys-cs-user-web/roleManage/deleteRole',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getOrg = (data) => { //获取组织机构树
    return requestData({
        url: '/comsys-cs-user-web/roleManage/getOrg',
        method: 'POST',
        data
    })
}

export const getRoleMember = (data) => { //获取角色成员列表
    const roleId = data.roleId;
    delete data.roleId;
    return requestData({
        url: `/comsys-cs-user-web/roleManage/getRoleMember?roleId=${roleId}`,
        method: 'POST',
        data
    })
}

export const getUserByOrgId = (data) => { //根据组织机构Id获取用户
    return requestData({
        url: '/comsys-cs-user-web/roleManage/getUserByOrgId',
        method: 'POST',
        data
    })
}

export const roleDetails = (data) => { //查看角色详情
    return requestData({
        url: '/comsys-cs-user-web/roleManage/roleDetails',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const updateRole = (data) => { //修改角色
    return requestData({
        url: '/comsys-cs-user-web/roleManage/updateRole',
        method: 'POST',
        data
    })
}