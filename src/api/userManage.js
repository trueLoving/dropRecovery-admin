import request from '@/utils/request';


/**
 * 获取数据库里的所有用户
 */
export function getAllUser() {
    return request({
        url: "/user/getAll",
        method: "get"
    })
}



/**
 * 分页获取数据库的用户
 * @param {Integer} page 
 * @param {Integer} limit 
 */
export function getUserByPage(data) {
    return request({
        url: `/user/getUserByPage?page=${data.page}&limit=${data.limit}`,
        method: "get"
    })
}