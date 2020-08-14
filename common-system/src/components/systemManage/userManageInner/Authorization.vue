<template>
    <base-dialog
        title="授权"
        :visible.sync="isShow"
        width="750px"
        class="empower"
    >
        <div>
            <el-form
                label-width="50px"
                class="demo-ruleForm"
            >
                <el-form-item label="权限">
                    <PowerList
                        ref="poweRef"
                        :id="userId"
                        pageType="relUser"
                    />
                </el-form-item>
            </el-form>
        </div>
        <span
            slot="footer"
            class="dialog-footer"
        >
            <el-button
                size="medium"
                type="warning"
                @click="isShow=false"
            >取消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="powerMeth"
            >确认</el-button>
        </span>
    </base-dialog>
</template>

<script>
import { powerUser } from "@/api/common";

export default {
    props: {
        empowerDialog: {
            type: Boolean
        },
        userId: {
            type: [String, Number]
        }
    },
    model: {
        prop: "empowerDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    data() {
        return {
            isShow: false,
        };
    },
    created() {
        this.isShow = this.empowerDialog;
    },
    methods: {
        async powerMeth() {
            const privilegeIdArray = this.$refs.poweRef.getShowPower()
            const res = await powerUser({
                operatorId: 1,
                userId: this.userId,
                privilegeIdArray
            })
            this.isShow = false;
            this.$emit("updeteList")
            this.$message.success("授权成功！")
        },
    }
};
</script>

<style lang="scss" scoped>
// 授权
.empower-content {
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    max-height: 500px;
    overflow-y: auto;
    .empower-left {
        width: 144px;
        margin-right: 32px;
    }
}
</style>