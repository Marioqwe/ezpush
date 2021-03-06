const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const webpack = require('webpack');

const CSS_RULE = {
    test: /\.(sa|sc|c)ss$/,
    use: [
        'style-loader',
        'css-loader',
        'sass-loader',
    ],
};

const JS_RULES = {
    test: /\.js$/,
    exclude: /node_modules/,
    use: [
        'babel-loader',
    ],
};

const RULES = [
    JS_RULES,
    CSS_RULE,
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
        filename: 'index_bundle.js',
        publicPath: '/',
    },
    devtool: 'inline-source-map',
    module: {
        rules: RULES,
    },
    resolve: {
        alias: {
            config: path.resolve(__dirname, '../src/config'),
            lib: path.resolve(__dirname, '../src/lib'),
            auth: path.resolve(__dirname, '../src/site/auth'),
            common: path.resolve(__dirname, '../src/site/common'),
            protected: path.resolve(__dirname, '../src/site/protected'),
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
