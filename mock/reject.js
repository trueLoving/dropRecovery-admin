const data = {
  items: [
    {
      id: 1,
      name: '洗衣机',
      type: '家用电器',
      recall_price: '1000',
      amount: '1000',
      sold: '1000',
      is_remainder: '已售罄',
      time: '2020-01-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 2,
      name: '二手笔记本电脑',
      type: '计算机设备',
      recall_price: '100',
      amount: '1000',
      sold: '100',
      is_remainder: '未售罄',
      time: '2020-02-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 3,
      name: '冰箱',
      type: '家用电器',
      recall_price: '900',
      amount: '100',
      sold: '100',
      is_remainder: '已售罄',
      time: '2020-03-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 4,
      name: '电风扇',
      type: '家用电器',
      recall_price: '1200',
      amount: '10',
      sold: '10',
      is_remainder: '已售罄',
      time: '2020-04-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 5,
      name: '二手手机',
      type: '家用电器',
      recall_price: '1200',
      amount: '10',
      sold: '10',
      is_remainder: '已售罄',
      time: '2020-04-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 6,
      name: '台灯',
      type: '家用电器',
      recall_price: '1200',
      amount: '10',
      sold: '10',
      is_remainder: '已售罄',
      time: '2020-04-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 7,
      name: '衣物',
      type: '其他',
      recall_price: '1200',
      amount: '10',
      sold: '10',
      is_remainder: '已售罄',
      time: '2020-04-11 11:20:00',
      remark: 'nothing.......'
    },
    {
      id: 8,
      name: '微波炉',
      type: '家用电器',
      recall_price: '1200',
      amount: '100',
      sold: '10',
      is_remainder: '未售罄',
      time: '2020-04-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 9,
      name: '烤箱',
      type: '家用电器',
      recall_price: '1200',
      amount: '20',
      sold: '10',
      is_remainder: '未售罄',
      time: '2010-04-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 10,
      name: '易拉罐',
      type: '可回收',
      recall_price: '1200',
      amount: '10',
      sold: '10',
      is_remainder: '已售罄',
      time: '2020-04-01 11:00:00',
      remark: 'nothing.......'
    },
    {
      id: 11,
      name: '硬盘',
      type: '计算机设备',
      recall_price: '120',
      amount: '10',
      sold: '10',
      is_remainder: '已售罄',
      time: '2020-04-01 11:00:00',
      remark: 'nothing.......'
    }
  ]
}

export default [
  {
    url: '/rejects/list',
    type: 'get',
    response: config => {

      const { conditions, listQuery } = config.body;

      const { page = 1, limit = 20 } = listQuery;
      const { type, is_remainder } = conditions;

      const items = data.items

      let mockList = items.filter(item => {
        if (type && item.type !== type) return false
        if (is_remainder && item.is_remainder !== is_remainder) return false;
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
  // 添加废品
  {
    url: '/rejects/add',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 删除废品
  {
    url: '/rejects/delete',
    type: 'get',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
  // 修改废品信息
  {
    url: '/rejects/modify',
    type: 'post',
    response: _ => {
      return {
        code: 20000,
        data: 'success'
      }
    }
  },
]


