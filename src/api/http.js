import axios from 'axios'
import qs from 'qs'
import Nprogress from 'nprogress'
import { message } from 'antd'
import { BASE_URL } from '../config/index'
import store from '../redux/store'
import { createDeleteUserInfoAction } from '../redux/actions/login'
import 'nprogress/nprogress.css'
const http = axios.create({
  timeout: 4000,
  baseURL: BASE_URL + '/api1'
})

http.interceptors.request.use(config => {
  Nprogress.start()
  const { method, data } = config
  // 请求头中带token 验证身份
  const { token } = store.getState().userInfo
  if (token) config.headers.Authorization = 'atguigu_' + token
  if (method.toLowerCase() === 'post') {
    if (data instanceof Object) {
      config.data = qs.stringify(data)
    }
  }
  return config
})


http.interceptors.response.use(
  response => {
    Nprogress.done()
    return response.data
  },
  error => {
    Nprogress.done()
    // 加入用户的token过期 或者 用户的修改了token 后台返回状态码是401
    if (error.response.status === 401) {
      message.error('身份校验已过期 请重新登录', 1)
      // 修改redux中的值 导致admin页面会render 校验到redux中的token无 就会自动回到login
      store.dispatch(createDeleteUserInfoAction())
    }
    else {
      message.error(error.message, 1) // 设置时间为一秒
    }
    // 中断promise链 component就只要await接受正确的结果 错误的结果在这里全部处理
    return Promise.reject(() => { })

  })

export default http