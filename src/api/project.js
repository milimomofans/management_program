import request from '@/utils/request'
import qs from 'qs'

// 获取项目列表
export function getProjectList ( parameter ) {
    return request({
        url:'/project',
        method:'get',
        params:parameter
    })
}

// 新增项目
export function addProject ( parameter ) {
    return request({
        url:'/project',
        method:'post',
        params:parameter
    })
}

// 更新平台项目
export function updateProject ( id, parameter ) {
    return request({
        url:`/project/${id}`,
        method:'put',
        params:parameter
    })
}

// 启用平台项目
export function enableProject ( id ) {
    return request({
        url: `/project/${id}/enable`,
        method:'put'
    })
}

// 禁用平台项目
export function disableProject ( id ) {
    return request({
        url: `/project/${id}/disable`,
        method: 'put'
    })
}

// 重置平台项目有效期
export function resetEffecttime ( id ) {
    return request({
        url:`/project/${id}/reset/effecttime`,
        method: 'put'
    })
}

// 更改平台项目管理密码
export function changePwd ( id, password ) {
    return request({
        url: `/project/${id}/changepwd`,
        method: 'put',
        data:qs.stringify({
            password:password
        })
    })
}

// 添加微信小程序信息
export function addMiniapp (id, data) {
    return request({
        url:`/project/${id}/wxminiapp`,
        method: 'post',
        data:qs.stringify(data)
    })
}

// 更新平台项目微信小程序信息
export function updateMiniapp ( id, data ) {
    return request({
        url:`/project/${id}/wxminiapp`,
        method    
    })
}