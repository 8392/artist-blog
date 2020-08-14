<template>
    <div>
        <TableList
            ref="tableRef"
            :columns="columns"
            :params="queryData"
            :api="getUserListByPage"
            @selection-change="selectionChange"
        >
            <template #enable="scope">
                {{scope.row.enable == 1 ? '启用' : '禁用'}}
            </template>
            <template #initpwd="scope">
                {{scope.row.initpwd == "Y" ? '是' : '否'}}
            </template>
            <template #cz="scope">
                <el-button
                    @click="handelEvent('view', scope.row)"
                    type="text"
                    size="medium"
                >查看</el-button>
                <el-button
                    @click="handelEvent('edit', scope.row)"
                    type="text"
                    size="medium"
                >修改</el-button>
            </template>
        </TableList>
        <!-- 查看 -->
        <ViewUser
            v-if="lookUser"
            v-model="lookUser"
            :accountId="accountId"
            :userId="userId"
        />
        <!-- 修改 -->
        <AddUser
            v-if="adduserDialog"
            :pageType="pageType"
            :accountId="accountId"
            :peroUserId="userId"
            v-model="adduserDialog"
            @updeteList="updeteList"
        />
    </div>
</template>

<script>
import app from "./eventBus.js";
const AddUser = () => import("@/components/systemManage/userManageInner/AddUser.vue");
const ViewUser = () => import("@/components/systemManage/userManageInner/ViewUser.vue");

import { getUserListByPage, enable, disable, deleteSchoolUser, download, importSchoolUser } from "@/api/systemManage/userManageInner";
// 状态类型
const statetype = [
    { type: "1", name: "启用" },
    { type: "2", name: "禁用" }
];
// 是否设置初始密码
const setUpType = [
    { type: "1", name: "是" },
    { type: "2", name: "否" }
];
export default {
    components: {
        AddUser,
        ViewUser
    },
    data() {
        return {
            getUserListByPage: getUserListByPage,
            queryData: {
                //列表请求数据
                account: "",
                // alias: "",
                // orderType: 0,
                // orderby: "enable"
            },
            columns: [
                //列表数据
                {
                    type: "selection"
                },
                {
                    label: "账号",
                    prop: "account"
                },
                {
                    label: "别名",
                    prop: "alias"
                },
                {
                    label: "状态",
                    slotName: "enable"
                },
                {
                    label: "生效时间",
                    prop: "start_time"
                },
                {
                    label: "失效时间",
                    prop: "end_time"
                },
                {
                    label: "是否已设置初始密码",
                    slotName: "initpwd",
                    align: 'center'
                },
                {
                    label: "操作",
                    slotName: "cz",
                    width: "150px"
                }
            ], //列表数据
            lookUser: false,
            adduserDialog: false,
            pageType: "add",
            selectTableId: [],
            selectTableData: []
        }
    },
    created() {
        app.$on("queryData", (res) => {
            this.queryData = res;
        })
    },
    mounted() {
        this.$nextTick(() => {
            app.$emit("updeteList", this.$refs.tableRef.refresh)
        })
    },
    methods: {
        handelEvent(type, data) {
            if (type === "view") {
                this.pageType = "add"
                this.lookUser = true;
                this.accountId = data.account_id;
                this.userId = data.user_id;
                //查看
            } else {  //修改
                this.accountId = data.account_id;
                this.userId = data.user_id;
                this.adduserDialog = true
                this.pageType = type
            }
        },
        selectionChange(data) { //选择表格数据
            this.selectTableId = [];
            data.forEach((curr) => {
                this.selectTableId.push(curr.account_id);
            })
            this.selectTableId = this.selectTableId.join(",");
            this.selectTableData = data;
            app.$emit("selectData", data, this.selectTableId)
        },
        updeteList() {
            this.$refs.tableRef.refresh();
        }
    }
}
</script>

<style lang="scss" scoped>
</style>