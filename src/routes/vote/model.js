import modelExtend from 'dva-model-extend'
import { modalModel, tableModel, alertModel } from '../../models/modelExtend'

export default modelExtend(modalModel, tableModel, alertModel, {
  namespace: 'vote',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname, query}) => {
        if (pathname === '/vote') {
          dispatch({type: 'fetchTable', payload: query})
          dispatch({type: 'hideAlert'})
        }
      })
    },
  },
  effects: {
    * fetchTableCurrent ({payload = {}}, {call, put, select}) {},
    * fetchTableUnStart ({payload = {}}, {call, put, select}) {},
    * fetchTablePast ({payload = {}}, {call, put, select}) {},
    * update ({payload}, {call, put, select}) {},
    * delete ({payload}, {call, put}) {}
  },
  state: {},
  reducers: {}
})
