/**
 * Created by Sina Khelil on 8/24/16.
 */
var webpack = require('webpack');
var resolvers = require('./build_helpers/resolvers');
var path = require('path');
var glob = require('glob');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var packageJSON = require('./package.json');

var banner = (
  '/**\n' +
  ' * react-virtual-list-ng v' + packageJSON.version + ' \n' +
  ' */\n'
);

var plugins = [
  new ExtractTextPlugin('[name].css'),
  new webpack.DefinePlugin({
    '__DEV__': JSON.stringify(process.env.NODE_ENV !== 'production')
  }),
  resolvers.resolveHasteDefines,
];

var entry = {};
var mainEntryPoints = ['./src/VirtualList.js'];

if (process.env.COMPRESS) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      },
      output: {comments: false}
    })
  );
  entry['react-virtual-list-ng.min'] = mainEntryPoints;
} else {
  entry['react-virtual-list-ng'] = mainEntryPoints;
}

plugins.push(
  new webpack.BannerPlugin(banner, {raw: true})
);

module.exports = {
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
    ],
  },

  entry: entry,

  output: {
    library: 'VirtualList',
    libraryTarget: 'umd',
    path: 'dist',
    filename: '[name].js',
  },

  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react',
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom',
    },
  },

  node: {
    Buffer: false
  },

  plugins: plugins
};