import request from '@/utils/request'

export function getActivities(data) {
    return request({
        url: '/activities/list',
        method: 'get',
        data
    })
}

export function deleteActivity(data) {
    return request({
        url: '/activities/delete',
        method: 'get',
        data
    })
}

export function modifyActivity(data) {
    return request({
        url: '/activities/modify',
        method: 'post',
        data
    })
}

export function addActivity(data) {
    return request({
        url: '/activities/add',
        method: 'post',
        data
    })
}

export function addCoupon(data){
    return request({
        url: '/coupons/add',
        method: 'post',
        data
    })

}

export function deleteCoupon(data){
    return request({
        url: '/coupons/add',
        method: 'get',
        data
    })
}

export function modifyCoupon(data){
    return request({
        url: '/coupons/add',
        method: 'post',
        data
    })

}

