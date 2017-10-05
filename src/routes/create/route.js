module.exports = {
  path: 'create',
  getComponents(nextState, callback){
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
