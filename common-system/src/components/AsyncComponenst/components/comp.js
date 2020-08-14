import getComponent from '@/utils/async-components'
import themeMixin from '@/utils/themeMixin'
import { isDev } from 'config'
import InMaintained from './InMaintained'
import { pathParse } from '@/utils'
import Axios from 'axios'
import Element from 'element-ui'
import Qs from 'qs'
import store from '@/store'
import router from '@/router'
import * as utils from '@/utils'
import * as config from '@/config/static'

export default function asyncComponent({ LoadingComponent, ErrorComponent, mixins = {} }) {
    return {
        name: 'async-component',
        inheritAttrs: false,
        props: {
            handleProps: {
                // 需要进行数据重组，然后传递给子组件的props
                type: Array,
                default: () => ([])
            },
            url: {
                // 传入一个url, 用于异步请求组件，进行调用
                type: String
            },
            props: {
                // 直接传递给异步组件的props
                type: Object,
                default: () => ({})
            },
            data: {
                // 需要进行数据重组，然后传递给子组件的props
                type: Object,
                default: () => ({
                    props: {},
                    attrs: {}
                })
            },
            comp: {
                // 可以传入一个组件进行使用， 一般在开发模式下进行调试时使用
                type: [Object, String]
            },
            delay: {
                type: [Number, String],
                default: 200
            },
            isMainLayout: {
                // 区分是布局组件，还是普通的组件
                type: Boolean,
                default: false
            }
        },
        data() {
            return {
                asyncNode: LoadingComponent
            }
        },
        computed: {
            __url__() {
                let __url__ = ''
                if (this.url) {
                    const { dir } = pathParse(String(this.url))
                    __url__ = dir
                }
                return __url__
            },
            changeProps() {
                const result = {}
                this.handleProps.forEach(item => {
                    if (item.asyncPage) {
                        // 重组子组件 url (修正子组件url)
                        if (this.__url__) {
                            // 正式环境
                            result[item.key] = `${this.__url__}/${item.value}`
                        } else {
                            // 开发环境
                            result[item.key] = `${item.compName}/${item.value}`
                        }
                    } else {
                        result[item.key] = item.value
                    }
                })
                return result
            },
            childProps() {
                return this.data.props || {}
            },
            childAttrs() {
                return this.data.attrs || {}
            }
        },
        render(h, context) {
            const Node = this.asyncNode
            const { $attrs, $listeners, props, url, childProps, childAttrs, __url__, changeProps } = this
            return <Node {...{ attrs: { ...$attrs, ...childAttrs }, props: { __url__, url, ...childProps, ...props, ...changeProps }, on: $listeners }} ></Node>
        },
        watch: {
            comp: {
                immediate: true,
                handler(comp) {
                    console.log('comp:', comp)
                    if (comp && comp.render) {
                        this.setAsyncNode(comp)
                    }
                }
            },
            url: {
                immediate: true,
                handler(url) {
                    if (this.data._inDisabled) {
                        /* 系统维护中！ */
                        this.asyncNode = InMaintained
                        return
                    }
                    console.log("测试URL", url)
                    if (!url) return
                    if (/\.vue$/.test(url)) {
                        // 开发环境
                        try {
                            const result = require(`@/plugins/${url}`)
                            const AsyncNode = result.default || result
                            this.setAsyncNode(AsyncNode)
                        } catch (err) {
                            console.error(err)
                        }
                        return
                    }
                    this.asyncNode = LoadingComponent
                    getComponent(url).then(res => {
                        // 通过axios请求plugin下的静态资源
                        const Fn = Function
                        // const Element = { Message: this.$message, MessageBox: this.$msgbox }
                        let result = {}
                        try {
                            const asynFn = new Fn(`return function (axios, Element, qs, store, router, utils, staticConfig){${res.data} ;return root}`)()
                            // 引入plugin下js文件，返回root执行函数
                            result = asynFn(Axios, Element, Qs, store, router, utils, config)
                        } catch (error) {
                            console.error(error)
                            this.asyncNode = ErrorComponent
                            return false
                        }
                        const AsyncNode = result.default || result
                        this.setAsyncNode(AsyncNode)
                    }).catch(err => {
                        this.asyncNode = ErrorComponent
                        this.$message.error(err.message + '---url:' + err.config.url)
                    })
                }
            }
        },
        methods: {
            setAsyncNode(AsyncNode) {
                // 设置组件
                this.node = AsyncNode
                let mixin = this.isMainLayout ? [themeMixin, AsyncNode] : [mixins, AsyncNode]
                if (isDev) {
                    // 开发环境下，都支持
                    mixin = [themeMixin, mixins, AsyncNode]
                }
                this.asyncNode = {
                    mixins: mixin,
                    /* 扩展异步组件数据 */
                    props: {
                        /* 扩展按钮权限 */
                        __permission__: {
                            type: [Array, String],
                            default: () => ([])
                        },
                        // 这个是需要在 header 里面动态传递的信息
                        __headers__: {
                            type: Object,
                            default: () => ({})
                        },
                        // 门户实例id
                        __portletInstanceId__: {
                            type: String,
                            default: ''
                        },
                        // 当前插件的目录地址
                        __url__: {
                            type: String,
                            default: ''
                        }
                    }
                }
            }
        },
        errorCaptured(err, vm, info) {
            if (isDev) {
                if (this.isMainLayout) {
                    console.error(`${this.url}布局组件出现了错误`)
                } else {
                    const name = this.data.props.__portletInstanceId__
                    if (!name) {
                        console.log('$el:', this.$el)
                    }
                    console.error(`${name || ''}异步组件出现了错误`)
                }
                console.error(err)
                return false
            }
        }
    }
}
