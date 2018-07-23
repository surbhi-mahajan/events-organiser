const { APIs } = require('./server')

module.exports = {
  lintOnSave: false,
  devServer: {
    before(app) {
      APIs(app)
    }
  }
}
