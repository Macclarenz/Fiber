const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
        script: path.resolve(__dirname, './src/js/index.js')
    },
    output: {
        filename: '[name].js',
        path: path.resolve(__dirname, './dist'),
        clean: true,
        assetModuleFilename: 'assets/[name][ext][query]'
    },
    module: {
        rules: [
            {
                test: /\.(sass|scss)$/i,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: {
                            publicPath: './'
                        }
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: true
                        }
                    },
                    'sass-loader'
                ]
            },
            {
                test: /\.(js|jsx)$/i,
                exclude: /node_modules/,
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(jpeg|jpg|png|svg)$/i,
                type: 'asset/resource'
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'style.css'
        }),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: path.resolve(__dirname, './src/index.html')
        })
    ],
    resolve: {
        extensions: ['.jsx', '.js']
    },
    devtool: 'source-map',
    devServer: {
        static: {
            directory: path.resolve(__dirname, './dist')
        },
        port: 3000,
        compress: true,
        hot: true
    }
}
