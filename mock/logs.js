import Mock from 'mockjs'

const data = Mock.mock({
  'items|120': [{
    'id': '@increment',
    'method|1': ['get', 'post', 'put', 'delete'],
    user: Mock.Random.cname(),
    ip: Mock.Random.ip(),
    remarks: Mock.Random.sentence(5, 10),
    create_time: '@datetime',
  }]
})

export default [
  {
    url: '/logs/list',
    type: 'get',
    response: config => {

      const { conditions, listQuery } = config.body;

      const { page = 1, limit = 20 } = listQuery;
      const { user, method } = conditions;

      const items = data.items

      let mockList = items.filter(item=>{
        if(user&&item.user!==user)return false
        if(method&&item.method!==method)return false;
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
  }
]


