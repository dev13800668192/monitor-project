import Vue from 'vue'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import './plugins/element.js'
import './element-variables.scss'
import './assets/css/public.css'
import VueParticles from 'vue-particles'
import VueClipboard from 'vue-clipboard2'
import { messages } from './assets/js/common'
import echarts from "echarts"

Vue.use(VueParticles)
Vue.use(VueClipboard)
//全局挂载提示框
Vue.prototype.$echarts = echarts;
Vue.prototype.$message = messages
Vue.config.productionTip = false
Vue.config.devtools = true
new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')