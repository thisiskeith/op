const path = require('path')
const webpack = require('webpack')

module.exports = {
    devtool: 'source-map',
    entry: './src/op.js',
    output: {
        path: path.resolve(__dirname, 'lib'),
        filename: '[name].js'
    },
    plugins: [
        new webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({
            compress: { warnings: false }
        })
    ],
    module: {
        loaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel',
                query: {
                    presets: [
                        ['es2015', { 'modules': false }]
                    ]
                }
            }
        ]
    }
}
