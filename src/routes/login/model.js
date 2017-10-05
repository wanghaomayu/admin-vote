import { login } from '../../services/app'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'login',
  subscriptions: {},
  state: {},
  effects: {
    * login ({payload}, {put, call}) {
      const body = {...payload}
      const data = yield call(login, body)
      const {token, user} = data
      window.localStorage.setItem('userToken', token)
      window.localStorage.setItem('userName', user.name)
      window.localStorage.setItem('mobile', user.mobile)
      window.localStorage.setItem('id', user.id)
      yield put({type: 'app/setUser', payload: user})
      yield put({type: 'app/setInfo', payload: {token: token}})
      yield put(routerRedux.push('/vote'))
    }
  },
  reducers: {}
}
