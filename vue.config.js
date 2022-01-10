module.exports = {
  configureWebpack: {
    devtool: 'source-map'
  },
  css:{
    sourceMap: true
  },
  publicPath:
    process.env.NODE_ENV === "production" ? "/metronic8/vue/demo1/" : "/",
};
