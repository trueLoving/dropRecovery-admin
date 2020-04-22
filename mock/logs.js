  import Mock from 'mockjs'

const data = Mock.mock({
  'items|120': [{
    'id': '@increment',
    'method|1':['get','post','put','delete'],
    user: Mock.Random.cname(),
    ip:Mock.Random.ip(),
    remarks:Mock.Random.sentence(5,10),
    create_time: '@datetime',
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


