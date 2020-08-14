<template>
    <div>
        <ul class="type-tool">
            <li @click="editMeth"><i class="el-icon-edit"></i>修改</li>
            <li @click="exportMeth"><i class="iconfont iconxiazai"></i>导出</li>
            <li
                @click="deleteMethod"
                class="hover-red"
            ><i class="el-icon-delete"></i>删除</li>
            <li>
                <el-switch
                    v-model="switchValue"
                    active-color="#4CB209"
                    inactive-color="#989898"
                    @change="enDisApi"
                >
                </el-switch>
            </li>
        </ul>
        <!-- 查看个人信息-->
        <ViewMes
            v-if="lookInfo"
            v-model="lookInfo"
            :pageType="pageType"
            @updeteList="updeteList"
            :account_id="account_id"
        />
        <!-- 启用禁用 -->
        <EnableDia
            v-model="openEnable"
            :selectTableId="selectTableId"
            :enableApi="enableApi"
            v-if="openEnable"
            @sureSwitch="sureSwitch"
        />
    </div>
</template>

<script>
import app from "./eventBus.js";
const Search = () => import("./Search.vue");
const ViewMes = () => import("@/components/systemManage/userManageOuter/ViewMes.vue");
const EnableDia = () => import("@/components/systemManage/userManageInner/EnableDia.vue");//启用弹窗
import { getUserListByPage, deleteOutSchoolUser, disable, enable, exportOutSchoolUser } from "@/api/systemManage/userManageOuter";

export default {
    components: {
        Search,
        ViewMes,
        EnableDia
    },
    data() {
        return {
            enableApi: enable,
            queryData: {
                //列表请求参数
                account: "",//
                alias: "",//
                name: "",//
                status: "",//
            },
            switchValue: false,
            openEnable: false,
            lookInfo: false,
            selectTableData: [],
            selectTableId: "",
            updeteList: Function,
            account_id: '',
            pageType: ""
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
        app.$on("queryData", (data) => {
            this.queryData = data;
        })
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
                    accountIds: this.selectTableId
                });
                this.updeteList();
                this.$message.success("禁用成功！")
                this.switchValue = false;
            }
        },
        sureSwitch() { //启用确定
            this.switchValue = true;
            this.updeteList();
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
                    await deleteOutSchoolUser({
                        userId: this.selectTableId
                    });
                    done();
                    this.updeteList();
                    this.$message.success("删除成功！");
                }
            }).catch(() => { });
        },
        exportMeth() { //导出
            let res = this.queryData
            res.currentPage = 1;
            res.pageSize = 0;
            res.start = 0;
            window.location.href = exportOutSchoolUser(res);
        },
        async editMeth() { //修改方法
            if (this.selectTableData.length === 0) {
                this.$message.warning("请选择用户！")
                return
            }
            if (this.selectTableData.length > 1) {
                this.$message.warning("只能选择一个用户编辑！")
                return
            }
            this.account_id = this.selectTableData[0].account_id;
            this.pageType = 'edit'
            this.lookInfo = true
        },
    }
}
</script>

<style lang="scss" scoped>
</style>