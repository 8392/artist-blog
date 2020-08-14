<template>
    <base-dialog
        title="重置密码"
        :visible.sync="isShow"
        width="550px"
    >
        <div>
            <el-form
                :model="pwdResetFrom"
                ref="pwdForm"
                label-width="110px"
                label-position="left"
                class="demo-ruleForm"
            >
                <el-form-item
                    label="选中重置方式"
                    prop="typeChanges"
                >
                    <el-select
                        v-model="pwdResetFrom.reset_type"
                        placeholder="请选择密码设置方式"
                        @change="selectChange"
                        style="width:100%"
                    >
                        <el-option
                            label="随机密码"
                            value="1"
                        ></el-option>
                        <el-option
                            label="固定值"
                            value="2"
                        ></el-option>
                        <el-option
                            label="用户属性值"
                            value="3"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <div v-if="pwdResetFrom.reset_type == 1">
                    <!-- <div class="pass_gz">密码规则</div>
                    <el-form-item label="内容">
                        <el-radio-group v-model="pwdResetFrom.send_type">
                            <el-radio label="1">包含字母、数字、特殊字符</el-radio>
                            <el-radio label="2">包含字母、数字</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="排序">
                        <el-radio-group v-model="pwdResetFrom.send_type">
                            <el-radio label="1">必须字母开头</el-radio>
                            <el-radio label="2">不限制</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="长度">
                        <el-input-number
                            v-model="pwdResetFrom.send_type"
                            @change="handleChange"
                            :min="1"
                            :max="10"
                            label="描述文字"
                        ></el-input-number>
                    </el-form-item>
                    <div class="line"></div> -->
                    <el-form-item
                        label="选中发送方式"
                        prop="mode"
                    >
                        <el-radio-group v-model="pwdResetFrom.send_type">
                            <el-radio :label="1">手机短信</el-radio>
                            <el-radio :label="2">邮箱</el-radio>
                        </el-radio-group>
                    </el-form-item>
                </div>
                <div v-if="pwdResetFrom.reset_type == 2">
                    <el-form-item label="密码">
                        <el-input
                            placeholder="请输入密码"
                            v-model="pwdResetFrom.password"
                            show-password
                            style="width: 100%;"
                        ></el-input>
                    </el-form-item>
                </div>
                <div v-if="pwdResetFrom.reset_type == 3">
                    <el-form-item
                        label="选中发送方式"
                        prop="mode"
                    >
                        <el-radio-group v-model="pwdResetFrom.send_type">
                            <el-radio :label="1">手机短信</el-radio>
                            <el-radio :label="2">邮箱</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item
                        label="属性"
                        style=" text-align: center;"
                    >
                        <div
                            style="padding-bottom: 10px;overflow: hidden;"
                            :key="index"
                            v-for="(item, index) in pwdResetFrom.userField"
                        >
                            <el-col :span="6">
                                <el-select
                                    v-model="item.fieldType"
                                    placeholder="点击下拉"
                                    @change="selectChange"
                                    style="width:100%"
                                >
                                    <el-option
                                        label="身份证号"
                                        value="1"
                                    ></el-option>
                                    <el-option
                                        label="工号"
                                        value="2"
                                    ></el-option>
                                    <el-option
                                        label="账号"
                                        value="3"
                                    ></el-option>
                                    <!-- <el-option
                                    label="序列号"
                                    value="4"
                                ></el-option> -->
                                </el-select>
                            </el-col>
                            <el-col :span="3">从左第</el-col>
                            <el-col :span="3">
                                <el-form-item prop="date1">
                                    <el-input
                                        placeholder
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                        v-model="item.lengthStart"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col
                                class="centerText"
                                :span="3"
                            >
                                位至
                                <span
                                    class="fontIconColor-red"
                                    style="margin:0 5px;"
                                ></span>
                            </el-col>
                            <el-col :span="3">
                                <el-form-item prop="date2">
                                    <el-input
                                        placeholder
                                        oninput="value=value.replace(/[^\d]/g,'')"
                                        v-model="item.lengthEnd"
                                    ></el-input>
                                </el-form-item>
                            </el-col>
                            <el-col
                                class="centerText"
                                :span="3"
                            >位</el-col>
                            <el-col
                                :span="2"
                                class="btn-col"
                            >
                                <i
                                    v-if="index == 0 && pwdResetFrom.userField.length < 3"
                                    @click="addMeth"
                                    class="i-first el-icon-circle-plus"
                                ></i>
                                <i
                                    v-if="index > 0 "
                                    @click="delMeth(index)"
                                    class="i-end el-icon-remove"
                                ></i>
                            </el-col>
                        </div>
                    </el-form-item>
                </div>
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
import { resetPassword } from "@/api/systemManage/userManageInner";

export default {
    props: {
        PasswordReset: {
            type: Boolean
        },
        user_ids: {
            type: [String, Number]
        },
        accountId: {
            type: [String, Number]
        }
    },
    model: {
        prop: "PasswordReset",
        event: "change"
    },
    watch: {
        isShow(data) {
            this.$emit("change", data);
        }
    },
    created() {
        this.pwdResetFrom.user_ids = this.user_ids;
        this.pwdResetFrom.accountId = this.accountId;
        this.isShow = this.PasswordReset;
    },
    data() {
        return {
            isShow: false,
            default: {
                fieldType: "1",
                lengthStart: "",
                lengthEnd: "",
            },
            pwdResetFrom: {
                reset_type: '1',//选择重置方式
                send_content_template: '',//发送内容模板
                send_type: 1,//',//重置密码发送方式
                user_ids: '',//用户id
                password: '',//用户填写的固定值
                userField: [{
                    fieldType: "1",
                    lengthStart: "",
                    lengthEnd: "",
                }],//用户选择的用户属性值
            }
        };
    },
    methods: {
        async sureMeth() { //确定请求
            let queryData = JSON.parse(JSON.stringify(this.pwdResetFrom));
            queryData.userField = JSON.stringify(queryData.userField)
            const res = await resetPassword(queryData);
            this.isShow = false;
            this.$message.success("重置密码成功！")
        },
        addMeth() {
            let currData = JSON.parse(JSON.stringify(this.default));
            this.pwdResetFrom.userField.push(currData);
        },
        delMeth(index) {
            this.pwdResetFrom.userField.splice(index, 1)
        },
        selectChange() { },
        handleChange() { }
    }
};
</script>

<style lang="scss" scoped>
.pass_gz {
    padding: 10px 0;
    font-size: 16px;
    color: #7978de;
    border-top: 1px solid #e5e5e5;
}
.line {
    height: 1px;
    background: #e5e5e5;
}
.btn-col {
    height: 40px;
    display: flex;
    align-items: center;
    font-size: 18px;
    .i-first {
        cursor: pointer;
        color: #4cb209;
        margin-right: 5px;
    }
    .i-end {
        cursor: pointer;
        color: #ef5454;
    }
}
</style>