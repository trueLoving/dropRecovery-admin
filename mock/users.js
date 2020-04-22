  
import Mock from 'mockjs'

const data = Mock.mock({
  'items|70': [{
    id: '@increment',
    username: '@cname',
    phone:['@phone'][0],
    avatar:'@image',
    'email|1':['@email(qq.com)','@email(163.com)']
  }]
})

export default [
  {
    url: '/users/list',
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


