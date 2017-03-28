'use strict'
const weback = require('webpack');

module.exports = {
    entry: './react/index.js',
    output: {
        path: __dirname,
        filename: 'bundle.js'
    },
    node: {
      fs: 'empty'
    },
    target: 'electron-main',
    context: __dirname,
    devtool: 'source-map',
    module: {
        loaders: [
            {
                test: /jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel-loader',
                query: {
                    presets: ['react', 'es2015']
                }
            }
        ]
    }
}