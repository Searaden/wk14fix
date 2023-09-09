const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'production',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js'
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './dist/index.html', // Path to your HTML template
        filename: 'index.html', // Output HTML file name
        chunks: ['main'], // Include only the 'main' bundle
      }),
      new WebpackPwaManifest({
        name: 'Your App Name',
        short_name: 'App Short Name',
        description: 'App Description',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('src/images/icon.png'), // Path to your app's icon
            sizes: [96, 128, 192, 256, 384, 512], // Icon sizes
          },
        ],
      }),
      new InjectManifest({
        swSrc: './src-sw.js', // Path to your service worker file
      }),
    ],
    module: {
      rules: [
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
