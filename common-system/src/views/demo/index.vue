<template>
    <div class="demo-wrapper clearfix">
        <!-- <h2 class="demo__plugin-title">{{currentComponent.url ? '远程插件' : '本地插件'}}</h2> -->
        <div class="demo__btn-group">
            <el-button
                class="demo__config-btn"
                type="primary"
                size="mini"
                round
                @click="setOptions"
            >配置参数</el-button>
            <el-button
                class="demo__config-btn"
                type="primary"
                size="mini"
                round
                @click="updateComp"
            >切换至{{currentComponent.url ? '本地插件' : '远程插件'}}组件</el-button>
        </div>
        <div
            class="demo__view-content"
            v-if="show"
        >
            <async-component
                v-if="currentComponent.url || currentComponent.value"
                ref="async"
                :handleProps="AsyncProps"
                :url="currentComponent.url"
                :comp="currentComponent.value"
            ></async-component>
        </div>
        <!-- 配置参数 -->
        <CompConfig
            title="插件参数配置"
            ref="pluginConfig"
            @saveConfig="handleSaveConfig"
        ></CompConfig>
    </div>
</template>

<script>

import CompConfig from '@/components/CompConfig'
import { cloneObj, pathParse } from '@/utils'
const compName = 'InputTest3'

const modulesFiles = require.context('public/plugin/InputTest3/', true, /index.*\.js$/)
let ayncFile = modulesFiles.keys()[0]
ayncFile = pathParse(ayncFile).base

function getComp(async) {
    let comp = null
    if (!ayncFile && !async) {
        alert('未获取到远程信息,则不能切换到远程')
        return false
    }
    if (async) {
        comp = {
            name: '测试',
            value: require(`@/plugins/${compName}/index.vue`).default,
            options: require(`@/plugins/${compName}/demo.json`),
            configOptions: require(`@/plugins/${compName}/index.json`)
        }
    } else {
        comp = {
            name: '测试',
            value: '',
            url: `plugin/${compName}/${ayncFile}`,
            options: require(`public/plugin/${compName}/demo.json`),
            configOptions: require(`public/plugin/${compName}/index.json`)
        }
    }
    return comp
}

export default {
    name: 'DemoPage',
    components: {
        CompConfig
    },
    data() {
        return {
            show: true,
            currentComponent: {
                name: '',
                value: '',
                url: '',
                // options: {
                //   props: [],
                //   propsResult: [] // 传递给组件的 props 结果
                // },
                configOptions: {
                    props: [],
                    propsResult: [] // 传递给组件的 props 结果
                }
            },
            compOptions: {}
        }
    },
    computed: {
        AsyncProps() {
            return this._childProps(this.currentComponent.configOptions)
        }
    },
    created() {
        window.demo = this
        this.currentComponent = getComp(true)
    },
    mounted() {
        window.t = this
        console.log(this.currentComponent)
    },
    methods: {
        setOptions() {
            const { props: pluginProps, propsResult } = cloneObj(this.currentComponent.configOptions)
            console.log('pluginProps:', pluginProps)
            if (propsResult) {
                this.$refs.pluginConfig.handleUpdateConfig(this.compOptions, pluginProps, propsResult)
            } else {
                this.$refs.pluginConfig.handleChooseComp(this.compOptions, pluginProps)
            }
        },
        handleSaveConfig(item, options) {
            this.$set(this.currentComponent.configOptions, 'propsResult', options)
            this.$refs.pluginConfig.hideDialog()
        },
        _childProps(options) {
            const { props: propsList, propsResult } = options
            let componentProps
            if (propsResult) {
                componentProps = this._getProps(propsResult)
            } else {
                componentProps = this._getProps(propsList)
            }
            return componentProps
        },
        _getProps(propsList = []) {
            const componentProps = []
            propsList.forEach(item => {
                let itemValue = item.value === undefined ? '' : item.value
                if (item.props && item.props.length > 0) {
                    itemValue = this._getProps(item)
                }
                const propsItem = {
                    key: item.key,
                    value: itemValue,
                    asyncPage: item.asyncPage
                }
                if (item.asyncPage && !this.currentComponent.url) {
                    propsItem.compName = compName
                }
                componentProps.push(propsItem)
            })
            return componentProps
        },
        updateComp() {
            const async = this.currentComponent.url
            this.currentComponent = getComp(async)
        }
    }
}
</script>

<style lang="scss" scoped>
.demo-wrapper {
    position: relative;
    // padding: 50px;
    height: 100vh;
    .demo__plugin-title {
        position: absolute;
        font-size: 20px;
        right: 50px;
        left: 50px;
        top: 10px;
        height: 30px;
        line-height: 30px;
        text-align: center;
    }
    .demo__btn-group {
        position: absolute;
        right: 50px;
        top: 10px;
        z-index: 10;
    }
    .demo__view-content {
        width: 100%;
        height: 100%;
        border: 1px solid #38f;
    }
}
</style>
