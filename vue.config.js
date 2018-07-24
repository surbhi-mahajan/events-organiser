const { server } = require(
    './server'
)

module.exports = {
  lintOnSave: false,
  devServer: {
    before(app) {
      server(app)
    }
  }
}
