/**
 * Copyright (C) 2020-2021. Drew Gauderman
 *
 * This source code is licensed under the MIT license found in the
 * README.md file in the root directory of this source tree.
 */

// https://nodejs.org/docs/latest/api/path.html
const path = require("path"),

    // https://www.npmjs.com/package/webpack
    webpack = require('webpack'),

    // https://www.npmjs.com/package/terser-webpack-plugin
    TerserPlugin = require('terser-webpack-plugin'),

    // https://www.npmjs.com/package/mini-css-extract-plugin
    MiniCssExtractPlugin = require('mini-css-extract-plugin'),

    // https://www.npmjs.com/package/css-minimizer-webpack-plugin
    CssMinimizerPlugin = require("css-minimizer-webpack-plugin"),

    // https://www.npmjs.com/package/webpack-bundle-analyzer
    BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin,

    // https://www.npmjs.com/package/@pmmmwh/react-refresh-webpack-plugin
    ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin'),

    // https://webpack.js.org/plugins/html-webpack-plugin/
    HtmlWebPackPlugin = require('html-webpack-plugin'),


    // https://www.npmjs.com/package/tsconfig-paths-webpack-plugin
    TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin'),

    Dotenv = require('dotenv-webpack');

const packageFolder = path.resolve(__dirname, 'build')
const isDevelopment = process.env.NODE_ENV !== "production"

module.exports = {
    mode: isDevelopment ? 'development' : 'production',
    devtool: isDevelopment ? 'source-map' : false,

    watchOptions: {
        poll: 1000,
        aggregateTimeout: 1000,
        ignored: ['**/node_modules']
    },

    entry: path.resolve(__dirname, "src", "index.tsx"),

    output: {
        path: packageFolder,
        sourceMapFilename: '[file].map',
        filename: `app/js/[name].min.js`,
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.jsx', '.js', '.scss', '.css'],
        modules: ['node_modules'],
        plugins: [new TsconfigPathsPlugin({
            configFile: './tsconfig.json',
            extensions: ['.tsx', '.ts', '.jsx', '.js']
          })]
    },

    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: [
                            // https://babeljs.io/docs/en/babel-preset-env
                            "@babel/preset-env",
                            // https://babeljs.io/docs/en/babel-preset-typescript
                            "@babel/preset-typescript",
                            // https://babeljs.io/docs/en/babel-preset-react
                            ["@babel/preset-react", { development: isDevelopment }],
                        ],
                        plugins: [isDevelopment && require.resolve('react-refresh/babel')].filter(Boolean),
                    }
                }
            },
            {
                test: /\.s?[ac]ss$/i,
                use: [
                    isDevelopment ? 'style-loader' :
                        {
                            // save the css to external file
                            loader: MiniCssExtractPlugin.loader,
                            options: {
                                esModule: false
                            },
                        },
                    {
                        // becombine other css files into one
                        // https://www.npmjs.com/package/css-loader
                        loader: 'css-loader',
                        options: {
                            esModule: false,
                            importLoaders: 2, // 2 other loaders used first, postcss-loader and sass-loader
                            sourceMap: isDevelopment,
                        }
                    },
                    {
                        // process tailwind stuff
                        // https://webpack.js.org/loaders/postcss-loader/
                        loader: "postcss-loader",
                        options: {
                            sourceMap: isDevelopment,
                            postcssOptions: {
                                plugins: [
                                    require("tailwindcss"),
                                    // add addtional postcss plugins here
                                    // easily find plugins at https://www.postcss.parts/
                                ]
                            }
                        },
                    },
                    {
                        // load sass files into css files
                        loader: 'sass-loader',
                        options: {
                            sourceMap: isDevelopment
                        }
                    },
                ],
            },
            {
                test: /\.html$/i,
                loader: "html-loader",
                options: {
                    esModule: false,
                },
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                loader: 'file-loader',
                options: {
                    name: 'app/img/[name].[ext]',
                    // outputPath: "images",
                    esModule: false,
                },
            },
            {
                test: /\.(ttf|eot|otf|woff)$/,
                loader: 'file-loader',
                options: {
                    name: 'app/fonts/[name].[ext]',
                    esModule: false,
                },
            },
            {
                test: /\.(ico)$/,
                loader: 'file-loader',
                options: {
                    name: '[name].[ext]',
                    esModule: false,
                },
            },
            {
              test: /\.(jpe?g|png|gif|svg)$/i,
              use: [
                "file-loader?hash=sha512&digest=hex&name=img/[contenthash].[ext]",
                "image-webpack-loader?bypassOnDebug&optipng.optimizationLevel=7&gifsicle.interlaced=false",
              ],
            },
        ],
    },

    plugins: [
        new Dotenv(),

        new webpack.ProvidePlugin({
            React: "react",
        }),

        // build html file
        new HtmlWebPackPlugin({
            template: "./src/index.html.ejs",
            // filename: "./index.html"
        }),

        isDevelopment && new ReactRefreshWebpackPlugin(),

        // https://webpack.js.org/plugins/mini-css-extract-plugin/
        // dump css into its own files
        new MiniCssExtractPlugin({
            filename: `app/css/[name].min.css`,
        }),

        // Bundle Analyzer, a visual view of what goes into each JS file.
        // https://www.npmjs.com/package/webpack-bundle-analyzer
        process.env.ANALYZE && new BundleAnalyzerPlugin(),

        new TsconfigPathsPlugin({
            // baseUrl : "src"
        })

    ].filter(Boolean),

    optimization: {
        minimize: !isDevelopment,
        minimizer: [

            // https://webpack.js.org/plugins/terser-webpack-plugin/
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        // We want terser to parse ecma 8 code. However, we don't want it
                        // to apply minification steps that turns valid ecma 5 code
                        // into invalid ecma 5 code. This is why the `compress` and `output`
                        ecma: 8,
                    },
                    compress: {
                        ecma: 5,
                        inline: 2,
                    },
                    mangle: {
                        // Find work around for Safari 10+
                        safari10: true,
                    },
                    output: {
                        ecma: 5,
                        comments: false,
                    }
                },

                // Use multi-process parallel running to improve the build speed
                parallel: true,
                extractComments: false,
            }),

            // https://webpack.js.org/plugins/css-minimizer-webpack-plugin/
            new CssMinimizerPlugin({
                // style do anything to the wordpress style.css file
                exclude: /style\.css$/,

                // Use multi-process parallel running to improve the build speed
                parallel: true,

                minimizerOptions: {
                    preset: ["default", { discardComments: { removeAll: true } }],
                    // plugins: ['autoprefixer'],
                },
            }),
        ]
    },

    // https://webpack.js.org/configuration/dev-server/
    devServer: {
        static: {
            directory: path.resolve(__dirname, 'dist'),
        },
        port: 3333,
        // host: '0.0.0.0',
        compress: true,
        allowedHosts: 'all',
        hot: true,
        // open: true,
        historyApiFallback: true
    },

    performance: {
        hints: false,
        maxEntrypointSize: 512000,
        maxAssetSize: 512000
    }
}
