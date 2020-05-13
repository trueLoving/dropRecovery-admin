import request from '@/utils/request'


export function getRejects(data) {
    return request({
        url: '/rejects/list',
        method: 'get',
        data
    })
}

export function deleteReject(data) {
    return request({
        url: '/rejects/delete',
        method: 'get',
        data
    })
}

export function modifyReject(data) {
    return request({
        url: '/rejects/modify',
        method: 'post',
        data
    })
}

export function addReject(data) {
    return request({
        url: '/rejects/add',
        method: 'post',
        data
    })
}