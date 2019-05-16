const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Uglify = require('uglifyjs-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let webpackConfig = {
    entry: {
      invie: path.join(__dirname, "src/index.js")
    },
    output: {
      path: path.join(__dirname, "dist"),
      publicPath: path.join(__dirname, "dist/"),
      chunkFilename: "js/[id].[chunkhash].js",
      filename: `js/[name].js`
    },
    devServer: {
      port: 3000
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: {
            loader: "babel-loader",
            options: {
              exclude: /(node_modules)/,
              presets: ["@babel/preset-env", "@babel/preset-react"],
              plugins: [require("@babel/plugin-proposal-object-rest-spread")]
            }
          }
        },
        {
          test: /\.css$/,
          use: [
              {
                  loader: MiniCssExtractPlugin.loader,
                  options: {
                      publicPath: path.join(__dirname, 'dist/')
                  }
              },
              'css-loader'
          ]
        },
        {
          test: /\.(jpg|png|gif|svg)$/,
          use: {
            loader: "url-loader",
            options: {
              limit: 10240000,
              fallback: "file-loader",
              name: "images/[name].[hash].[ext]"
            }
          }
        }
      ]
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "[name].css",
        chunkFilename: "[name].min.[chunkhash].css"
      })
    ],
    optimization:{
        minimizer: [
            new Uglify()
        ]
    }
  };
  

module.exports = (env)=> {
    if(env.NODE_ENV === 'production') {
        webpackConfig.plugins.push(
            new CleanWebpackPlugin({
                dry: true,
                verbose: true,
                cleanStaleWebpackAssets: true,
            })
        )
    }
    return webpackConfig;
};