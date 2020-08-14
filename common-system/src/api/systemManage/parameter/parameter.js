import qs from "qs";
import { changeFormData } from "@/utils/tools"
import { requestData } from '../../../utils/request2'
// 系统管理

export const getResumeParam = (data) => { //简历参数
    return requestData({
        url: '/comsys-portal-sysManage-web/resumeParam/getResumeParam',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const saveResumeParam = (data) => { //保存简历参数
    return requestData({
        url: '/comsys-portal-sysManage-web/resumeParam/saveResumeParam',
        method: 'POST',
        data: changeFormData(data)
    })
}

export const getPwdRuleSetting = (data) => { //获取密码规则设置
    return requestData({
        url: '/comsys-portal-sysManage-web/pwdRuleSetting/getPwdRuleSetting',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const savePwdRuleSetting = (data) => { //保存密码规则设置
    return requestData({
        url: '/comsys-portal-sysManage-web/pwdRuleSetting/savePwdRuleSetting',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const getMailboxConfig = (data) => { //获取邮件设置
    return requestData({
        url: '/comsys-portal-sysManage-web/interfaceConfig/geEmailSetup',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const saveEmailSetup = (data) => { //保存邮件设置
    return requestData({
        url: '/comsys-portal-sysManage-web/interfaceConfig/saveEmailSetup',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const testEmail = (data) => { //测试邮件设置
    return requestData({
        url: `/comsys-portal-sysManage-web/interfaceConfig/testEmail/${data.verificationCode}`,
        method: 'GET',
    })
}


export const getPhoneMsg = (data) => { //获取手机短信设置
    return requestData({
        url: '/comsys-portal-sysManage-web/interfaceConfig/getPhoneMsg',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const savePhoneMsg = (data) => { //保存手机短信设置
    return requestData({
        url: '/comsys-portal-sysManage-web/interfaceConfig/savePhoneMsg',
        method: 'POST',
        data: qs.stringify(data)
    })
}

export const testPhoneMsg = (data) => { //测试手机短信设置
    return requestData({
        url: `/comsys-portal-sysManage-web/interfaceConfig/testPhoneMsg/${data.verificationCode}`,
        method: 'POST',
        data: qs.stringify(data)
    })
}

// export const getPhoneMsg = (data) => { //获取手机短信设置
//     return requestData({
//         url: '/comsys-portal-sysManage-web/interfaceConfig/getPhoneMsg',
//         method: 'POST',
//         data: qs.stringify(data)
//     })
// }