import request from '@/utils/request'

export function getLogs() {
    return request({
        url: '/logs/list',
        method: 'get'
    })
}