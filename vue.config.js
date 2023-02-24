module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    view: {
      // 
      entry: 'src/pages/view/main.js',
      filename: 'view',
      title: 'Question Viewer'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/external-question/' : '/',
}
