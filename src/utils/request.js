import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'
import router from '../router'
Vue.prototype.$axios = axios
axios.defaults.baseURL = '/api'
// 请求拦截器
axios.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
})

axios.interceptors.response.use(res => {
  if (res.data.statusCode === 401 && res.data.message === '用户验证失败') {
    // token验证失败
    // 删除信息
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    // 提示登录失败
    Message.error('token失败')
    // 跳转登录页
    router.push('/login')
  }
  return res
})
