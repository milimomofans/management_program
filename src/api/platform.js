import request from '@/utils/request'

export function getPlatformUser ( parameter ) {
    return request({
        url:'/manager',
        method:'get',
        param:parameter
    })
}