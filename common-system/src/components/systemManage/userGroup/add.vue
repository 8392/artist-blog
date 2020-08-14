<template>
    <base-dialog
        title="新建组"
        :visible.sync="isShow"
        width="450px"
    >
        <div class="addUser">
            <el-form
                :model="addFrom"
                ref="addFrom"
                label-width="80px"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="组名称"
                    prop="name"
                >
                    <el-input
                        type="text"
                        v-model="addFrom.team_name"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="编码"
                    prop="idnumber"
                >
                    <el-input
                        disabled
                        placeholder="系统生成"
                    ></el-input>
                </el-form-item>

                <el-form-item
                    label="组描述"
                    prop="describe"
                >
                    <el-input
                        type="textarea"
                        v-model="addFrom.team_describe_info"
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
import { addTeam } from "@/api/systemManage/userGroup";

export default {
    name: "addUserGroup",
    props: {
        adduserDialog: {
            type: Boolean
        },
        team_parent_id: {
            type: [String, Number]
        }
    },
    model: {
        prop: "adduserDialog",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.addFrom.team_parent_id = this.team_parent_id;
        this.isShow = this.adduserDialog;
    },
    data() {
        return {
            isShow: false,
            // 新增用户组弹框
            addFrom: {
                team_parent_id: '',//用户组父元素id
                team_name: '',//用户组名称
                team_describe_info: '',//用户组描述信息
            },
        };
    },
    methods: {
        async handleEvent(type) {
            switch (type) {
                case 'cancel':
                    break
                case 'sure':
                    const res = await addTeam(this.addFrom);
                    this.$message.success('新增成功！')
                    this.$emit("updateList");//更新树
                    break
            }
            this.isShow = false
        },
    }
};
</script>

<style lang="scss" scoped>
</style>