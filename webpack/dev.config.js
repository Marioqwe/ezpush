const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const JS_RULES = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        'babel-loader',
    ],
};

const RULES = [
    JS_RULES,
];

const PLUGINS = [
    new HtmlWebPackPlugin({
        template: './index.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: JSON.stringify('development'),
        },
    }),
];

module.exports = {
    mode: 'development',
    context: path.join(__dirname, '../'),
    entry: {
        main: [
            './src/index.js',
        ],
    },
    output: {
        path: path.join(__dirname, './dist'),
        filename: 'index_bundle.js'
    },
    devtool: 'inline-source-map',
    module: {
        rules: RULES,
    },
    resolve: {
        alias: {
            common: path.resolve(__dirname, '../src/site/common/'),
            onboarding: path.resolve(__dirname, '../src/site/onboarding'),
        },
        extensions: ['.js'],
        modules: [
            './src',
            './node_modules',
        ],
    },
    plugins: PLUGINS,
    devServer: {
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        inline: true,
        historyApiFallback: true,
        host: '0.0.0.0',
        hot: true,
        port: 3000,
        stats: 'errors-only',
    },
};
