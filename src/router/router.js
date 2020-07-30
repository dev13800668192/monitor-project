import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store' //引入状态管理
import NProgress from 'nprogress' //引入进度条组件 cnpm install nprogress --save
import 'nprogress/nprogress.css'
Vue.use(Router)

const getComponent = (name, component) => () => import(`@/views/${name}/${component}.vue`)

const myRouter = new Router({
  routes: [

    {
      path: '/',
      component: getComponent('layout', 'Layout'),
      children: [{
          path: '/client',
          component: getComponent('client', 'client'),
          name: 'client',
          meta: {
            title: '客户端性能监控'
          }
        },
        {
          path: '/serve',
          component: getComponent('serve', 'serve'),
          name: 'serve',
          meta: {
            title: '服务端性能监控'
          }
        }
      ]
    }
  ]
})

myRouter.afterEach(() => {
  NProgress.done() // 结束Progress
})

export default myRouter
