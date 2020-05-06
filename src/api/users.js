import request from '@/utils/request'


export function getUsers(data) {
    return request({
        url: '/users/list',
        method: 'get',
        data
    })
}

export function addUsers(data) {
    return request({
        url: '/users/add',
        method: 'post',
        data
    })
}


export function deleteUser(data) {
    return request({
        url: '/users/delete',
        method: 'get',
        data
    })
}

export function modifyUser(data) {
    return request({
        url: '/users/modify',
        method: 'post',
        data
    })
}