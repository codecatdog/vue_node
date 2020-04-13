const config = require('./config')
const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const webpack=require('webpack')
const htmlPlugin=require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
// const hotMiddlewareScript = 'webpack-hot-middleware/client?reload=true' 

module.exports = {
    mode: 'production',
    entry: {
        main: [path.resolve(__dirname, '../src/main.js')]
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
        // new webpack.HotModuleReplacementPlugin(),
        //增加dist删除选项
        new CleanWebpackPlugin()
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
            exclude: /node_modules/
        }]
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    }
}