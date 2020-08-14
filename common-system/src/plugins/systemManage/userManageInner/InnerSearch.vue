<template>
    <div>
        <ul class="type-tool">
            <li @click="handelEvent('add')">
                <i class="el-icon-circle-plus"></i>新增用户
            </li>
            <li>
                <!-- <i class="iconfont icon-zu"></i>导入 -->
                <el-dropdown
                    trigger="click"
                    @command="handleClick"
                >
                    <span class="el-dropdown-link">
                        excel导入<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item command="xz">
                            下载模板
                        </el-dropdown-item>
                        <el-dropdown-item command="sc">
                            <UploadBtn
                                @upload="uploadImpg"
                                :isBtn="false"
                                title="导入数据"
                            />
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
            </li>
            <li @click="firstPassMeth">
                <i class="iconfont iconmima"></i>初始密码
            </li>
            <li @click="restPassMeth">
                <i class="iconfont iconshuaxin"></i>重置密码
            </li>
            <li
                @click="deleteMethod"
                class="hover-red"
            >
                <i class="el-icon-delete"></i>删除
            </li>
            <li @click="empowerMeth">
                <i class="el-icon-success"></i>授权
            </li>
            <li>
                <el-switch
                    v-model="switchValue"
                    active-color="#4CB209"
                    inactive-color="#989898"
                    @change="enDisApi"
                ></el-switch>
            </li>
            <li class="type-search">
                <el-input
                    size="medium"
                    placeholder="账号、别名"
                    clearable
                    v-model="queryData.account"
                >
                    <el-button
                        @click="updeteList"
                        slot="append"
                        icon="el-icon-search"
                    ></el-button>
                </el-input>
            </li>
        </ul>
        <!-- 新增 -->
        <AddUser
            v-if="adduserDialog"
            :pageType="pageType"
            :accountId="accountId"
            :peroUserId="userId"
            v-model="adduserDialog"
            @updeteList="updeteList"
        />
        <!-- 启用禁用 -->
        <EnableDia
            v-model="openEnable"
            :selectTableId="selectTableId"
            :enableApi="enableApi"
            v-if="openEnable"
            @sureSwitch="sureSwitch"
        />
        <!-- 授权 -->
        <Authorization
            v-if="empowerDialog"
            :userId="userId"
            v-model="empowerDialog"
        />
        <!-- 重置密码 -->
        <restPassword
            v-model="PasswordReset"
            v-if="PasswordReset"
            :user_ids="userId"
            :accountId="accountId"
        />
        <SetPassword
            v-if="PasswordInitial"
            :selectTableId="selectTableId"
            v-model="PasswordInitial"
        />
    </div>
</template>

<script>
import app from "./eventBus.js";
import { changeBase64, changeFormData } from "@/utils/tools.js"
const AddUser = () => import("@/components/systemManage/userManageInner/AddUser.vue");
const EnableDia = () => import("@/components/systemManage/userManageInner/EnableDia.vue");//启用弹窗
const Authorization = () => import("@/components/systemManage/userManageInner/Authorization.vue");
const restPassword = () => import("@/components/systemManage/userManageInner/restPassword.vue");//重置密码
const SetPassword = () => import("@/components/systemManage/userManageInner/SetPassword.vue");
import { getUserListByPage, enable, disable, deleteSchoolUser, download, importSchoolUser } from "@/api/systemManage/userManageInner";

export default {
    components: {
        AddUser,
        EnableDia,
        Authorization,
        restPassword,
        SetPassword
    },
    data() {
        return {
            enableApi: enable,
            switchValue: false,
            empowerDialog: false,
            adduserDialog: false,
            PasswordInitial: false,
            openEnable: false,
            PasswordReset: false,
            userId: "",
            queryData: {
                //列表请求数据
                account: "",
            },
            selectTableData: [],
            selectTableId: "",
            pageType: "add",
            updeteList: Function,
        }
    },
    created() {
        app.$on("selectData", (res, idArr) => {
            this.selectTableData = res;
            this.selectTableId = idArr;
        })
        app.$on("updeteList", (fun) => {
            this.updeteList = fun;
        })
    },
    watch: {
        queryData: {
            handler(data) {
                app.$emit("queryData", data)
            },
            deep: true
        }
    },
    methods: {
        async enDisApi(data) { //启用禁用方法
            let currData = data;
            this.switchValue = !this.switchValue;
            if (this.selectTableData.length === 0) {
                this.$message.warning("请选择用户！")
                return
            }
            if (currData) {  //启用
                this.openEnable = true;
            } else { //禁用
                const disableRes = await disable({
                    account_ids: this.selectTableId
                });
                this.$message.success("禁用成功！")
                this.updeteList();
                this.switchValue = false;
            }
        },
        sureSwitch() { //启用确定
            this.switchValue = true;
            this.updeteList()
        },
        firstPassMeth() {
            // 设置初始密码
            if (this.selectTableData.length === 0) {
                this.$message.warning("请选择用户！")
                return
            }
            this.PasswordInitial = true
        },
        handleClick(type) {
            if (type == "sc") { //上传

            } else {//下载
                const id = "5f2d1d7b67a3e21352aee8ad";
                window.location.href = `${download}/${id}`;
            }
        },
        async uploadImpg(file) { //图片上传
            const queryData = changeFormData({ file });
            const res = await importSchoolUser(queryData);
            this.$message.success("导入成功！")
            this.updeteList()
        },
        restPassMeth() {
            // 重置密码
            if (this.selectTableData.length === 0) {
                this.$message.warning("请选择用户！")
                return
            } else if (this.selectTableData.length > 1) {
                this.$message.warning("只能选择一个用户重置密码！")
                return
            }
            this.userId = this.selectTableData[0].user_id;
            this.accountId = this.selectTableData[0].account_id;
            this.PasswordReset = true
        },
        empowerMeth() {
            // 授权
            if (this.selectTableData.length === 0) {
                this.$message.warning("请选择用户！")
                return
            } else if (this.selectTableData.length > 1) {
                this.$message.warning("只能选择一个用户授权！")
                return
            }
            this.userId = this.selectTableData[0].user_id;
            this.empowerDialog = true
        },
        deleteMethod() {
            if (this.selectTableData.length === 0) {
                this.$message.warning("请选择用户！")
                return
            }
            let list = [];
            this.selectTableData.forEach((curr) => {
                list.push(curr.account);
            })
            //删除提示
            this.$delConfirm({
                type: "delete",
                list, //删除的数据
                beforeClose: async done => {
                    await deleteSchoolUser({
                        userId: this.selectTableId
                    });
                    done();
                    this.updeteList();
                    this.$message.success("删除成功！");
                }
            }).catch(() => { });
        },
        handelEvent(type, data) {
            this.pageType = type
            this.adduserDialog = true
        },
    }
}
</script>

<style lang="scss" scoped>
</style>