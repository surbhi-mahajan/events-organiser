const { server } = require(
    './server/app'
)

module.exports = {
  lintOnSave: false,
  outputDir: './server/dist',
  devServer: {
    before(app) {
      server(app)
    }
  }
}
