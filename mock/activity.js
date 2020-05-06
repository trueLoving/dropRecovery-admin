
import Mock from 'mockjs'

const data = Mock.mock({
  'items|12': [{
    id: '@increment',
    'title|1': ['夏日好礼送不停', '冬季乐翻天', '秋日送好礼', '春季新气象'],
    start_time: '@datetime',
    end_time: '@datetime',
    des: '长夏村墟风日清',
    'status|1': ['已上线', '已下线', '筹备中'],
  }]
})

export default [
  // 获取活动列表
  {
    url: '/activities/list',
    type: 'get',
    response: config => {

      const { conditions, listQuery } = config.body;

      const { page = 1, limit = 20 } = listQuery;
      const { username, phone } = conditions;

      const items = data.items

      let mockList = items.filter(item => {
        if (username && item.username !== username) return false
        if (phone && item.phone !== phone) return false;
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
  // 添加活动
  {
    url: '/activities/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除活动
  {
    url: '/activities/delete',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 修改活动信息
  {
    url: '/activities/modify',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]


