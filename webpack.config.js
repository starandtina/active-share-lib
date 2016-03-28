import path from 'path';
import webpack from 'webpack';
import AddModuleExports from 'babel-plugin-add-module-exports';

module.exports = {
  entry: {
    ActiveShareLib: ['./index.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].js`,
    library: 'ActiveShareLib',
    libraryTarget: 'umd'
  },
  externals: {
    "jquery": "jquery",
    "backbone": "backbone",
    "_": "underscore",
  },
  resolve: {
    extensions: ["", ".js"],
    modulesDirectories: ["src", "node_modules"]
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',
      query: {
        presets: ['es2015']
      }
    }]
  },
  plugins: [
    AddModuleExports,
    new webpack.optimize.UglifyJsPlugin()
  ]
};
