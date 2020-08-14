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
                >
                    <el-date-picker
                        v-model="switchFrom.start_time"
                        value-format="yyyy-MM-dd HH:mm"
                        type="date"
                        placeholder="选择日期"
                        style="width:100%"
                    ></el-date-picker>
                </el-form-item>
                <el-form-item
                    label="生效时间"
                    prop="date2"
                >
                    <el-date-picker
                        v-model="switchFrom.end_time"
                        value-format="yyyy-MM-dd HH:mm"
                        type="date"
                        placeholder="选择日期"
                        style="width:100%"
                    ></el-date-picker>
                </el-form-item>
                <div class="Remarks">注：失效时间不设置默认为永久</div>
            </el-form>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="warning"
                @click="close"
            >取 消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="sureSwitch"
            >确定</el-button>
        </span>
    </base-dialog>
</template>

<script>
// import { enable } from "@/api/systemManage/userManageInner";

export default {
    props: {
        openEnable: {
            type: Boolean
        },
        selectTableId: {
            type: String,
            default: ""
        },
        enableApi: {
            type: Function
        }
    },
    model: {
        prop: "openEnable",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.isShow = this.openEnable;
    },
    data() {
        return {
            isShow: false,
            switchFrom: {
                start_time: "", //生效时间
                end_time: "",//生效时间
            },
        };
    },
    methods: {
        close() {
            this.isShow = false;
        },
        async sureSwitch() {
            const enableRes = await this.enableApi({  //启用接口
                ...this.switchFrom,
                account_id: this.selectTableId
            });
            this.$emit("sureSwitch");
            this.isShow = false;
            this.$message.success("启用成功！")
        }
    }
};
</script>

<style lang="scss" scoped>
</style>