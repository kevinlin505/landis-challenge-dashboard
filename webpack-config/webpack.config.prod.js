const webpack = require('webpack');
const CaseSensitivePathsPlugin = require('case-sensitive-paths-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = function returnWebpackSettings(PATHS) {
  return {
    devtool: false,
    entry: [PATHS.index],
    mode: 'production',
    output: {
      path: PATHS.dist,
      filename: '[name].min.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
        },
      }),

      new HtmlWebpackPlugin({
        template: 'src/index.tpl.ejs',
        inject: 'body',
        filename: 'index.html',
      }),

      new CaseSensitivePathsPlugin(),
    ],
  };
};
