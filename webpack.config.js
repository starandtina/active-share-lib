import path from 'path';
import webpack from 'webpack';
import AddModuleExports from 'babel-plugin-add-module-exports';

module.exports = {
  entry: {
    ActiveShareLib: ['./index.js'],
    BackboneBaseView: ['./src/backbone.baseview.js'],
    Reflux: ['./src/reflux.js'],
    'async-render': ['babel-polyfill', './src/async-render.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: `[name].js`,
    library: 'ActiveShareLib',
    libraryTarget: 'umd'
  },
  // `externals` allows you to specify dependencies for your library that are not resolved by webpack, 
  // but become dependencies of the output. This means they are imported from the environment during runtime.
  externals: {
    "jquery": "jquery",
    "backbone": "backbone",
    "underscore": "underscore",
    "html-wrapper": "html-wrapper"
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
        presets: ['es2015', 'stage-0'],
        plugins: ["add-module-exports", "syntax-async-generators"]
      }
    }]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
