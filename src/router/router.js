import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/store' //引入状态管理
import NProgress from 'nprogress' //引入进度条组件 cnpm install nprogress --save
import 'nprogress/nprogress.css'
Vue.use(Router)

const getComponent = (name, component) => () => import(`@/views/${name}/${component}.vue`)
const getComponentChild = (component) => () => import(`@/views/layout/components/${component}.vue`)
const getComponentCharts =(component) =>()=>import(`@/views/chart/${component}.vue`)


const myRouter = new Router({
  routes: [

    {
      path: '/',
      component: getComponent('layout', 'Layout'),
      children: [{
          path:'',
          redirect:'/client'
        }, {
          path: '/client',
          component: getComponentChild('Client'),
          // component: getComponentCharts('ShowCacheData'),
          children:[{
            path:'',
            redirect:store.state.path
          },{
            path:'/client/cacheData',
            component: getComponentCharts('ShowCacheData'),
            meta: {
              title: '实时数据'
            },
          },
          {
            path:'/client/allData',
            component: getComponentCharts('ShowAllData'),
            meta: {
              title: '历史数据'
            }
          }
        ],
          meta: {
            title: '客户端性能监控'
          }
        },
        {
          path: '/serve',
          component: getComponentChild('Serve'),
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
