const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
// const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin;
// const WebpackMonitor = require("webpack-monitor");

const plugins = [
  //Wepack dev server hot module replacement
  new webpack.HotModuleReplacementPlugin(),
  // Avoid circular dependecy problems
  new CircularDependencyPlugin({
    exclude: /a\.js|node_modules/,
    failOnError: true,
    cwd: process.cwd()
  })
  // Analize size of bundles
  // new BundleAnalyzerPlugin({ openAnalyzer: false }),
  // new WebpackMonitor({
  //   capture: true, // -> default 'true'
  //   target: "../monitor/myStatsStore.json", // default -> '../monitor/stats.json'
  //   launch: false, // -> default 'false'
  //   port: 3030 // default -> 8081
  // })
];

const createDevConfig = config => ({
  mode: 'development',
  devtool: 'eval-source-map',
  module: {
    rules: [
      {
        test: /\.css|\.s(c|a)ss$/,
        use: [
          {
            loader: 'css-loader',
            options: {
              sourceMap: true
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              ident: 'postcss',
              plugins: loader => [
                require('precss'),
                require('postcss-cssnext'),
                require('postcss-import'),
                require('postcss-mixins')
              ]
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true     
            }
          }
        ]
      }
    ]
  },
  plugins,
  devServer: {
    contentBase: config.OUTPUT_PATH,
    overlay: {
      errors: true
    },
    disableHostCheck: true,
    historyApiFallback: {
      index: '/demo/index.html'
    },
    stats: 'errors-only',
    hot: true,
    host: 'localhost',
    open: true,
    disableHostCheck: true
  }
});

module.exports = createDevConfig;
