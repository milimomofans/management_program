import request from '@/utils/request'
import qs from 'qs'

export function getPlatformUser ( parameter ) {
    console.log(parameter)
    return request({
        url:'/manager',
        method:'get',
        params:parameter
    })
}

// 启用超级管理员
export function enableUserApi ( id ) {
    return request({
        url:`/manager/${id}/enable`,
        method:'put'
    })
}

// 禁用超级管理员
export function disableUserApi ( id ) {
    return request({
        url:`/manager/${id}/disable`,
        method:'put'
    })
}

// 修改用户昵称
export function editorNickNameApi (id,nickname) {
    return request({
        url:`/manager/${id}`,
        method:'put',
        data:qs.stringify({
            nickname
        })
    })
}

// 修改用户密码
export function changepwd ( { oldPassword, password }, id) {
    return request({
        url:`/manager/${id}/changepwd`,
        method:'put',
        data:qs.stringify({
            oldPassword,
            password
        })
    })
}

// 添加平台管理员
export function addPlatformApi ( param ) {
    return request({
        url:'/manager',
        method:'post',
        data:qs.stringify(param)
    })
}