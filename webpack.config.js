const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
//TODO 新版 cleanWebpackPlugin 需要解构
const {CleanWebpackPlugin} = require('clean-webpack-plugin');

const indexWebpackPlugin = new HtmlWebpackPlugin({
    title: '首页',
    template: path.resolve(__dirname, 'src/index.html'),
    filename: 'index.html',
    chunks : ['index'], // 在产生的HTML代码中引入对应的代码块
    hash: true, // 加入查询字符串避免缓存
    minify: {
        removeAttributeQuotes: true,    // 去除文档所有的引号
    }
});
const userWebpackPlugin = new HtmlWebpackPlugin({
    title: '用户也买你',
    template: path.resolve(__dirname, 'src/index.html'),
    filename: 'user.html',
    chunks : ['user'],
    hash: true, // 加入查询字符串避免缓存
    minify: {
        removeAttributeQuotes: true,    // 去除文档所有的引号
    }
});
const cleanWebpackPlugin = new CleanWebpackPlugin();

module.exports = {
    mode: 'development',
    entry: {
        index: path.resolve(__dirname, 'src/js/index.js'),
        user: path.resolve(__dirname, 'src/js/user.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),  // 绝对路径
        filename: '[name].[hash:8].js'
    },
    // 配置处理模块
    module: {
        rules: [
            {test: /\.css$/, loader: ['style-loader', 'css-loader']}
        ]
    },
    plugins: [
        indexWebpackPlugin,
        userWebpackPlugin,
        cleanWebpackPlugin,
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 8080,
        compress: true,  // 启用gzip压缩
    }
};
