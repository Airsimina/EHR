'use strict'

const merge = require('webpack-merge')
const baseConfig = require('./webpack.config.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpack = require('webpack')

module.exports = merge(baseConfig, {
    mode: 'production',
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },
    module: {
        rules: [{
            test: /\.(sa|sc|c)ss$/,
            use: [
                'vue-style-loader',
                'css-loader',
                'sass-loader',
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
                }, {
                    loader: "sass-loader",
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }, ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'main.css'
        }),
        new webpack.DefinePlugin({
            BUILD_TYPE: JSON.stringify("PRO_DEV")
        })
    ]
})