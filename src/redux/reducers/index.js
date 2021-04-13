import { combineReducers } from 'redux'
import loginReducer from './login.js'
export default combineReducers({
  userInfo: loginReducer
})