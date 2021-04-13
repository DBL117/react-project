import http from './http'
import axios from 'axios'

//请求天气数据 用的代理是api2
export const reqWeather = () => axios.get('/api2/103.901092,30.795854/daily.json')


// 登录请求
export const reqLogin = ( username, password ) => http.post('/login', {username, password} )
// 分类请求
export const reqCategoryList = () => http.get('/manage/category/list')
