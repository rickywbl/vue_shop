import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import UserList from '../components/user/UserList.vue'
import Roles from '../components/roles/roles.vue'
import Rights from '../components/roles/rights.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        component: Welcome
      },
      {
        path: '/users',
        component: UserList
      },
      {
        path: '/roles',
        component: Roles
      },
      {
        path: '/rights',
        component: Rights
      }
    ]
  }

]

const router = new VueRouter({
  routes
})

// to:要访问的页面
// from: 从哪个页面跳转过来
// next: 函数 是否放行 或者强制访问一个路径
router.beforeEach(function (to, from, next) {
  if (to.path === '/login') return next()
  const token = window.sessionStorage.getItem('token')
  if (!token) return next('/login')
  next()
})

export default router
