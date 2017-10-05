export default {
  namespace: 'create',
  subscriptions: {
    appSubscriber ({dispatch, history}) {
      return history.listen(({pathname}) => {
        console.log('create')
      })
    }
  },
  state: {},
  reducers: {}
}