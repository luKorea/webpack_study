const path = require('path');
module.exports = {
    mode: 'development',
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'dist'),  // 绝对路径
        filename: '[name].js'
    },
    // 配置处理模块
    module: {
        rules: [
            {test: /\.css$/, loader: ['style-loader', 'css-loader']}
        ]
    },
    plugins: [],
    devServer: {}
};
