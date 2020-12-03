const merge = require('webpack-merge');
const base = require('./webpack.base.conf');
const SWPrecachePlugin = require('sw-precache-webpack-plugin');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const isProd = process.env.NODE_ENV === 'production';
const webpack = require('webpack');
const HtmlWebPlugin = require('html-webpack-plugin');
const path = require('path');

const config = merge(base, {
  entry: {
    app: './src/entry-client.js'
  },
  plugins: [
    // strip dev-only code in Vue source
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
      'process.env.VUE_ENV': '"client"'
    }),
    // extract vendor chunks for better caching
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: function(module) {
        // a module is extracted into the vendor chunk if...
        return (
          // it's inside node_modules
          /node_modules/.test(module.context) &&
          // and not a CSS file (due to extract-text-webpack-plugin limitation)
          !/\.css$/.test(module.request)
        );
      }
    }),
    // extract webpack runtime & manifest to avoid vendor chunk hash changing
    // on every build.
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest'
    }),
    new HtmlWebPlugin({
      title: '哇咔漫画',
      filename: 'index.html',
      template: path.resolve(__dirname, '../index.html')
    }),
    new VueSSRClientPlugin()
  ]
});

if (isProd) {
  config.plugins.push(
    // 生成离线应用依赖js
    new SWPrecachePlugin({
      cacheId: 'vue-hn',
      filename: 'service-worker.js',
      minify: true,
      dontCacheBustUrlsMatching: /./,
      staticFileGlobsIgnorePatterns: [/\.map$/, /\.json$/],
      runtimeCaching: [
        {
          urlPattern: '/',
          handler: 'networkFirst'
        },
        {
          urlPattern: /\/(top|new|show|ask|jobs)/,
          handler: 'networkFirst'
        },
        {
          urlPattern: '/item/:id',
          handler: 'networkFirst'
        },
        {
          urlPattern: '/user/:id',
          handler: 'networkFirst'
        }
      ]
    })
  );
}

module.exports = config;
