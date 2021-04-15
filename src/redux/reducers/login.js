import { SAVE_USER_INFO, DELETE_USER_INFO } from '../constant'

let user = JSON.parse(localStorage.getItem('user'))
let token = localStorage.getItem('token')
const initState = {
  user: user || {},
  token: token || '',
  isLogin: user && token ? true : false
}

export default function testReducer(preState = initState, action) {
  const { type, data } = action
  switch (type) {
    case SAVE_USER_INFO:
      return { user:data.user, isLogin: true, token: data.token }
    case DELETE_USER_INFO:
      return { user:'', isLogin: false, tiken: '' }
    default:
      return preState
  }
}