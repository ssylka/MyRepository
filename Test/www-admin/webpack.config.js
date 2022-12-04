const path = require('path');
const { NoEmitOnErrorsPlugin, EnvironmentPlugin } = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');


module.exports = {
  devServer: {
    disableHostCheck: true,
    historyApiFallback: true,
    host: '0.0.0.0',
    overlay: true,
  },
  entry: [
    'babel-polyfill',
    './src',
  ],
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
            js: 'babel-loader',
            sass: [
              {
                loader: 'vue-style-loader',
              },
              {
                loader: 'css-loader',
              },
              {
                loader: 'postcss-loader',
              },
              {
                loader: 'sass-loader',
                options: {
                  indentedSyntax: true,
                },
              },
            ],
          },
        },
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, 'src'),
          require.resolve('bootstrap-vue'),
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.pug$/,
        loader: 'pug-loader',
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
          },
        ],
      },
      {
        test: /\.(?:png|jpg|svg)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
          name: '[path][name].[ext]?[hash]',
        },
      },
    ],
  },
  plugins: [
    new NoEmitOnErrorsPlugin(),
    new EnvironmentPlugin({
      BASE_URL: '/',
    }),
    new HtmlWebpackPlugin({
      hash: true,
      template: './src/index.pug',
    }),
  ],
  resolve: {
    alias: {
      assets: path.resolve(__dirname, 'src/assets'),
      components: path.resolve(__dirname, 'src/components'),
      constants: path.resolve(__dirname, 'src/constants'),
      services: path.resolve(__dirname, 'src/services'),
      store: path.resolve(__dirname, 'src/store'),
      styles: path.resolve(__dirname, 'src/styles'),
      views: path.resolve(__dirname, 'src/views'),
    },
    extensions: [
      '.js',
      '.json',
      '.vue',
    ],
  },
};
