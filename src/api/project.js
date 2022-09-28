import request from '@/utils/request'
import qs from 'qs'

export function getProjectList ( parameter ) {
    return request({
        url:'/project',
        method:'get',
        params:parameter
    })
}