const path = require('path');
const projectRoot = path.resolve(__dirname, '../');

const entries = {
    collaborator: './ClientApp/src/react/admin/collaborator/index'
}

module.exports = {
    mode: "development",
    entry: entries,
    output: {
       publicPath: "/js/",
       path: path.join(projectRoot, 'wwwroot/js/admin'),
       filename: '[name].js'
    },
    devServer: {
        contentBase: './dist',
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    watch: true,
    watchOptions: {
        ignored: '**/node_modules',
        aggregateTimeout: 200,
    },
};