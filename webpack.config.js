const HtmlWebPackPlugin = require("html-webpack-plugin");
const CspHtmlWebpackPlugin = require("csp-html-webpack-plugin");
module.exports = {
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },

            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader'
            },
            {
                test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
                loader: 'url-loader?limit=100000'
            }
        ],
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: "./src/index.html",
            filename: "./index.html"
        }),
        new CspHtmlWebpackPlugin({
            'base-uri': "'self'",
            'object-src': "'none'",
            'script-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"],
            'style-src': ["'unsafe-inline'", "'self'", "'unsafe-eval'"]
        }, {
            enabled: true,
            hashingMethod: 'sha256',
            hashEnabled: {
                'script-src': true,
                'style-src': true
            },
            nonceEnabled: {
                'script-src': true,
                'style-src': true
            }
        })
    ],
    devServer: {
        historyApiFallback: true
    }

};
