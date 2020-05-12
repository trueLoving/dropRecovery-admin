import Mock from 'mockjs'

const data = Mock.mock({
    'items|22': [{
        'id': '@increment',
        'receiver': '@cname',
        'create_time': '@datetime',
        'status|1': ['已读', '未读'],
        'content': '@sentence(5, 10)'
    }]
})

export default [
    // 获取通知列表
    {
        url: '/notices/list',
        type: 'get',
        response: config => {

            const { conditions, listQuery } = config.body;

            const { page = 1, limit = 20 } = listQuery;
            const { status, receiver } = conditions;

            const items = data.items

            let mockList = items.filter(item => {
                if (status && item.status !== status) return false
                if (receiver && item.receiver !== receiver) return false;
                return true;
            })

            const pageList = mockList.filter((item, index) => index < limit * page && index >= limit * (page - 1))

            return {
                code: 20000,
                data: {
                    total: mockList.length,
                    items: pageList
                }
            }

        }
    },
    // 添加通知
    {
        url: '/notices/add',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
    // 删除通知
    {
        url: '/notices/delete',
        type: 'get',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
    // 修改通知信息
    {
        url: '/notices/modify',
        type: 'post',
        response: _ => {
            return {
                code: 20000,
                data: 'success'
            }
        }
    },
    // 获取接收者列表
    {
        url: '/notices/receiver/list',
        type: 'get',
        config: _ => {

            const items = data.item;

            let receivers = [];

            items.forEach((item) => {
                receivers.splice(item.receiver);
            })

            return {
                code: 20000,
                data: receivers
            }
        }
    }
]


