import http from './http'
import axios from 'axios'

//请求天气数据 用的代理是api2
export const reqWeather = () => axios.get('/api2/103.901092,30.795854/daily.json')


// 登录请求
export const reqLogin = ( username, password ) => http.post('/login', {username, password} )



// 获取分类列表请求
export const reqCategoryList = () => http.get('/manage/category/list')
// 添加分类请求
export const reqAddCategory = value => http.post('/manage/category/add', value)
// 更新分类请求
export const reqUpdateCategory = value => http.post('/manage/category/update', value)




// 获取商品分页请求
export const reqProductList = (pageNum, pageSize) => http.get('/manage/product/list', { params: {pageNum, pageSize} })
// 更新商品状态
export const reqUpdateProductStatus = (productId, status) => http.post('/manage/product/updateStatus',{ productId,status })
// 搜索商品请求
export const reqSearchProductList = (pageNum, pageSize, searchType, searchKeyWord) => http.get('/manage/product/search', { params: {pageNum, pageSize, [searchType]: searchKeyWord} })
// 商品详情
export const reqProductDetail = productId => http.get('/manage/product/info', { params: { productId } })
// 新增商品
export const reqProductAdd = productObj => http.post('/manage/product/add', {...productObj})
// 更新商品
export const reqProductUpdate = (productObj) => http.post('/manage/product/update', {...productObj})
// delete图片
export const reqDeleteImg = name => http.post('/manage/img/delete', { name })
