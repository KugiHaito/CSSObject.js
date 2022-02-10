const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')

module.exports = {
    entry: './CSSObject/CSSObject.js',

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    keep_classnames: true,
                    keep_fnames: true
                }
            })
        ]
    },

    module: {
        rules: [{ 
            test: /\.js$/,
            exclude: /node_modules/,
            loader: "babel-loader",
            options: {
              presets: [
                '@babel/preset-env', {
                    plugins: ['@babel/plugin-transform-runtime'],
                },
              ],
            },
        }]
    },

    output: {
        path: path.resolve('./'),
        filename: 'cssobject.js',
        library: 'CSSObject',
    },
}
