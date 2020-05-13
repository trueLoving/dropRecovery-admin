
import Mock from 'mockjs'

const data = Mock.mock({
  'items|12': [{
    id: '@increment',
    'title|1': ['夏日好礼送不停', '冬季乐翻天', '秋日送好礼', '春季新气象'],
    start_time: '@date',
    end_time: '@date',
    des: '长夏村墟风日清',
    'status|1': ['已上线', '已下线', '筹备中'],
    'coupon|5': [{
      id: '@increment',
      'title|1': ['满200减20', '满400减40', '满500减80', '满300减30', '满100减5'],
      'type|1': ['无门槛券', '满减券', '折扣券'],
      start_time: '@date',
      end_time: '@date',
      des: 'nothing .... '
    }]
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
      const { status } = conditions;

      const items = data.items

      let mockList = items.filter(item => {
        if (status && item.status !== status) return false;
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
  },
  // 优惠券修改
  {
    url: '/coupons/modify',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 优惠券添加
  {
    url: '/coupons/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 优惠券删除
  {
    url: '/coupons/delete',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  }
]


