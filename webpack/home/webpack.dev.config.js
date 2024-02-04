const path = require('path');
const projectRoot = path.resolve(__dirname, '../../');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); // installed via npm
const entries = require("./untils")

const jsRootPath = path.join(projectRoot, 'wwwroot/js/home')

module.exports = {
    mode: "development",
    devtool: 'eval-source-map',
    entry: entries,
    output: {
       publicPath: "/js/",
       path: jsRootPath,
       filename: '[name].js'
    },
    module: {
        rules: [{
            test: /\.(js|jsx)$/,
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
            {
                test: /\.css/,
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
    resolve: {
        extensions: ['.js', '.jsx'] // Add '.jsx' extension for React components
    },
    optimization: {
        runtimeChunk: 'single',
        moduleIds: 'deterministic'
    }
};