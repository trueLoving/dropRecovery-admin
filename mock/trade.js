import Mock from 'mockjs'

const data = Mock.mock({
  'items|49': [{
    'id': '@increment',
    'status|1': ['成功', '进行中', '失败'],
    'total|1': ['1000','2000','3000','4000'],
    'tradeSend': '@cname',
    'tradeReceiver': '@cname',
    'create_time': '@date',
    'remarks': '@sentence(5, 10)',
  }]
})

export default [
  {
    url: '/trade/list',
    type: 'get',
    response: config => {

      const { conditions, listQuery } = config.body;

      const { page = 1, limit = 20 } = listQuery;
      const { status, total } = conditions;

      const items = data.items

      let mockList = items.filter(item => {
        if (status && item.status !== status) return false
        if (total && item.total !== total) return false;
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
  // 删除交易记录
  {
    url: '/trade/delete',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]


