const webpack=require('webpack')
const webpackConfig=require('./build/webpack.config')
const webpackDevConfig = require('./build/webpack.config.dev')
//dev和hot用来实现前端的热加载
const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const express=require('express')
const path=require('path')
//新增config和swig插件
const config = require('./build/config')
const swig = require('swig')
//swig一款js模板引擎，是服务端向客户端返回html的一种方式，swig只是众多引擎中的一种；
//这里通过node向页面返回html，而不是直接访问dist中的index.html，所以到这里已经把webpack中的html模板删掉了；
//如果使用webpack使用html插件，在切换生产和开发需要手动修改html的script;

const app=express()
// const compiler = webpack(webpackConfig)//删除了打印的回调函数，加上的话这里会执行两遍打包，不晓得为啥

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', path.resolve(__dirname, './'));

app.get('/home', function(req, res) {
    res.type('text/html');
    res.render('index');
});

if (config.isdev) {
    console.log('server运行在开发环境')
    const compiler = webpack(webpackDevConfig)

    app.use(webpackDevMiddleware(compiler, {
        // public path should be the same with webpack config
        publicPath: 'http://localhost:3000/',
        stats: {
            colors: true
        }
    }))


    app.use(webpackHotMiddleware(compiler))

} else {
    console.log('server运行在生产环境')

    webpack(webpackConfig, function(err, stats) {
        if (err) throw err
        //输出打包信息（这里又可以用了）
        process.stdout.write(stats.toString({
            colors: true,
            modules: false,
            children: false,
            chunks: false,
            chunkModules: false
        }) + '\n\n')
        app.use(express.static(path.resolve(__dirname, './dist')))

    })
}
app.listen(config.port, function() {
    console.log('App  is now running on port 3000!');
})

app.use('/device',require('./service/juejinResources'))

// webpack(webpackConfig,function(err,stats){
//     if(err) throw err
//     //输出打包信息（不用在意这些细节）
//     process.stdout.write(stats.toString({
//         colors: true,
//         modules: false,
//         children: false,
//         chunks: false,
//         chunkModules: false
//     }) + '\n\n')
// })