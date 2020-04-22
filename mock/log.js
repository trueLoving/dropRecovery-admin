  
import Mock from 'mockjs'

const data = Mock.mock({
  'items|120': [{
    id: '@id',
    'method|1':'get|post|put|delete',
    user: 'name',
    ip:Mock.Random.ip(),
    remarks:Mock.Random.sentence(10,20)
  }]
})

export default [
  {
    url: '/logs/list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          items: items
        }
      }
    }
  }
]


