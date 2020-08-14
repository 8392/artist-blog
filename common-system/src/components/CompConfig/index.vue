<template>
    <el-dialog
        custom-class="config-plugin-dialog"
        :title="pageTitle"
        top="5vh"
        :visible.sync="dialogVisible"
        append-to-body
        :close-on-click-modal="false"
    >
        <!-- <el-form :model="pluginForm" size="small" ref="topForm" label-position="right" label-width="120px">
      <template v-for=" (config,index) in pluginForm.configList">
        <plugin-config-item :config.sync="config" parentValue="configList" :index="index" :key="config.label"></plugin-config-item>
      </template>
    </el-form>-->
        <div>
            <p class="configure-title">读取插件所有的配置参数</p>
            <el-form
                ref="pluginConfig"
                :model="pluginForm"
                size="small"
                label-position="right"
                label-width="120px"
                class="comp-configure"
            >
                <template v-for=" (config,index) in pluginForm.propsList">
                    <plugin-config-item
                        v-if="!config.hide"
                        :config.sync="config"
                        parentValue="propsList"
                        :index="index"
                        :key="config.key + config.label"
                    ></plugin-config-item>
                </template>
            </el-form>
        </div>
        <span slot="footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button
                type="primary"
                @click="compConfigClick"
            >确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import PluginConfigItem from './PluginConfigItem'
import { cloneObj } from '@/utils'
export default {
    name: 'comp-config',
    props: {
        title: {
            type: String,
            default: ''
        }
    },
    components: { PluginConfigItem },
    data() {
        return {
            dialogVisible: false,
            currentComp: {},
            pluginForm: {
                configList: [],
                propsList: []
            }
        }
    },
    computed: {
        pageTitle() {
            if (this.title) {
                return this.title
            } else {
                return `【${this.currentComp.title || this.currentComp.portlet_title}】插件配置`
            }
        }
    },
    methods: {
        handleUpdateConfig(item, propList, valList) {
            this.currentComp = item
            this.$nextTick(() => {
                // this.$refs.topForm && this.$refs.topForm.resetFields()
                this.$refs.pluginConfig && this.$refs.pluginConfig.resetFields()
            })
            this.currentComp.portlet_instance_id = item.portlet_instance_id
            this.$nextTick(() => {
                const pluginProps = propList
                // 赋值
                this._updatePropsData(pluginProps, valList)
                this.pluginForm.propsList = pluginProps
                this.dialogVisible = true
            })
        },
        _updatePropsData(pluginProps, valList) {
            pluginProps.forEach(proItem => {
                const resultItem = valList.find(val => val.key === proItem.key) || {}
                if (proItem.props && proItem.props.length > 0 && resultItem.value) {
                    const valueKeys = Object.keys(resultItem.value) || []
                    if (valueKeys.length > 0) {
                        if (proItem.hasOwnProperty('switch')) {
                            proItem.switch = true
                        }
                        const _valList = Object.entries(resultItem.value).map(([key, value]) => ({ key, value }))
                        const _pluginProps = proItem.props

                        this._updatePropsData(_pluginProps, _valList)
                    }
                } else {
                    proItem.value = resultItem.value
                }
            })
        },
        handleChooseComp(item, propList) {
            this.currentComp = item
            this.$nextTick(() => {
                // this.$refs.topForm && this.$refs.topForm.resetFields()
                this.$refs.pluginConfig && this.$refs.pluginConfig.resetFields()
            })
            this.$nextTick(() => {
                this.pluginForm.propsList = propList
                this.dialogVisible = true
            })
        },
        checkPluginItems(callback) {
            this.$refs.pluginConfig.validate((valid) => {
                if (valid) {
                    callback && callback()
                }
            })
        },
        _innerPropsData(propsList) {
            const wrapperValue = {}
            propsList.forEach(item => {
                let { key, value = '', props } = item
                if (props && props.length) {
                    value = this._innerPropsData(props)
                }
                wrapperValue[key] = value
            })
            return wrapperValue
        },
        _setPropsData(componentList) {
            componentList = componentList.map(item => {
                let { key, value = '', props } = item
                if (Array.isArray(props) && props.length > 0) {
                    value = {}
                    if (item.hasOwnProperty('switch')) {
                        if (item.switch) {
                            value = this._innerPropsData(props)
                        } else {
                            value = undefined
                        }
                    } else {
                        value = this._innerPropsData(props)
                    }
                }
                return { key, value }
            }).filter(item => item.value !== undefined)
            return componentList
        },
        compConfigClick() {
            this.checkPluginItems(() => {
                let componentProps = cloneObj(this.pluginForm.propsList)
                componentProps = this._setPropsData(componentProps)
                this.$emit('saveConfig', this.currentComp, componentProps)
            })
        },
        hideDialog() {
            this.dialogVisible = false
        }
    }
}
</script>

<style lang="scss">
.comp-configure__form-item .el-input {
    width: 400px;
}
</style>
<style lang="scss" scoped>
.configure-title {
    margin-top: 30px;
}
.comp-configure {
    margin-top: 30px;
    padding-left: 20px;

    // /deep/ .el-form-item__content {
    //   position: relative;
    //   padding-right: 30px;
    // }
}
</style>
