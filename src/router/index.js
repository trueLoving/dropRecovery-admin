import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'dashboard',affix: true }
    }]
  },


  {
    path: '/userManage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/userManage/index'),
        name: "userManage",
        meta: {
          title: "用户管理",
          icon: 'user'
        }
      }
    ]
  },

  {
    path: '/dataManage',
    component: Layout,
    children: [
      {
        path: 'index',
        component: () => import('@/views/dataManage/index'),
        name: "dataManage",
        meta: {
          title: "数据管理",
          icon: 'data'
        }
      }
    ]
  },


  {
    path: '/projectManage',
    component: Layout,
    redirect:"/projectManage/activityManage",
    name:"ProjectManage",
    meta: {
      title: "项目管理",
      icon: 'project'
    },
    children: [
      {
        path:"activityManage",
        component:()=>import("@/views/projectManage/activityManage/index.vue"),
        name:"ActivityManage",
        meta: {
          title: "活动管理",
          icon: 'activity'
        },
      },
      { 
        hidden:true,
        path:"activityManage/activityDetail",
        component:()=>import("@/views/projectManage/activityManage/activityDetail.vue"),
        name:"ActivityDetail",
        meta: {
          title: "活动详情",
        }

      },
      {
        path:"noticeManage",
        component:()=>import("@/views/projectManage/noticeManage/index.vue"),
        name:"NoticeManage",
        meta: {
          title: "通知管理",
          icon: 'notice'
        }
      },
      {
        path:"rejectManage",
        component:()=>import("@/views/projectManage/rejectManage/index.vue"),
        name:"RejectManage",
        meta: {
          title: "废品管理",
          icon: 'reject'
        }
      },
      {
        path:"tradeManage",
        component:()=>import("@/views/projectManage/tradeManage/index.vue"),
        name:"TradeManage",
        meta: {
          title: "交易管理",
          icon: 'trade'
        }
      },
    ]
  },

  {
    path: '/systemManage',
    redirect:'/systemManage/systemLogs',
    component: Layout,
    meta: {
      title: "系统管理",
      icon: 'system'
    },
    children: [
      {
        path:"systemLogs",
        component:()=>import("@/views/systemManage/systemLog/index.vue"),
        name:"SystemLogs",
        meta: {
          title: "日志管理",
          icon: 'log'
        }
      },
      {
        path:"systemParams",
        component:()=>import("@/views/systemManage/systemParams/index.vue"),
        name:"SystemParams",
        meta: {
          title: "参数管理",
          icon: 'params'
        }
      },
    ]
  },


  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

export const asyncRoutes = [

];


const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
