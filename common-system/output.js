{
    mode: 'production',
        context: 'D:\\pro\\gitee\\vue-demo-plugin',
            devtool: false,
                node: {
        setImmediate: false,
            process: 'mock',
                dgram: 'empty',
                    fs: 'empty',
                        net: 'empty',
                            tls: 'empty',
                                child_process: 'empty'
    },
    output: {
        path: 'D:\\pro\\gitee\\vue-demo-plugin\\dist',
            filename: 'static/js/[name].[contenthash:8].js',
                publicPath: '/',
                    chunkFilename: 'static/js/[name].[contenthash:8].js'
    },
    resolve: {
        alias: {
            '@': 'D:\\pro\\gitee\\vue-demo-plugin\\src',
                vue$: 'vue/dist/vue.runtime.esm.js',
                    dist: 'D:\\pro\\gitee\\vue-demo-plugin\\dist',
                        'public': 'D:\\pro\\gitee\\vue-demo-plugin\\public',
                            config: 'D:\\pro\\gitee\\vue-demo-plugin\\src\\config\\config.js'
        },
        extensions: [
            '.mjs',
            '.js',
            '.jsx',
            '.vue',
            '.json',
            '.wasm'
        ],
            modules: [
                'node_modules',
                'D:\\pro\\gitee\\vue-demo-plugin\\node_modules',
                'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\@vue\\cli-service\\node_modules'
            ],
                plugins: [
                    {
                        apply: function nothing() {
                            // ¯\_(ツ)_/¯
                        },
                        makePlugin: function () { /* omitted long function */ },
                        moduleLoader: function () { /* omitted long function */ },
                        topLevelLoader: {
                            apply: function nothing() {
                                // ¯\_(ツ)_/¯
                            }
                        },
                        bind: function () { /* omitted long function */ },
                        tsLoaderOptions: function () { /* omitted long function */ },
                        forkTsCheckerOptions: function () { /* omitted long function */ }
                    }
                ]
    },
    resolveLoader: {
        modules: [
            'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\@vue\\cli-plugin-babel\\node_modules',
            'node_modules',
            'D:\\pro\\gitee\\vue-demo-plugin\\node_modules',
            'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\@vue\\cli-service\\node_modules'
        ],
            plugins: [
                {
                    apply: function nothing() {
                        // ¯\_(ツ)_/¯
                    }
                }
            ]
    },
    module: {
        noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
            rules: [
                /* config.module.rule('vue') */
                {
                    test: /\.vue$/,
                    use: [
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\cache-loader\\dist\\cjs.js',
                            options: {
                                cacheDirectory: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\.cache\\vue-loader',
                                cacheIdentifier: 'bd813b88'
                            }
                        },
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\vue-loader\\lib\\index.js',
                            options: {
                                compilerOptions: {
                                    whitespace: 'condense'
                                },
                                cacheDirectory: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\.cache\\vue-loader',
                                cacheIdentifier: 'bd813b88'
                            }
                        }
                    ]
                },
                /* config.module.rule('images') */
                {
                    test: /\.(png|jpe?g|gif|webp)(\?.*)?$/,
                    use: [
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\url-loader\\dist\\cjs.js',
                            options: {
                                limit: 4096,
                                fallback: {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\file-loader\\dist\\cjs.js',
                                    options: {
                                        name: 'static/img/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },
                /* config.module.rule('svg') */
                {
                    test: /\.(svg)(\?.*)?$/,
                    exclude: [
                        'D:\\pro\\gitee\\vue-demo-plugin\\src\\icons'
                    ],
                    use: [
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\file-loader\\dist\\cjs.js',
                            options: {
                                name: 'static/img/[name].[hash:8].[ext]'
                            }
                        }
                    ]
                },
                /* config.module.rule('media') */
                {
                    test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
                    use: [
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\url-loader\\dist\\cjs.js',
                            options: {
                                limit: 4096,
                                fallback: {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\file-loader\\dist\\cjs.js',
                                    options: {
                                        name: 'static/media/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },
                /* config.module.rule('fonts') */
                {
                    test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i,
                    use: [
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\url-loader\\dist\\cjs.js',
                            options: {
                                limit: 4096,
                                fallback: {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\file-loader\\dist\\cjs.js',
                                    options: {
                                        name: 'static/fonts/[name].[hash:8].[ext]'
                                    }
                                }
                            }
                        }
                    ]
                },
                /* config.module.rule('pug') */
                {
                    test: /\.pug$/,
                    oneOf: [
                        /* config.module.rule('pug').rule('pug-vue') */
                        {
                            resourceQuery: /vue/,
                            use: [
                                {
                                    loader: 'pug-plain-loader'
                                }
                            ]
                        },
                        /* config.module.rule('pug').rule('pug-template') */
                        {
                            use: [
                                {
                                    loader: 'raw-loader'
                                },
                                {
                                    loader: 'pug-plain-loader'
                                }
                            ]
                        }
                    ]
                },
                /* config.module.rule('css') */
                {
                    test: /\.css$/,
                    oneOf: [
                        /* config.module.rule('css').rule('vue-modules') */
                        {
                            resourceQuery: /module/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('css').rule('vue') */
                        {
                            resourceQuery: /\?vue/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('css').rule('normal-modules') */
                        {
                            test: /\.module\.\w+$/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('css').rule('normal') */
                        {
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* config.module.rule('postcss') */
                {
                    test: /\.p(ost)?css$/,
                    oneOf: [
                        /* config.module.rule('postcss').rule('vue-modules') */
                        {
                            resourceQuery: /module/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('postcss').rule('vue') */
                        {
                            resourceQuery: /\?vue/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('postcss').rule('normal-modules') */
                        {
                            test: /\.module\.\w+$/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('postcss').rule('normal') */
                        {
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* config.module.rule('scss') */
                {
                    test: /\.scss$/,
                    oneOf: [
                        /* config.module.rule('scss').rule('vue-modules') */
                        {
                            resourceQuery: /module/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('scss').rule('vue') */
                        {
                            resourceQuery: /\?vue/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('scss').rule('normal-modules') */
                        {
                            test: /\.module\.\w+$/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        }
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('scss').rule('normal') */
                        {
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* config.module.rule('sass') */
                {
                    test: /\.sass$/,
                    oneOf: [
                        /* config.module.rule('sass').rule('vue-modules') */
                        {
                            resourceQuery: /module/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        },
                                        sassOptions: {
                                            indentedSyntax: true
                                        }
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('sass').rule('vue') */
                        {
                            resourceQuery: /\?vue/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        },
                                        sassOptions: {
                                            indentedSyntax: true
                                        }
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('sass').rule('normal-modules') */
                        {
                            test: /\.module\.\w+$/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        },
                                        sassOptions: {
                                            indentedSyntax: true
                                        }
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('sass').rule('normal') */
                        {
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\sass-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        implementation: {
                                            render: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            renderSync: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            },
                                            info: 'dart-sass\t1.26.8\t(Sass Compiler)\t[Dart]\ndart2js\t2.8.4\t(Dart Compiler)\t[Dart]',
                                            types: {
                                                Boolean: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Color: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                List: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Map: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Null: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                },
                                                Number: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                String: function () {
                                                    return _call(f, this, Array.prototype.slice.apply(arguments));
                                                },
                                                Error: function Error() { [native code] }
                                            },
                                            NULL: {
                                                toString: function () {
                                                    return _call(f, Array.prototype.slice.apply(arguments));
                                                }
                                            },
                                            TRUE: {
                                                value: true
                                            },
                                            FALSE: {
                                                value: false
                                            },
                                            cli_pkg_main_0_: function () {
                                                return _call(f, Array.prototype.slice.apply(arguments));
                                            }
                                        },
                                        sassOptions: {
                                            indentedSyntax: true
                                        }
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* config.module.rule('less') */
                {
                    test: /\.less$/,
                    oneOf: [
                        /* config.module.rule('less').rule('vue-modules') */
                        {
                            resourceQuery: /module/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\less-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('less').rule('vue') */
                        {
                            resourceQuery: /\?vue/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\less-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('less').rule('normal-modules') */
                        {
                            test: /\.module\.\w+$/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\less-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('less').rule('normal') */
                        {
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\less-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* config.module.rule('stylus') */
                {
                    test: /\.styl(us)?$/,
                    oneOf: [
                        /* config.module.rule('stylus').rule('vue-modules') */
                        {
                            resourceQuery: /module/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'stylus-loader',
                                    options: {
                                        sourceMap: false,
                                        preferPathResolver: 'webpack'
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('stylus').rule('vue') */
                        {
                            resourceQuery: /\?vue/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'stylus-loader',
                                    options: {
                                        sourceMap: false,
                                        preferPathResolver: 'webpack'
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('stylus').rule('normal-modules') */
                        {
                            test: /\.module\.\w+$/,
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2,
                                        modules: {
                                            localIdentName: '[name]_[local]_[hash:base64:5]'
                                        }
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'stylus-loader',
                                    options: {
                                        sourceMap: false,
                                        preferPathResolver: 'webpack'
                                    }
                                }
                            ]
                        },
                        /* config.module.rule('stylus').rule('normal') */
                        {
                            use: [
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\mini-css-extract-plugin\\dist\\loader.js',
                                    options: {
                                        hmr: false,
                                        publicPath: '../../'
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\css-loader\\dist\\cjs.js',
                                    options: {
                                        sourceMap: false,
                                        importLoaders: 2
                                    }
                                },
                                {
                                    loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\postcss-loader\\src\\index.js',
                                    options: {
                                        sourceMap: false,
                                        plugins: [
                                            function () { /* omitted long function */ }
                                        ]
                                    }
                                },
                                {
                                    loader: 'stylus-loader',
                                    options: {
                                        sourceMap: false,
                                        preferPathResolver: 'webpack'
                                    }
                                }
                            ]
                        }
                    ]
                },
                /* config.module.rule('js') */
                {
                    test: /\.m?jsx?$/,
                    exclude: [
                        function () { /* omitted long function */ }
                    ],
                    use: [
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\cache-loader\\dist\\cjs.js',
                            options: {
                                cacheDirectory: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\.cache\\babel-loader',
                                cacheIdentifier: 'd46f48fc'
                            }
                        },
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\thread-loader\\dist\\cjs.js'
                        },
                        {
                            loader: 'D:\\pro\\gitee\\vue-demo-plugin\\node_modules\\babel-loader\\lib\\index.js'
                        }
                    ]
                },
                /* config.module.rule('icons') */
                {
                    test: /\.svg$/,
                    include: [
                        'D:\\pro\\gitee\\vue-demo-plugin\\src\\icons'
                    ],
                    use: [
                        {
                            loader: 'svg-sprite-loader',
                            options: {
                                symbolId: 'icon-[name]'
                            }
                        }
                    ]
                }
            ]
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                vendors: {
                    name: 'chunk-vendors',
                        test: /[\\/]node_modules[\\/]/,
                            priority: -10,
                                chunks: 'initial'
                },
                common: {
                    name: 'chunk-common',
                        minChunks: 2,
                            priority: -20,
                                chunks: 'initial',
                                    reuseExistingChunk: true
                }
            }
        },
        minimizer: [
            {
                options: {
                    test: /\.m?js(\?.*)?$/i,
                    chunkFilter: () => true,
                    warningsFilter: () => true,
                    extractComments: false,
                    sourceMap: false,
                    cache: true,
                    cacheKeys: defaultCacheKeys => defaultCacheKeys,
                    parallel: true,
                    include: undefined,
                    exclude: undefined,
                    minify: undefined,
                    terserOptions: {
                        compress: {
                            arrows: false,
                            collapse_vars: false,
                            comparisons: false,
                            computed_props: false,
                            hoist_funs: false,
                            hoist_props: false,
                            hoist_vars: false,
                            inline: false,
                            loops: false,
                            negate_iife: false,
                            properties: false,
                            reduce_funcs: false,
                            reduce_vars: false,
                            switches: false,
                            toplevel: false,
                            typeofs: false,
                            booleans: true,
                            if_return: true,
                            sequences: true,
                            unused: true,
                            conditionals: true,
                            dead_code: true,
                            evaluate: true,
                            warnings: false,
                            drop_console: true,
                            drop_debugger: true,
                            pure_funcs: [
                                'console.log'
                            ]
                        },
                        mangle: {
                            safari10: true
                        }
                    }
                }
            }
        ]
    },
    plugins: [
        /* config.plugin('vue-loader') */
        new VueLoaderPlugin(),
        /* config.plugin('define') */
        new DefinePlugin(
            {
                'process.env': {
                    NODE_ENV: '"production"',
                    VUE_APP_USER: '"YOUFEI"',
                    BASE_URL: '"/"'
                }
            }
        ),
        /* config.plugin('case-sensitive-paths') */
        new CaseSensitivePathsPlugin(),
        /* config.plugin('friendly-errors') */
        new FriendlyErrorsWebpackPlugin(
            {
                additionalTransformers: [
                    function () { /* omitted long function */ }
                ],
                additionalFormatters: [
                    function () { /* omitted long function */ }
                ]
            }
        ),
        /* config.plugin('extract-css') */
        new MiniCssExtractPlugin(
            {
                filename: 'static/css/[name].[contenthash:8].css',
                chunkFilename: 'static/css/[name].[contenthash:8].css'
            }
        ),
        /* config.plugin('optimize-css') */
        new OptimizeCssnanoPlugin(
            {
                sourceMap: false,
                cssnanoOptions: {
                    preset: [
                        'default',
                        {
                            mergeLonghand: false,
                            cssDeclarationSorter: false
                        }
                    ]
                }
            }
        ),
        /* config.plugin('hash-module-ids') */
        new HashedModuleIdsPlugin(
            {
                hashDigest: 'hex'
            }
        ),
        /* config.plugin('named-chunks') */
        new NamedChunksPlugin(
            function () { /* omitted long function */ }
        ),
        /* config.plugin('html') */
        new HtmlWebpackPlugin(
            {
                title: 'correction',
                templateParameters: function () { /* omitted long function */ },
                minify: {
                    removeComments: true,
                    collapseWhitespace: true,
                    removeAttributeQuotes: true,
                    collapseBooleanAttributes: true,
                    removeScriptTypeAttributes: true
                },
                template: 'D:\\pro\\gitee\\vue-demo-plugin\\public\\index.html'
            }
        ),
        /* config.plugin('preload') */
        new PreloadPlugin(
            {
                rel: 'preload',
                include: 'initial',
                fileBlacklist: [
                    /\.map$/,
                    /hot-update\.js$/
                ]
            }
        ),
        /* config.plugin('prefetch') */
        new PreloadPlugin(
            {
                rel: 'prefetch',
                include: 'asyncChunks'
            }
        ),
        /* config.plugin('copy') */
        new CopyPlugin(
            [
                {
                    from: 'D:\\pro\\gitee\\vue-demo-plugin\\public',
                    to: 'D:\\pro\\gitee\\vue-demo-plugin\\dist',
                    toType: 'dir',
                    ignore: [
                        '.DS_Store',
                        {
                            glob: 'index.html',
                            matchBase: false
                        }
                    ]
                }
            ]
        )
    ],
        entry: {
        app: [
            './src/main.js'
        ]
    }
}
