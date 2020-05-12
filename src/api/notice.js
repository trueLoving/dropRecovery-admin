import request from '@/utils/request'


export function getNotices(data) {
    return request({
        url: '/notices/list',
        method: 'get',
        data
    })
}

export function addNotice(data) {
    return request({
        url: '/notices/add',
        method: 'post',
        data
    })
}

export function deleteNotice(data) {
    return request({
        url: '/notices/delete',
        method: 'get',
        data
    })
}

export function modifyNotice(data) {
    return request({
        url: '/notices/modify',
        method: 'post',
        data
    })
}

export function getReceivers() {
    return request({
        url: '/notices/receiver/list',
        method: 'get'
    })
}