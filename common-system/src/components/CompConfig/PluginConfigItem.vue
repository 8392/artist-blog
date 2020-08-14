<template>
    <div>
        <template v-if="config.props && config.props.length > 0 ">
            <h2 class="comp-configure__item-title">{{config.label}}：</h2>
            <template v-if="config.hasOwnProperty('switch')">
                <el-switch v-model="config.switch"></el-switch>
            </template>
            <template v-if="!config.hasOwnProperty('switch') || (config.hasOwnProperty('switch') && config.switch)">
                <plugin-config-item
                    class="comp-configure__props-item"
                    v-for="(pItem, pIndex) in config.props"
                    :config="pItem"
                    :parentValue="`${parentValue}.${index}.props`"
                    :index="pIndex"
                    :key="pItem.label"
                ></plugin-config-item>
            </template>
        </template>
        <!--  v-if="!config.hide && !config.props" -->
        <el-form-item
            class="comp-configure__form-item"
            v-if="!config.hide && !config.props"
            :label="config.label"
            :key="config.label"
            :prop="`${parentValue}.${index}.value`"
            :rules="[
                {required: config.required, message: '此配置项不能为空', trigger: 'blur'},
                {validator: myCheck, data: config, trigger: 'blur'},
                ]"
        >
            <el-radio-group
                v-if="config.radio"
                v-model="config.value"
            >
                <el-radio
                    v-for="item in config.radio"
                    :key="item.label"
                    :label="item.value"
                >{{item.label}}</el-radio>
            </el-radio-group>
            <el-checkbox-group
                v-else-if="config.checkbox"
                v-model="config.value"
            >
                <el-checkbox
                    v-for="item in config.checkbox"
                    :key="item.label"
                    :label="item.value"
                >{{item.label}}</el-checkbox>
            </el-checkbox-group>
            <template v-else-if="config.hasOwnProperty('switch')">
                <el-switch v-model="config.value"></el-switch>
            </template>
            <el-input
                v-else
                size="small"
                clearable
                v-model="config.value"
                :placeholder="'请输入' + config.label"
            ></el-input>
            <!-- <span class="comp-configure__bottom-tips">{{config.desc}}</span> -->
            <el-tooltip
                v-if="config.desc"
                class="config-plugin__tips"
                effect="dark"
                :content="config.desc"
                placement="top"
            >
                <i class="el-icon-question"></i>
            </el-tooltip>
        </el-form-item>
    </div>
</template>

<script>
export default {
    name: 'PluginConfigItem',
    props: {
        config: {
            type: Object,
            default: () => ({})
        },
        parentValue: {
            type: String
        },
        index: {
            type: Number
        }
    },
    methods: {
        myCheck(rule, value, callback) {
            const item = rule.data
            if (item.required && !value) {
                callback(new Error('此配置项不能为空'))
                return false
            }
            if (!value) {
                callback()
                return false
            }
            if (item.type && item.type !== 'String' && value) {
                try {
                    const result = JSON.parse(value)
                    const type = Object.prototype.toString.call(result).slice(8, -1)
                    if (type !== item.type) {
                        callback(new Error(`要输入${item.type}格式的字符串才行哦~~`))
                    }
                } catch (error) {
                    callback(new Error(`请输入${item.type}格式的字符串`))
                }
            }
            if (item.regexp) {
                const regExp = new RegExp(item.regexp.pattern)
                if (regExp.test(value)) {
                    callback()
                } else {
                    callback(new Error(item.regexp.message))
                }
            }
            callback()
        }
    }
}
</script>

<style lang="scss">
$wrning-color: #ff0000;
.comp-configure__item-title {
    display: inline-block;
    width: 120px;
    margin-bottom: 20px;
    vertical-align: top;
    text-align: right;
    margin-right: 10px;
    color: #606266;
    font-weight: 700;
}
.comp-configure__bottom-tips {
    margin-left: 15px;
    white-space: nowrap;
    font-size: 14px;
    color: $wrning-color;
}
.comp-configure__form-item {
    text-align: left;
}
.comp-configure__props-item {
    margin-left: 50px;
}
.config-plugin__tips {
    // position: absolute;
    // right: 0;
    cursor: pointer;
    top: 0;
    line-height: 33px;
    height: 100%;
    width: 30px;
    text-align: center;
}
</style>
