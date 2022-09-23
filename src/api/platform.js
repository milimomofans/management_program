import request from '@/utils/request'

export function getPlatformUser ( parameter ) {
    return request({
        url:'/manager',
        method:'get',
        param:parameter
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
        url:`/manager/${id}`
    })
}

// 修改用户密码
export function changepwd ( { oldPassword, password }) {
    return request({
        url:`/manager/${id}/changepwd`,
        param:{
            oldPassword,
            password
        }
    })
}