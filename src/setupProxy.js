const proxy = require('http-proxy-middleware')
module.exports = function(app){
  // "proxy": "http://localhost:4000"
  app.use(
    proxy('/api1',{
      target:'http://localhost:4000',
      changeOrigin : true, // 改变请求得Host false的话 Host就是localhost:3000 true就是localhost:4000
      pathRewrite: { '^/api1': '' } // 路径重新 让服务端拿到的路径把/api给去了
    }),
    proxy('/api2',{
      target:'https://api.caiyunapp.com/v2.5/IVHKDYg31PKpIdab',
      changeOrigin : true, // 改变请求得Host false的话 Host就是localhost:3000 true就是localhost:4000
      pathRewrite: { '^/api2': '' } // 路径重新 让服务端拿到的路径把/api给去了
    })
  )
}