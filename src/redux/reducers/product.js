import { SAVE_PRODUCT_LIST } from '../constant'
const initState = []

export default function productReducer( preState = initState, action){
  const { type, data } = action
  let newState
  switch (type) {
    case SAVE_PRODUCT_LIST:
      newState = [...data]
      return newState
    default:
      return preState
  }
}
