  
import Mock from 'mockjs'

const data = Mock.mock({
  'items|70': [{
    id: '@increment',
    openId:'@string(36,36)',
    username: '@cname',
    phone:['@phone'][0],
    'email|1':['@email(qq.com)','@email(163.com)']
  }]
})

export default [
  // 获取用户列表
  {
    url: '/users/list',
    type: 'get',
    response: config => {
      
      const { conditions, listQuery } = config.body;

      const { page = 1, limit = 20 } = listQuery;
      const { username, phone } = conditions;

      const items = data.items

      let mockList = items.filter(item=>{
        if(username&&item.username!==username)return false
        if(phone&&item.phone!==phone)return false;
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
  // 添加用户
  {
    url: '/users/add',
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
  },
  // 删除用户
  {
    url: '/users/delete',
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
  },
  // 修改用户信息
  {
    url: '/users/modify',
    type: 'post',
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


