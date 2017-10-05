module.exports = {
  path: 'vote',
  getComponents(nextState, callback){
    require.ensure([], () => {
      callback(null, require('./index'))
    })
  }
}
