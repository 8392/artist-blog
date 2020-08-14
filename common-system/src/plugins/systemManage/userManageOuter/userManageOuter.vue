<template>

    <div class="userManage common-pagination1">
        <common-title
            titleBig="系统管理"
            titleSmall="用户管理"
        ></common-title>
        <div class=" type">
            <div class="type-option">
                <router-link to="/system/systemManage/userManageInner/userManageInner">
                    <el-button><i class="iconfont icon-xiaoneizhuanye"></i>校内用户</el-button>
                </router-link>
                <router-link to="/system/systemManage/userManageOuter/userManageOuter">
                    <el-button type="primary"><i class="iconfont icon-icon-test"></i>校外用户</el-button>
                </router-link>
            </div>
            <ul class="type-tool">
                <li @click="editMeth"><i class="iconfont icon-xiugai"></i>修改</li>
                <li @click="exportMeth"><i class="iconfont icon-zu"></i>导出</li>
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
        </div>
        <Search
            :query.sync="queryData"
            @updeteList="updeteList"
        />
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
        <!-- 查看个人信息-->
        <ViewMes
            v-if="lookInfo"
            v-model="lookInfo"
            :pageType="pageType"
            @updeteList="updeteList"
            :account_id="account_id"
        />
        <!-- 查看简历信息-->
        <ViewResume
            v-if="lookResume"
            v-model="lookResume"
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
        <!-- 启用禁用 -->

    </div>
</template>

<script>
const ViewResume = () => import("@/components/systemManage/userManageOuter/ViewResume.vue");
const Search = () => import("./Search.vue");
const ViewMes = () => import("@/components/systemManage/userManageOuter/ViewMes.vue");
// const SwitchDialog = () => import("@/components/systemManage/userManageOuter/SwitchDialog");
const EnableDia = () => import("@/components/systemManage/userManageInner/EnableDia.vue");//启用弹窗


import { getUserListByPage, deleteOutSchoolUser, disable, enable, exportOutSchoolUser } from "@/api/systemManage/userManageOuter";

export default {
    name: "userManage",
    components: { ViewResume, ViewMes, EnableDia, Search },
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
            enableApi: enable,

            // 自定义搜索
            selectTableData: [], //表格选择的数据
            selectTableId: "",//选择的表格用户ID
            userIdStr: "",
            restaurants: [],
            state: "",
            account_id: "", //当前账号ID

            // 启用禁用
            switchDialog: false,
            openEnable: false, //启用弹窗
            // 开关
            switchValue: false,
            // 查看\修改个人信息
            lookInfo: false,

            // 查看修改个人简历信息
            lookResume: false,
            pageType: "view",


        };
    },
    mounted() { },
    methods: {
        // 自定义搜索
        handelEvent() {
            // this.lookUser = true;
        },
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
        updeteList() {
            // 更新列表
            this.$refs.tableRef.refresh();
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
                    this.$message.success("删除成功！");
                }
            }).catch(() => { });
        },
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
        },
        handleSelect(item) {
            console.log(item);
        },
        handleIconClick(ev) {
            console.log(ev);
        },
        //   查看个人信息
        lookPersonInfo(row) {
            this.account_id = row.account_id; //获取当前账号
            this.pageType = "view"
            this.lookInfo = true;
            console.log("获取当前账号", row);
        },
        //   查看简历信息
        lookResumeInfo(row) {
            this.account_id = row.account_id; //获取当前账号
            this.lookResume = true;
        }
    }
};
</script>
<style lang="scss" scoped>
.userManage {
    .typeList {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-bottom: 15px;
        .el-checkbox-group {
            display: flex;
            justify-content: space-between;
            align-items: center;
            flex: 0.8;
            .lableCheckbox {
                display: flex;
                justify-content: flex-start;
                align-items: center;
            }
            .el-checkbox {
                margin: 0 10px;
            }
        }
    }
    .type {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 15px 0;
        .type-option {
            .el-button {
                margin-right: 20px;
            }
            i {
                margin-right: 8px;
            }
        }
        .type-tool {
            display: flex;
            justify-content: flex-end;
            align-items: center;
            li {
                margin-left: 23px;
                color: #1f1e34;
                font-size: 14px;
                font-weight: 400;
                color: rgba(31, 30, 52, 1);
                cursor: pointer;
                &:hover {
                    color: #1f9d2b;
                }
                &.hover-red {
                    &:hover {
                        color: #ef5454;
                    }
                }
                i {
                    margin-right: 8px;
                    font-size: 16px;
                }
            }
        }
    }
}

.Remarks {
    font-size: 14px;
    color: rgba(178, 178, 178, 1);
    text-align: center;
}
</style>
