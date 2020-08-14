const path = require('path')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const splitCss = false

const configs = ({ entry, outputPath, filename }) => {
    return {
        mode: 'production',
        entry: entry,
        output: {
            path: outputPath,
            filename,
            libraryTarget: 'var',
            library: 'root'
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: 'vue-loader'
                },
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: 'babel-loader',
                            options: {
                                presets: ['@vue/cli-plugin-babel/preset'],
                                plugins: []
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                    use: {
                        loader: 'url-loader',
                        options: {
                            useRelativePath: true,
                            name: '[name]_plu_[hash:8]_.[ext]',
                            outputPath: 'img/',
                            limit: 4096,
                        }
                    }
                },
                /* config.module.rule('svg') */
                {
                    test: /\.(svg)(\?.*)?$/,
                    exclude: [
                        path.resolve(__dirname, '../src/icons/svg')
                    ],
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                symbolId: 'icon-[name]'
                            }
                        }
                    ]
                },
                /* config.module.rule('icons') */
                {
                    test: /\.svg$/,
                    include: [
                        path.resolve(__dirname, '../src/icons/svg')
                    ],
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                symbolId: 'icon-[name]'
                            }
                        }
                    ]
                },
                {
                    test: /\.(eot|ttf|svg)$/,
                    use: {
                        loader: 'file-loader'
                    },
                    exclude: [
                        path.resolve(__dirname, '../src/icons/svg')
                    ]
                },
                {
                    test: /\.scss$/,
                    oneOf: [
                        {
                            resourceQuery: /module/,
                            use: [
                                'vue-style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: {
                                            localIdentName: '[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: { plugins: [require('autoprefixer')] }
                                },
                                'sass-loader'
                            ]
                        },
                        {
                            use: [
                                'vue-style-loader',
                                'css-loader',
                                {
                                    loader: 'postcss-loader',
                                    options: { plugins: [require('autoprefixer')] }
                                },
                                'sass-loader'
                            ]
                        }
                    ]
                },
                {
                    test: /\.css$/,
                    oneOf: [
                        {
                            resourceQuery: /module/,
                            use: [
                                'vue-style-loader',
                                {
                                    loader: 'css-loader',
                                    options: {
                                        modules: {
                                            localIdentName: '[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'postcss-loader',
                                    options: { plugins: [require('autoprefixer')] }
                                }
                            ]
                        },
                        {
                            use: [
                                'vue-style-loader',
                                'css-loader',
                                {
                                    loader: 'postcss-loader',
                                    options: { plugins: [require('autoprefixer')] }
                                }
                            ]
                        }
                    ]
                }
            ]
        },
        plugins: [
            new VueLoaderPlugin()
        ],
        performance: false,
        externals: {
            axios: 'axios',
            'element-ui': 'Element',
            qs: 'Qs',
            vue: 'Vue',
            '@/store': 'store',
            '@/router': 'router',
            '@/utils': 'utils',
            '@/config/static': 'staticConfig'
        },
        resolve: {
            alias: {
                '@': path.resolve(__dirname, '../src'),
                config: path.resolve(__dirname, '../src/config/config.js')
            },
            extensions: [
                '.mjs',
                '.js',
                '.jsx',
                '.vue',
                '.json',
                '.wasm'
            ]
        }
    }
}

if (splitCss) {
    configs.plugins.push(new MiniCssExtractPlugin(
        {
            filename: '[name].[contenthash:8].css',
            chunkFilename: '[name].[contenthash:8].css'
        }
    ))
}
module.exports = configs
