import { SAVE_USER_INFO, DELETE_USER_INFO} from '../constant'

export const createSaveUserInfoAction = data => {
  const { user, token } = data
  // 在action中存localStorage
  localStorage.setItem('user', JSON.stringify(user) )
  localStorage.setItem('token', token )
  return {
    type: SAVE_USER_INFO,
    data
  }
}
export const createDeleteUserInfoAction = () => {
  localStorage.removeItem('user')
  localStorage.removeItem('token')
  return { type: DELETE_USER_INFO }
}