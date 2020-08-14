<template>
    <base-dialog
        title="设置初始密码"
        :visible.sync="isShow"
        width="450px"
    >
        <div>
            <el-form
                :model="pwdForm"
                ref="pwdForm"
                label-width="140px"
                label-position="left"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="选择密码设置方式:"
                    prop="type"
                >
                    <el-select
                        v-model="pwdForm.type"
                        placeholder="请选择密码设置方式"
                        @change="selectChange"
                        style="width:100%"
                    >
                        <el-option
                            label="人工初始化"
                            value="2"
                        ></el-option>
                        <el-option
                            label="固定规则初始化"
                            value="3"
                        ></el-option>
                        <el-option
                            label="系统随机初始化"
                            value="1"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item
                    label="密码："
                    prop="pwd"
                    v-if="pwdForm.type=='2'"
                >
                    <el-input
                        placeholder="请输入密码"
                        v-model="pwdForm.default_password"
                        show-password
                        style="width: 100%;"
                    ></el-input>
                </el-form-item>
                <el-form-item
                    label="密码规则:"
                    prop="pwd"
                    label-width="110px"
                    v-if="pwdForm.type=='3'"
                    style=" text-align: center;"
                >
                    <el-col
                        class="line"
                        :span="7"
                    >截取证件号</el-col>
                    <el-col :span="4">
                        <el-form-item prop="date1">
                            <el-input
                                placeholder
                                oninput="value=value.replace(/[^\d]/g,'')"
                                v-model="pwdForm.start_length"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        class="centerText"
                        :span="6"
                    >
                        位
                        <span
                            class="fontIconColor-red"
                            style="margin:0 5px;"
                        >至</span>第
                    </el-col>
                    <el-col :span="4">
                        <el-form-item prop="date2">
                            <el-input
                                placeholder
                                oninput="value=value.replace(/[^\d]/g,'')"
                                v-model="pwdForm.end_length"
                            ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col
                        class="centerText"
                        :span="3"
                    >位</el-col>
                </el-form-item>
                <el-form-item
                    label="选中发送方式："
                    prop="mode"
                >
                    <el-radio-group v-model="pwdForm.send_type">
                        <el-radio label="1">手机短信</el-radio>
                        <el-radio label="2">邮箱</el-radio>
                    </el-radio-group>
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
                @click="isShow = false"
            >取 消</el-button>
            <el-button
                size="medium"
                type="primary"
                @click="sureMeth"
            >完成</el-button>
        </span>
    </base-dialog>
</template>

<script>
import { updateInitPasswordConfig } from "@/api/systemManage/userManageInner";
export default {
    props: {
        PasswordInitial: {
            type: Boolean
        },
        selectTableId: {
            type: String
        }
    },
    model: {
        prop: "PasswordInitial",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    data() {
        return {
            // 设置初始密码
            pwdForm: {
                type: "2",//重置密码方式
                account_id: "",//用户账号ID
                send_type: "1",//信息发送方式
                default_password: "",//默认密码
                start_length: "",//从多少位开始
                end_length: "",//从多少位结束
            },
            // 查看用户
            isShow: false
        };
    },
    created() {
        this.pwdForm.account_id = this.selectTableId;
        this.isShow = this.PasswordInitial;
    },
    methods: {
        selectChange() { },
        async sureMeth() { //完成
            const res = await updateInitPasswordConfig(this.pwdForm);
            this.$message.success("设置成功！");
            this.isShow = false;
        }
    }
};
</script>

<style lang="scss" scoped>
</style>