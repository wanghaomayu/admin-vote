import { query } from '../services/app'
import { sleep } from '../utils'
import pathToRegexp from 'path-to-regexp'
import { routerRedux } from 'dva/router'

export default {
  namespace: 'app',
  state: {
    user: window.localStorage.getItem('userName') || '{}',
    token: window.localStorage.getItem('userToken') || '',
    nobg: ['/login']
  },
  subscriptions: {
    appSubscriber ({dispatch, history}) {

      return history.listen(({pathname}) => {
        if (pathname === '/') {
          dispatch(routerRedux.push('/login'))
        }
      })
    }
  },
  effects: {},
  reducers: {
    querySuccess (state, {payload: user}) {
      return {
        ...state,
        user
      }
    },
    logout (state) {
      return {
        ...state,
        user: {}

      }
    },
    setInfo (state, {payload: {token}}) {
      return {
        ...state,
        token
      }
    },
    setUser (state, {payload: user}) {
      return {
        ...state,
        user,
      }
    },
    saveQuery (state, {payload}) {
      const query = {
        ...state.query,
        payload,
      }
      return {
        ...state,
        query,
      }
    },
  },
}
