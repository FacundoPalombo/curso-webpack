const path = require("path");
module.exports = {
  entry: {
    invie: path.join(__dirname, "src/index.js")
  },
  output: {
    path: path.join(__dirname, "build"),
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
        use: 'css-loader'
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
  }
};
