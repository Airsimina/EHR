const webpack = require('webpack')
const htmlWebpackPlugins = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const {
    VueLoaderPlugin
} = require('vue-loader')
const path = require('path');
const utils = require('./utils');
const {
    CleanWebpackPlugin
} = require('clean-webpack-plugin');
const {
    addEntry,
    getEntry
} = require('./webpackBuildAll.entry.js')
//  配置
let myHtmlWebpackPlugins = [];
Object.keys(addEntry).map((item, index) => {
    const entryFile = getEntry[index];
    const pageName = getEntry[index];
    myHtmlWebpackPlugins.push(
        new htmlWebpackPlugins({
            template: path.join(__dirname, '../index.html'),
            filename: `${pageName}/${pageName}.html`,
            chunks: [pageName],
            inject: true,
        })
    )
})

module.exports = {
    mode: "production",
    entry: addEntry,
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "[name]/[name].[chunkhash].js",
        chunkFilename: "[name]/[name].[chunkhash].js"
    },
    module: {
        rules: [{
            test: /\.vue$/,
            use: {
                loader: 'vue-loader',
                options: {
                    postcss: []
                }
            }
        }, {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('img/[name].[hash:7].[ext]')
                }
            }
        }, {
            test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('media/[name].[hash:7].[ext]')
                }
            }
        }, {
            test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
            use: {
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
                }
            }
        }, {
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
                }
            ]
        }]
    },
    plugins: [
        new VueLoaderPlugin(),
        new MiniCssExtractPlugin({
            filename: '[name]_[contenthash:8].css'
        }),
        new OptimizeCSSAssetsPlugin({
            assetNameRegExp: /\.css$/g,
            cssProcessor: require('cssnano')
        }),
        new CleanWebpackPlugin(),
        new webpack.DefinePlugin({
            BUILD_TYPE: JSON.stringify("PRO_DEV")
        })
    ].concat(myHtmlWebpackPlugins),
    resolve: {
        extensions: ['.js', '.vue', '.json'],
        alias: {
            'assets': utils.resolve('assets'),
            'pages': utils.resolve('src/pages'),
            'static': utils.resolve('static'),
            '@components': utils.resolve('src/components'),
            '@layout': utils.resolve('src/layout'),
            '@util': utils.resolve('src/util'),
            '@requestPool': utils.resolve('src/requestPool')
        }
    },
}