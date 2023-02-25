module.exports = {
  transpileDependencies: [
    'vuetify'
  ],
  pages: {
    index: {
      // 
      entry: 'src/pages/index/main.js',
      filename: 'index.html',
      title: 'External Questions'
    },    
    view: {
      // 
      entry: 'src/pages/view/main.js',
      filename: 'view.html',
      title: 'Question Viewer'
    },
    edit: {
      //
      entry: 'src/pages/edit/main.js',
      filename: 'edit.html',
      title: 'Question Editor'
    }
  },
  publicPath: process.env.NODE_ENV === 'production' ? '/external-question/' : '/',
}
