<template>
    <div class="parameter common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="参数设置"
        ></common-title>
        <div class="system-manage-wrap">
            <div class="c-box">
                <div class="c-box-title">
                    <span class="name">简历投递规则设置</span>
                    <span
                        @click="isLeaf_1=!isLeaf_1"
                        :class="['control', isLeaf_1 ? 'el-icon-minus' :'el-icon-plus']"
                    ></span>
                </div>
                <transition name="fade">
                    <ul
                        class="c-box-body"
                        v-show="isLeaf_1"
                    >
                        <li class="body-items flex">
                            <div class="item-title">是否允许跨种类投递简历:</div>
                            <div class="item-content line marginL77">
                                <el-radio-group
                                    v-model="resumeData.is_cross_recruitment_plan_deliver_cv"
                                    class="item-input"
                                >
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="2">否</el-radio>
                                </el-radio-group>
                            </div>
                        </li>
                        <li class="body-items flex">
                            <div class="item-title wid180">多简历投递简历查询规则:</div>
                            <div class="item-content line marginL55">
                                <el-radio-group v-model="resumeData.multi_cv_screening_rules">
                                    <el-radio :label="1">全部同事展示供查询</el-radio>
                                    <el-radio :label="2">按照投递简历意向顺序展示供查询</el-radio>
                                </el-radio-group>
                            </div>
                        </li>
                        <li class="body-items flex">
                            <div class="item-title wid220">不满足岗位要求是否可投递简历:</div>
                            <div class="item-content line marginL35">
                                <el-radio-group
                                    v-model="resumeData.not_satisfy_deliver_status"
                                    class="item-input"
                                >
                                    <el-radio :label="1">是</el-radio>
                                    <el-radio :label="2">否</el-radio>
                                </el-radio-group>
                            </div>
                        </li>

                        <li class="body-items flex">
                            <div class="item-title wid220">允许填写调剂岗位数量:</div>
                            <div class="item-content line marginL90">
                                <el-input-number
                                    v-model="resumeData.allow_adjust_num"
                                    :min="0"
                                    controls-position="right"
                                    size="mini"
                                ></el-input-number>
                            </div>
                        </li>
                        <li class="body-items flex btn-save">
                            <button
                                class="btn btn-confirm"
                                @click="saveResume"
                            >保存</button>
                        </li>
                    </ul>
                </transition>
            </div>

            <div class="c-box">
                <div class="c-box-title">
                    <span class="name">密码规则设置</span>
                    <span
                        @click="isLeaf_2=!isLeaf_2"
                        :class="['control', isLeaf_2 ? 'el-icon-minus' :'el-icon-plus']"
                    ></span>
                </div>
                <transition name="fade">
                    <ul
                        class="c-box-body"
                        v-show="isLeaf_2"
                    >
                        <li class="body-items flex">
                            <div class="item-title wid220">密码长度:</div>
                            <div class="item-content line marginL170">
                                <el-input-number
                                    v-model="pwdData.pwd_length"
                                    controls-position="right"
                                    :min="0"
                                    size="mini"
                                ></el-input-number>
                            </div>
                        </li>
                        <li class="body-items flex">
                            <div class="item-title">复杂度设置:</div>
                        </li>
                        <li class="body-items">
                            <el-row>
                                <el-col :span="8">
                                    <el-radio
                                        v-model="pwdData.pwd_rule"
                                        :label="1"
                                    >不要求(建议设置较为复杂的密码)</el-radio>
                                </el-col>
                                <el-col :span="8">
                                    <el-radio
                                        v-model="pwdData.pwd_rule"
                                        :label="2"
                                    >英文字母(区分大小写)(不能连续英文字符和重复)</el-radio>
                                </el-col>
                            </el-row>
                        </li>
                        <li class="body-items">
                            <el-row>
                                <el-col :span="8">
                                    <el-radio
                                        v-model="pwdData.pwd_rule"
                                        :label="3"
                                    >数字(不能连续阿拉伯数字和重复)</el-radio>
                                </el-col>
                                <el-col :span="8">
                                    <el-radio
                                        v-model="pwdData.pwd_rule"
                                        :label="4"
                                    >数据+英文字母(区分大小写)</el-radio>
                                </el-col>
                                <el-col :span="8">
                                    <el-radio
                                        v-model="pwdData.pwd_rule"
                                        :label="5"
                                    >数字+英文字母+特殊字符(区分大小写)</el-radio>
                                </el-col>
                            </el-row>
                        </li>
                        <li class="body-items flex btn-save">
                            <button
                                class="btn btn-confirm"
                                @click="savePwd"
                            >保存</button>
                        </li>
                    </ul>
                </transition>
            </div>
            <div class="c-box">
                <div class="c-box-title">
                    <span class="name">邮件设置</span>
                    <span
                        @click="isLeaf_4=!isLeaf_4"
                        :class="['control', isLeaf_4 ? 'el-icon-minus' :'el-icon-plus']"
                    ></span>
                </div>
                <transition name="fade">
                    <ul
                        class="c-box-body"
                        v-show="isLeaf_4"
                    >
                        <li class="body-items flex">
                            <div class="item-title wid160">邮箱验证码通知模板：</div>
                            <el-input
                                v-model="emilData.security_code_inform_template"
                                style="width:650px;"
                                placeholder="【公招系统】该验证码【变量】用于验证你的手机，如非本人操作请勿忽略，验证码十分钟内有效。"
                            ></el-input>
                        </li>
                        <li class="body-items flex">
                            <div class="item-title wid160">邮箱随机码通知模板：</div>
                            <el-input
                                v-model="emilData.random_code_inform_template"
                                style="width: 650px;"
                                placeholder="【公招系统】您的登录密码是【变量】,请登录系统后及时修改。"
                            ></el-input>
                        </li>
                        <li
                            v-if="!isOpen_2"
                            class="body-items body-items-setting flex"
                        >
                            <span
                                @click="clickOpen_2"
                                class="setting"
                            >
                                测试
                                <i class="el-icon-d-arrow-right"></i>
                            </span>
                        </li>
                        <div
                            v-if="isOpen_2"
                            class="setting-item flex"
                        >
                            <div class="item-left">
                                <span
                                    @click="clickOpen_2"
                                    class="setting"
                                >
                                    测试
                                    <i class="el-icon-d-arrow-right"></i>
                                </span>
                            </div>
                            <ul class="item-right flex1 marginT20">
                                <li class="item-right-list flex margin10">
                                    <div class="item-title wid100">测试邮箱号：</div>
                                    <el-input
                                        v-model="testEmliData.verificationCode"
                                        class="item-input"
                                        placeholder
                                    ></el-input>
                                    <div class="item-title wid100 marginL35">验证码通知：</div>
                                    <div class="item-content">
                                        <el-select
                                            v-model="input"
                                            class="item-input"
                                        >
                                            <el-option
                                                label="选择通知模板"
                                                value="sd"
                                            ></el-option>
                                            <el-option
                                                label="test"
                                                value="sd"
                                            ></el-option>
                                            <el-option
                                                label="test"
                                                value="sd"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                    <div
                                        class="marginL35"
                                        @click="testEmail"
                                        style="color:rgba(62,60,166,1);font-size: 14px;line-height=27px;"
                                    >发送</div>
                                </li>
                            </ul>
                        </div>

                        <li class="body-items flex btn-save">
                            <button
                                class="btn btn-confirm"
                                @click="saveEmail"
                            >保存</button>
                        </li>
                    </ul>
                </transition>
            </div>

            <div class="c-box">
                <div class="c-box-title">
                    <span class="name">手机短信设置</span>
                    <span
                        @click="isLeaf_5=!isLeaf_5"
                        :class="['control', isLeaf_5 ? 'el-icon-minus' :'el-icon-plus']"
                    ></span>
                </div>
                <transition name="fade">
                    <ul
                        class="c-box-body"
                        v-show="isLeaf_5"
                    >
                        <li class="body-items flex">
                            <div class="item-title wid160">短信验证码通知模板：</div>
                            <el-input
                                v-model="phoneData.security_code_inform_template"
                                style="width:650px;"
                                placeholder="【公招系统】该验证码【变量】用于验证你的手机，如非本人操作请勿忽略，验证码十分钟内有效。"
                            ></el-input>
                        </li>
                        <li class="body-items flex">
                            <div class="item-title wid160">短信随机码通知模板：</div>
                            <el-input
                                v-model="phoneData.random_code_inform_template"
                                style="width: 650px;"
                                placeholder="【公招系统】您的登录密码是【变量】,请登录系统后及时修改。"
                            ></el-input>
                        </li>
                        <li
                            v-if="!isOpen_3"
                            class="body-items body-items-setting flex"
                        >
                            <span
                                @click="clickOpen_3"
                                class="setting"
                            >
                                测试
                                <i class="el-icon-d-arrow-right"></i>
                            </span>
                        </li>
                        <div
                            v-if="isOpen_3"
                            class="setting-item flex"
                        >
                            <div class="item-left">
                                <span
                                    @click="clickOpen_3"
                                    class="setting"
                                >
                                    测试
                                    <i class="el-icon-d-arrow-right"></i>
                                </span>
                            </div>
                            <ul class="item-right flex1 marginT20">
                                <li class="item-right-list flex margin10">
                                    <div class="item-title wid100">测试手机号：</div>
                                    <el-input
                                        v-model="testPhone.verificationCode"
                                        class="item-input"
                                        placeholder
                                    ></el-input>
                                    <div class="item-title wid100 marginL35">验证码通知：</div>
                                    <div class="item-content">
                                        <el-select
                                            v-model="input"
                                            class="item-input"
                                        >
                                            <el-option
                                                label="选择通知模板"
                                                value="sd"
                                            ></el-option>
                                            <el-option
                                                label="test"
                                                value="sd"
                                            ></el-option>
                                            <el-option
                                                label="test"
                                                value="sd"
                                            ></el-option>
                                        </el-select>
                                    </div>
                                    <div
                                        class="marginL35"
                                        @click="testPhoneMeth"
                                        style="color:rgba(62,60,166,1);font-size: 14px;line-height=27px;"
                                    >发送</div>
                                </li>
                            </ul>
                        </div>
                        <li class="body-items flex btn-save">
                            <button
                                class="btn btn-confirm"
                                @click="savePhone"
                            >保存</button>
                        </li>
                    </ul>
                </transition>
            </div>
        </div>
    </div>
</template>

<script>

import { getResumeParam, saveResumeParam, getPwdRuleSetting, savePwdRuleSetting, getMailboxConfig, saveEmailSetup, testEmail, getPhoneMsg, savePhoneMsg, testPhoneMsg } from "@/api/systemManage/parameter/parameter.js";
export default {
    name: "parameter",
    data() {
        return {
            isOpen_2: false,
            isOpen_3: false,
            isLeaf_1: false,
            isLeaf_2: false,
            isLeaf_4: false,
            isLeaf_5: false,
            input: "",
            //简历参数设置
            resumeData: {
                allow_adjust_num: "",//允许填写调剂岗位数量
                is_cross_recruitment_plan_deliver_cv: "",//是否允许跨招聘计划投递简历(1:是 2：否)
                multi_cv_screening_rules: "",//多简历筛选规则(1：全部同时展示供查询 2：按照投递简历意向顺序展示供查询)
                not_satisfy_deliver_status: "",//不满足岗位要求是否可投递简历(1:是 2：否)
                recruitment_plan_allow_deliver_cv_post_number: "",//同一个招聘计划允许投递的简历岗位数量(1至20)
            },
            //密码规则设置
            pwdData: {
                pwd_length: "",//密码长度,可用值:6,8,10,12
                pwd_rule: "",//复杂度设置
            },
            testEmliData: { //测试邮件设置
                verificationCode: ""
            },
            //邮件设置
            emilData: {
                random_code_inform_template: "",//邮箱随机码通知模板
                security_code_inform_template: "",//邮箱验证通知模板
                id: "",//邮件设置id
            },
            phoneData: {
                random_code_inform_template: "",//短信随机码通知模板
                security_code_inform_template: "",//短信验证码通知模板
                id: "",//短信设置id
            },
            testPhone: {//测试手机短信设置
                verificationCode: ""
            }
        };
    },
    created() {
        this.getResumeParam();
        this.getPwdRuleSetting();
        this.getMailboxConfig();
        this.getPhoneMsg();
    },
    methods: {
        async getResumeParam() { //获取简历设置
            const res = await getResumeParam();
            this.resumeData = res;
            let obj = {};
            for (let key in this.resumeData) {
                obj[key] = Number(this.resumeData[key])
            }
            this.resumeData = obj;
        },
        async saveResume() {//保存简历
            const res = await saveResumeParam(this.resumeData);
            this.$message.success("保存成功！")
        },
        async getPwdRuleSetting() {//获取密码规则设置
            const res = await getPwdRuleSetting();
            this.pwdData.pwd_length = res.pwd_length;
            this.pwdData.pwd_rule = res.pwd_rule;
        },
        async savePwd() {//保存密码规则
            const res = await savePwdRuleSetting(this.pwdData);
            this.$message.success("保存成功！")
        },
        async getMailboxConfig() {//获取邮件设置
            const res = await getMailboxConfig();
            this.emilData = JSON.parse(res.interface_config)
            this.emilData.id = res.id;
        },
        async saveEmail() {//保存邮件
            const res = await saveEmailSetup(this.emilData);
            this.$message.success("保存成功！")
        },
        async testEmail() {
            const res = await testEmail(this.testEmliData);
        },
        async getPhoneMsg() {//获取手机短信设置
            const res = await getPhoneMsg();
            this.phoneData = JSON.parse(res.interface_config)
            this.phoneData.id = res.id;
        },
        async savePhone() {
            const res = await savePhoneMsg(this.phoneData);
            this.$message.success("保存成功！")
        },
        async testPhoneMeth() {
            const res = await testPhoneMsg(this.testPhone);
        },
        clickOpen_2() {
            this.isOpen_2 = !this.isOpen_2;
        },
        clickOpen_3() {
            this.isOpen_3 = !this.isOpen_3;
        },
    }
};
</script>

<style lang="scss" scoped>
@import "@/styles/parameter.scss";
</style>
