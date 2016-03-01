var webpack = require('webpack')
var path = require('path')

const penv = process.env.NODE_ENV.trim() + '.js'

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: path.resolve(__dirname + '/src/index'),
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'findpage.min.js',
        publicPath: '/dist/'
    },
    externals: {
        "react": "React",
        "react-dom": "ReactDOM"
    },
    module: {
        loaders: [
            {
                test: /\.js[x]?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src'),
                exclude: path.join(__dirname, 'node_modules')
            }, {
                test: /\.(scss|sass)$/,
                loader: 'style!css!sass'
            }, {
                test: /\.(jpe?g|png|gif|svg)$/i,
                loaders: [
                    'file?name=images/[name].[ext]'
                ]
            }, {
                test: /\.json$/,
                loader: 'json'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx'],
        alias: {
            config: path.join(__dirname, 'src/config', penv)
        }
    },
    node: {
        fs: 'empty'
    },
    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.optimize.UglifyJsPlugin({ minimize: true }),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': '"production"'
        })
    ]
}
