import { combineReducers } from 'redux'
import loginReducer from './login.js'
import titleReducer from './title.js'
import productReducer from './product.js'
import categoryReducer from './category.js'
export default combineReducers({
  userInfo: loginReducer,
  title: titleReducer,
  product: productReducer,
  category: categoryReducer
})