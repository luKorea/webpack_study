// 第三方模块
const path = require('path'),
    webpack = require('webpack'),
    HtmlWebpackPlugin = require('html-webpack-plugin'),
    {
        CleanWebpackPlugin
    } = require('clean-webpack-plugin'),
    ExtractTextPlugin = require('extract-text-webpack-plugin'),
    CopyWebpackPlugin = require('copy-webpack-plugin'),
    UglifyJsPlugin = require('uglifyjs-webpack-plugin');


// 实例变量
let pages = ['index', 'user'];
pages = pages.map(page => {
    return new HtmlWebpackPlugin({
        title: `${page}`,
        template: path.join(__dirname, 'src/index.html'),
        filename: `${page}.html`,
        chunks: [`${page}`, 'vendor'], // 在产生的HTML代码中引入对应的代码块
        hash: true, // 加入查询字符串避免缓存
        minify: {
            removeAttributeQuotes: true
        } // 去除文档所有的引号
    })
});
const cleanWebpackPlugin = new CleanWebpackPlugin(),
    provideWebpackPlugin = new webpack.ProvidePlugin({$: 'jquery'}),
    copyWebpackPlugin = new CopyWebpackPlugin([{
        from: path.join(__dirname, 'docs'),
        to: path.join(__dirname, 'dist', 'docs')
    }]),
    uglifyJsPlugin = new UglifyJsPlugin(),
    cssExtract = new ExtractTextPlugin('css/index.css'),
    lessExtract = new ExtractTextPlugin('css/less.css'),
    cssLoader = {
        test: /\.css$/i,
        loader: cssExtract.extract({
            use: ['css-loader', 'postcss-loader']
        })
    },
    lessLoader = {
        test: /\.less$/i,
        loader: lessExtract.extract({
            use: ['css-loader', 'less-loader', 'postcss-loader']
        })
    },
    javaScriptLoader = {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-env']
            }
        }
    },
    fileLoader = {
        test: /\.(png|jpe?g|git|svg|bmp|eot|woff|ttf|woff2)$/i,
        use: {
            loader: 'url-loader',
            options: {
                outputPath: 'images/',
                limit: 1024
            }
        }
    },
    imageInsertLoader = {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
    };

module.exports = {
    mode: 'development',
    watch: true, // 监听源文件的变化，当修改源文件，就重新编译打包
    watchOptions: {
        ignored: /node_modules/,
        poll: 1000, // 每秒询问的次数
        aggregateTimeout: 500, // 每隔500毫秒重新编译
    },
    entry: {
        index: path.resolve(__dirname, 'src/js/index.js'),
        user: path.resolve(__dirname, 'src/js/user.js'),
        vendor: 'jquery', // 第三方公用模块
    },
    output: {
        path: path.resolve(__dirname, 'dist'), // 绝对路径
        filename: '[name].[hash:8].js'
    },
    // 配置处理模块
    module: {
        rules: [cssLoader, lessLoader,
            fileLoader, imageInsertLoader,
            javaScriptLoader,
        ]
    },
    plugins: [
        cleanWebpackPlugin,
        provideWebpackPlugin,
        copyWebpackPlugin,
        uglifyJsPlugin,
        cssExtract,
        lessExtract,
        ...pages,
    ],
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'),
        host: 'localhost',
        port: 8080,
        compress: true, // 启用gzip压缩
    },
    // 起别名
    resolve: {
        extensions : ['.js', '.vue', '.jsx', '.json'], //引入文件时可以不加扩展名
        alias: {
            '@': 'src'
        }
    }
};
