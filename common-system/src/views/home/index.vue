<template>
    <div class="demo-wrapper">
        <div class="demo__btn-group">
            <el-button
                size="mini"
                type="primary"
                @click="toggleComponent(-1)"
            >上一个组件</el-button>
            <el-button
                size="mini"
                type="primary"
                @click="toggleComponent(1)"
            >下一个组件</el-button>
            <el-button
                size="mini"
                type="primary"
                round
                @click="dialogTableVisible = true"
                class="js-show-plugin"
            >展示plugin</el-button>
            <el-button
                size="mini"
                type="primary"
                round
                class="next-plugin"
                @click="setOptions"
            >配置参数</el-button>
            <el-button
                type="primary"
                size="mini"
                round
                @click="toggleType"
            >切换至{{isOnline ? '本地插件' : '远程插件'}}组件</el-button>
        </div>
        <div
            class="demo__view-content"
            v-if="currentComponent.value || currentComponent.url "
        >
            <AsyncComponenst
                ref="async"
                :handleProps="AsyncProps"
                :url="currentComponent.url"
                :comp="currentComponent.value"
            ></AsyncComponenst>
        </div>

        <el-dialog
            top="50px"
            append-to-body
            :title="currentComponent.name"
            :visible.sync="dialogTableVisible"
            custom-class="plugin-dialog"
        >
            <h2 slot="title">
                第{{id + 1}}个组件/共
                <em class="js-comp-nums">{{componentList.length}}</em>个组件
                <el-button
                    class="js-prev-plugin"
                    @click="toggleComponent(-1)"
                >上一个组件</el-button>
                <el-button
                    class="js-next-plugin"
                    @click="toggleComponent(1)"
                >下一个组件</el-button>
                <el-button
                    class="next-plugin"
                    @click="setOptions"
                >配置参数</el-button>
            </h2>
            <div class="comp-warpper js-comp">
                <AsyncComponenst
                    ref="async"
                    :handleProps="AsyncProps"
                    :url="currentComponent.url"
                    :comp="currentComponent.value"
                ></AsyncComponenst>
            </div>
        </el-dialog>

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
import AsyncComponenst from '@/components/AsyncComponenst'
import { cloneObj, pathParse } from '@/utils'

/* 获取当前组件 */
function getLocalCompList() {
    const modulesFiles = require.context('@/plugins/', true, /index.*\.vue|\.json$/)
    const fileList = modulesFiles.keys()
    // console.log('modulesFiles:', modulesFiles)
    const modules = []
    fileList.forEach((modulePath) => {
        if (/\.vue$/.test(modulePath)) {
            const jsonPath = modulePath.replace(/index.vue/, 'demo.json')
            const valuePath = modulePath.replace(/index.vue/, 'index.json')
            if (fileList.includes(jsonPath)) {
                // const name = modulePath.replace(/\.vue/, '')
                const name = pathParse(modulePath).dir.slice(2)
                const value = modulesFiles(modulePath).default
                const options = modulesFiles(jsonPath)
                const configOptions = modulesFiles(valuePath)
                modules.push({
                    name,
                    value,
                    options,
                    configOptions
                })
            }
        }
    })
    console.log("开发环境", modules)
    return modules
}
// 获取线上的组件
function getLineCompList() {
    const modulesFiles = require.context('public', true, /index.*\.js$|\.json/)
    const fileList = modulesFiles.keys()
    // console.log('modulesFiles:', modulesFiles)
    const modules = []
    fileList.forEach((modulePath) => {
        // console.log('modulePath', modulePath)
        if (/\.js$/.test(modulePath)) {
            const jsonPath = modulePath.replace(pathParse(modulePath).base, 'demo.json')
            const valuePath = modulePath.replace(pathParse(modulePath).base, 'index.json')
            if (fileList.includes(jsonPath)) {
                const options = modulesFiles(jsonPath)
                const configOptions = modulesFiles(valuePath)
                modules.push({
                    name: modulePath.replace(/\.vue/, ''),
                    value: {},
                    url: modulePath,
                    options,
                    configOptions
                })
            }
        }
    })
    console.log("测试引入组件", modules)
    return modules
}

export default {
    name: 'HomePage',
    components: {
        CompConfig,
        AsyncComponenst
    },
    data() {
        return {
            id: -1,
            isOnline: false,
            componentList: [],
            currentComponent: {
                name: '',
                value: '',
                options: {
                    props: [],
                    propsResult: ''
                }
            },
            compOptions: {},
            dialogTableVisible: false
        }
    },
    computed: {
        AsyncProps() {
            return this._childProps(this.currentComponent.options)
        }
    },
    created() {
        this.setCompList()
    },
    mounted() {
        window.h = this
    },
    methods: {
        setCompList() {
            this.componentList = this.isOnline ? getLineCompList() : getLocalCompList()
            console.log("componentList", this.componentList)
            this.id = 0
            this.currentComponent = this.componentList[this.id]
        },
        toggleType() {
            this.isOnline = !this.isOnline
            this.setCompList()
        },
        setOptions() {
            const { props: pluginProps, propsResult } = cloneObj(this.currentComponent.options)
            if (propsResult) {
                this.$refs.pluginConfig.handleUpdateConfig(this.compOptions, pluginProps, propsResult)
            } else {
                this.$refs.pluginConfig.handleChooseComp(this.compOptions, pluginProps)
            }
        },
        handleSaveConfig(item, options) {
            this.$set(this.currentComponent.options, 'propsResult', options)
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
                    propsItem.compName = this.currentComponent.name
                }
                componentProps.push(propsItem)
            })
            return componentProps
        },
        toggleComponent(value) {
            const compLength = this.componentList.length
            let id = this.id
            if (value > 0) {
                id = (id === compLength - 1) ? 0 : id + 1
            } else {
                id = id === 0 ? (compLength - 1) : (id - 1)
            }
            this.currentComponent = this.componentList[id]
            this.id = id
        }
    }
}
</script>

<style lang="scss" scoped>
.el-dialog.plugin-dialog {
    width: 1240px;
    // min-height: 600px;
    .el-dialog__body {
        // box-shadow: 0px 0px 0px 20px inset #f60;
        padding: 20px;
    }
    .comp-warpper {
        height: 600px;
        width: 1200px;
        position: relative;
        border: 1px solid #aaa;
        // margin-top: 10px;
    }
}
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
    }
    .demo__view-content {
        width: 100%;
        height: 100%;
        // border: 1px solid #38f;
    }
}
</style>
