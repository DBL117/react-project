import { combineReducers } from 'redux'
import loginReducer from './login.js'
import titleReducer from './title.js'
export default combineReducers({
  userInfo: loginReducer,
  title: titleReducer
})