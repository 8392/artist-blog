import qs from "qs";
// import { get, requestData } from '../../../utils/request2'
import { baseURL } from "@/utils/config"

export const download = baseURL + "comsys-cs-user-web/schoolUserManage/download";//下载excel模板

export default function createApi(requestData) {
    const api = {}

    api.getUserListByPage = (data) => { //获取在校用户列表
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/getUserListByPage',
            method: 'POST',
            data
        })
    }

    api.getUserInfo = (data) => { //获取用户详细信息
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/getUserInfo',
            method: 'POST',
            data: qs.stringify(data)
        })
    }

    api.getAllUserPrivilege = (data) => { //获取当前用户下所有权限
        return requestData({
            url: '/comsys-portal-privilege/api/privilege/user/getAllUserPrivilege',
            method: 'GET',
            data
        })
    }

    api.getOrg = (data) => { //获取组织机构树
        return requestData({
            url: '/comsys-cs-user-web/teamManage/getOrg',
            method: 'POST',
            data
        })
    }

    api.getUserByOrgId = (data) => { //根据组织机构Id获取用户
        return requestData({
            url: '/comsys-cs-user-web/teamManage/getUserByOrgId',
            method: 'POST',
            data
        })
    }

    api.addSchoolUser = (data) => { //添加在校用户
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/addSchoolUser',
            method: 'POST',
            data
        })
    }

    api.aliasAndAccountIsOnly = (data) => { //账号和别名是否唯一
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/aliasAndAccountIsOnly',
            method: 'POST',
            data
        })
    }

    api.authorization = (data) => { //授权(账号授权)
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/authorization',
            method: 'POST',
            data
        })
    }

    api.deleteSchoolUser = (data) => { //删除校内用户
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/deleteSchoolUser',
            method: 'POST',
            data: qs.stringify(data)
        })
    }

    api.disable = (data) => { //禁用用户
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/disable',
            method: 'POST',
            data: qs.stringify(data)
        })
    }

    api.enable = (data) => { //启用用户
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/enable',
            method: 'POST',
            data
        })
    }

    api.getExcelNameList = (data) => { //获取所有导入模板名称
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/getExcelNameList',
            method: 'POST',
            data
        })
    }

    api.getFunctionList = (data) => { //获取功能模块
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/getFunctionList',
            method: 'POST',
            data
        })
    }

    api.getRoles = (data) => { //获取所有角色
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/getRoles',
            method: 'POST',
            data
        })
    }

    api.getUserTeam = (data) => { //获取所有用户组
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/getUserTeam',
            method: 'POST',
            data
        })
    }

    api.importSchoolUser = (data) => { //导入校内用户
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/importSchoolUser',
            method: 'POST',
            data
        })
    }

    api.resetPassword = (data) => { //重置密码
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/resetPassword',
            method: 'POST',
            data
        })
    }

    api.updateInitPasswordConfig = (data) => { //设置初始密码
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/updateInitPasswordConfig',
            method: 'POST',
            data
        })
    }

    api.updateSchoolUser = (data) => { //修改在校用户
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/updateSchoolUser',
            method: 'POST',
            data
        })
    }

    api.upload = (data) => { //上传excel模板
        return requestData({
            url: '/comsys-cs-user-web/schoolUserManage/upload',
            method: 'POST',
            data
        })
    }

    api.getPaperTypes = (data) => { //获取证件类型
        return requestData({
            url: '/comsys-cs-user-web/employeeRegister/getPaperTypes',
            method: 'POST',
            data
        })
    }

    return api
}