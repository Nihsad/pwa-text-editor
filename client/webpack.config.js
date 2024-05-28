const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
      database: './src/js/database.js',
      editor: './src/js/editor.js',
      header: './src/js/header.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './index.html',
        filename: 'index.html',
        chunks: ['main'],
      }),
      new WebpackPwaManifest({
        name: 'Just Another Text Editor',
        short_name: 'J.A.T.E',
        description: 'A simple text editor for your web browser.',
        background_color: '#ffffff',
        theme_color: '#ffffff',
        fingerprints: false, // Disable hashing for manifest and icons
        inject: true, // Inject manifest link into HTML
        publicPath: './', // Ensure the correct path
        filename: 'manifest.json', // Ensure the filename is just 'manifest.json'
        icons: [
          {
            src: path.resolve(__dirname, 'src/images/logo.png'), // Corrected path
            sizes: [96, 128, 192, 256, 384, 512],
            destination: path.join('assets', 'icons'),
            purpose: 'any maskable', // Specify the purpose of the icons
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
      ],
    },
  };
};
