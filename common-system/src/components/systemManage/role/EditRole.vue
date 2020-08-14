<template>
    <base-dialog
        :title="config.title"
        :visible.sync="isShow"
        width="450px"
    >
        <div>
            <el-form
                :model="queryData"
                ref="queryData"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="角色名称"
                    prop="name"
                >
                    <el-input
                        type="text"
                        v-model="queryData.role_name"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="角色编号"
                    prop="idnumber"
                >
                    <el-input
                        disabled
                        :placeholder="config.id === 1 ? '系统生成' : ''"
                        v-model.number="queryData.role_id"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="角色描述"
                    prop="describe"
                >
                    <el-input
                        type="textarea"
                        v-model="queryData.role_describe_info"
                    ></el-input>
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
                @click="handleEvent('cancel')"
            >取消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="handleEvent('sure')"
            >确认</el-button>
        </span>
    </base-dialog>
</template>

<script>
import { addRole, updateRole, roleDetails } from "@/api/systemManage/role";

const config = {
    add: {
        id: 1,
        title: '新增角色',
        api: addRole,
        msg: '新增成功',
    },
    edit: {
        id: 2,
        title: '编辑角色',
        api: updateRole,
        msg: '编辑成功',
    }
}

export default {
    props: {
        editData: {
            type: Object,
        },
        editDialog: {
            type: Boolean
        }
    },
    model: {
        prop: "editDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.config = config[this.editData.currType]
        if (this.config.id === 2) {
            this.getDetail();
        }
        this.isShow = this.editDialog;
    },
    data() {
        return {
            config: {},
            isShow: false,
            // 新增用户弹框
            adduserDialog: false,
            queryData: {
                role_name: "", //角色名称
                role_describe_info: "",//角色描述
                role_id: "",//角色ID
            },
        };
    },
    methods: {
        async handleEvent(type) {
            switch (type) {
                case 'cancel':
                    this.queryData.role_id = "";
                    break
                case 'sure':
                    this.queryData.role_id = this.editData.role_id;
                    const res = await this.config.api(this.queryData);
                    this.$message.success(this.config.msg)
                    this.$emit("updateList");//更新列表
                    break
            }
            this.isShow = false
        },
        async getDetail() {
            const res = await roleDetails({
                roleId: this.editData.role_id
            });
            this.queryData = res;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>