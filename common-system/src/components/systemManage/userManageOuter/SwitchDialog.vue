<template>
    <base-dialog
        title="启用"
        :visible.sync="isShow"
        width="450px"
    >
        <div>
            <el-form
                :model="switchFrom"
                ref="switchFrom"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="生效时间"
                    prop="date1"
                    :rules="[
                        { required: true, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]"
                >
                    <el-date-picker
                        v-model="switchFrom.date1"
                        type="date"
                        placeholder="选择日期"
                        style="width:100%"
                    >
                    </el-date-picker>
                </el-form-item>
                <el-form-item
                    label="生效时间"
                    prop="date2"
                    :rules="[
                        { required: false, message: '请输入活动名称', trigger: 'blur' },
                        { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
                    ]"
                >
                    <el-date-picker
                        v-model="switchFrom.date2"
                        type="date"
                        placeholder="选择日期"
                        style="width:100%"
                    >
                    </el-date-picker>
                </el-form-item>
                <div class="Remarks">注：失效时间不设置默认为永久</div>
            </el-form>

        </div>
        <span
            slot="footer"
            clabase="dialog-footer"
        >
            <el-button
                size="medium"
                type="warning"
                @click="isShow = false"
            >取 消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="isShow = false"
            >确定</el-button>
        </span>
    </base-dialog>
</template>

<script>
export default {
    props: {
        switchDialog: {
            type: Boolean
        }
    },
    model: {
        prop: "switchDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.switchDialog;
    },
    data() {
        return {
            isShow: false,
            switchFrom: {
                date1: "",
                date2: ""
            }
        };
    }
};
</script>

<style lang="scss" scoped>
</style>