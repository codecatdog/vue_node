const config = require('./config')
const path=require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack=require('webpack')
const htmlPlugin=require('html-webpack-plugin')
const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true'
const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

function resolve (dir) {
    return path.join(__dirname, '..', dir)
}

module.exports = {
    mode: 'development',
    entry: {
        main: [path.resolve(__dirname, '../src/main.ts'), hotMiddlewareScript]
    },
    output: {
        path: path.resolve(__dirname, '../dist'),
        publicPath: config.publicPath,
        filename: '[name].js'
    },
    plugins: [
        new VueLoaderPlugin(),
        // new htmlPlugin({
        //     template:'index.html'
        // }),
        //热加载需要使用这个插件才起作用
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            // options: {
            //     loaders: {
            //         'less': ['vue-style-loader', 'css-loader', 'less-loader']
            //     }
            // }
        }, {
            test: /\.js$/,
            loader: 'babel-loader',
            include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
            exclude: /node_modules/
        }, {
            test: /\.tsx?$/,
            exclude: /node_modules/,
            loader: 'ts-loader',
            options: {
                transpileOnly: true
            }
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js',
            '@': resolve('src')
        },
        extensions: ['*', '.js', '.vue', '.json', '.ts']
    },
    devServer: {
        clientLogLevel: 'warning',
        historyApiFallback: {
            rewrites: [
              { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
            ],
        },
        hot: true,
        contentBase: false, // since we use CopyWebpackPlugin.
        compress: true,
        host: HOST || config.dev.host,
        port: PORT || config.dev.port,
        publicPath: config.dev.assetsPublicPath,
        proxy: config.dev.proxyTable,
        quiet: true, // necessary for FriendlyErrorsPlugin
        watchOptions: {
          poll: config.dev.poll,
        }
      },
    
}