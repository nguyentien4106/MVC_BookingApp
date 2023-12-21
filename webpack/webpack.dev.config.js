const path = require('path');
const projectRoot = path.resolve(__dirname, '../');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const adminEntries = require("./untils")

const jsRootPath = path.join(projectRoot, 'wwwroot/js/admin')

module.exports = {
    mode: "development",
    devtool: 'inline-source-map',
    entry: adminEntries,
    output: {
       publicPath: "/js/",
       path: jsRootPath,
       filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.js$|jsx/,
            exclude: /node_modules/,
            use: ['babel-loader']
        },
        {
            test: /\.scss$/,
            use: [
                'style-loader',
                'css-loader',
                'less-loader',
            ],
        },
        ]
    },
    watch: true,
    watchOptions: {
        ignored: '**/node_modules',
    },
    plugins: [
        new CleanWebpackPlugin({ cache: false }),
    ],
};