"use strict";
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const OptimizeCSSPlugin = require("optimize-css-assets-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const { VueLoaderPlugin } = require("vue-loader");
const path = require("path");

const utils = require("./utils");
// 选择打包方式
const mode = process.env.NODE_ENV;
const devMode = process.env.NODE_ENV === "development";

module.exports = {
  entry: {
    app: path.resolve(__dirname, `../src/index.js`)
  },
  output: {
    publicPath: devMode ? "" : "./",
    path: path.resolve(__dirname, "../dist"),
    filename: devMode ? "[name].js" : `[name]/[name].[chunkhash].js`
  },
  resolve: {
    extensions: [".js", ".vue", ".json"],
    alias: {
      assets: utils.resolve("assets"),
      "@pages": utils.resolve("src/pages"),
      static: utils.resolve("static"),
      "@components": utils.resolve("src/components"),
      "@layout": utils.resolve("src/layout"),
      "@util": utils.resolve("src/util"),
      "@requestPool": utils.resolve("src/requestPool"),
      "@mixin": utils.resolve("src/mixin")
    }
  },

  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: "vue-loader",
          options: {
            postcss: []
          }
        }
      },
      {
        test: /\.js$/,
        loader: 'eslint-loader',
        enforce: "pre",
        include: [path.resolve(__dirname, 'src')], // 指定检查的目录
        options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine 
          formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: ["babel-loader"]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("img/[name].[hash:7].[ext]")
          }
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("media/[name].[hash:7].[ext]")
          }
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        use: {
          loader: "url-loader",
          options: {
            limit: 10000,
            name: utils.assetsPath("fonts/[name].[hash:7].[ext]")
          }
        }
      }
    ]
  },

  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "index.html",
      inject: true,
      title: "加载中"
    }),
    new CleanWebpackPlugin(),
    new VueLoaderPlugin(),
    new CopyWebpackPlugin([
      {
        from: utils.resolve("static/img"),
        to: utils.resolve("dist/static/img"),
        toType: "dir"
      }
    ]),
    new OptimizeCSSPlugin({
      cssProcessorOptions: {
        safe: true,
        map: {
          inline: false
        },
        autoprefixer: {
          remove: false
        } //添加对autoprefixer的配置
      }
    })
  ]
};
