import request from '@/utils/request'


export function getTrades(data) {
    return request({
        url: '/trade/list',
        method: 'get',
        data
    })
}

export function deleteTrade(id) {
    return request({
        url: '/trade/delete',
        method: 'get',
        id
    })
}