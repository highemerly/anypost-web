module.exports = {
  transpileDependencies: [],
  publicPath: process.env.NODE_ENV === 'production' ? '/' : '/',

  chainWebpack: config => {
    config.plugin('html').tap(args => {
      args[0].title = 'AnyPost - Social Media Sharing Tool'
      return args
    })
  },

  devServer: {
    port: 8080,
    open: true
  },

  css: {
    extract: process.env.NODE_ENV === 'production'
  }
}
