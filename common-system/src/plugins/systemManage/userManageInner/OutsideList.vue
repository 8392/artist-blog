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
            <template #per_mes="scope">
                <el-button
                    @click="lookPersonInfo(scope.row)"
                    type="text"
                    size="medium"
                >个人信息</el-button>
            </template>
            <template #res_mes="scope">
                <el-button
                    @click="lookResumeInfo(scope.row)"
                    type="text"
                    size="medium"
                >简历信息</el-button>
            </template>
        </TableList>
        <!-- 查看简历信息-->
        <ViewResume
            v-if="lookResume"
            v-model="lookResume"
            :account_id="account_id"
        />
        <!-- 查看个人信息-->
        <ViewMes
            v-if="lookInfo"
            v-model="lookInfo"
            :pageType="pageType"
            @updeteList="updeteList"
            :account_id="account_id"
        />
    </div>
</template>

<script>
import app from "./eventBus.js";
const ViewResume = () => import("@/components/systemManage/userManageOuter/ViewResume.vue");
const ViewMes = () => import("@/components/systemManage/userManageOuter/ViewMes.vue");
import { getUserListByPage, deleteOutSchoolUser, disable, enable, exportOutSchoolUser } from "@/api/systemManage/userManageOuter";

export default {
    components: {
        ViewMes,
        ViewResume
    },
    created() {
        app.$on("queryData", (res) => {
            this.queryData = res;
        })
        app.$on("queryData", (data) => {
            this.queryData = data;
        })
    },
    mounted() {
        this.$nextTick(() => {
            app.$emit("updeteList", this.$refs.tableRef.refresh)
        })
    },
    data() {
        return {
            getUserListByPage: getUserListByPage,
            queryData: {
                //列表请求参数
                account: "",//
                alias: "",//
                name: "",//
                status: "",//
            },
            columns: [
                //列表字段
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
                    label: "姓名",
                    prop: "name"
                },
                {
                    label: "注册时间",
                    prop: "register_date"
                },
                {
                    label: "状态",
                    slotName: "enable"
                },
                {
                    label: "个人信息",
                    slotName: "per_mes"
                },
                {
                    label: "简历信息",
                    slotName: "res_mes"
                }
            ], //列表数据
            selectTableData: [],
            selectTableId: "",
            lookResume: false,
            lookInfo: false,
            pageType: "add",
            account_id: ""
        }
    },
    methods: {
        selectionChange(data) { //选择表格数据
            this.selectTableId = [];
            this.userIdStr = [];
            data.forEach((curr) => {
                this.selectTableId.push(curr.account_id);
                this.userIdStr.push(curr.id);
            })
            this.selectTableId = this.selectTableId.join(",");
            this.userIdStr = this.userIdStr.join(",");
            this.selectTableData = data;
            app.$emit("selectData", data, this.selectTableId)
        },
        //   查看个人信息
        lookPersonInfo(row) {
            this.account_id = row.account_id; //获取当前账号
            this.pageType = "view"
            this.lookInfo = true;
        },
        //   查看简历信息
        lookResumeInfo(row) {
            this.account_id = row.account_id; //获取当前账号
            this.lookResume = true;
        },
        updeteList() {
            // 更新列表
            this.$refs.tableRef.refresh();
        },
    }
}
</script>

<style lang="scss" scoped>
</style>