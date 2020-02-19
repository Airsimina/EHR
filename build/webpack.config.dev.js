'use strict'

const webpack = require('webpack')
const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')

// const HOST = 'localhost'
const HOST = '192.168.0.116'


const PORT = 8098

module.exports = merge(baseConfig, {
    mode: 'development',
    devServer: {
        clientLogLevel: 'warning',
        hot: true,
        contentBase: 'dist',
        compress: true,
        host: HOST,
        port: PORT,
        open: true,
        overlay: {
            warnings: false,
            errors: true
        },
        publicPath: '/',
        proxy: {
            // '/api': {
            //     target: 'http://10.248.22.85:8080',
            //     pathRewrite: {
            //         '^/api': ''
            //     },
            //     changeOrigin: true, // target是域名的话，需要这个参数，
            //     // secure: false,         // 设置支持https协议的代理
            // },

            '/api': {
                target: 'http://hafdev.hxoadev.com', //设置你调用的接口域名和端口号 别忘了加http
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '' //这里理解成用‘/api’代替target里面的地址，后面组件中我们掉接口时直接用api代替 比如我要调用'http://40.00.100.100:3002/user/add'，直接写‘/api/user/add’即可
                }
            }
        }
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                {
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        plugins: [
                            // require('autoprefixer')(),//添加前缀
                            require('postcss-cssnext')(), //添加前缀 转换css未来语法
                            require('cssnano')({
                                preset: 'default'
                            }),
                        ]
                    }
                },
                {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        },]
    },

    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            BUILD_TYPE: JSON.stringify("dev")
        })
    ]
})