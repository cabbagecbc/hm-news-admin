import Vue from 'vue'
import VueRouter from 'vue-router'
// import Index from ('../views/Index.vue')
// 异步组件写法
const Index = () => import('../views/Index.vue')
const Login = () => import('../views/Login.vue')
const List = () => import('../views/List.vue')
const Publish = () => import('../views/Publish.vue')

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Index,
    children: [
      { path: '/', component: List },
      { path: '/publish', component: Publish }
    ]
  },
  {
    path: '/login',
    component: Login
  }
]

const router = new VueRouter({
  routes
})

// 配置之全局的前置导航守卫，避免用户退出后登录信息还在可以直接登录
router.beforeEach((to, from, next) => {
  // 判断to去哪儿
  // 如果是登录 直接next
  // 如果不是，判断是否有token，有token就next，没有就去登录
  const token = localStorage.getItem('token')
  if (to.path === '/login' || token) {
    next()
  } else {
    // router.push('/login')
    next('/login')
  }
})

export default router
