const WebpackPwaManifestPlugin = require('webpack-pwa-manifest')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const ServiceWorkerWebpackPlugin = require('serviceworker-webpack-plugin')
const path = require('path')

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          }
        ]
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|woff)$/,
        use: [
          'file-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html'
    }),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/')
        }
      ]
    }),
    new ServiceWorkerWebpackPlugin({
      entry: path.resolve(__dirname, 'src/scripts/sw.js')
    }),
    new WebpackPwaManifestPlugin({
      filename: 'manifest.json',
      name: 'DAHARin Apps',
      short_name: 'DAHARin',
      description: 'DAHARin Apps is a website for showing restaurant recommendation. Here, you can find restaurant details and add it as your favorite!',
      start_url: '/index.html',
      includeDirectory: 'true',
      display: 'standalone',
      background_color: '#ffffff',
      theme_color: 'black',
      icons: [
        {
          src: path.resolve('src/public/faviconplate.png'),
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any maskable'
        }
      ]
    })
  ]
}
