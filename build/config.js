const path = require('path')

let isdev = process.env.NODE_ENV == 'development' ? true : false

let config = {
    isdev: isdev,
    publicPath: 'http://localhost:3000/',
    port: '3000',
    dev: {
        assetsSubDirectory: 'static',
        assetsPublicPath: '/',
        proxyTable: {
            '/api': {
                // 测试环境
                target: 'http://test-logideltaiot.vip56.cn',  // 接口域名
                changeOrigin: true,  //是否跨域
                pathRewrite: {
                    '^/api': '/device'   //需要rewrite重写的,
                }
            }

        },
        // Various Dev Server settings
        host: 'localhost', // can be overwritten by process.env.HOST
        port: 1024, // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
        autoOpenBrowser: false,
        errorOverlay: true,
        notifyOnErrors: true,
        poll: false,
    }
}

module.exports = config