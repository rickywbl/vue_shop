import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import './plugins/element.js'
import './assets/css/global.css'
import './assets/fonts/iconfont.css'
import axios from 'axios'
// 配置接口根地址
axios.defaults.baseURL = 'http://192.168.1.57:8888/api/private/v1/'

// axios请求拦截器
axios.interceptors.request.use(config => {
  config.headers.Authorization = window.sessionStorage.getItem('token')
  console.log(config)
  return config
})
// 挂载上
Vue.prototype.$http = axios

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
