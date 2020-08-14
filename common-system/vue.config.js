'use strict'
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'
const port = 8090
function resolve(dir) {
    return path.join(__dirname, dir)
}

const config = {
    publicPath: '/',
    outputDir: 'dist',
    assetsDir: 'static',
    lintOnSave: isDev,
    productionSourceMap: false,
    devServer: {
        sockHost: '192.168.0.31',
        disableHostCheck: true,
        port: port,
        open: true,
        // disableHostCheck: true,
        // historyApiFallback: true,
        overlay: {
            warnings: false,
            errors: true
        },
        proxy: {
            // detail: https://cli.vuejs.org/config/#devserver-proxy
            [process.env.VUE_APP_BASE_API]: {
                // 测试环境/开发环境
                target: 'http://192.168.4.211:86/', // 开发环境
                changeOrigin: true,
                pathRewrite: {
                    ['^' + process.env.VUE_APP_BASE_API]: ''
                }
            }
        }
    },
    configureWebpack: (config) => {
        // provide the app's title in webpack's name field, so that
        // it can be accessed in index.html to inject the correct title.
        const baseConfig = {
            resolve: {
                alias: {
                    '@': resolve('src'),
                    dist: resolve('./dist'),
                    public: resolve('./public'),
                    config: resolve('src/config/index.js')
                }
            }
        }
        if (!isDev) {
            config.optimization.minimizer[0].options.terserOptions.compress.warnings = false
            config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
            config.optimization.minimizer[0].options.terserOptions.compress.drop_debugger = true
            config.optimization.minimizer[0].options.terserOptions.compress.pure_funcs = ['console.log']
        }
        return baseConfig
    },
    css: {
        sourceMap: isDev
    },
    chainWebpack(config) {
        // 向所有 Sass 样式传入共享的全局变量
        // const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
        // types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
        // set svg-sprite-loader
        config.module
            .rule('svg')
            .exclude.add(resolve('src/icons'))
            .end()
        config.module
            .rule('icons')
            .test(/\.svg$/)
            .include.add(resolve('src/icons'))
            .end()
            .use('svg-sprite-loader')
            .loader('svg-sprite-loader')
            .options({
                symbolId: 'icon-[name]'
            })
            .end()

        config
            // https://webpack.js.org/configuration/devtool/#development
            .when(isDev, (config) => config.devtool('cheap-source-map'))
    }
}
module.exports = config
