<template>
    <base-dialog
        :title="config.title"
        :visible.sync="isShow"
        width="450px"
    >
        <el-form
            class="basicData"
            label-width="110px"
            :model="lookBasicDataFrom"
            :rules="rules"
            :ref="lookBasicDataFrom"
        >
            <el-form-item label="岗位要求编号：">
                <el-input
                    v-model="lookBasicDataFrom.num"
                    :disabled="config.id === 2"
                    placeholder=""
                ></el-input>
            </el-form-item>
            <el-form-item
                prop="typeName"
                label="岗位要求名称："
            >
                <el-input
                    v-model="lookBasicDataFrom.dataName"
                    placeholder=""
                ></el-input>
            </el-form-item>
        </el-form>

        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="warning"
                @click="handleEvent('cancel')"
            >取 消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="handleEvent('save')"
            >保 存</el-button>
        </span>
    </base-dialog>
</template>

<script>
let configLsit = {
    add: {
        id: 1,
        title: "新增"
    },
    edit: {
        id: 2,
        title: "编辑"
    }
};
export default {
    props: {
        lookInfo: {
            type: Boolean
        },
        modelType: {
            type: String
        }
    },
    model: {
        prop: "lookInfo",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.lookInfo;
        this.config = configLsit[this.modelType];
    },
    data() {
        return {
            isShow: false,
            lookBasicDataFrom: {},
            rules: {},
            config: {} //配置信息
        };
    },
    methods: {
        handleEvent() {
            this.isShow = false;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>