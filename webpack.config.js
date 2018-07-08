const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

module.exports = {
  mode: isDev ? 'development' : 'production',
  entry: [
    '@babel/polyfill', // enables async-await 
    './client/index.js'
    ], 
    
  output: {
    path: path.join(__dirname, '/public'),
    filename: 'bundle.js'
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      }, 
      { 
        test: /node_modules[/\\]react-geocoder[/\\].*\.js/, 
        loader: 'babel', 
        query: {presets:['react','es2015']}
      },  
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192
            }
          }
        ]
      }, 
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      }   
    ]
  }
}