// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path');
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  configureWebpack: {
    resolve: {
      alias: {
        '~': path.resolve(__dirname, 'src'),
        '@': path.resolve(__dirname, 'src'),
      },
    },
    // plugins: [new BundleAnalyzerPlugin()]
  },
  productionSourceMap: false,
});
