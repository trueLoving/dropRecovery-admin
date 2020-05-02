import request from '@/utils/request'

export function getLogs(data) {
    return request({
        url: '/logs/list',
        method: 'get',
        data
    })
}