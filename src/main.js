import Vue from 'vue'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import '@/styles/index.scss' // global css

import App from './App'
import store from './store'
import router from './router'

import '@/icons' // icon
import '@/permission' // permission control


import * as filters from './filters' // global filters


// use mock 
import { mockXHR } from '../mock'
mockXHR()

// 将自动注册所有组件为全局组件
import dataV from '@jiaminghi/data-view'
Vue.use(dataV)


Vue.use(ElementUI)

Vue.config.productionTip = false

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})




new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
